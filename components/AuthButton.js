import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import propTypes from 'prop-types'
import constans from '../constans';

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
`
const Container = styled.View`
  width:${constans.width - 80};
  height:40;
  background-color:${(props) => props.theme.blueColor};
  justify-content:center;
  align-items:center;
  margin-top:15px;
`

const Text = styled.Text`
  color:white;
  font-size:20px;
  font-weight:500;
`

const AuthButton = ({ text, onPress, loading = false }) => (

  <TouchableWithoutFeedback disabled={loading} onPress={onPress}>
    <Container>
      {loading ? <ActivityIndicator size={"large"} color={'white'} /> : <Text>{text}</Text> }
    </Container>
  </TouchableWithoutFeedback>
)

AuthButton.propTypes = {
  text: propTypes.string.isRequired,
  onPress:propTypes.func.isRequired,
  loading: propTypes.bool
}

export default AuthButton;
