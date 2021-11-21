const express = require('express');
const router = express.Router();

const contentsAdd = require('./contents-add');
const contentsDelete = require('./contents-delete');
const contentsGetTitle = require('./contents-get-title');
const contentsGetList = require('./contents-get-list')
const contentsGetPlaytime = require('./contents-get-playtime');
const contentsGetDescription = require('./contents-get-description');

router.post('/add', function (req, res, next) {
    contentsAdd(req, res);
});
router.post('/delete', function (req, res, next) {
    contentsDelete(req, res);
});
router.get('/title', function (req, res, next) {
    contentsGetTitle(req, res);
});
router.get('/list', function (req, res, next) {
    contentsGetList(req, res);
});
router.get('/playtime', function (req, res, next) {
    contentsGetPlaytime(req, res);
});
router.get('/description', function (req, res, next) {
    contentsGetDescription(req, res);
});

module.exports = router;
