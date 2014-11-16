module.exports = function(R) {
  const _ = R._;
  const React = R.React;

  class Client {
    constructor({ app }) {
      _.dev(() => _.isClient().should.be.ok &&
        window.React.should.be.ok &&
        app.should.be.an.instanceOf(R.App)
      );
      this.app = app;
      this.rendered = false;
    }

    mount({ window }) {
      return _.copromise(function*() {
        _.dev(() => window.should.be.an.Object &&
          this.rendered.should.not.be.ok
        );
        window.React = React;
        this.rendered = true;
        yield this.app.render({ window });
      }, this);
    }
  }

  _.extend(Client.prototype, /** @lends Client */{
    app: null,
    rendered: null,
  });

  return Client;
};
