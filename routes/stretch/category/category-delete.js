const MAX_LENGTH = 20;
const models = require("../../../models");
// const JSON = require("json");

module.exports = async (req, res) => {
    if(!req.body.id) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-1",
            "message": "카테고리 ID가 필요합니다."
        });
        return;
    }
    try {
        const results = await models.StretchCategory.findOne({
            attributes: ['valid'],
            where: {
                id: req.body.id
            }
        });
        if(results.valid) {
            try {

            } catch (error) {

            }
        }
    } catch (error) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-3",
            "message": "데이터베이스에서 삽입에 실패하였습니다."
        });
        console.log("LOG: FAIL: Fail to Insert Category.\n");
        console.log(error);
    };
};
