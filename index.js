// var Parser = require('./parser');
// var HTTPService = require('./http_service');
var FeedparserService = require('./feedparser_service');
var SlackService = require('./slack_service');


var tag = "quickblox";
var additionalTags = ["ios"];
var stackoverflowFeedUrl = "http://stackoverflow.com/feeds/tag/";

var feedParser = new FeedparserService();
feedParser.parse(stackoverflowFeedUrl + tag, function(items){

    items.forEach(function(item, i, arr) {
      console.log("TITLE: " + item.title);
      console.log("CATEGORIES: " + item.categories);
      console.log("LINK: " + item.link);
      console.log("UPDATED: " + item.date);
      console.log("PUBDATE: " + item.pubdate);
    });

    var it = items[0];
    // var data = {"text": text};

    var data = {attachments: [{
                                pretext: "New activity. <" + it.link + "|Check it>",
                                fields: [{title: "Title", value: it.title, short: false},
                                         {title: "Categories", value: it.categories.join(", "), short: false},
                                         {title: "Updated date", value: it.date, short: true},
                                         {title: "Pub date", value: it.pubdate, short: true}
                                       ]
                              }]
                            };

    var slackAPI = new SlackService();
    slackAPI.fire(data,
      function(){
        console.log("Ok!");
      },function(error){
        console.error(error);
      });

  },function(error){
    console.error(error);
  }
);
