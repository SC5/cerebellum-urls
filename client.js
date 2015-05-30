import React from 'react';
import Cerebellum from 'cerebellum/client';
import renderClient from 'cerebellum-react/render-client-nested'
import routeHandler from 'cerebellum-react/route-handler-nested';
import options from './options';

const Layout = React.createFactory(require('./components/layout.jsx'));

options.routeHandler = routeHandler;
options.render = renderClient(React, {
  storeId: options.storeId,
  appId: options.appId,
  prependTitle: "urls - ",
  containerComponent: (store, component, props) => {
    return Layout({
      createComponent: () => { return component() },
      store: store
    });
  }
});

options.initialize = function(client) {
  React.initializeTouchEvents(true);

  function reloadIndex() {
    client.router.replace(document.location.pathname);
  }

  // re-render current route handler when Store cache changes, optimistic updates
  client.store.cached.on('swap', () => reloadIndex());

  client.store.on("create:links", reloadIndex);
  client.store.on("delete:link", reloadIndex);
  client.store.on("update:link", reloadIndex);
};

// clear caches automatically after create, update & delete
options.autoClearCaches = true;

Cerebellum(options);
