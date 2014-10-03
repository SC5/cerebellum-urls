var IndexView = require('./components/index.jsx');
var ProfileView = require('./components/profile.jsx');
var TagsView = require('./components/tags.jsx');

module.exports = {
  "/": function() {
    var self = this;

    return Promise.all([this.store.fetch("user"), this.store.fetch("links")]).then(function(results) {
      var userModel = results[0];
      var links = results[1].toJSON();
      var user = userModel.isValid() ? userModel.toJSON() : false;
      return {
        title: "urls - save and tag your urls",
        component: IndexView({
          links: links,
          user: user,
          store: self.store
        })
      };
    });
  },
  "/profile": function() {
    var self = this;

    return this.store.fetch("user").then(function(userModel) {
      var user = userModel.isValid() ? userModel.toJSON() : false;
      return {
        title: "urls - your profile",
        component: ProfileView({
          user: user,
          store: self.store
        })
      }
    });
  },
  "/tags": function() {
    var self = this;

    return Promise.all([this.store.fetch("user"), this.store.fetch("tags")]).then(function(results) {
      var userModel = results[0];
      var tags = results[1].toJSON();
      var user = userModel.isValid() ? userModel.toJSON() : false;

      return {
        title: "urls - your tags",
        component: TagsView({
          tags: tags,
          user: user,
          store: self.store
        })
      };
    });
  },
  "/tags/:id": function(id) {
    var self = this;

    return Promise.all([this.store.fetch("user"), this.store.fetch("tags")]).then(function(results) {
      var userModel = results[0];
      var user = userModel.isValid() ? userModel.toJSON() : false;

      var tags = results[1].filter(function(tag) {
        return tag.id === id;
      }).map(function(tag) {
        return tag.toJSON()
      });

      return {
        title: "urls - urls tagged with "+id,
        component: TagsView({
          selected: id,
          tags: tags,
          user: user,
          store: self.store
        })
      };
    });

  }
};
