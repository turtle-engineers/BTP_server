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
    try {  
        let userInfo = req.user;
        let today = moment();
        let yyyy = today.format('YYYY');
        let mm = today.format('MM');
        let dd = today.format('DD');
        let userHistory = await models.UserHistory.findOrCreate({
            where: {
                userId: userInfo.id,
                yyyy: yyyy,
                mm: mm,
                dd: dd
            },
            defaults: {
                userId: userInfo.id,
                yyyy: yyyy,
                mm: mm,
                dd: dd
            }
        });
        if (!userHistory) {
            res.status(200).json({
                "result": "FAIL",
                "resultcode": "-200",
                "message": "사용자 정보가 없습니다."
            });
            return;
        }
        userHistory = userHistory[0].dataValues;
        // console.log(userHistory);
        await models.UserHistory.update(
            {
                times: userHistory.times+1
            },
            {
                where: {
                    userId: userHistory.userId,
                    yyyy: userHistory.yyyy,
                    mm: userHistory.mm,
                    dd: userHistory.dd
                }
            }
        ).then(()=>{
            res.status(200).json({
                "result": "OK",
                "resultcode": "0",
                "message": "사용자 시청 이력 업데이트 완료"
            });
        })
        return;
    } catch (error) {
        errors(res, error, "유저");
        return;
    };
};
