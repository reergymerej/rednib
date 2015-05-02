'use strict';

var VERSION = '0.0.1';

var methods = {
  bind: function () {},
  unbind: function () {},
  trigger: function () {},
};

var builtInMethodNames = Object.keys(methods).map(function (key) {
  return key;
});

module.exports = (function (obj) {
 
  var app = function (obj) {
    try {
      Object.keys(methods).forEach(function (key) {
        obj[key] = methods[key];
      });
    } catch (e) {
      throw new Error(obj.toString() + ' is not a supported type.');
    }
  };

  app.version = VERSION;

  app.alias = function (methodName, alias) {
    if (builtInMethodNames.indexOf(alias) > -1) {
      throw new Error('Watch out! ' + alias + ' is already in use.');
    }

    if (methods[alias]) {
      throw new Error('Whoops, ' + alias + ' has already been set as an alias.');
    }

    methods[alias] = methods[methodName];
  };
  return app;
}());