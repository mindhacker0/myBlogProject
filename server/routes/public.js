var express = require('express');
var Public = require('../controller/public');
var router = express.Router();

router.get('/getUserRoute',Public.getUserRoute);
module.exports = router;
