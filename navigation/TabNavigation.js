import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { View,Platform, Image} from 'react-native';
import styled from 'styled-components';
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import MessageLink from '../components/MessageLink';
import NavIcon from '../components/NavIcon'
import { stackStyles } from './config';

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    initialRoute: {
      screen: initialRoute,
      navigationOptions: {
        headerStyle:{
          ...stackStyles
        },
        ...customConfig
      }
    }
  })


export default TabNavigation = createBottomTabNavigator({
  Home:{
    screen: stackFactory(Home,{
    headBackTitleVisible:false,
    headerRight: <MessageLink />,
    headerLeft:<Image resizeMode='contain' style={{width:125}}source={require('../assets/logo.png')} />
  }),
    navigationOptions: {
      tabBarIcon: ({ focused }) => <NavIcon focused={focused} name={Platform.OS === 'ios' ? "ios-home" : "md-home" } />
    }},

  Search:{
    screen:stackFactory(Search,{

    }),
    navigationOptions:{
      tabBarIcon: ({ focused }) => <NavIcon focused={focused} name={Platform.OS === 'ios' ? "ios-search" : "md-search" } />
    }},

  add:{
    screen: View,
    navigationOptions:{
      tabBarOnPress: ({ navigation })=> {
        navigation.navigate("PhotoNavigation")},
        tabBarIcon: <NavIcon name={Platform.OS === 'ios' ? "ios-add-circle" : "md-add-circle" } />
      }},

  Notification:{
    screen:stackFactory(Notification),
    navigationOptions:{
      tabBarIcon: ({ focused }) => <NavIcon focused={focused} name={Platform.OS === 'ios' ? "ios-heart" : "md-heart" } />
    }},


  Profile:{
    screen: stackFactory(Profile),
    navigationOptions:{
      tabBarIcon: ({ focused }) => <NavIcon focused={focused} name={Platform.OS === 'ios' ? "ios-person" : "md-person" } />
    }},

  },{
      backBehavior:"history",
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'white',
        showLabel:false,
        keyboardHidesTabBar:true,
        style:{backgroundColor:"#FAFAFA"}
      }
  }
);
