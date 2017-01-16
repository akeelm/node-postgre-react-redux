const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('./models/user.js');
import db from './database/db.js';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the token for the session
    passport.serializeUser(function(token, done) {
        done(null, token);
    });

    // used to deserialize the user
    passport.deserializeUser(function(token, done) {
      let decoded = jwt.verify(token, process.env.APP_SECRET);
      let user = { token: token };
      done(null, user);
      // db.users.findOne({id: decoded.id}, function(err, user) {
      //   done(err, user);
      // });
    });

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
        // callback with email and password from our form
    }, function(req, email, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        db.users.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err) return done(err);

            // if no user is found, return the message
            if (!user) return done(null, false, { message: 'No user found.' });

            // if the user is found but the password is wrong
            if (!bcrypt.compareSync(password, user.password))
                return done(null, false, { message: 'Wrong password.'});

            const payload = {
              id: user.id,
              email: user.email,
              firstname: user.firstname,
              surname: user.surname,
              emailverified: user.emailverified
            };

            let token = jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "1 day" });
            // all is well, return token
            return done(null, token);
        });
    }));

};
