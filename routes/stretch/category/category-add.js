const MAX_LENGTH = 20;
const models = require("../../../models");

module.exports = async (req, res) => {
    if(!req.body.title) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-1",
            "message": "카테고리 제목이 필요합니다."
        });
        return;
    }
    if(req.body.title.length > MAX_LENGTH) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-2",
            "message": `카테고리 제목 길이가 최대 범위 ${MAX_LENGTH}을 벗어났습니다.`
        });
        return;
    }
    try {
        await models.StretchCategory.create({
            title: req.body.title
        });
        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": ""
        });
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
