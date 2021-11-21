const models = require("../../../models");
const errors = require("../../errors/errors");

module.exports = async (req, res) => {
    if(!req.query.id) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "컨텐츠 ID가 필요합니다."
        });
        return;
    };
    try {
        const results = await models.StretchContents.findOne({
            attributes: ['title'],
            where: {
                id: req.query.id
            }
        });

        if(results === null) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-101",
                "message": "해당 컨텐츠를 찾을 수 없습니다."
            });
            return;
        };

        if(results.valid === false) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-102",
                "message": "해당 컨텐츠는 비활성화 상태입니다."
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
        errors(res, error, "컨텐츠명");
        return;
    };
};
