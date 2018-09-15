const express = require('express');
const { applyMiddlewares } = require('./middlewares');

const app = express();

applyMiddlewares(app);

app.set('views', './template');
app.set('view engine', 'pug');

app.listen(3000, function () {
  console.log('Loftschool Node.js HW3 — Express.js app listening on port 3000!');
});