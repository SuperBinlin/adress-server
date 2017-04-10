var fs = require('fs');

module.exports = function(app){
    var FS_PATH_SERVICE = './routes/services/';
    var REQUIRE_PATH_SETVICES = './services/';
    fs.readdir(FS_PATH_SERVICE,function(err,list){//list为array 该文件夹内文件集合
    if(err){
        throw '没有找到该文件夹,请检查......'
    }
    for(var e;list.length && (e = list.shift());){
        var service = require(REQUIRE_PATH_SETVICES + e);
        service.init && service.init(app);
    }
    })
}