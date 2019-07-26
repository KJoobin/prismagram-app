import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';

const Construct = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`;

export default () => <Construct><ActivityIndicator size="large" /></Construct>
