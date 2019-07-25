import { createStackNavigator, createAppContainer } from 'react-navigation';
import TabNavigation from './TabNavigation';
import PhotoNavigation from './PhotoNavigation';
import MessageNavigation from './MessageNavigation';

const MainNavigation = createStackNavigator({
  TabNavigation:{
    screen:TabNavigation,
  },
  MessageNavigation:{
    screen:MessageNavigation,
  },
  PhotoNavigation:{
    screen:PhotoNavigation,
  }
},{
  mode: "card",
  headerMode:"none"

});

export default createAppContainer(MainNavigation);
