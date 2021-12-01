const express = require('express');
const router = express.Router();

const userGetInfo = require('./user-get-info');
const userPostInfo = require('./user-post-info');
// const userPostProfile = require('./user-post-profile');
const userGetCalendar = require('./user-get-calendar');

// 사용자 정보 조회
router.get('/info', function (req, res, next) {
    userGetInfo(req, res);
});

// 사용자 정보 수정
router.post('/info', function (req, res, next) {
    userPostInfo(req, res);    
})

// 사용자 사진 수정
// router.post('/picture', function (req, res, next) {
//     userPostProfile(req, res);    
// })

// 사용자 달력 조회 
router.get('/cal/:yyyymm', function (req, res, next) {
    userGetCalendar(req, res);
});

// 사용자 이력 업데이트(운동 완료 시)
module.exports = router;
