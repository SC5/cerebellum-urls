var React = require('react/addons');

var cerebellum = require('cerebellum');
var options = require('./options');

var appContainer = document.getElementById(options.appId);

options.render = function render(options) {
  if (options == null) {
    options = {};
  }
  window.scrollTo(0, 0);
  if (options.title) {
    document.getElementsByTagName("title")[0].innerHTML = options.title;
  }
  React.render(options.component, appContainer);
};

options.initialize = function(client) {
  React.initializeTouchEvents(true);

  // TODO: add error handling
  client.store.on("create:links", function(err, data) {
    client.router("/");
  });

  client.store.on("delete:link", function(err, data) {
    client.store.clearCache("links", "links");
    client.router("/");
  });

  client.store.on("update:link", function(err, data) {
    client.store.clearCache("links", "links");
    client.router("/");
  });

};

// clear caches automatically after create, update & delete
options.autoClearCaches = true;

cerebellum.client(options);