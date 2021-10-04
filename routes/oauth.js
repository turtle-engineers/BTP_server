const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;
const models = require('../models');

require('dotenv').config();

passport.use('kakao', new KakaoStrategy({
    clientID: process.env.KAKAO_REST_API,
    callbackURL: 'http://localhost:3000/oauth/kakao/callback',     // Redirect URI
  }, async (accessToken, refreshToken, profile, done) => {
    models.User.create({
      Name: profile.username,
      Prvider: profile.provider,
      PrviderId: profile.id
    }).then(_ => console.log("Data is created!"));
    
}))

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {  failureRedirect: '/',}), (res, req) => {
  res.redirect('/');
});

module.exports = router;