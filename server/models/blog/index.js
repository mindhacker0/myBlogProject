'use strict';
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	blog_id:Schema.Types.ObjectId,//博客ID
	title: String,//博客的标题
	content: String,//博客的内容 文本
	catalog:String,//博客的类别
	tags:String,//博客标签
	create_time: String,//博客的创建时间
	last_modify: String,//最后修改时间
	userId:{type:Schema.Types.ObjectId,ref:"User"},//博客所属用户ID
	visit_num:Number,//博客被浏览的次数
	praise_num:Number,//点赞数量
	tap_num:Number,//点踩数量
	comments_num:Number,//评论数
    collect_num:Number,//收藏数
	commentId:{type: Schema.Types.ObjectId, ref: 'Comment', default: null},//评论的id
	cover: {type: String, default: 'default.jpg'},//博客封面
});

BlogSchema.index({id: 1});//设置索引

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;