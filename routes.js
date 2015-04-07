require('native-promise-only');
var React = require('react');
var IndexView = require('./components/index.jsx');
var ProfileView = require('./components/profile.jsx');
var TagsView = require('./components/tags.jsx');

module.exports = {
  "/": function() {
    var self = this;

    return Promise.all([this.store.fetch("user"), this.store.fetch("links")]).then(function(results) {
      var userModel = results[0];
      var links = results[1];

      var user = userModel.get("_id") ? userModel : false;
      return {
        title: "urls - save and tag your urls",
        component: React.createElement(IndexView, {
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
      var user = userModel.get("_id") ? userModel : false;
      return {
        title: "urls - your profile",
        component: React.createElement(ProfileView, {
          user: user
        })
      }
    });
  },
  "/tags": function() {
    var self = this;

    return Promise.all([this.store.fetch("user"), this.store.fetch("tags")]).then(function(results) {
      var userModel = results[0];
      var tags = results[1];
      var user = userModel.get("_id") ? userModel : false;

      return {
        title: "urls - your tags",
        component: React.createElement(TagsView, {
          tags: tags,
          user: user
        })
      };
    });
  },
  "/tags/:id": function(id) {
    var self = this;

    return Promise.all([this.store.fetch("user"), this.store.fetch("tags")]).then(function(results) {
      var userModel = results[0];
      var user = userModel.get("_id") ? userModel : false;

      var tags = results[1].filter(function(tag) {
        return tag.id === id;
      });

      return {
        title: "urls - urls tagged with "+id,
        component: React.createElement(TagsView, {
          selected: id,
          tags: tags,
          user: user
        })
      };
    });

  }
};
