var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

// create webpack dev server instance for react-hot-loader
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: 'http://localhost:4000',
  hot: true,
  historyApiFallback: true
}).listen(4001, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('webpack-dev-server listening at localhost:4001');
});