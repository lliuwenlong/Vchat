/**
 * Created by wyw on 2018/9/25.
 */
const db = require('../utils/database');
let groups = db.model("groups", {
    title: String,
    desc: String,
    img: String,
    code: String
});

let groupUserSchema = new db.Schema({
    groupId: {
        type : db.Schema.ObjectId,
        ref : 'groups'
    },
    userId: {
        type : db.Schema.ObjectId,
        ref : 'users'
    },
    userName: { type: String },
    manager: { type: Number, default: 0 },
    holder: { type: Number, default: 0 }
});

groupUserSchema.statics = {
    findGroupByUserName:function(userName, callback){ // 通过用户名查找所在群聊列表
        return this
            .find({userName : userName}).populate('groupId')  // 关联查询
            .exec(callback)
    },
    findGroupUsersByGroupId:function(groupId, callback){ // 通过群id查找用户信息
        return this
            .find({groupId : groupId}).populate({path: 'userId', select: 'signature photo'})  // 关联查询
            .exec(callback)
    }
};

let groupUser = db.model("groupUser", groupUserSchema); // groupUser model

const createGroup = (params, callback) => { // 新建群
    groups.create({title: params.groupName, desc: params.groupDesc, img: params.groupImage}).then(r => {
        if (r['_id']) {
            users.find({name: params.userName}).then(rs => {
                if (rs.length) {
                    groupUser.create({userName: params.userName, userId: rs[0]._id, manager: 0, holder: 1, groupId: r['_id']}).then(res => { // 建群后创建群主
                        if (res['_id']) {
                            callback({code: 0, data: r});
                        } else {
                            groups.remove({'_id':r['_id']}, 1);
                            callback({code: -1});
                        }
                    });
                } else {
                    groups.remove({'_id':r['_id']}, 1);
                    callback({code: -1});
                }
            });
        } else {
            callback({code: -1});
        }
    })
};

const getMyGroup = (params, callback) => { // 查找我的群
    groupUser.findGroupByUserName(params.userName, (err, groups) => {
        if(err) {
            console.log(err);
        } else {
            callback({code: 0, data: groups})
        }
    })
};

const getGroupUsers = (params, callback) => { // 查找指定群聊成员
    groupUser.findGroupUsersByGroupId(params.groupId, (err, users) => {
        if(err) {
            console.log(err);
        } else {
            callback({code: 0, data: users})
        }
    })
};

module.exports = {
    createGroup,
    getMyGroup,
    getGroupUsers
};
