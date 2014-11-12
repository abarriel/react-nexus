module.exports = function(R) {
  const _ = R._;
  const should = R.should;
  const Subscription = require('./R.Store.Subscription')(R);

  class Store {
    constructor() {
      this._destroyed = false;
      this._cache = {};
      this.subscriptions = {};
    }

    destroy() {
      this._shouldNotBeDestroyed();
      // Explicitly nullify the cache
      Object.keys(this._cache).forEach((path) => this._cache[path] = null);
      // Nullify references
      this._cache = null;
      this._destroyed = true;
    }

    getDisplayName() { _.abstract(); }

    pull(path, opts = {}) {
      let { bypassCache } = opts;
      this._shouldNotBeDestroyed();
      _.dev(() => path.should.be.an.Object);
      if(!bypassCache && this.hasCachedValue(path)) {
        return Promise.resolve(this.getCachedValue(path));
      }
      else {
        return this.fetch(path).then((value) => this.propagateUpdate(path, value));
      }
    }

    fetch(path) { _.abstract(); }

    subscribeTo(path, handler) {
      this._shouldNotBeDestroyed();
      _.dev(() => path.should.be.a.String &&
        handler.should.be.a.Function
      );
      let subscription = new Subscription({ path, handler });
      let createdPath = subscription.addTo(this.subscriptions);
      this.pull(path).then(handler);
      return { subscription, createdPath };
    }

    unsubscribeFrom({ subscription }) {
      this._shouldNotBeDestroyed();
      _.dev(() => subscription.should.be.an.instanceOf(Subscription));
      return {
        subscriptions,
        deletedPath: subscriptions.removeFrom(this.subscriptions),
      };
    }

    serialize({ preventEncoding }) {
      this._shouldNotBeDestroyed();
      let serializable = _.extend({}, this._cache);
      return preventEncoding ? serializable : _.base64Encode(JSON.stringify(serializable));
    }

    unserialize(serialized, { preventDecoding }) {
      this._shouldNotBeDestroyed();
      let unserializable = preventDecoding ? serialized : JSON.parse(_.base64Decode(serialized));
      _.extend(this, { _cache: unserializable });
      return this;
    }

    propagateUpdate(path, value) {
      this._shouldNotBeDestroyed();
      this._cache[path] = value;
      if(this.subscriptions[path]) {
        Object.keys(this.subscriptions[path])
        .forEach((key) => this.subscriptions[path][key].update(value));
      }
      return value;
    }

    getCachedValue(path) {
      this._shouldNotBeDestroyed();
      _.dev(() => path.should.be.a.String &&
        _.has(this._cache, path).should.be.ok
      );
      return this._cache[path];
    }

    hasCachedValue(path) {
      this._shouldNotBeDestroyed();
      _.dev(() => path.should.be.a.String);
      return _.has(this._cache, path);
    }

    _shouldNotBeDestroyed() {
      _.dev(() => this._destroyed.should.not.be.ok);
    }
  }

  _.extend(Store.prototype, {
    _cache: null,
    _destroyed: null,
    subscriptions: null,
  });

  _.extend(Store, { Subscription });
  const MemoryStore = require('./R.Store.MemoryStore')(R, Store);
  const HTTPStore = require('./R.Store.HTTPStore')(R, Store);
  const UplinkStore = require('./R.Store.UplinkStore')(R, Store);

  _.extend(Store, { MemoryStore, HTTPStore, UplinkStore });

  return Store;

};
