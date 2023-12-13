const ResponseObject = require("../../lib/response");
const userModel = require("../../models/user");
const jwt = require('jsonwebtoken');
class UserController{
    constructor(){
        this.addTestData();
    }
    async addTestData(){//添加默认账户
        let count = await userModel.count();
        if(count===0){
            userModel.create({ 
            user_name: "周鹏飞",
            account:"zhoupf",
            password: "123456",
            create_time: "2021-10-15 17:33:23",
            role: 2,  //1:普通管理、 2:超级管理员
            avatar:""});
        }
    }
    async useRegister(req, res,next){
        
    }
    async userLogin(req, res, next){//用户登录
        const {account,pwd} = req.query;
        let data =await userModel.find({account});
        if(data.length === 0){
            res.send(new ResponseObject({errors:"该账号不存在！"}));
        }
        let {password,user_name,create_time,avatar,_id} = data[0];
        if(password !== pwd){
            res.send(new ResponseObject({errors:"密码错误！"}));
        }
        let sign = jwt.sign(//生成jwt token
        {
            usrId:_id
        },
        'secret12345',
        {    
            algorithm: 'HS256',
            expiresIn: 3600 * 24 * 3
        }
        );
        let token = `Bearer ${sign}`;
        res.send(new ResponseObject({result:{
            user_name,
            create_time,
            avatar,
            token
        }}));
    }
    async getUserInfo(req, res, next){//获取用户信息
        const {usrId} = req.user;
        let {user_name,create_time,avatar} = await userModel.findById(usrId);
        res.send(new ResponseObject({result:{
            user_name,
            create_time,
            avatar,
        }}));
    }
}
module.exports = new UserController();