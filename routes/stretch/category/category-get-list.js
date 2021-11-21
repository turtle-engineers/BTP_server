const models = require("../../../models");
const errors = require("../../errors/errors");

module.exports = async (req, res) => {
    try {
        const results = await models.StretchCategory.findAll({
            attributes: ['id', 'title'],
            where: {
                valid: true
            }
        });

        if(results === null) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-100",
                "message": "카테고리가 비어있습니다."
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
        errors(res, error, "카테고리 목록");
        return;
    };
};
