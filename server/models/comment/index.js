//评论的数据库结构
'use strict';
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId:{//评论关联的用户id
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    blogId:{//评论关联的博客id
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    pid:{//评论的父级id
        type: Schema.Types.ObjectId, 
        ref: 'Comment', 
        default: null
    },
    content:String,//评论的内容
    create_time: String,//评论时间
});

commentSchema.index({id: 1});//设置索引

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;