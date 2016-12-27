const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const webpack = require('webpack');
const config = require('./webpack.config.development.js');
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data

const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
require('./common/passport.js')(passport);

const cookieParser = require('cookie-parser');
const session = require('express-session');

//passport.js stuff
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/:page', function(req, res) {
  res.sendFile(path.join(__dirname, './client/index.html'));
});
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.use('/static', express.static( __dirname + '/client/styles/bootstrap/js'));
app.use('/static', express.static( __dirname + '/client/assets'));

import recursiveRoutes from './recursive-routes.js';
recursiveRoutes('./server/', app, passport);

app.use(cookieParser());



let server = app.listen(3000, function(err) {
    if (err) console.log(err);
    console.log('Express is listening to http://localhost:3000');
});

module.exports = server;
