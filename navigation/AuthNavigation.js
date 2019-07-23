import { createStackNavigator, createAppContainer } from 'react-navigation';
import Signup from '../screens/Auth/Signup';
import Confirm from '../screens/Auth/Confirm';
import SendConfrimSecret from '../screens/Auth/SendConfrimSecret';
import AuthHome from '../screens/Auth/AuthHome';
import SignInfo from '../screens/Auth/SignInfo';
import Home from '../screens/Home'

const AuthNavigation = createStackNavigator({
  AuthHome,
  Signup,
  SendConfrimSecret,
  Confirm,
  SignInfo,
  },
  {
    mode: "card",
    headerMode: "screen",
    headerBackTitleVisible: false
  }
);

export default createAppContainer(AuthNavigation);
