const models = require("../../models");
const errors = require("../errors/errors");

const defaultValid = false
const defaultDay = 62 // 기본값: 월-금 ON
const defaultStartTime = '0900'
const defaultEndTime = '1800'
const defaultRepeatTime = '0100'
const defaultRepeatCount = 1

module.exports = async (req, res) => {
    if(!req.query.userId) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "사용자 ID가 필요합니다."
        });
        return;
    };

    try {
        const results = await models.StretchNotification.findAll({
            attributes: ['valid', 'day', 'startTime', 'endTime', 'repeatTime', 'repeatCount'],
            where: {
                UserId: req.query.userId
            },
        });

        if (results.length == 0) {
            await models.StretchNotification.create({
                UserId: req.query.userId,
                valid: defaultValid,
                day: defaultDay,
                startTime: defaultStartTime,
                endTime: defaultEndTime,
                repeatTime: defaultRepeatTime,
                repeatCount: defaultRepeatCount
            });

            res.status(200).json({
                "result": "OK",
                "resultcode": "0",
                "message": "초기 알람이 생성되었습니다.",
                "results": results
            });
            return;
        }

        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": "",
            "results": results
        });
        return;
    } catch (error) {
        errors(res, error, "알림 전체 조회");
        return;
    };
};
