'use strict';
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameTableSchema = new Schema({
	title: String,
	password: String,
	id: {type: String, unique: true},
	create_time: String,
	role: Number,  //1:普通管理、 2:超级管理员
	icon: {type: String, default: 'default.jpg'},
});

gameTableSchema.index({id: 1});//设置索引

const GameTable = mongoose.model('GameTable', gameTableSchema);

module.exports = GameTable;