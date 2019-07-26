import { createStackNavigator, createAppContainer } from 'react-navigation';
import TabNavigation from './TabNavigation';
import PhotoNavigation from './PhotoNavigation';
import MessageNavigation from './MessageNavigation';
import { stackStyles } from './config';

const MainNavigation = createStackNavigator({
    TabNavigation,
    MessageNavigation,
    PhotoNavigation,
  },{
    mode: "modal",
    headerMode:"none"
  });

export default createAppContainer(MainNavigation);
