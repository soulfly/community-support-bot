// var Parser = require('./parser');
// var HTTPService = require('./http_service');
var FeedparserService = require('./feedparser_service');
var SlackService = require('./slack_service');
var CONFIG = require('./config');
if(!CONFIG.webhookUrl){
  CONFIG = require('./config_local');
}

var stackoverflowFeedUrl = "http://stackoverflow.com/feeds/tag/";

start();

function start(){
  var feedParser = new FeedparserService();
  feedParser.parse(stackoverflowFeedUrl + CONFIG.mainTag, function(entries){

      var slackAPI;

      entries.forEach(function(entry, i, arr) {
        if(isNewEntry(entry) && isEntryHasNeededTags(entry)){
          console.log("New Entry found! Date: " + entry.date + ". Title: " + entry.title);

          if(!slackAPI){
            slackAPI = new SlackService(CONFIG.webhookUrl);
          }

          var message = slackAPI.buildMessage(entry)

          slackAPI.fire(message,
            function(){
              console.log("Message has pushed successfully.");
            },function(error){
              console.error(error);
            });
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

  return currentTimestamp-entryTimestamp <= CONFIG.runIntervalInMilliseconds;
}

function isEntryHasNeededTags(entry){

  for(var i = 0; i < entry.categories.length; i++){
    var entryTag = entry.categories[i];

    for(var j = 0; j < CONFIG.additionalTags.length; j++){
      var tagToCheck = CONFIG.additionalTags[j];

      if(entryTag.indexOf(tagToCheck) > -1){
        return true;
      }
    }

  }

  return false;
}
