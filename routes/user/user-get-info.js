const models = require("../../models");
const errors = require("../errors/errors");

module.exports = async (req, res) => {
    if(!req.user) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "로그인하지 않은 유저"
        });
        return;
    };
    try {
        
        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": "",
            "results": req.user
        });
        return;
    } catch (error) {
        errors(res, error, "유저");
        return;
    };
};
