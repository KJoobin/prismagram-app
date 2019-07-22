import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Messages from '../screens/Messages/Messages'
import Message from '../screens/Messages/Message'

const MessageNavigation = createBottomTabNavigator({
  Messages,
  Message
})

export default createAppContainer(MessageNavigation)
