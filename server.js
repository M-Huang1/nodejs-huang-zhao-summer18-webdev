var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_cc1z6j8v:8dp4960g47d0srnkaco5sfl73h@ds163480.mlab.com:63480/heroku_cc1z6j8v');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});



var idleTimeoutSeconds = 1800;
var session = require('express-session');
app.use(session({
  resave: true,
  rolling: true,
  saveUninitialized: true,
  secret: 'any string',
  cookie: {
    maxAge: idleTimeoutSeconds * 1000
  }
}));




app.get('/api/session/set/:name/:value',
  setSession);
app.get('/api/session/get/:name',
  getSession);
// app.get('/api/session/get',
//   getSessionAll);
// app.get('/api/session/reset',
//   resetSession);

function setSession(req, res) {
  var name = req.params['name'];
  var value = req.params['value'];
  req.session[name] = value;
  res.send(req.session);
}

function getSession(req, res) {
  var name = req.params['name'];
  var value = req.session[name];
  res.send(value);
}

require('./services/user.service.server')(app);
require('./services/section.service.server')(app);
require('./services/enrollment.service.server')(app);
app.listen(4000);
