var request = require('superagent');
var Serializer = require('./Serializer');

function Client(url, options) {
  this.url = url;
  this.options = options;
}

var proto = Client.prototype;
proto.call = function(method, params, cb) {
  var xml = Serializer.serializeMethodCall(method, params, 'utf8');

  if (this.options && this.options.auth)
    request
      .post(this.url)
      .auth(this.options.auth.username, this.options.auth.password)
      .send(xml)
      .end(function(err, res) {
        if(err) return cb(err);
        cb(null, res.text);
      });
  else
    request
      .post(this.url)
      .send(xml)
      .end(function(err, res) {
        if(err) return cb(err);
        cb(null, res.text);
      });
};

module.exports = Client;
