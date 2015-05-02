var React = require('react');

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
  function reloadIndex() {
    client.router.replace(document.location.pathname);
  }

  client.store.on("create:links", reloadIndex);
  client.store.on("delete:link", reloadIndex);
  client.store.on("update:link", reloadIndex);

};

// clear caches automatically after create, update & delete
options.autoClearCaches = true;

cerebellum.client(options);