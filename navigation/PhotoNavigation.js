import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import SelectPhoto from '../screens/Photo/SelectPhoto'
import TakePhoto from '../screens/Photo/TakePhoto'
import UploadPhoto from '../screens/Photo/UploadPhoto'

const PhotoNavigation = createMaterialTopTabNavigator({
  SelectPhoto,
  TakePhoto:{
    screen: TakePhoto,
    navigationOptions:() => {
    }
  },
  UploadPhoto
},{
  tabBarPosition: "bottom",
  initialRouteName: "TakePhoto",
});

export default createAppContainer(PhotoNavigation);
