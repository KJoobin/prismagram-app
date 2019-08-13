import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
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
    UploadPhoto,
    },{
      defaultNavigationOptions: {
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
