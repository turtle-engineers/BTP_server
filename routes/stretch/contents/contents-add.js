const models = require("../../../models");
const errors = require("../../errors/errors");

module.exports = async (req, res) => {
    if(!req.body.stretchCategoryId) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "카테고리 ID가 필요합니다."
        });
        return;
    };

    if(!req.body.title) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-101",
            "message": "컨텐츠 제목이 필요합니다."
        });
        return;
    };

    if(!req.body.playTime) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-102",
            "message": "재생시간이 필요합니다."
        });
        return;
    };

    if(!req.body.description) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-103",
            "message": "상세설명이 필요합니다."
        });
        return;
    };

    try {
        await models.StretchContents.create({
            StretchCategoryId: req.body.stretchCategoryId,
            title: req.body.title,
            valid: true,
            playTime: req.body.playTime,
            description: req.body.description
        });
        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": ""
        });
        return;
    } catch (error) {
        errors(res, error, "컨텐츠명");
        return;
    };
};
