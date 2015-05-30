import stores from './stores';
import routes from './routes';
import routeMap from 'cerebellum-react/route-map';

export default {
  staticFiles: __dirname+"/public",
  storeId: "store_state_from_server",
  appId: "app",
  routes: routeMap(routes), // shared routes required from routes.js
  stores: stores // shared collections and models required from stores.js
};
