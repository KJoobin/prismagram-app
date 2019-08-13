import React from 'react';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import SelectPhoto from '../screens/Photo/SelectPhoto'
import TakePhoto from '../screens/Photo/TakePhoto'
import UploadPhoto from '../screens/Photo/UploadPhoto'
import { stackStyles } from './config';

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    initialRoute: {
      screen: initialRoute,
      navigationOptions: {

        ...customConfig
      }
    },
    UploadPhoto: {
      screen:UploadPhoto,
      mode:"modal",
      navigationOptions:{
        mode:"modal",
        headerTitle:<Text style={{fontSize:16,fontWeight:"600"}}>새 게시글</Text>
      }
    },
    },{
      defaultNavigationOptions: {
        mode:"modal",
        headerStyle:{
          ...stackStyles
        },
      }
    }
  )

export default createMaterialTopTabNavigator({
    SelectPhoto:{
      screen:stackFactory(SelectPhoto)
    },
    TakePhoto:{
      screen:stackFactory(TakePhoto)
    },
  },{
    tabBarPosition: "bottom",
    initialRouteName: "TakePhoto",
  }
);
