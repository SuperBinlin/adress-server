var fs = require('fs');
var util = require('.././util');
var MESSAGE_PATH = './database/message.json';
var USER_PATH = './database/user.json';

var Message = {
  init:function(app){
    app.post('/message/get', this.getMessage);
  },

  getMessage: function (req, res) {
    var key = req.param('key')
    return res.send({
      status:1,
      data:key
    })
  }
}
module.exports = Message;