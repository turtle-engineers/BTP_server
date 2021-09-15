const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;

require('dotenv').config();

passport.use('kakao', new KakaoStrategy({
    clientID: process.env.KAKAO_REST_API,
    callbackURL: '/oauth/kakao/callback',     // 위에서 설정한 Redirect URI
  }, async (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    console.log(accessToken);
    console.log(refreshToken);
}))


router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (res, req) => {
  res.redirect('/oauth');
});

module.exports = router;