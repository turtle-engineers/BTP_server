const models = require("../../../models");

module.exports = async (req, res) => {
    if(!req.body.id) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-1",
            "message": "카테고리 ID가 필요합니다."
        });
        return;
    };
    try {
        const results = await models.StretchCategory.findOne({
            attributes: ['title'],
            where: {
                id: req.body.id
            }
        });

        if(results === null) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-2",
                "message": "해당 카테고리를 찾을 수 없습니다."
            });
            return;
        };

        if(results.valid === false) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-3",
                "message": "해당 카테고리는 이미 비활성화 상태입니다."
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
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-3",
            "message": `데이터베이스에서 오류가 발생하였습니다. (MariaDB Error Code: ${error.original.errno}`
        });
        console.log("LOG: FAIL: Fail to Invalid Category.\n");
        console.log(error);
    };
};
