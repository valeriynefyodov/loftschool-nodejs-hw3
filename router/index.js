const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');

const { registerGETHandlers } = require('./GETHandlers');
const { registerPOSTHandlers } = require('./POSTHandlers');

const router = express.Router();

// middlewares
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(fileUpload());
router.use(flash());

registerGETHandlers(router);
registerPOSTHandlers(router);

module.exports = router;

