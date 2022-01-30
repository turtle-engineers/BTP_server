const models = require("../../models");
const errors = require("../errors/errors");
const fs = require('fs');

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
        if (!req.files) {
            res.send({
                status: false,
                message: '파일 업로드 실패'
            });
        } else {
            let f = req.files.uploadFile;
            let randomNum = Math.floor(Math.random()*1000);
            f.mv('./upload/' + userInfo.id +'_'+ randomNum +'_'+ f.name);
            try {
                let arr = userInfo.picture.split('/');
                let imageName = arr[arr.length-1];
                // console.log(imageName)
                fs.statSync("./upload/"+imageName);
                fs.unlinkSync("./upload/"+imageName)
              } catch (error) {
                                
              }
            await models.User.update(
                {
                    picture: 'http://localhost:3000/profile/' + userInfo.id +'_'+ randomNum+"_"+f.name
                },
                {
                    where: {
                        id: userInfo.id
                    }
                }
            ).then(()=>{
                res.status(200).json({
                    "result": "OK",
                    "resultcode": "0",
                    "message": "파일이 업로드 되었습니다.",
                    "data": {
                        "name": userInfo.id +'_'+ randomNum+"_"+f.name,
                        "size": f.size+" byte"
                    }
                });
            })
        }
    } catch (error) {
        errors(res, error, "유저");
        return;
    };
};
