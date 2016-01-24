// load environment variables from .env with dotenv
import dotenv from 'dotenv';
dotenv.load();

import React from 'react';
import ReactDOM from 'react-dom/server';
import mongoose from 'mongoose';
import {server as Cerebellum} from 'cerebellum';
import CerebellumReact from 'cerebellum-react'
import compress from 'compression';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import ConnectMongoStore from 'connect-mongostore';
import options from './options';
import UrlsAPI from './api';
import AuthenticationFactory from './authentication';
import request from 'request';

// connect to our database
const MongoStore = ConnectMongoStore(session);
const mongoAuth = process.env.MONGO_USER ? process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@" : "";
mongoose.connect("mongodb://"+mongoAuth+process.env.MONGO_HOST+":"+process.env.MONGO_PORT+"/"+process.env.MONGO_DBNAME);

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

// cerebellum-react specific options
const Layout = React.createFactory(require('./components/layout.jsx'));
options.prependTitle = "urls - ";
options.containerComponent = (store, children, props) => {
  return Layout({ store, children });
};

const app = CerebellumReact(Cerebellum, React, ReactDOM, options);

// load API routes
app.use( "/api", UrlsAPI );

// load authentication routes
app.use( "/", AuthenticationFactory(passport) );

// always register static files middleware after defining routes
app.useStatic();

app.listen(Number(process.env.PORT || 4000), function() {
  console.log(`urls development server listening on port ${this.address().port}`);
});
