const models = require("../../models");
const errors = require("../errors/errors");

module.exports = async (req, res) => {
    if(!req.body.userId) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "사용자 ID가 필요합니다."
        });
        return;
    };

    if(!req.body.stretchContentId) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-101",
            "message": "컨텐츠 ID가 필요합니다."
        });
        return;
    };

    try {
        const results = await models.Bookmark.findOne({
            attributes: ['id'],
            where: {
                UserId: req.body.userId,
                StretchContentId: req.body.stretchContentId
            }
        });

        if(results !== null) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-102",
                "message": "북마크가 이미 추가되어 있습니다."
            });
            return;
        };

        await models.Bookmark.create({
            UserId: req.body.userId,
            StretchContentId: req.body.stretchContentId,
        });
        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": ""
        });
        return;
    } catch (error) {
        errors(res, error, "북마크");
        return;
    };
};
