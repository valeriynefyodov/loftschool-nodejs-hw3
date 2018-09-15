const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./router');

function applyMiddlewares(app) {
  app.use(express.static(__dirname + "/public"));
  app.use(cookieParser('keyboard cat'));
  app.use(session({ cookie: { maxAge: 60000 }}));

  app.use('/', router);
}

module.exports = {
  applyMiddlewares: applyMiddlewares
}