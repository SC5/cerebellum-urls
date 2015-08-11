// require babel/register here so we can write the server with ES201X as well
require('babel/register');
// load css-modules also on server side
require('css-modules-require-hook');
require('./server');
