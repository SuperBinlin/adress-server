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
  componentDidMount(){
    
  }
  render() {

        return (
            <View>
                <Text>sssss</Text>
            </View>
        );
  }
}

module.exports = Home;
