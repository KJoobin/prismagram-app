import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Proptypes from 'prop-types';
import styles from '../styles';

export const NavIcon = ({
  name,
  color="black",
  size=32,
  focused=true,
  style={}
}) => (
  <Ionicons  style={style}name={name} color={focused ? color : styles.darkGreyColor } size={size} />
)

NavIcon.Proptypes = {
  name:Proptypes.string.isRequried,
  color:Proptypes.string,
  size:Proptypes.number,
  focused: Proptypes.bool,
  style:Proptypes.object
}

export default NavIcon;
