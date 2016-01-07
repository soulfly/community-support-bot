var request = require("request");

// SlackService constructor.
var SlackService = function(slackWebhookUrl) {
  this.webhookUrl = slackWebhookUrl;
};

SlackService.prototype.buildMessage = function(feedEntry){
  var message = {attachments: [{
                              pretext: "New activity. <" + feedEntry.link + "|Check it>",
                              fallback: "New activity",
                              fields: [{title: "Title", value: feedEntry.title, short: false},
                                       {title: "Categories", value: feedEntry.categories.join(", "), short: false},
                                       {title: "Updated date", value: new Date(feedEntry.date).toString(), short: true},
                                       {title: "Publish date", value: new Date(feedEntry.pubdate).toString(), short: true}
                                     ]
                            }]
                          };

  return message;
}

SlackService.prototype.fire = function(data, successCallback, errorCallback) {
  var self = this;

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     self.webhookUrl,
    body:    JSON.stringify(data)
  }, function(error, response, body){
    if(error){
      errorCallback(error);
    }else{
      successCallback(body);
    }
  });

};

// Export the SlackService constructor from this module.
module.exports = SlackService;
