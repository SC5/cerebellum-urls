var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var postCSS = {
  nested: require('postcss-nested'),
  autoprefixer: require('autoprefixer-core'),
  variables: require('postcss-css-variables'),
  import: require('postcss-import')
};

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageAlias: "browser",
  },
  entry: [
    './client'
  ],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'app.js',
  },
  plugins: [
    new ExtractTextPlugin('../css/styles.css')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        // TODO: this is fugly, figure out better way to prevent
        // 'npm link':ed modules from causing problems
        include: [
          path.join(__dirname, 'actions.js'),
          path.join(__dirname, 'client.js'),
          path.join(__dirname, 'options.js'),
          path.join(__dirname, 'reactions.js'),
          path.join(__dirname, 'routes.js'),
          path.join(__dirname, 'state.js'),
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=../[path][name].[ext]"
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
