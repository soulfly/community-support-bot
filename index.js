var FeedparserService = require('./feedparser_service');
var SlackService = require('./slack_service');
var QuickBloxService = require('./quickblox_service');
var CronJob = require('cron').CronJob;

var CONFIG = require('./config');

var stackoverflowFeedUrl = "http://stackoverflow.com/feeds/tag/";


var slackAPI;
if(CONFIG.slack.webhookUrl){
  slackAPI = new SlackService(CONFIG.slack.webhookUrl);
}

var quickbloxAPI;
if(CONFIG.quickblox.chatDialogId){
  quickbloxAPI = new QuickBloxService(CONFIG.quickblox.appId,
                                      CONFIG.quickblox.authKey,
                                      CONFIG.quickblox.authSecret,
                                      CONFIG.quickblox.botUser,
                                      CONFIG.quickblox.chatDialogId);
}


try {
  new CronJob("*/5 * * * *", function() {
    start();
  }, null, true, 'America/Los_Angeles');
} catch(ex) {
  console.log("cron pattern not valid: " + ex);
}


function start(){
  console.log("start by cron");
  console.log(CONFIG.stackoverflow.additionalTags)

  var feedParser = new FeedparserService();
  feedParser.parse(stackoverflowFeedUrl + CONFIG.stackoverflow.mainTag, function(entries){

      console.log("got " + entries.length + " entries");

      entries.forEach(function(entry, i, arr) {
        var isNew = isNewEntry(entry);
        //console.log("isNew: " + isNew + ". tags: " + JSON.stringify(entry.categories));

        if(isNew && isEntryHasNeededTags(entry)){
          console.log("New Entry found. Date: " + entry.date + ". Title: " + entry.title);

          // notify Slack
          if(slackAPI){
            var message = slackAPI.buildMessage(entry);

            slackAPI.fire(message,
              function(){
                console.log("Message has pushed to Slack successfully.");
              },function(error){
                console.error(error);
              }
            );
          }

          // notify QuickBlox
          if(quickbloxAPI){
            var message = quickbloxAPI.buildMessage(entry);

            quickbloxAPI.fire(message,
              function(){
                console.log("Message has pushed to QuickBlox successfully.");
              },function(error){
                console.error(error);
              }
            );
          }

        }
      });

    },function(error){
      console.error(error);
    }
  );
}

function isNewEntry(entry){
  var entryTimestamp = entry.date.getTime();
  var currentTimestamp = Date.now();

  return currentTimestamp-entryTimestamp <= (300*1000);
}

function isEntryHasNeededTags(entry){
  for(var i = 0; i < entry.categories.length; i++){
    var entryTag = entry.categories[i];

    for(var j = 0; j < CONFIG.stackoverflow.additionalTags.length; j++){
      var tagToCheck = CONFIG.stackoverflow.additionalTags[j];

      if(entryTag == tagToCheck){
        return true;
      }
    }

  }

  return false;
}
