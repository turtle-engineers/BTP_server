const models = require("../../models");
const errors = require("../errors/errors");

module.exports = async (req, res) => {
    if (!req.body.userId) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "사용자 ID가 필요합니다."
        });
        return;
    }

    if (!req.body.value) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "설정값이 필요합니다."
        });
        return;
    }

    try {
        await models.StretchNotification.update({
            repeatCount: req.body.value
        }, {
            where: {
                UserId: req.body.userId
            }
        });

        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": "",
        });
        return;
    } catch (error) {
        errors(res, error, "알림 전체 조회");
        return;
    }
};
