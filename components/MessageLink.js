import React from 'react';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native';


const Text = styled.Text`

`

export default withNavigation(({ navigation }) => (
  <TouchableOpacity onPress={() => { navigation.navigate("MessageNavigation")}}>
    <Text>Message</Text>
  </TouchableOpacity>
));
