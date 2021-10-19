var express = require('express');
var Home  = require('../controller/home');
var router = express.Router();

router.post('/getList',Home.getList);
module.exports = router;
