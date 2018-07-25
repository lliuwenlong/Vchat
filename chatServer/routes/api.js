const api = require('../controller/apiList');
let express = require('express');
let router = express.Router();

router.get('/getUser', api.getUser); // 获取用户、测试接口
router.post('/login', api.login); // 登录
router.post('/signUp', api.signUp); // 注册
router.post('/loginOut', api.loginOut); // 退出

module.exports = router;
