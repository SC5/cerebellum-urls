import stores from './stores';
import routes from './routes';

export default {
  staticFiles: __dirname+"/public",
  storeId: "store_state_from_server",
  appId: "app",
  routes: routes, // shared routes required from routes.js
  stores: stores // shared collections and models required from stores.js
};
