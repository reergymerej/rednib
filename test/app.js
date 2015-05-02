'use strict';
var will = require('willy').will,
  app = require('../app');

describe('sanity', function () {
  it('should provide the version', function () {
    will(app.version).beA(String);
  });
});

describe('binding events', function () {
  var obj;

  beforeEach(function () {
    obj = {};
    app(obj);
  });

  it('should add a "bind" method', function () {
    will(function () {
      obj.bind();
    }).not.throw();
  });

  it('should add an "unbind" method', function () {
    will(function () {
      obj.unbind();
    }).not.throw();
  });
});
