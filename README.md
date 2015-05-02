# rednib v0.0.1 [![Build Status](https://travis-ci.org/reergymerej/rednib.svg?branch=master)](https://travis-ci.org/reergymerej/rednib)

rednib takes any object and makes it observable.

```js
var pojo = {};
rednib(pojo);

var onFoo = function () { console.log('onFoo'); };

pojo.bind('foo', onFoo);
pojo.trigger('foo', onFoo);  // logs 'onFoo'
pojo.unbind('bar', onBar);  // omit the handler to remove all 'bar' handlers
```

The following will be added to your observable objects:

* bind (Function)
* unbind (Function)
* trigger (Function)
* _handlers (Array)

If you would prefer different *function* names, you can alias them.

```js
rednib.alias('bind', 'when');
rednib.alias('trigger', 'broadcast');
rednib.alias('unbind', 'forget');

pojo.when('foo', onFoo);
pojo.broadcast('foo', onFoo);  // logs 'onFoo'
pojo.forget('foo', onFoo);
```

================================================

Please [create an issue](https://github.com/reergymerej/rednib/issues) for feature requests or to report bugs.

### Coming Soon

* event data
* handler scope
* binding with an object to set many at a time
* remove all handlers