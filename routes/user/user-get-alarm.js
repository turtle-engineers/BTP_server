const models = require("../../models");
const errors = require("../errors/errors");
const moment = require('moment');

module.exports = async (req, res) => {
    if(!req.user) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "로그인하지 않은 유저"
        });
        return;
    };
    try {        
        // 유저 알람정보 조회
        let userInfo = req.user;
        let userAlarm = userInfo.alarm;
        let stretchNotification = await models.StretchNotification.findAll({
            where: {
                userId: userInfo.id
            },
            order: [
                ['day', 'ASC']
            ]
        });
        let userNotiList = {};
        let days = {};
        userNotiList.alarmOn = userAlarm;
        userNotiList.startTime = stretchNotification[0].dataValues.startTime;
        userNotiList.endTime = stretchNotification[0].dataValues.endTime;
        // console.log(stretchNotification)
        for (let index = 1; index < stretchNotification.length; index++) {
            days[stretchNotification[index].dataValues.day] = stretchNotification[index].dataValues.valid;
        }
        userNotiList.days = days;
        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": "사용자 정보 조회",
            "results": userNotiList
        });
        return;
    } catch (error) {
        errors(res, error, "유저");
        return;
    };
};
