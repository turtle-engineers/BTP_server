const models = require("../../../models");
const errors = require("../../errors/errors");

module.exports = async (req, res) => {
    if(!req.query.cid) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "카테고리 ID가 필요합니다."
        });
        return;
    };

    try {
        const results = await models.StretchContents.findAll({
            attributes: ['id', 'title', 'image_url', 'video_url'],
            where: {
                StretchCategoryId: req.query.cid,
                valid: true
            }
        });

        if(results === null) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-101",
                "message": "컨텐츠가 비어있습니다."
            });
            return;
        };

        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": "",
            "results": results
        });
        return;
    } catch (error) {
        errors(res, error, "컨텐츠 리스트");
        return;
    };
};
