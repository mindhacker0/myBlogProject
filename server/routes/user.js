var express = require('express');
var router = express.Router();
var User = require('../controller/user');
router.get('/login',User.userLogin);
router.get('/getUserInfo',User.getUserInfo);
module.exports = router;
