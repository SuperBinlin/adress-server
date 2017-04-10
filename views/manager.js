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
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

//StatusBarIOS.setStyle('light-content');

class Manager extends Component {
  render() {
    let colors = [];
    let tags =[];
    let item = ['修改密码','增加联系人','删除联系人','发布公告'];
    let components = [];
    let JSXDOM = []
    for (i in items){
      JSXDOM.push(
        <TouchableOpacity onPress="{this._loadPage}">

        </TouchableOpacity>
      )
    }
  }
}

module.exports = Manager;
