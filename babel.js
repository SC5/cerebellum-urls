// disable .css requires on server side
require.extensions['.css'] = function() {
  return null;
};

// require babel/register here so we can write the server with ES201X as well
require('babel/register');
require('./server');