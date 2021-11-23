module.exports = function (app) {
    const passport = require('passport');
    const KakaoStrategy = require('passport-kakao').Strategy;
    const models = require("../models/index.js");

    app.use(passport.initialize());
    app.use(passport.session());

    // 로그인 시 세션 처리 콜백 코드
    passport.serializeUser(function (user, done) {
        // console.log('serializer------------------');
        done(null, user.id);
    });
    // 화면 이동 시 세션 처리
    passport.deserializeUser(async (userId, done) => {
        // console.log('deserializer------------------');
        try {
            let user = await models.User.findOne({
                where: {
                    id: userId
                }
            });
            if (!user) {
                return done(new Error('login required!!!'));
            }
            return done(null, user);
        } catch (error) {
            console.error(error);
            return done(error);
        }
    });

    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_REST_API,
        callbackURL: 'http://127.0.0.1:3000/oauth/kakao/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            // 사용자의 정보는 profile에 들어있다.
        console.log(profile);
            await models.User.findOrCreate({
                where: {
                    provider: profile.provider,
                    provider_id: profile.id
                },
                defaults: {
                    Provider: profile.provider,
                    ProviderId: profile.id,
                    Picture: profile._json.properties.profile_image,
                    NickName: profile.id
                }
            }).then((user, create) => {
                return done(null, user[0].dataValues)
            })
        }));

    return passport;
}