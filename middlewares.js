const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

function applyMiddlewares(app) {
  app.use(express.static(__dirname + "/public"));
  app.use(cookieParser('keyboard cat'));
  app.use(session({ cookie: { maxAge: 60000 }}));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(flash());
}

module.exports = {
  applyMiddlewares: applyMiddlewares
}