const express = require('express');
const { applyMiddlewares } = require('./middlewares');
const { registerGETHandlers } = require('./request-handlers/GETHandlers');
const { registerPOSTHandlers } = require('./request-handlers/POSTHandlers');

const app = express();

applyMiddlewares(app);

app.set('views', './template');
app.set('view engine', 'pug');

registerGETHandlers(app);
registerPOSTHandlers(app);

app.listen(3000, function () {
  console.log('Loftschool Node.js HW3 — Express.js app listening on port 3000!');
});