import db from './../../common/database/db.js';
const bcrypt = require('bcrypt');
import user from './../../common/models/user.js';
import security from './../../common/security.js';

module.exports = function(app) {

  //USER REGISTER
  app.post('/api/user/register', function(req, res) {
    if (req.body.email === undefined){
      res.status(401).send('No data sent');
      return;
    }

    //check if email has already been registered
    db.users.where("email=$1", [req.body.email], function(err,users){
      if (users.length > 0) {
        res.status(401).send('A user with this e-mail already exists');
        return;
      }

      //encrypt the password
      let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);

      //save to the database
      db.users.save(
        {
          firstname: req.body.firstname,
          surname: req.body.surname,
          email: req.body.email,
          password: password
        },
        function(err,inserted){
          if (err)
          res.status(401).send(err);
          else {
            res.send('Successfully registered');
          }
        });
      });
    });

    //USER DELETE BY EMAIL
    app.post('/api/user/delete', function(req, res) {
      if (req.body.email === undefined){
        res.status(401).send('No data sent');
        return;
      }

      //get user by email
      db.users.where("email=$1", [req.body.email], function(err,users){
        if (users.length > 0) {
          db.users.destroy({email: req.body.email}, function(err, user){
            res.send('User deleted');
          });
        } else {
          res.status(401).send('User does not exist');
        }
      });
    });

    //USER LOGIN
    app.post('/api/user/login', function(req, res) {
      if (req.body.email === undefined ||
      req.body.password === undefined){
        res.status(401).send('No data sent');
        return;
      }

      db.users.findOne({email: [req.body.email]}, function(err,user){
        if (user !== undefined) {
          //check password
          //TODO: actually login
          (bcrypt.compareSync(req.body.password, user.password)) ?
          res.send('Logged in') :
          res.status(401).send('Invalid login');
        } else {
          res.status(401).send('Invalid login');
        }
      });
    });

    //USER ROLES
    app.post('/api/user/roles', function(req, res, next) {
      if (req.body.userid === undefined) {
        res.status(401).send('No data sent');
        return;
      }

      debugger;
      var onlyAdmins = security.onlyAdminsPromise(req, res);

      var p3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "foo");
      });

      Promise.all([onlyAdmins, p3]).then(values => {
        res.send(values);
      });
    });


  };
