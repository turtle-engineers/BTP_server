const express = require('express');
const router = express.Router();

const myRoutineSave = require('./my-routine-save');
const myRoutineGetList = require('./my-routine-get-list')

router.post('/save', function (req, res, next) {
    myRoutineSave(req, res);
});
router.get('/list', function (req, res, next) {
    myRoutineGetList(req, res);
});

module.exports = router;
