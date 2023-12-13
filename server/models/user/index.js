'use strict';
var mongoose = require("mongoose");
const Schema = mongoose.Schema;
//用户数据模型
const userSchema = new Schema({
	user_id:Schema.Types.ObjectId,//用户ID
	user_name: String,//昵称姓名
	account:String,//账号
	password: String,//密码
	create_time: String,//创建时间
	follow: Number,//关注的用户数
	praise: Number,//点赞数量
	followed: Number,//粉丝数量
	role: Number,  //角色 0:普通用户、1:普通管理、 2:超级管理员
	latest_time: String,//最新登录时间
	latest_IP: String,//最新登录IP
	avatar: {type: String, default: 'default.jpg'},//头像
});

userSchema.index({id: 1});//设置索引

const User = mongoose.model('User', userSchema);

module.exports = User;