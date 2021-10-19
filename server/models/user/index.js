'use strict';
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	user_name: String,
	password: String,
	id: {type: String, unique: true},
	create_time: String,
	role: Number,  //1:普通管理、 2:超级管理员
	avatar: {type: String, default: 'default.jpg'},
});

userSchema.index({id: 1});//设置索引

const User = mongoose.model('User', userSchema);

module.exports = User;