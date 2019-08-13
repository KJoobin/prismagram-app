import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constans from '../constans'

const View = styled.View`
`;
const AddWrapper = styled.View`
flex-direction:row;
justify-content:space-between;
width:${constans.width};
padding:10px;
`;
const ImageList = styled.Image`
  margin-right:5px;
`;
const SelectPhoto = styled.Image`
  height:${constans.width};
  margin-bottom:5px;
`;
const Touchable = styled.TouchableOpacity`
  height:${constans.width / 3.5};
  width:${constans.width / 3.5};
  margin-right:10px;
`;
const Text = styled.Text``;

const UploadPhoto = ({
  photos,
  selectPhoto,
  addPhoto,
  removePhoto,
  changeSelect
}) => {

  return (
    <View>
      <SelectPhoto source={{uri:selectPhoto}} />
      <FlatList
        data={photos}
        keyExtractor={(item,index) => item}
        extraData={selectPhoto}
        horizontal={true}
        renderItem={({item}) => {
          return(
          <Touchable onPress={()=>{ changeSelect(item)} }
            activeOpacity={1}>
            <ImageList source={{uri:item}} style={{height:constans.width/3.5, width:constans.width/3.5, opacity:item === selectPhoto ? 0.2 : 1,}} />
          </Touchable>
        )}}
      />
      <AddWrapper>
        <Touchable onPress={removePhoto}><Text>삭제</Text></Touchable>
        <Touchable onPress={addPhoto}><Text>추가</Text></Touchable>
      </AddWrapper>
    </View>
  )
}

UploadPhoto.propTypes = {
  photos:PropTypes.arrayOf(
    PropTypes.string
  ),
}

export default UploadPhoto;
