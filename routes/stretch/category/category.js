const express = require('express');
const router = express.Router();

const categoryAdd = require('./category-add');
const categoryDelete = require ('./category-delete');

router.post('/add', function (req, res, next) {
    categoryAdd(req, res);
});
router.post('/delete', function (req, res, next) {
    categoryDelete(req, res);
})


module.exports = router;
