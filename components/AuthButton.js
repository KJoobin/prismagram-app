import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types'
import constans from '../constans';

const TouchableOpacity = styled.TouchableOpacity`

`
const Container = styled.View`
  width:${constans.width - 80};
  height:40;
  background-color:${(props) => props.theme.blueColor};
  justify-content:center;
  align-items:center;
`

const Text = styled.Text`
  color:white;
  font-size:20px;
  font-weight:500;
`

const AuthButton = ({text,onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Container>
      <Text>{text}</Text>
    </Container>
  </TouchableOpacity>
)

AuthButton.propTypes = {
  text: propTypes.string.isRequired,
  onPress: propTypes.func.isRequired
}

export default AuthButton;
