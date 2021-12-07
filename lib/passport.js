module.exports = function (app) {
    const passport = require('passport');
    const KakaoStrategy = require('passport-kakao').Strategy;
    const models = require("../models/index.js");
    const moment = require('moment');
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

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
            return done(null, user.dataValues);
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
        //  console.log(profile);
            await models.User.findOrCreate({
                where: {
                    provider: profile.provider,
                    provider_id: profile.id
                },
                defaults: {
                    provider: profile.provider,
                    providerId: profile.id,
                    picture: profile._json.properties.profile_image,
                    nickname: profile._json.properties.nickname
                }
            }).then(async (arr) => { 
                // console.log("------------------"+arr);
                let userInfo = arr[0].dataValues;
                let create = arr[1];
                // console.dir(user);
                // console.dir(userInfo);
                let noti = await models.StretchNotification.findOne({
                    where: {
                        user_id: userInfo.id
                    }
                });
                // console.dir(noti);
                if (create || (!noti)) {
                    //000 001 010 011 100 101 110 111
                    await models.StretchNotification.bulkCreate([
                    {   day: 0, valid: 1, startTime: 8, endTime: 17, userId: userInfo.id    },
                    {   day: 1, valid: 1, userId: userInfo.id    },
                    {   day: 2, valid: 1, userId: userInfo.id    },
                    {   day: 3, valid: 1, userId: userInfo.id    },
                    {   day: 4, valid: 1, userId: userInfo.id    },
                    {   day: 5, valid: 1, userId: userInfo.id    },
                    {   day: 6, valid: 0, userId: userInfo.id    },
                    {   day: 7, valid: 0, userId: userInfo.id    }
                ]);
                }
                // console.log(user);     
                let today = moment();
                let yyyy = today.format('YYYY');
                let mm = today.format('MM');
                let dd = today.format('DD');
                await models.UserHistory.findOrCreate({
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
                let needGoal = await models.TodayGoal.findOne({
                    where: {
                        user_id: userInfo.id,
                        goaldate: new Date(yyyy+'-'+mm+'-'+dd)
                    }
                });
                //console.log(needGoal);

                //난수 발생해서 goalid 지정하기
                if (!needGoal) {
                    await models.TodayGoal.bulkCreate([{
                        GoalId: 1,
                        UserId: userInfo.id,
                            goaldate: yyyy+'-'+mm+'-'+dd,
                            finish: 0 
                    },
                    {
                        GoalId: 2,
                        UserId: userInfo.id,
                            goaldate: yyyy+'-'+mm+'-'+dd,
                            finish: 0 
                    },
                    {
                        GoalId: 3,
                        UserId: userInfo.id,
                            goaldate: yyyy+'-'+mm+'-'+dd,
                            finish: 0 
                    }
                ]);
                }
                return done(null, userInfo)
            })
        }));

    return passport;
}