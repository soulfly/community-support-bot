var FeedParser = require('feedparser'),
    request = require('request');

// Feedparser constructor.
var FeedparserService = function() {
  this.items = [];
};

// Parses the specified text.
FeedparserService.prototype.parse = function(url, successCallback, errorCallback) {
  var self = this;

  console.log("quering url: " + url);

  var req = request({headers: {"user-agent": "node.js"}, uri: url}),
    feedparser = new FeedParser([]);

  req.on('error', function (error) {
    errorCallback(error);
  });
  req.on('response', function (res) {
    var stream = this;

    console.log("res.statusCode: " + res.statusCode);
    console.log("res.statusMessage: " + res.statusMessage);

    if (res.statusCode != 200){
      return this.emit('error', new Error(res.statusCode + " " + res.statusMessage));
    }

    stream.pipe(feedparser);
  });

  feedparser.on('error', function(error) {
    errorCallback(error);
  });
  feedparser.on('readable', function() {
    // This is where the action is!
    var stream = this,
        meta = this.meta, // **NOTE** the "meta" is always available in the context of the feedparser instance
        item;
    while (item = stream.read()) {
      self.items.push(item);
    }
  });
  feedparser.on('end', function(error) {
    successCallback(self.items);
  });
};

// Export the Feedparser constructor from this module.
module.exports = FeedparserService;
