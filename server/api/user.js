import db from './../../common/database/db';
const bcrypt = require('bcrypt');
import user from './../../common/models/user';
import security from './../../common/security';
import random from './../../common/utils/random';
import VerifyEmailTemplate from './../../common/email/verifyemailtemplate';
import MailSender from './../../common/email/mailsender';
const _ = require('underscore');

module.exports = function(app, passport) {

    //USER REGISTER
    app.post('/api/user/register', (req, res) => {
      if (req.body.email === undefined){
        res.statusMessage = 'No data sent';
        res.status(401);
        res.send();
      }

      //check if email has already been registered
      db.users.where("email=$1", [req.body.email], (err,users) => {
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
        }, (err,inserted) => {
          if (err) { res.status(401).send(err); return; }
          else {
            //save email verification code
            db.emailverification.save({
                userid: inserted.id,
                code: random.randomString(16)
            }, (err, inserted) => {
              //send verification email
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
    app.all('/api/user/verifyemail/:code', (req, res) => {
        if (!req.params.code) {
          res.statusMessage = 'No data sent';
          res.status(401);
          res.send();
          return;
        }

        //check the verification code
        db.emailverification.findOne({code: req.params.code}, (err, code) => {
          if (!code) {
            res.statusMessage = 'Invalid verification code';
            res.status(401);
            res.send();
            return;
          }

          //set user emailverified as true and delete validation entry
          db.users.save({id: code.userid, emailverified: 'true'}, (err) => {
            if (err) { res.status(401).send(err); return; }
            db.emailverification.destroy({id: code.id });
            res.send('Your account has now been verified');
          });
        })
    });

    //USER DELETE BY EMAIL
    app.post('/api/user/delete', security.isAuthenticated, (req, res) => {
      if (req.body.email === undefined){
        res.statusMessage = 'No data sent';
        res.status(401);
        return;
      }

      //get user by email
      db.users.where("email=$1", [req.body.email], (err,users) => {
        if (users.length > 0) {
          db.users.destroy({email: req.body.email}, (err, user) => {
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
    app.all('/api/user/loggedin', (req, res) => {
      try {
        res.send({token : `${req.user.token}`});
      } catch(e) {
        //if we don't have the request, get token from localStorage
        res.send({token: `${localStorage.getItem("token")}`});
      }
    });

    //USER UNAUTHORIZED
    app.all ('/api/user/unauthorized', (req, res) => {
      res.status(401).send('Unauthorized');
    });

    //USER ROLES
    app.post('/api/user/roles', security.isAuthenticated, (req, res) => {
      if (req.body.userid === undefined) return res.status(401).send('No data sent');

      var onlyAdmins = security.onlyAdminsPromise(req, res);

      var p3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "foo");
      });

      Promise.all([onlyAdmins, p3]).then(values => {
        res.send(values);
      });
    });

    //GET USER FROM TOKEN
    app.post('/api/user/getfromtoken', (req, res) => {
      let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.token;
      if (!token) return res.status(401).json({ message: 'No token' });

      let user = security.getUserFromToken(token);
      res.send({user: user, token: token });
    });

    //UPDATE USER
    app.post('/api/user/update', security.isUserValid, (req, res) => {
      //Check user is valid for updating - either admin or same user
      if (_.where(req.user.roles, {'name': 'admin'}).length > 0 ||
          req.body.user.id === req.user.id){

            //if e-mail is changed check it doesn't already exist
            var emailChangedPromise = new Promise((resolve, reject) => {
              if (req.body.user.email !== req.user.email) {
                db.users.findOne({email: req.body.user.email}, (err, user) => {
                  //the e-mail already exists
                  if (user) reject('E-mail already in use');
                  //no existing e-mail, continue
                  resolve();
                });
              } else {
                resolve();
              }
            });

            //if password has been reset hash it
            if (req.body.user.password)
              req.body.user.password = bcrypt.hashSync(req.body.user.password, bcrypt.genSaltSync(8), null);

            emailChangedPromise.then(() => {
              //do the update
              db.users.save(req.body.user, (err,updated) => {
                if (err) { res.status(401).send(err); return; }
                security.refreshToken(updated.email).then((token) => {
                  res.send({user: updated, token: token });
                })
              });
            }).catch((reason) => {
              res.statusMessage = 'A user with this e-mail already exists';
              res.status(401).send(reason);
            })
      }
    });


    //USER FORGOT PASSWORD
    app.post('/api/user/forgotpassword', (req, res) => {
      if (req.body.email === undefined) { res.status(401).send('E-mail address required');}

      //check if user exists
      db.users.findOne({email: req.body.email}, (err, user) => {
        if (err) { res.status(401).send(err); return; }
        if (!user) { res.status(401).send('No user with that e-mail'); return; };

        //check if row already exists
        db.forgotpassword.findOne({userid: user.id}, (err, forgotobj) => {
          if (err) { res.status(401).send(err); return; }
          if(forgotobj) {
            forgotobj.code = random.randomString(16);
          } else {
            forgotobj = {
              userid: user.id,
              code: random.randomString(16)
            }
          }
          //save a forgot password code
          db.forgotpassword.save(forgotobj, (err, inserted) => {
            if (err) { res.status(401).send(err); return; }
            //send password reset email
            MailSender.sendPasswordResetEmail(req.body.email, inserted.code)
            .then((result) => {
              res.statusMessage = 'Instructions to reset the password have been sent to your e-mail address';
              res.send();
            });
          });
        })
      });
    });

    //VALIDATE FORGOT PASSWORD CODE
    app.post('/api/user/validateforgotpasswordcode', (req, res) => {
      if (req.body.code === undefined) { res.status(401).send('No data sent'); }

      //check the forgot password code
      db.forgotpassword.findOne({code: req.body.code}, (err, result) => {
        if (err) { res.status(401).send(err); return; }
        //return the userid
        if (result){
          res.send({userid: result.userid});
        } else {
          res.statusMessage = 'Invalid code';
          res.status(401).send();
        }
      });
    });

    //USER RESET PASSWORD
    app.post('/api/user/resetpassword', (req, res) => {
      if (req.body.code === undefined && req.body.password === undefined) {
        res.status(401).send('No data sent');
      }

      //check the forgot password code
      db.forgotpassword.findOne({code: req.body.code}, (err, result) => {
        if (err) { res.status(401).send(err); return; }
        if (result === undefined) {
          res.statusMessage = "invalid code";
          res.status(401).send();
          return;
        }

        //encrypt the password
        let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);

        //update the password
        db.users.save({id: result.userid, password: password}, (err, user) => {
          if (err) { res.status(401).send(err); return; }
          //delete the code entry
          db.forgotpassword.destroy({code: req.body.code}, (err, result) => {
            if (err) { res.status(401).send(err); return; }
            res.statusMessage = 'Password has been reset';
            res.send();
          })
        })
      })
    });

  };
