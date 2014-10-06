var dotenv = require('dotenv');
dotenv.load();

require('node-jsx').install({extension: ".jsx"});

var React = require('react/addons');
var mongoose = require('mongoose');

var compress = require('compression');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongostore')(session);

mongoose.connect("mongodb://"+process.env.MONGO_HOST+":"+process.env.MONGO_PORT+"/"+process.env.MONGO_DBNAME); // connect to our database

var cerebellum = require('cerebellum');
var options = require('./options');

// routes
var api = require('./api');
var authentication = require('./authentication')(passport);

var appId = options.appId;

options.render = function render(document, options) {
  if (options == null) {
    options = {};
  }
  if (options.title) {
    document("title").html(options.title);
  }
  document("#"+appId).html( React.renderComponentToString(options.component) );
  return document.html();
};

options.middleware = [
  compress(),
  cookieParser(process.env.COOKIE_SECRET),
  bodyParser.json(),
  bodyParser.urlencoded({extended: true}),
  session({secret: process.env.COOKIE_SECRET, store: new MongoStore({db: process.env.MONGO_DBNAME, host: process.env.MONGO_HOST, port: process.env.MONGO_PORT, collection: "sessions"}), saveUninitialized: true, resave: true}),
  passport.initialize(),
  passport.session()
];

var app = cerebellum.server(options);

// load API routes
app.use( "/api", api );

// load authentication routes
app.use( "/", authentication );

// always register static files middleware after defining routes
app.useStatic();

app.listen(Number(process.env.PORT || 4000), function() {
  console.log("cerebellum sample app development server listening on port "+ (this.address().port));
});