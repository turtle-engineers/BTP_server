const models = require("../../models");
const errors = require("../errors/errors");
const moment = require("moment");

module.exports = async (req, res) => {
  if (!req.user) {
    res.status(200).json({
      result: "FAIL",
      resultcode: "-100",
      message: "로그인하지 않은 유저",
    });
    return;
  }
  try {
    // 유저 알람정보 조회
    let userInfo = req.user;
    let stretchNotification = await models.StretchNotification.findOne({
      where: {
        userId: userInfo.id,
      },
    });
    let userNotiList = {};
    let days = Number(stretchNotification.dataValues.day).toString(2);
    while (days.length < 7) days = "0" + days;
    userNotiList.day = days;
    userNotiList.valid = stretchNotification.dataValues.valid;
    userNotiList.startTime = stretchNotification.dataValues.startTime;
    userNotiList.endTime = stretchNotification.dataValues.endTime;
    // console.log(stretchNotification)
    res.status(200).json({
      result: "OK",
      resultcode: "0",
      message: "사용자 알람 정보 조회",
      results: userNotiList,
    });
    return;
  } catch (error) {
    errors(res, error, "유저");
    return;
  }
};
