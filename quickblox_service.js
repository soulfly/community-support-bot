var quickblox = require("quickblox");

// QuickBloxService constructor.
var QuickBloxService = function(appId, authKey, authSecret, botUser, chatDialogId) {
  this.appId = appId;
  this.authKey = authKey;
  this.authSecret = authSecret;
  this.botUser = botUser;
  this.chatDialogId = chatDialogId;

  this.sessionExpirationTime = null;

  var CONFIG = {
    debug: {mode: 1} // set DEBUG mode
  };

  QB.init(appId, authKey, authSecret, CONFIG);
};

QuickBloxService.prototype.checkSession = function(callback){
  if(!QB.service.qbInst.session || (new Date()).toISOString() > this.sessionExpirationTime){
     var params = {login: this.botUser.login, password: this.botUser.password};
     QB.createSession(params, function(err, result) {
       if (typeof callback === 'function'){
         callback(err);
       }
     });
  }else{
    if (typeof callback === 'function'){
      callback(null);
    }
  }
}

QuickBloxService.prototype.buildMessage = function(feedEntry){
  var message = "New activity: " + feedEntry.link +
               ". Title: " + feedEntry.title +
               ". Tags: " + feedEntry.categories.join(", ");
  return message;
}

QuickBloxService.prototype.fire = function(data, successCallback, errorCallback) {
  var self = this;

  this.checkSession(function(err){
    var params = {
        chat_dialog_id: this.chatDialogId,
        message: data,
        send_to_chat: 1
    };

    QB.chat.message.create(params, function(err, res) {
      self.sessionExpirationTime = (new Date()).toISOString();

      if(err){
        console.log("error sending QuickBlox API request: " + JSON.stringify(err));
        errorCallback(err);
      }else{
        successCallback();
      }
    });

  });

};

// Export the QuickBloxService constructor from this module.
module.exports = QuickBloxService;
