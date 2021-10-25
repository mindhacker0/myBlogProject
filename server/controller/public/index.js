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
            webRoute.create({
                path: "/",
                component:"Home",
                exact: true,
                id:'0',
                create_time: Date.now().toString(),
                icon:"",
            });
        }
    }
    async getUserRoute(req, res, next){
        let data = await webRoute.find();
        res.send(new ResponseObject({result:{data}}));
    }
}
module.exports = new PublicController();