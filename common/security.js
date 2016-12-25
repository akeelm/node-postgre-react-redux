import db from './database/db.js';

class security {
    static onlyAdminsPromise(req, res) {
      return new Promise((resolve, reject) => {
        db.user.get_user_roles(req.body.userid, function(err, roles){
          if (err) throw err;
          if (roles.find(item => { return item.role == "admin" }) !== undefined) {
            resolve();
          } else {
            res.send(401, 'Unauthorized');
            Promise.reject();
          }
        });
      });
    }
}

export default security;
