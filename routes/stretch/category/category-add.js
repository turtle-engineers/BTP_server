const models = require("../../../models");

const ER_DATA_TOO_LONG = 1406;
const ER_DUP_ENTRY = 1062;

module.exports = async (req, res) => {
    if(!req.body.title) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-2",
            "message": "카테고리 제목이 필요합니다."
        });
        return;
    };

    try {
        await models.StretchCategory.create({
            title: req.body.title
        });
        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": ""
        });
        return;
    } catch (error) {

        if(error.original.errno == ER_DUP_ENTRY) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-3",
                "message": "동일한 카테고리명이 이미 존재합니다. (ER_DUP_ENTRY)"
            });
            return;
        };

        if(error.original.errno == ER_DATA_TOO_LONG) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-4",
                "message": "카테고리명의 최대 길이를 벗어났습니다. (ER_DATA_TOO_LONG)"
            });
            return;
        };

        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-1",
            "message": `데이터베이스에서 오류가 발생하였습니다. (MariaDB Error Code: ${error.original.errno}`
        });
        console.log("LOG: FAIL: Fail to Insert Category.\n");
        console.log(error);
        return;
    };
};
