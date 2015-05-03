# rednib v0.0.2 [![Build Status](https://travis-ci.org/reergymerej/rednib.svg?branch=v0.0.2)](https://travis-ci.org/reergymerej/rednib)

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
## More Options

You an assign multiple handlers at once with an object.

```js
pojo.bind({
  foo: function () {},
  bar: function () {},
  baz: function () {}
});
```

================================================

Please [create an issue](https://github.com/reergymerej/rednib/issues) for feature requests or to report bugs.

### Coming Soon

* binding with an object to set many at a time
* event data
* handler scope
