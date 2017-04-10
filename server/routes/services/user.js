var fs = require('fs');
var util = require('./../util');
var USER_PATH = './database/user.json';
var _ = require('lodash');

var User = {
    init:function(app){
        app.post('/user/get',this.getUser);
        app.post('/user/create',this.addUser);
        app.post('/user/login',this.login);
        app.post('/user/login/token',this.loginByToken);
    },
    //获取用户信息
    getUser:function(req,res){
        
    },
    //添加用户
    addUser:function(req,res){
        var username = req.param('username');
        var password = req.param('password');
        var tel = req.param('tel');
        var email = req.param('email');
        var partment = req.param('partment');
        var tag = req.param('tag');
        var creater = req.param('creater') || '';

        if(!username || !password || !tel || !email || !partment || !tag || !creater){
            return res.send({
                status:0,
                data:'缺少必要参数'
            })
        }

        try{
            var content = JSON.parse(fs.readFileSync(USER_PATH));
            var obj = {
                "userid":util.guid(),
                "username":username,
                "password":password,
                "tel":tel,
                "email":email,
                "partment":partment,
                "tag":tag,
                "creater":creater,
                "time":new Date(),
                "token":""
            };
            content.push(obj);
            //更新文件
            fs.writeFileSync(USER_PATH, JSON.stringify(content));
            delete obj.password;
            return res.send({
                status:1,
                data:obj
            })
        }catch(e){
            return res.send({
                statue:0,
                err:e
            })
        }
    },
    //登录
    login:function(req,res){
        var email = req.param('email');
        var password = req.param('password');
        var deviceId = req.param('deviceId');
        var token = util.guid() + deviceId;
        var content = JSON.parse(fs.readFileSync(USER_PATH).toString());
        var accept = false;
        _.map(content,function(user){
            if(email == user.email && password == user.password){
                accept = true;
                user.token = token;
                fs.writeFileSync(USER_PATH,JSON.stringify(content));
                delete user.password;
                return res.send({
                    status:1,
                    data:user
                })
            }
        });
        if(!accept){
            return res.send({
                statue:0,
                data:'用户名或者密码错误'
            })
        }
    },
    //通过token登录
    loginByToken:function(req,res){
        var token = req.param('token');
        var content = JSON.parse(fs.readFileSync(USER_PATH));
        var accept = false;
        _.map(content,function(user){
            if(token == user.token){
                accept = true;
                delete user.password;
                return res.send({
                    status:1,
                    data:user
                })
            }
        })
        if(!accept){
            return res.send({
                status:0,
                info:'token失效'
            })
        }
    }
}
module.exports = User;