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
    var yyyymm = req.params.yyyymm;
    var yyyy = parseInt(yyyymm.substr(0,4));
    var mm = parseInt(yyyymm.substr(4,2));
    console.log(mm)
    if (mm<1 || mm>12) {        
        res.status(200).json({
            "result": "FAIL",
            "resultcode": "-200",
            "message": "유효하지 않은 월 선택"
        });
        return;
    }
    try {  
        let calendarInfo = {};
        let userHistoryCalendar = await models.UserHistory.findAll({
            where: {
                userId: req.user.id,
                yyyy: yyyy,
                mm: mm
            },
            attributes: ['dd']
        });
        let userHistoryArray = [];
        for (let index = 0; index < userHistoryCalendar.length; index++) {
            userHistoryArray.push(userHistoryCalendar[index].dataValues.dd)
            
        }   
        calendarInfo.monthTimes = userHistoryCalendar.length;
        calendarInfo.dd = userHistoryArray;
        res.status(200).json({
            "result": "OK",
            "resultcode": "0",
            "message": "",
            "results": calendarInfo
        });
        return;
    } catch (error) {
        errors(res, error, "유저");
        return;
    };
};
