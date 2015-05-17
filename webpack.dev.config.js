var path = require('path');
var webpack = require('webpack');
var postCSS = {
  nested: require('postcss-nested'),
  autoprefixer: require('autoprefixer-core'),
  variables: require('postcss-css-variables'),
  import: require('postcss-import')
};

module.exports = {
  devtool: 'eval',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageAlias: "browser",
  },
  entry: [
    'webpack-dev-server/client?http://localhost:4001',
    'webpack/hot/only-dev-server',
    './client'
  ],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'app.js',
    publicPath: 'http://localhost:4001/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot','babel-loader'],
        // TODO: this is fugly, figure out better way to prevent
        // 'npm link':ed modules from causing problems
        include: [
          path.join(__dirname, 'client.js'),
          path.join(__dirname, 'options.js'),
          path.join(__dirname, 'routes.js'),
          path.join(__dirname, 'stores.js'),
          path.join(__dirname, 'components'),
          path.join(__dirname, 'config'),
          path.join(__dirname, 'stores')
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  postcss: {
    defaults: [
      postCSS.import({
        path: ['node_modules']
      }),
      postCSS.nested,
      postCSS.autoprefixer
    ]
  }
};