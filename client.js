import React from 'react';
import Cerebellum from 'cerebellum/client';
import CerebellumReact from 'cerebellum-react';
import state from './state';
import options from './options';

options.initialize = function(client) {
  React.initializeTouchEvents(true);

  // re-render current route handler when Store cache changes, optimistic updates
  client.onStateChange((state, previousState, path) => {
    if (path && path[0] !== "log") {
      client.router.replace(document.location.pathname);
    }
  });
};

// cerebellum-react specific options
const Layout = React.createFactory(require('./components/layout.jsx'));
options.prependTitle = "urls - ";
options.containerComponent = (store, component, props) => {
  return Layout({store: store}, component);
};

CerebellumReact(Cerebellum, React, state, options);

// TODO: refactor this out when react-hot-loader supports hot reloading functions
class ClientRenderer {
  render() {}
}

export default ClientRenderer;
