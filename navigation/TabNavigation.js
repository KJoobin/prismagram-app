import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { View,Platform } from 'react-native';
import styled from 'styled-components';
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import MessageLink from '../components/MessageLink';
import NavIcon from '../components/NavIcon'

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    initialRoute: {
      screen: initialRoute,
      navigationOptions: {
        headerStyle:{backgroundColor:"#FAFAFA"},
        ...customConfig
      }
    }
  })


const TabNavigation = createBottomTabNavigator({
  Home:{
    screen: stackFactory(Home,{
    headBackTitleVisible:false,
    headerRight: <MessageLink />
  }),
    navigationOptions: {
      tabBarIcon: ({ focused }) => <NavIcon focused={focused} name={Platform.OS === 'ios' ? "ios-home" : "md-home" } color='blue' />
    }},

  Search:{
    screen:Search,
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
    screen:Notification,
    navigationOptions:{
      tabBarIcon: ({ focused }) => <NavIcon focused={focused} name={Platform.OS === 'ios' ? "ios-heart" : "md-heart" } />
    }},


  Profile:{
    screen: Profile,
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

export default createAppContainer(TabNavigation);
