import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types'
import constans from '../constans';


const Container = styled.View`
  margin-bottom:15px;
`;

const Input = styled.TextInput`
  width:${constans.width - 80};
  height:50;
  padding:10px;
  border-width: 1;
  border-radius:4px;
  border-color:${(props) => props.theme.darkGreyColor};
  font-size:16px;
  font-weight:500;
  color:${(props) => props.theme.darkGreyColor};
`


const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  secureTextEntry = false,
  onChangeText,
  autoCompleteType ="off",
  autoCorrect=true,
  autoCapitalize="sentences",
  onEndEditing=()=>null,
  returnKeyType="done",
  onSubmitEditing,
  editale=true,
  }) => {
  return(
  <Container>
    <Input
      placeholder={placeholder}
      value={value}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoCompleteType={autoCompleteType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      onEndEditing={onEndEditing}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      editale={editale}
       />
  </Container>
)}

AuthInput.propTypes = {
  placeholder:propTypes.string.isRequired,
  value:propTypes.string.isRequired,
  keyboardType:propTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  secureTextEntry:propTypes.bool,
  autoCompleteType:propTypes.oneOf([
    "off",
    "username",
    'password',
    'email',
    'name',
    'tel',
    'street-address',
    'postal-code',
    'cc-number',
    'cc-csc',
    'cc-exp',
    'cc-exp-month',
    'cc-exp-year'
  ]),
  autoCapitalize:propTypes.oneOf([
    'characters',
    'words',
    'sentences',
    'none'
  ]),
  onChangeText:propTypes.func,

  autoCorrect:propTypes.bool,
  onEndEditing:propTypes.func,
  returnKeyType:propTypes.oneOf([
    "done",
    "go",
    "next",
    "search",
    "send"
  ]),
  onSubmitEditing:propTypes.func,
  editale:propTypes.bool,

}

export default AuthInput;
