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

  static isUserValid(req, res) {
    return new Promise((resolve, reject) => {
      let decoded = jwt.verify(req.token, process.env.APP_SECRET, (err, user) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Please login or register to complete this action"
          });
        } else {
          req.user = user;
          resolve();
        }
      });
    });
  }

  static getUserFromToken(token) {
    return jwt.verify(token, process.env.APP_SECRET);
  }
}

export default security;
