const express = require('express');
const router = express.Router();

const userGetInfo = require('./user-get-info');
const userPostInfo = require('./user-post-info');
// const userPostProfile = require('./user-post-profile');
const userGetCalendar = require('./user-get-calendar');
const userPostCalendar = require('./user-post-calendar');
const userGetAlarm = require('./user-get-alarm');

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

// 사용자 영상 시청 시 달력 정보 업데이트
router.post('/cal', function (req, res, next) {
    userPostCalendar(req, res);
});

// 사용자 알람정보 조회
router.get('/alarm', function (req, res, next) {
    userGetAlarm(req, res);
});

module.exports = router;
