var log4js = require('log4js');

// Logger constructor.
var Logger = function(modeType) {
  this.mode = modeType; // 1 is console, 2 is file
  if(this.mode == 2){
    log4js.loadAppender('file');
    log4js.addAppender(log4js.appenders.file('logs.log'), 'fileLogger');
    this.logger = log4js.getLogger('fileLogger');
  }else{
    this.logger = log4js.getLogger();
  }
};

Logger.prototype.log = function(data){
  this.logger.debug(data);
}

// Export the Logger constructor from this module.
module.exports = Logger;
