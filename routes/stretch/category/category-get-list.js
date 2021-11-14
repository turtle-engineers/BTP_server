const models = require("../../../models");

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
                "resultcode": "-2",
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
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-1",
            "message": `데이터베이스에서 오류가 발생하였습니다. (MariaDB Error Code: ${error.original.errno}`
        });
        console.log("LOG: FAIL: Fail to Invalid Category.\n");
        console.log(error);
    };
};
