import stores from './stores';
import routes from './routes';
import actions from './actions';
import reactions from './reactions';

export default {
  actions: actions,
  staticFiles: __dirname + "/public",
  storeId: "store_state_from_server",
  appId: "app",
  reactions: reactions,
  routes: routes, // shared routes required from routes.js
  stores: stores // shared collections and models required from stores.js
};
