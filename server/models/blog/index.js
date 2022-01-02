'use strict';
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	title: String,//博客的标题
	content: String,//博客的内容,url
	catalog:String,//博客的类别
	tags:String,//博客标签
	create_time: String,//博客的创建时间
	userId:{//博客关联用户ID
        type:Schema.Types.ObjectId,
        ref:"User"
    },
	views:Number,//博客被浏览的次数
	praise:Number,//博客被赞次数
	commentId:{//评论的id
        type: Schema.Types.ObjectId, 
        ref: 'Comment', 
        default: null
    },
	cover: {type: String, default: 'default.jpg'},//博客封面
});

BlogSchema.index({id: 1});//设置索引

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;