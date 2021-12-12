const express = require('express');
const router = express.Router();

const notificationGetFull = require('./notification-get-full');
const notificationSetValid = require('./notification-set-valid');
const notificationSetDay = require('./notification-set-day');
const notificationSetStartTime = require('./notification-set-start-time');
const notificationSetEndTime = require('./notification-set-end-time');
const notificationSetRepeatTime = require('./notification-set-repeat-time');
const notificationSetRepeatCount = require('./notification-set-repeat-count');

router.get('/full', function (req, res, next) {
    notificationGetFull(req, res);
});
router.post('/valid', function (req, res, next) {
    notificationSetValid(req, res);
});
router.post('/day', function (req, res, next) {
    notificationSetDay(req, res);
});
router.post('/start-time', function (req, res, next) {
    notificationSetStartTime(req, res);
});
router.post('/end-time', function (req, res, next) {
    notificationSetEndTime(req, res);
});
router.post('/repeat-time', function (req, res, next) {
    notificationSetRepeatTime(req, res);
});
router.post('/repeat-count', function (req, res, next) {
    notificationSetRepeatCount(req, res);
});

module.exports = router;
