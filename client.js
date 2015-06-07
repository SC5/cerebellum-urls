import React from 'react';
import Cerebellum from 'cerebellum/client';
import CerebellumReact from 'cerebellum-react'
import options from './options';

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

// cerebellum-react specific options
const Layout = React.createFactory(require('./components/layout.jsx'));
options.prependTitle = "urls - ";
options.containerComponent = (store, component, props) => {
  return Layout({
    createComponent: () => { return component() },
    store: store
  });
};

CerebellumReact(Cerebellum, React, options);
