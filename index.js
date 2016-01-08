// var Parser = require('./parser');
// var HTTPService = require('./http_service');
var FeedparserService = require('./feedparser_service');
var SlackService = require('./slack_service');
var Logger = require('./logger');
var CONFIG = require('./config');
if(!CONFIG.webhookUrl){
  CONFIG = require('./config_local');
}
var CronJob = require('cron').CronJob;

var stackoverflowFeedUrl = "http://stackoverflow.com/feeds/tag/";

var logger = new Logger(CONFIG.logMode);

try {
  var cronSchedule = '*/' + CONFIG.runIntervalInSeconds + ' * * * * *';
  new CronJob(cronSchedule, function() {
    start();
  }, null, true, 'America/Los_Angeles');
} catch(ex) {
  logger.log("cron pattern not valid: " + ex);
}


function start(){
  logger.log("start");

  var feedParser = new FeedparserService();
  feedParser.parse(stackoverflowFeedUrl + CONFIG.mainTag, function(entries){

      var slackAPI;

      entries.forEach(function(entry, i, arr) {
        if(isNewEntry(entry) && isEntryHasNeededTags(entry)){
          logger.log("New Entry found. Date: " + entry.date + ". Title: " + entry.title);

          if(!slackAPI){
            slackAPI = new SlackService(CONFIG.webhookUrl);
          }

          var message = slackAPI.buildMessage(entry)

          slackAPI.fire(message,
            function(){
              logger.log("Message has pushed successfully.");
            },function(error){
              logger.error(error);
            });
        }
      });

    },function(error){
      logger.error(error);
    }
  );
}

function isNewEntry(entry){
  var entryTimestamp = entry.date.getTime();
  var currentTimestamp = Date.now();

  return currentTimestamp-entryTimestamp <= (CONFIG.runIntervalInSeconds*1000);
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
