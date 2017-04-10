/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

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
  AsyncStorage
} from 'react-native';

//StatusBarIOS.setStyle('light-content');

class Home extends Component {
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
                opacity:1
            },
            showLogin:{
                flex:1,
                opacity:1
            },
            isLoadingShow:false
        }
  }
  componentDidMount(){
    
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
                initalRoute={{
                    component:component,
                    title:title,
                    passProps:{
                        data:data
                    }
                }} />
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
                        <TabBarIOS barTintColor="#000">
                            <TabBarIOS.Item
                                icon={require('image!about')} 
                                title="首页"
                                selected={this.state.selectedTab === 'home'}
                                onPress={this._selectTab.bind(this,'home')}
                            >
                                <Text>ss</Text>
                            </TabBarIOS.Item>
                        </TabBarIOS>
                    </View>:null
                }
            </View>
        );
  }
}

module.exports = Home;
