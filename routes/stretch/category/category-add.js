const models = require("../../../models");
const errors = require("../../errors/errors");

module.exports = async (req, res) => {
    if(!req.body.title) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "카테고리 제목이 필요합니다."
        });
        return;
    };

    try {
        await models.StretchCategory.create({
            title: req.body.title
        });
        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": ""
        });
        return;
    } catch (error) {
        errors(res, error, "카테고리명");
        return;
    };
};
