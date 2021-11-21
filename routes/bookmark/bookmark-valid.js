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

    if(!req.query.cid) {
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
                UserId: req.query.uid,
                StretchContentId: req.query.cid
            }
        });

        if(results === null) {
            res.status(200).json({
                "result": "OK",
                "resultcode": "0",
                "message": "",
                "results": false
            });
            return;
        };

        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": "",
            "results": true
        });
        return;
    } catch (error) {
        errors(res, error, "컨텐츠명");
        return;
    };
};
