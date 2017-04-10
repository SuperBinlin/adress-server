var React = require('react-native');
var Dimensions = require('Dimensions');

var {
    PixelRatio
} = React;

var Util = {
    pixel:1 / PixelRatio,//显示一条和设备许可一样细的线
    size:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    //post 请求
    post:function(url,data,callback){
        var fetchOptions = {
            method:'POST',
            headers:{
              'Accept' : 'application/json',
              'Content-Type' : 'application/json',
            },
            body:JSON.stringify(data)
        }
        fetch(url,fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            callback(JSON.parse(responseText))
        })
        .catch(function(error){
            console.log('There has been a problem with your fetch operation: ' + error.message)
        });
    },
    key:'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE'

};
module.exports = Util;