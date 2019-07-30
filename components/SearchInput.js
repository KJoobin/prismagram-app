import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import constans from '../constans';
import styles from '../styles';

const SearchInput = ({ onSubmit, onChange, value, theme}) =>{
  return (
  <TextInput
    style={{
      width: constans.width / 1.5,
      padding:10,
      borderRadius:5,
      backgroundColor:"#EFEFEF",
      textAlign:"center",
    }}
    placeholder={"검색"}
    value={value}
    onChangeText={onChange}
    onSubmitEditing={onSubmit}
    autoCapitalize={"none"}
    autoCompleteType={"off"}
    returnKeyType={"search"} />
)}

SearchInput.propTypes = {
  value:PropTypes.string.isRequired,
  onSubmit:PropTypes.func.isRequired,
  onChange:PropTypes.func.isRequired,
}

export default SearchInput;
