import db from './../../common/database/db';
const bcrypt = require('bcrypt');
import user from './../../common/models/user';
import security from './../../common/security';
import random from './../../common/utils/random';
import VerifyEmailTemplate from './../../common/email/verifyemailtemplate';
import MailSender from './../../common/email/mailsender';

module.exports = function(app, passport) {

    //USER REGISTER
    app.post('/api/user/register', function(req, res) {
      if (req.body.email === undefined){
        res.statusMessage = 'No data sent';
        res.status(401);
        res.send();
      }

      //check if email has already been registered
      db.users.where("email=$1", [req.body.email], function(err,users){
        if (users.length > 0) {
          res.statusMessage = 'A user with this e-mail already exists';
          res.status(401);
          res.send();
          return;
        }

        //encrypt the password
        let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);

        //save to the database
        db.users.save({
          firstname: req.body.firstname,
          surname: req.body.surname,
          email: req.body.email,
          password: password
        },
        function(err,inserted) {
          if (err) { res.status(401).send(err); return; }
          else {
            //save email verification code
            db.emailverification.save({
                userid: inserted.id,
                code: random.randomString(16)
            },
            //send verification email
            function(err, inserted) {
              if (err) throw err;
              MailSender.sendVerificationEmail(req.body.email, inserted.code)
              .then((result) => {
                res.send('Successfully registered');
              });
            })
          }
        });
      })
    });

    //VERIFY EMAIL CODE
    app.all('/api/user/verifyemail/:code', function(req, res) {
        if (!req.params.code) {
          res.statusMessage = 'No data sent';
          res.status(401);
          res.send();
          return;
        }

        //check the verification code
        db.emailverification.findOne({code: req.params.code}, function(err, code) {
          if (!code) {
            res.statusMessage = 'Invalid verification code';
            res.status(401);
            res.send();
            return;
          }

          //set user emailverified as true and delete validation entry
          db.users.save({id: code.userid, emailverified: 'true'}, function(err){
            if (err) { res.status(401).send(err); return; }
            db.emailverification.destroy({id: code.id });
            res.send('Your account has now been verified');
          });
        })
    });

    //USER DELETE BY EMAIL
    app.post('/api/user/delete', security.isAuthenticated, function(req, res) {
      if (req.body.email === undefined){
        res.statusMessage = 'No data sent';
        res.status(401);
        return;
      }

      //get user by email
      db.users.where("email=$1", [req.body.email], function(err,users){
        if (users.length > 0) {
          db.users.destroy({email: req.body.email}, function(err, user){
            res.send('User deleted');
          });
        } else {
          res.statusMessage = 'User does not exist';
          res.status(401);
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
    app.all('/api/user/loggedin', function(req, res){
      res.send({token : `${req.user.token}`});
    });

    //USER UNAUTHORIZED
    app.all ('/api/user/unauthorized', function(req, res){
      res.status(401).send('Unauthorized');
    });

    //USER ROLES
    app.post('/api/user/roles', security.isAuthenticated, function(req, res) {
      if (req.body.userid === undefined) return res.status(401).send('No data sent');

      var onlyAdmins = security.onlyAdminsPromise(req, res);

      var p3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "foo");
      });

      Promise.all([onlyAdmins, p3]).then(values => {
        res.send(values);
      });
    });

    app.post('/api/user/getfromtoken', function(req, res){
      let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.token;
      if (!token) return res.status(401).json({ message: 'No token' });

      let user = security.getUserFromToken(token);
      res.send({user: user, token: token });
      // if (!user.email) res.send({user: user, token: token });
    });

  };
