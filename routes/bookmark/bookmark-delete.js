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
        const results = await models.Bookmark.destroy({
            where: {
                UserId: req.body.userId,
                StretchContentId: req.body.stretchContentId
            }
        });

        if(results == 0) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-102",
                "message": "해당 북마크가 존재하지 않습니다."
            });
            return;
        }

        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": `${results}개 북마크가 삭제되었습니다.`
        });
        return;
    } catch (error) {
        errors(res, error, "컨텐츠명");
        return;
    };
};
