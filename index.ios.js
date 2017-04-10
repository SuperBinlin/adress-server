/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Util from './util';
import Service from './service';
import AdSupportIOS from 'AdSupportIOS';
import Home from './views/home';
import Message from './views/message';
import Manager from './views/manager';
import About from './views/about';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Image,
  TextInput,
  StatusBarIOS,
  ScrollView,
  TouchbleHighlight,
  ActivityIndicator,
  AlertIOS,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

//StatusBarIOS.setStyle('light-content');

class adress_book extends Component {
  statics:{
    title:'主页',
    description:'选项卡'
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedTab:'home',
      showIndex:{
        height:1,
        opacity:1,
        flex:1
      },
      showLogin:{
        flex:1,
        opacity:1
      },
      isLoadingShow:false
    }
  }
  componentDidMount () {
    var _this = this;
    AsyncStorage.getItem('token', function(err, token){
      if(!err && token) {
        var path = Service.host + Service.loginByToken;
        console.log("%c获取到token,token为"+token+",开始自动登录","font-size:13px;color:green")
        Util.post(path, {
          token: token
        }, function (data) {
          if (data.status) {
            _this.setState({
              showLogin: {
                height: 0,
                width: 0,
                flex: 0
              },
              showIndex: {
                flex: 1,
                opacity: 1
              },
              isLoadingShow: false
            })
          }
        })
      } else {
        _this.setState({
          showIndex:{
            height:0,
            opacity:0
          },
          showLogin:{
            flex:1,
            opacity:1
          },
          isLoadingShow:false
        });
      }
    });
    var path = Service.host + Service.getMessage;
    var _this = this;
    Util.post(path, {
      key:Util.key
    }, function (data) {
      console.log(data)
    })
  }
  _selectTab(tabName){
    this.setState({
      selectedTab:tabName
    });
  }
  _addNavigator(component,title){
    var data = null;
    if(title == '公告'){
        data = this.state.data
    }
    return <NavigatorIOS
            style={{flex:1}}
            barTintColor='#007AFF'
            titleTextColor="#fff"
            tintColor="#fff"
            translucent={false}
            initialRoute={{
              component:component,
              title:title,
              passProps:{
                data:data
              }
            }} />
  }
  _getEmail = (val) => {
    console.log(val)
    this.setState({
      email:val
    })
  }
  _getPassword = (val) => {
    this.setState({
      password:val
    })
  }
  _login = () => {
    var email = this.state.email;
    var password = this.state.password;
    var path = Service.host + Service.login;
    var _this = this;

    _this.setState({
      showLogin:{
        height:0,
        width:0,
        flex:0
      },
      isLoadingShow:true
    });

    AdSupportIOS.getAdvertisingTrackingEnabled(() => {
      AdSupportIOS.getAdvertisingId((deviceId)=>{
        console.log('deviceId',deviceId);
        Util.post(path,{
          email:email,
          password:password,
          deviceId:deviceId
        },(data) => {
          if(data.status){
            var user = data.data;
            AsyncStorage.multiSet([
              ['username',user.username],
              ['token',user.token],
              ['userid',user.userid],
              ['email',user.email],
              ['tel',user.tel],
              ['partment',user.partment],
              ['tag',user.tag],
            ], (err) => {
              if(!err){
                _this.setState({
                  showLogin:{
                    height:0,
                    width:0,
                    flex:0
                  },
                  showIndex:{
                    flex:1,
                    opacity:1
                  },
                  isLoadingShow:false
                })
              }
            })
          } else {
            AlertIOS.alert('登录','用户名或者密码错误');
            _this.setState({
              showLogin:{
                opacity:1,
                flex:0
              },
              showIndex:{
                height:0,
                width:0,
                flex:0
              },
              isLoadingShow:false
            });
          }
        });
      }, function () {
        AlertIOS.alert('设置','无法获取设备唯一标识')
      });
    }, function () {
      AlertIOS.alert('设置','无法获取设备唯一标识,请关闭设置---隐私---广告---限制广告限制')
    })
  }
  render() {
    return (
      <View style={{flex:1}}>
        {this.state.isLoadingShow ?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator size="small" color="#268dff"></ActivityIndicator>
          </View>:null
        }
        {!this.state.isLoadingShow ?
          <View style={this.state.showIndex}>
            <TabBarIOS barTintColor="#fff">
              <TabBarIOS.Item
                icon={require('image!about')}
                title="首页"
                selected={this.state.selectedTab === 'home'}
                onPress={this._selectTab.bind(this,'home')}
              >
                {this._addNavigator(Home,'主页')}
              </TabBarIOS.Item>
              <TabBarIOS.Item
                icon={require('image!gonggao')}
                title="公告"
                selected={this.state.selectedTab === 'message'}
                onPress={this._selectTab.bind(this,'message')}
              >
                {this._addNavigator(Message,'公告')}
              </TabBarIOS.Item>
              <TabBarIOS.Item
                icon={require('image!manager')}
                title="管理"
                selected={this.state.selectedTab === 'manager'}
                onPress={this._selectTab.bind(this,'manager')}
              >
                {this._addNavigator(Manager,'管理')}
              </TabBarIOS.Item>
              <TabBarIOS.Item
                icon={require('image!about')}
                title="关于"
                selected={this.state.selectedTab === 'about'}
                onPress={this._selectTab.bind(this,'about')}
              >
                {this._addNavigator(About,'关于')}
              </TabBarIOS.Item>
            </TabBarIOS>
          </View>:null
        }
        <ScrollView style={[this.state.showLogin]}>
          <View style={styles.container}>
            <View>
              <Image style={styles.logo} source={require('image!logo')}></Image>
            </View>

            <View style={styles.inputRow}>
              <Text>邮箱</Text>
              <TextInput style={styles.input} placeholder="请输入邮箱" onChangeText={this._getEmail} />
            </View>

            <View style={styles.inputRow}>
              <Text>密码</Text>
              <TextInput style={styles.input} placeholder="请输入密码" password={true} onChangeText={this._getPassword} />
            </View>

            <View>
              <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={this._login}>
                <Text style={{color:'#fff'}}>登录</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      marginTop:50,
      alignItems:'center'
    },
    logo:{
      width:100,
      height:100,
      resizeMode:Image.resizeMode.contain
    },
    inputRow:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:10
    },
    input:{
      marginLeft:10,
      width:220,
      borderWidth:Util.pixel,
      height:35,
      paddingLeft:8,
      borderRadius:5,
      borderColor:'#ccc'
    },
    btn:{
      marginTop:10,
      width:80,
      height:35,
      backgroundColor:'#3bc1ff',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:4
    }
});

AppRegistry.registerComponent('adress_book', () => adress_book);
