import db from './../../common/database/db.js';
const bcrypt = require('bcrypt');
import user from './../../common/models/user.js';
import security from './../../common/security.js';

module.exports = function(app, passport) {

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
            res.status(401).send('xxx ' +err);
          else {
            res.send('Successfully registered');
          }
        });
      });
    });

    //USER DELETE BY EMAIL
    app.post('/api/user/delete', security.isAuthenticated, function(req, res) {
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
    app.post('/api/user/login', passport.authenticate('local-login', {
        successRedirect : '/api/user/loggedin', // redirect to the secure profile section
        failureRedirect : '/api/user/unauthorized', // redirect back to the signup page if there is an error
        failureFlash : false // allow flash messages
    }));

    //USER LOGIN SUCCESSS
    app.get('/api/user/loggedin', function(req, res){
      res.send('Logged in');
    });

    //USER UNAUTHORIZED
    app.get('/api/user/unauthorized', function(req, res){
      res.status(401).send('Unauthorized');
    });

    //USER ROLES
    app.post('/api/user/roles', security.isAuthenticated, function(req, res, next) {
      if (req.body.userid === undefined) return res.status(401).send('No data sent');

      var onlyAdmins = security.onlyAdminsPromise(req, res);

      var p3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "foo");
      });

      Promise.all([onlyAdmins, p3]).then(values => {
        res.send(values);
      });
    });


  };
