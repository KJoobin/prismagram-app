import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import SelectPhoto from '../screens/Photo/SelectPhoto'
import TakePhoto from '../screens/Photo/TakePhoto'
import UploadPhoto from '../screens/Photo/UploadPhoto'
import { stackStyles } from './config';

const PhotoTabs = createMaterialTopTabNavigator({
    SelectPhoto,
    TakePhoto,
  },{
    tabBarPosition: "bottom",
    initialRouteName: "TakePhoto",
  }
);

export default createStackNavigator({
    PhotoTabs,
    UploadPhoto
  },{
    defaultNavigationOptions:{
      headerStyle:{
        ...stackStyles
      }
    }
  }
)
