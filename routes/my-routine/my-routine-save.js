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

    if (!req.body.stretchContentId) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-101",
            "message": "컨텐츠 ID가 필요합니다."
        });
        return;
    }

    if (!req.body.repeatCount) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-102",
            "message": "반복 횟수가 필요합니다."
        });
        return;
    }

    if (req.body.stretchContentId.length != req.body.repeatCount.length) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-103",
            "message": "컨텐츠 ID 와 반복 횟수 간 갯수가 상이합니다."
        });
        return;
    }

    try {
        await models.MyRoutine.destroy({
            where: {
                UserId: req.body.userId
            }
        });

        for (i = 0; i < req.body.stretchContentId.length; i++) {
            await models.MyRoutine.create({
                UserId: req.body.userId,
                contentsOrder: i,
                StretchContentId: req.body.stretchContentId[i],
                repeatCount: req.body.repeatCount[i]
            });
        }

        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": ""
        });
        return;
    } catch (error) {
        errors(res, error, "마이루틴 저장");
        return;
    }
};
