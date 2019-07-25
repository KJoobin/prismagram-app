import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Proptypes from 'prop-types';

export const NavIcon = ({
  name,
  color="black",
  size=32,
}) => (
  <Ionicons name={name} color={color} size={size} />
)

NavIcon.Proptypes = {
  name:Proptypes.string.isRequried,
  color:Proptypes.string,
  size:Proptypes.number
}

export default NavIcon;
