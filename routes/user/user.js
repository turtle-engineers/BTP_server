const express = require('express');
const router = express.Router();

const userGetInfo = require('./user-get-info');

router.get('/info', function (req, res, next) {
    userGetInfo(req, res);
});

module.exports = router;
