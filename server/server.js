let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data

let passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;

let cookieParser = require('cookie-parser');
let session = require('express-session');

recursiveRoutes('./server/', app);

app.use(cookieParser());

//passport.js stuff
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

import recursiveRoutes from './../recursive-routes.js';

app.get('/', function(req, res) {
    res.send('Hello world');
});

let server = app.listen(3000, function() {
    console.log('Express is listening to http://localhost:3000');
});

module.exports = server;
