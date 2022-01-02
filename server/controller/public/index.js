var ResponseObject = require("../../lib/response");
var webRoute = require('../../models/webRoute');
class PublicController{
    constructor(){
        this.getUserRoute = this.getUserRoute.bind(this);
        this.addTestData();
    }
    async addTestData(){//初始化给默认路由数据。
        let count = await webRoute.count();
        if(count === 0){
            let data = [{
                path: "/",
                component:"Home",
                exact: true,
                pid:null,
                create_time: Date.now().toString(),
                icon:"",
                children:[]
            },{
                path: "/editor",
                component:"Editor",
                exact: false,
                pid:null,
                create_time: Date.now().toString(),
                icon:"",
                children:[]
            },{
                path: "/myblogs",
                component:"Myblogs",
                exact: false,
                pid:null,
                create_time: Date.now().toString(),
                icon:"",
                children:[]
            },{
                path: "/myblogs/:id",
                component:"BlogDetail",
                exact: false,
                pid:null,
                create_time: Date.now().toString(),
                icon:"",
                children:[]
            },{
                path: "/myproducts",
                component:"MyProducts",
                exact: false,
                pid:null,
                create_time: Date.now().toString(),
                icon:"",
                children:[]
            },{
                path: "/recommands",
                component:"Recommands",
                exact: false,
                pid:null,
                create_time: Date.now().toString(),
                icon:"",
                children:[]
            }];
            webRoute.create(data);
        }
    }
    async getUserRoute(req, res, next){
        let data = await webRoute.find();
        res.send(new ResponseObject({result:{data}}));
    }
}
module.exports = new PublicController();