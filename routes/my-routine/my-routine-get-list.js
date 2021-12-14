const models = require("../../models");
const errors = require("../errors/errors");

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
        const results = await models.MyRoutine.findAll({
            attributes: ['StretchContentId', 'repeatCount'],
            where: {
                UserId: req.query.userId,
            },
            order: ['contentsOrder']
        });

        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": "",
            "results": results
        });
        return;
    } catch (error) {
        errors(res, error, "마이루틴 조회");
        return;
    };
};
