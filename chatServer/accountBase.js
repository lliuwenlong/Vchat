/**
 * Created by wyw on 2018/9/26.
 */
// 生成随机号码池，项目初次启动时运行

const db = require('./utils/database');
let accountBase = db.model("accountBase", {
    code: String,
    status: String, // 1 已使用 0 未使用
    special: String,
    type: String // 1 用户 2 群聊
});

for (let i = 10000001; i < 10000999; i++) { // 首批用户默认账号 8位
    let account = new accountBase({ // 通过new Model1()创建的文档doc1，必须通过save()方法，才能将创建的文档保存到数据库的集合中
        code: i,
        status: '0',
        type: '1'
    });
    account.save(function (error, newAccount) { // 回调函数是可选项，第一个参数为err，第二个参数为保存的文档对象
        if (error) {
            console.log("插入 " + account + " 错误:" + error);
        } else {
            console.log("已成功插入 " + newAccount);
        }
    });
}
for (let i = 100001; i < 100999; i++) { // 首批群聊默认账号 6位
    let account = new accountBase({ // 通过new Model1()创建的文档doc1，必须通过save()方法，才能将创建的文档保存到数据库的集合中
        code: i,
        status: '0',
        type: '2'
    });
    account.save(function (error, newAccount) { // 回调函数是可选项，第一个参数为err，第二个参数为保存的文档对象
        if (error) {
            console.log("插入 " + account + " 错误:" + error);
        } else {
            console.log("已成功插入 " + newAccount);
        }
    });
}