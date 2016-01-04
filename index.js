// var Parser = require('./parser');
// var HTTPService = require('./http_service');
var FeedparserService = require('./feedparser_service');


var tag = "quickblox";
var stackoverflowFeedUrl = "http://stackoverflow.com/feeds/tag/";

var feedParser = new FeedparserService();
feedParser.parse(stackoverflowFeedUrl + tag, function(result){
    console.log(result);
  },function(error){
    console.error(error);
  }
);

// var httpService = new HTTPService();
// httpService.get(stackoverflowFeedUrl + tag,
//   function(result){
//     console.log("data has downloaded, parsing it..");
//
//     var parser = new Parser();
//     parser.parse(result,
//       function(result){
//         console.log(result);
//       },function(error){
//         console.error(error);
//       }
//     );
//
//   },function(error){
//     console.error(error);
//   }
// );
