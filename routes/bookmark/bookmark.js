const express = require('express');
const router = express.Router();

const bookmarkAdd = require('./bookmark-add');
const bookmarkDelete = require('./bookmark-delete');
const bookmarkValid = require('./bookmark-valid');
const bookmarkGetList = require('./bookmark-get-list')

router.post('/add', function (req, res, next) {
    bookmarkAdd(req, res);
});
router.post('/delete', function (req, res, next) {
    bookmarkDelete(req, res);
});
router.get('/valid', function (req, res, next) {
    bookmarkValid(req, res);
});
router.get('/list', function (req, res, next) {
    bookmarkGetList(req, res);
});

module.exports = router;
