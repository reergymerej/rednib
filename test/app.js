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

  it('should return the wrapped object', function () {
    var obj = {};
    will(app(obj)).be(obj);
  });

  it('should add a "bind" method', function () {
    will(obj.bind).beA(Function);
  });

  it('should add an "unbind" method', function () {
    will(obj.unbind).beA(Function);
  });

  it('should add a "trigger" method', function () {
    will(obj.trigger).beA(Function);
  });

  describe('aliasing methods', function () {
    before(function () {
      app.alias('bind', 'newBindAlias');
    });

    it('should allow for aliasing methods', function () {
      var obj = {};
      app(obj);

      will(obj.bind).be(obj.newBindAlias);
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
          var fn = function () {};
          app(obj);
          obj.bind('foo', fn);
          obj.trigger('foo');
          obj.unbind('foo', fn);
        }).not.throw();
      };

      /* jshint ignore:start */
      test({});
      test(new Object());
      test([]);
      test(new Array());
      test(function () {});
      test(new Number());
      test(new String());
      /* jshint ignore:end */
    });

    it('should warn for unsupported types', function () {
      will(function () {
        app(undefined);
      }).throw();
    });
  });
});

describe('listening and triggering', function () {
  var obj;

  before(function () {
    obj = { myObj: true };
    app(obj);
  });

  describe('binding with wrong arguments', function () {
    it('should throw', function () {
      will(function () {
        obj.bind();
      }).throw();
    });
  });

  it('should fire the handlers when an event is triggered', function () {
    var fired = false;

    obj.bind('foo', function () {
      fired = true;
    });

    obj.trigger('foo');

    will(fired).be(true);
  });

  describe('multiple handlers', function () {

    it('should fire all the handlers for the event triggered', function () {
      var count = 0,
        handler = function () {
          count++;
        };

      obj.bind('foo', handler);
      obj.bind('foo', handler);
      obj.bind('foo', handler);
      obj.bind('foo', handler);

      obj.trigger('foo');

      will(count).be(4);
    });

    it('should only fire the handlers for the event triggered', function () {
      var fired = false;

      obj.bind('foo', function () {
        fired = true;
      });

      obj.bind('bar', function () {
        fired = false;
      });

      obj.trigger('foo');

      will(fired).be(true);
    });
  });
});

describe('removing listeners', function () {
  var obj;

  beforeEach(function () {
    obj = { myObj: true };
    app(obj);
  });

  it('should remove the specified handler', function () {
    var fired = false,
      onFoo = function () {
        fired = true;
      };

    obj.bind('foo', onFoo);
    obj.unbind('foo', onFoo);
    obj.trigger('foo');
    will(fired).be(false);
  });

  it('should only remove those for the specified event', function () {
    var fired = false,
      onFoo = function () {},
      onBar = function () {
        fired = true;
      };

    obj.bind('foo', onFoo);
    obj.bind('bar', onBar);
    obj.unbind('foo', onFoo);
    obj.trigger('bar');
    will(fired).be(true);
  });

  it('if no handler is specified, remove them all', function () {
    var count = 0,
      handler = function () {
        count++;
      };

    obj.bind('foo', handler);
    obj.bind('foo', handler);
    obj.bind('foo', handler);
    obj.bind('foo', handler);

    obj.unbind('foo');
    obj.trigger('foo');
    will(count).be(0);
  });
});
