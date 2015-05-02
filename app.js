'use strict';

var VERSION = '0.0.1';

var touchHandlers = function (eventName) {
  this._handlers = this._handlers || {};
  this._handlers[eventName] = this._handlers[eventName] || [];
};

var getHandlers = function (eventName) {
  return this._handlers && this._handlers[eventName];
};

var methods = {
  bind: function (eventName, handler) {
    if (!eventName) {
      throw new Error('Whoops, that\'s not the way to bind.');
    }

    touchHandlers.apply(this, [eventName]);
    getHandlers.apply(this, [eventName]).push(handler);
  },

  unbind: function (eventName, handler) {
    var i, handlers;

    touchHandlers.apply(this, [eventName]);
    handlers = getHandlers.apply(this, [eventName]);
    for (i = 0; i < handlers.length; i++) {
      if (handler ? handlers[i] === handler : true) {
        handlers.splice(i, 1);
        i--;
      }
    }
  },

  trigger: function (eventName) {
    touchHandlers.apply(this, [eventName]);
    getHandlers.apply(this, [eventName]).forEach(function (handler) {
      handler();
    });
  }
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
      throw new Error(obj + ' is not a supported type.');
    }

    return obj;
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