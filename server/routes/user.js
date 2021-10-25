var express = require('express');
var router = express.Router();
var User = require('../controller/user');
router.get('/login',User.userLogin);
module.exports = router;
