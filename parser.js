var libxmljs = require('libxmljs');

// Parser constructor.
var Parser = function() {

};

// Parses the specified text.
Parser.prototype.parse = function(xml, successCallback, errorCallback) {
  var xmlDoc = libxmljs.parseXml(xml);

  successCallback(xmlDoc);
};

// Export the Parser constructor from this module.
module.exports = Parser;
