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
  React.renderComponent(options.component, appContainer);
};

options.initialize = function(client) {
  React.initializeTouchEvents(true);

  // TODO: currently store callbacks are handled manually, I'm still not sure if they belong inside Store or not
  client.store.on("create", function(storeId, props) {
    props.tags = props.tags.split(",").map(function(tag) { return tag.trim(); });
    client.store.get(storeId).create(props, {at: 0, success: function() {
      client.router.setRoute("/");
    }});
  });
};

options.passthrough = [
  "auth/google",
  "logout"
];

cerebellum.client(options);