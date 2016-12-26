import db from './database/db.js';

class security {
  static isAuthenticated(req, res, next) {
    // do any checks you want to in here
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.isAuthenticated())
      return next();

    res.send(401, 'Unauthorized');
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
}

export default security;
