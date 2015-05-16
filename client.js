import React from 'react';
import {client as Cerebellum} from 'cerebellum';
import options from './options';

const appContainer = document.getElementById(options.appId);
const Layout = React.createFactory(require('./components/layout.jsx'));

options.render = function(component, request={}) {
  const componentFactory = React.createFactory(component);
  const store = this.store;
  return new Promise(function(resolve, reject) {
    return store.fetchAll(component.stores(request)).then(storeProps => {
      const props = typeof component.preprocess === "function" ? component.preprocess(storeProps, request) : storeProps;
      const title = typeof component.title === "function" ? component.title(storeProps) : component.title;
      document.getElementsByTagName("title")[0].innerHTML = title;
      resolve(
        React.render(
          Layout({
            createComponent: () => { return componentFactory(props) },
            store: store
          }),
          document.getElementById(options.appId)
          )
        );
    }).catch(reject);
  });
};

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
