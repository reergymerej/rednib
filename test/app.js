'use strict';
var will = require('willy').will,
  app = require('../app');

describe('sanity', function () {
  it('should provide the version', function () {
    will(app.version).beA(String);
  });
});

describe('creating rednib object', function () {
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

  it('should add a "trigger" method', function () {
    will(function () {
      obj.trigger();
    }).not.throw();
  });

  describe('aliasing methods', function () {
    before(function () {
      app.alias('bind', 'newBindAlias');
    });

    it('should allow for aliasing methods', function () {
      var obj = {};
      app(obj);

      will(obj.bind).be(obj['newBindAlias']);
    });

    it('should throw when the alias is a built-in method', function () {
      will(function () {
        app.alias('bind', 'unbind');
      }).throw();
    });

    it('should throw when attempting to overwrite an alias', function () {
      will(function () {
        app.alias('bind', 'newBindAlias');
      }).throw();
    });
  });

  describe('different object types', function () {
    it('should work for all object types', function () {
      var test = function (obj) {
        will(function () {
          app(obj);
          obj.bind();
          obj.unbind();
          obj.trigger();
        }).not.throw();
      };

      test({});
      test(new Object());
      test([]);
      test(new Array());
      test(function () {});
      test(new Number());
      test(new String());
    });

    it('should warn for unsupported types', function () {
      will(function () {
        app(undefined);
      }).throw();
    });
  });
});

// describe('')
