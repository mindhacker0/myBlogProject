var ResponseObject = require("../../lib/response");
var webRoute = require('../../models/webRoute');
class PublicController{
    constructor(){
        this.getUserRoute = this.getUserRoute.bind(this);
        this.addTestData();
    }
    async addTestData(){
        webRoute.findOneAndUpdate({id:0},{$set:{
            path: "/",
            component:"Home",
            exact: true,
            id:'0',
            create_time: Date.now().toString(),
            icon:"",
        }});
    }
    async getUserRoute(req, res, next){
        let data = await webRoute.find();
        res.send(new ResponseObject({result:{data}}));
    }
}
module.exports = new PublicController();