var express = require('express');
var router = express.Router();
var session = require('express-session');

module.exports = function (passport) {

  router.get('/kakao',
    passport.authenticate('kakao'));

  router.get('/kakao/callback',
    passport.authenticate('kakao',
      { failureRedirect: '/oauth/kakao' }
    ),
    (req, res) => {
      req.session.save(function () {
        res.status(200).json({
          "result": "OK",
          "resultcode": "0",
          "message": req.session.id
        });
        return;
      })
    }
  )

  router.get('/logout', async function (req, res) {
    try {
      if (req.session.passport) {
        req.session.destroy(await function () {
          req.session;
        });
        res.status(200).json({
          "result": "OK",
          "resultcode": "0",
          "message": "로그아웃 완료"
        });
      } else {
        res.status(200).json({
          "result": "FAIL",
          "resultcode": "-1",
          "message": "로그인 하지 않은 유저"
        });
      }
      return;
    } catch (err) {
      res.status(200).json({
        "result": "FAIL",
        "resultcode": "-2",
        "message": err
      });
    }
  });

  return router;
}
