import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { View } from 'react-native';
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import MessageLink from '../components/MessageLink';

const stackFactory = (initialRoute, customConfig) =>
createStackNavigator({
  initialRoute: {
    screen: initialRoute,
    navigationOptions: {
      ...customConfig
    }
  }
})


const TabNavigation = createBottomTabNavigator({
  Home: stackFactory(Home,{
    headBackTitleVisible:false,
    headerRight: <MessageLink />
  }),
  Notification,
  add:{
    screen: View,
    navigationOptions:{
      tabBarOnPress: ({ navigation })=> {
        navigation.navigate("PhotoNavigation")
      }
    },
  },
  Profile,
  Search
},{
  mode: "modal",
    backBehavior:"history",
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
      keyboardHidesTabBar:true,
    }
}
);

export default createAppContainer(TabNavigation);
