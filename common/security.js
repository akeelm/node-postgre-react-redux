import db from './database/db.js';
const jwt = require('jsonwebtoken');
require('dotenv').config();

class security {
  static isAuthenticated(req, res, next) {
    if (localStorage.getItem('token')) return next();

    if (req.isAuthenticated())
      return next();

      res.status(401).send('Unauthorized');
  }

  static onlyAdminsPromise(req, res) {
    return new Promise((resolve, reject) => {
      db.user.get_user_roles(req.body.userid, function(err, roles){
        if (err) throw err;
        if (roles.find(item => { return item.role == "admin" }) !== undefined) {
          resolve();
        } else {
          res.status(401).send('Unauthorized');
          Promise.reject();
        }
      });
    });
  }

  static isUserValid(req, res, next) {
    return new Promise((resolve, reject) => {
      let decoded = jwt.verify(req.body.token, process.env.APP_SECRET, (err, user) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Please login or register to complete this action"
          });
        } else {
          req.user = user;
          resolve();
          return next();
        }
      });
    });
  }

  static refreshToken(email){
    return new Promise((resolve, reject) => {
      db.user.with_roles_json(email, function(err, result) {
        // if there are any errors, return the error before anything else
        if (err) return done(err);

        // if no user is found, return the message
        if (!result) return done(null, false, { message: 'No user found.' });

        const user = result[0].users;

        const payload = {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          surname: user.surname,
          emailverified: user.emailverified,
          roles: user.roles
        };

        let token = jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "1 day" });

        //save to localStorage for testing methods
        try { localStorage.setItem('token', token); } catch(err) { }

        // all is well, return token
        resolve(token);
      })
    });
  }

  static getUserFromToken(token) {
    return jwt.verify(token, process.env.APP_SECRET);
  }
}

export default security;
