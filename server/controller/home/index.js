var ResponseObject = require("../../lib/response");
class HomeController{
    constructor(){
        
    }
    async getList(req, res, next){
        const data = [{
            name:"guss",
            icon:`/images/gussIcon.jpeg`
        }];
        res.send(new ResponseObject({result:{data}}));
    }
}
module.exports = new HomeController();