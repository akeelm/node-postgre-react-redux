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

recursiveRoutes('./server/', app, passport);

app.use(cookieParser());

import recursiveRoutes from './recursive-routes.js';

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './client/index.html'));
});

let server = app.listen(3000, function(err) {
    if (err) console.log(err);
    console.log('Express is listening to http://localhost:3000');
});

module.exports = server;
