var Test = {
    init:function(app){
        app.get('/test/test',this.doTest);
    },
    doTest:function(req,res){
        res.send({
            status:1,
            infoL:'测试服务'
        })
    }
}

module.exports = Test;