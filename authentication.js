import express from 'express';
import mongoose from 'mongoose';
import User from './api/models/user';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';

const router = express.Router();

export default function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    User.load({ criteria: { _id: id } }, function(err, user) {
      done(err, user);
    })
  });

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      const options = {
        criteria: { 'google.id': profile.id }
      };
      User.load(options, function(err, user) {
        if (err) return done(err);
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'google',
            google: profile._json
          });
          user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));

  router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                              'https://www.googleapis.com/auth/userinfo.email'] }),
    function(req, res) {}
  );

  router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    }
  );

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};
