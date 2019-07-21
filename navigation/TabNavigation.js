import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/Home'
import Notification from '../screens/Notification'
import Profile from '../screens/Profile'
import Search from '../screens/Search'

const TabNavigation = createBottomTabNavigator({
  Home,
  Notification,
  Profile,
  Search
},{
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
