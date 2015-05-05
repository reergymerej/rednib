'use strict';

var VERSION = '0.0.2';

var touchHandlers = function (eventName) {
  this._handlers = this._handlers || {};
  this._handlers[eventName] = this._handlers[eventName] || [];
};

var getHandlers = function (eventName) {
  return this._handlers && this._handlers[eventName];
};

var isObject = function (obj) {
  return !!(obj.toString && obj.toString() === '[object Object]');
};

var eachObject = function (obj, fn, scope) {
  Object.keys(obj).forEach(function (key) {
    fn.apply(scope, [key, obj[key], obj]);
  });
};

var methods = {
  /*
  * @param {String/Object} eventName
  * @param {Function} handler
  */
  bind: function (eventName, handler) {
    var map;
    if (!eventName) {
      throw new Error('Whoops, that\'s not the way to bind.');
    }

    // account for alternate signature
    if (!isObject(eventName)) {
      map = {};
      map[eventName] = handler;
    } else {
      map = eventName;
    }

    eachObject(map, function (eventName, handler) {
      touchHandlers.apply(this, [eventName]);
      getHandlers.apply(this, [eventName]).push(handler);
    }, this);

    return this;
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

    return this;
  },

  trigger: function (eventName, data) {
    touchHandlers.apply(this, [eventName]);
    getHandlers.apply(this, [eventName]).forEach(function (handler) {
      handler(data);
    });

    return this;
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