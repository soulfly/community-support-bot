var request = require("request");

// SlackService constructor.
var SlackService = function(slackWebhookUrl) {
  this.webhookUrl = slackWebhookUrl;
};

// HTTPService get method
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
