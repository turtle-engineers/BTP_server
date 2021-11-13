var express = require('express');
var router = express.Router();
const passport = require('passport')
// const KakaoStrategy = require('passport-kakao').Strategy


router.get('/kakao', passport.authenticate('kakao'));

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://127.0.0.1:3000')
  }
)

router.get('/logout', function (req, res) {
    delete req.session.passport;//세션 삭제
    req.session.save(function () {//데이터 저장이 끝났을때 호출됨 안전하게 redirect하기 위함
      res.redirect('/');
    });
  });

module.exports = router;