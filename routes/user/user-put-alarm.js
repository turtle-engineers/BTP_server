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
        let userInfo = req.user;
        let stretchNotification = await models.StretchNotification.findOne({
            where: {
                userId: userInfo.id
            }
        });

        if (req.body.day) {
            stretchNotification.dataValues.day = parseInt(req.body.day,2);
        }
        if (req.body.valid) {
            stretchNotification.dataValues.valid = req.body.valid;
        }
        if (req.body.startTime) {
            stretchNotification.dataValues.startTime = req.body.startTime;
        }
        if (req.body.endTime) {
            stretchNotification.dataValues.endTime = req.body.endTime;
        }
        if(parseInt(stretchNotification.dataValues.endTime)<parseInt(stretchNotification.dataValues.startTime)) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-200",
                "message": "알람 종료 시간이 시작 시간보다 빠름."
            });
            return;
        };
        await models.StretchNotification.update(
            { 
                day: stretchNotification.dataValues.day, 
                valid: stretchNotification.dataValues.valid,
                startTime: stretchNotification.dataValues.startTime,
                endTime: stretchNotification.dataValues.endTime
            },
            {
                where: {
                    userId: userInfo.id
                }
            }
        ).then(()=>{
            res.status(200).json({
                "result": "OK",
                "resultcode": "0",
                "message": "사용자 알람 정보 수정 완료"
            });
        })
        return;
    } catch (error) {
        errors(res, error, "유저");
        return;
    };
};
