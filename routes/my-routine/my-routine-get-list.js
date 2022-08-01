const models = require("../../models");
const errors = require("../errors/errors");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
    const myRoutineList = await models.MyRoutine.findAll({
      attributes: [
        "contentsOrder",
        "StretchContentId",
        "repeatCount",
        [Sequelize.col("StretchContent.id"), "id"],
        [Sequelize.col("StretchContent.title"), "title"],
        [Sequelize.col("StretchContent.description"), "description"],
        [Sequelize.col("StretchContent.play_time"), "playTime"],
        [Sequelize.col("StretchContent.image_url"), "imgUrl"],
        [Sequelize.col("StretchContent.video_url"), "videoUrl"],
        [Sequelize.col("StretchContent.stretch_category_id"), "stretchCategoryId"],
      ],
      where: {
        UserId: req.user.id,
      },
      include: [
        {
          model: models.StretchContents,
          attributes: [],
        },
      ],
      order: ["contentsOrder"],
      raw: true,
    });

    // console.log(myRoutineList);

    let repeatCounts = getFields(myRoutineList, "repeatCount");
    let playTimes = getFields(myRoutineList, "playTime");
    let totalTime = 0;

    for (const key in myRoutineList) {
      totalTime += repeatCounts[key] * playTimes[key];
      myRoutineList[key].playTimes = repeatCounts[key] * playTimes[key];
    }
    // console.log(repeatCounts);
    // console.log(playTimes);
    // console.log(totalTime);
    let results = {};
    results.myRoutineList = myRoutineList;
    results.totalTimeMin = parseInt(totalTime / 60);
    results.totalTimeSec = totalTime % 60;
    results.listLen = myRoutineList.length;

    console.log(results);

    res.status(200).json({
      result: "OK",
      resultcode: "0",
      message: "",
      results: results,
    });
    return;

    //functions
    function getFields(object, col) {
      var output = [];
      for (let i = 0; i < object.length; i++) {
        output.push(object[i][col]);
      }
      return output;
    }
  } catch (error) {
    errors(res, error, "마이루틴 조회");
    return;
  }
};
