'use strict';
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	user_name: String,//昵称姓名
	account:String,//账号
	password: String,//密码
	create_time: String,//创建时间
	role: Number,  //1:普通管理、 2:超级管理员
	avatar: {type: String, default: 'default.jpg'},//头像
});

userSchema.index({id: 1});//设置索引

const User = mongoose.model('User', userSchema);

module.exports = User;