import React from 'react';
import Cerebellum from 'cerebellum/client';
import CerebellumReact from 'cerebellum-react';
import state from './state';
import options from './options';

import {observers} from 'cerebellum';

options.initialize = function(client) {

  const eventsObserver = observers.init("urls/events");
  React.initializeTouchEvents(true);

  function reloadIndex() {
    client.router.replace(document.location.pathname);
  }

  // re-render current route handler when Store cache changes, optimistic updates
  eventsObserver.add(
    client.store.onSwap((newState, oldState, path) => {
      if (path && path[0] !== "log") {
        reloadIndex();
      }
    })
  );

  eventsObserver.add(
    client.store.observeEvents((lastEvent) => {
      if (lastEvent.storeId === "links" && lastEvent.title.match("fail")) {
        client.store.actions.linkForm.setErrors(lastEvent.args[2].data);
      }

      if (lastEvent.storeId === "links" && lastEvent.title.match("success")) {
        client.store.actions.linkForm.clear();
      }
    })
  );
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
