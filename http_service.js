var request = require("request");

// HTTPService constructor.
var HTTPService = function() {

};

// HTTPService get method
HTTPService.prototype.get = function(url, successCallback, errorCallback) {
  request(url, function(error, response, body) {
    if(error){
      errorCallback(error);
    }else{
      successCallback(body);
    }
  });
};

// Export the HTTPService constructor from this module.
module.exports = HTTPService;
