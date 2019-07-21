import { createStackNavigator, createAppContainer } from 'react-navigation';
import Signup from '../screens/Auth/Signup';
import Confirm from '../screens/Auth/Confirm';
import Login from '../screens/Auth/Login';
import AuthHome from '../screens/Auth/AuthHome';
import Home from '../screens/Home'

const AuthNavigation = createStackNavigator({
  AuthHome,
  Signup,
  Confirm,
  Login
  },
  {
    mode: "modal",
    headerMode: "screen",
    headerBackTitleVisible: false
  }
);

export default createAppContainer(AuthNavigation);
