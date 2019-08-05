import React from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import constans from '../constans';

const Img = styled.Image`
  width:${constans.width / 3};
  height:${constans.width / 3};
`;
const Touchable = styled.TouchableOpacity``;

const PostCard = ({ id, file, navigation }) => {
  return(
    <Touchable onPress={()=> navigation.navigate("Detail", { id } ) } >
      <Img source={{ uri:file.url}} />
    </Touchable>
  )
}

PostCard.propTypes = {
    id:PropTypes.string.isRequired,
    file:PropTypes.shape({
      id:PropTypes.string.isRequired,
      url:PropTypes.string.isRequired,
    }).isRequired,
}

export default PostCard;
