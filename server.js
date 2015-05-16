// load environment variables from .env with dotenv
import dotenv from 'dotenv';
dotenv.load();

import React from 'react';
import mongoose from 'mongoose';
import {server as Cerebellum} from 'cerebellum';
import compress from 'compression';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import ConnectMongoStore from 'connect-mongostore';
import options from './options';
import UrlsAPI from './api';
import AuthenticationFactory from './authentication';

// connect to our database
const MongoStore = ConnectMongoStore(session);
const mongoAuth = process.env.MONGO_USER ? process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@" : "";
mongoose.connect("mongodb://"+mongoAuth+process.env.MONGO_HOST+":"+process.env.MONGO_PORT+"/"+process.env.MONGO_DBNAME);

const appId = options.appId;
const Layout = React.createFactory(require('./components/layout.jsx'));

options.render = function render(document, component, request) {
  const componentFactory = React.createFactory(component);
  const store = this.store;
  return new Promise(function(resolve, reject) {
    store.fetchAll(component.stores(request)).then(storeProps => {
      const props = typeof component.preprocess === "function" ? component.preprocess(storeProps, request) : storeProps;
      const title = typeof component.title === "function" ? component.title(storeProps) : component.title;
      document("title").html(title);
      document(`#${options.storeId}`).text(store.snapshot());
      document(`#${options.appId}`).html(
        React.renderToString(
          Layout({
            createComponent: () => { return componentFactory(props) },
            store: store
          })
        )
      );
      resolve(document.html());
    }).catch(reject);
  });
};

options.middleware = [
  compress(),
  cookieParser(process.env.COOKIE_SECRET),
  bodyParser.json(),
  bodyParser.urlencoded({extended: true}),
  session({
    secret: process.env.COOKIE_SECRET,
    store: new MongoStore({
      db: process.env.MONGO_DBNAME,
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASS,
      collection: "sessions"
    }),
    saveUninitialized: true,
    resave: true
  }),
  passport.initialize(),
  passport.session()
];

const app = Cerebellum(options);

// load API routes
app.use( "/api", UrlsAPI );

// load authentication routes
app.use( "/", AuthenticationFactory(passport) );

// always register static files middleware after defining routes
app.useStatic();

app.listen(Number(process.env.PORT || 4000), function() {
  console.log(`urls development server listening on port ${this.address().port}`);
});
