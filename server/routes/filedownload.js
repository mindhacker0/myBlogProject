const express = require('express');
var FileDownLoad  = require('../controller/filedownload');
var router = express.Router();

router.get('((\/[^\/]+)+)',FileDownLoad.downloadFile);
module.exports = router;
