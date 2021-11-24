const express = require('express');
const router = express.Router();

const userGetInfo = require('./user-get-info');
const userGetCalendar = require('./user-get-calendar');

router.get('/info', function (req, res, next) {
    userGetInfo(req, res);
});

router.get('/cal/:yyyymm', function (req, res, next) {
    userGetCalendar(req, res);
});
module.exports = router;
