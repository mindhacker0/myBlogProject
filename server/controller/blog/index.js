var ResponseObject = require("../../lib/response");
var blogModel = require('../../models/blog');
class PublicController{
    constructor(){
        this.getUserRoute = this.getUserRoute.bind(this);
        this.addTestData();
    }
    async addTestData(){//初始化测试数据
        let count = await blogModel.count();
        if(count === 0){
            let data = [{
                title:"原生JS实现电子书阅读器",//标题
                content:"本文主要介绍FileReader对象，以及如何分割utf-8编码的二进制序列",
                catalog:"javascript;html",//类别
                tags:"好文",//文章的标签
                create_time:"2021-10-28 15:52:56",//创建时间
                userId:"617a6255a13bb7d8dccce8bf",//作者
                views:100,//博客被浏览的次数
	            praise:100,//博客被赞次数
                commentId:null,
                cover:""
            }];
            blogModel.create(data);
        }
    }
    async getUserRoute(req, res, next){
        let data = await webRoute.find();
        res.send(new ResponseObject({result:{data}}));
    }
}
module.exports = new PublicController();