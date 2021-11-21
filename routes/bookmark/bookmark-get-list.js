const models = require("../../models");
const errors = require("../errors/errors");

module.exports = async (req, res) => {
    if(!req.query.uid) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "사용자 ID가 필요합니다."
        });
        return;
    };

    try {
        const results = await models.Bookmark.findAll({
            attributes: ['StretchContentId'],
            include: [{model: models.StretchContents, attributes: ['title']}],
            where: {
                UserId: req.query.uid,
            }
        });

        if(results === null) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-101",
                "message": "북마크가 비어있습니다."
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
        errors(res, error, "북마크 리스트");
        return;
    };
};
