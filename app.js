'use strict';

var VERSION = '0.0.1';

var bind = function () {};
var unbind = function () {};

module.exports = (function (obj) {
  
  var app = function (obj) {
    obj.bind = bind;
    obj.unbind = unbind;
  };

  app.version = VERSION;
  return app;
}());