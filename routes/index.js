var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 쿠키 생성
  res.cookie('loginCookie','set Cookie');

  
  // 쿠키 읽기
  console.log(req.cookies);
  // 세션 읽기
  console.log(req.session);

  res.render('index', { title: 'BTP' });
});

module.exports = router;
