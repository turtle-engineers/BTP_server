const models = require("../../models");
const errors = require("../errors/errors");
const moment = require('moment');

module.exports = async (req, res) => {
    if(!req.user) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-100",
            "message": "로그인하지 않은 유저"
        });
        return;
    };
    if(!req.body.newNickname) {
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-200",
            "message": "닉네임을 설정해야 합니다."
        });
        return;
    };
    try {        
        // 유저 정보 수정
        let userInfo = req.body.newNickname;
        await models.User.update(
            {
                nickname: req.body.newNickname
            },
            {
                where: {
                    id: req.user.id
                }
            }
        ).then(()=>{
            res.status(200).json({
                "result": "OK",
                "resultcode": "0",
                "message": "사용자 정보 수정 완료"
            });
        })
        return;
    } catch (error) {
        errors(res, error, "유저");
        return;
    };
};
