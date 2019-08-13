import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import Loader from './Loader';
import { gql } from 'apollo-boost';

const Touchable = styled.TouchableOpacity``;
const Text = styled.Text``;

const UPLOAD_FEED = gql`
  mutation uploadFeed($location: String, $files: [String!], $caption: String! ) {
    uploadFeed(location:$location, files:$files, caption:$caption) {
      id
      caption
      location
    }
  }
`

const UploadPhoto = ({navigation}) => {
  const bio = navigation.getParam("bio","");
  const tag = navigation.getParam("tag",[]).join(" ");
  const files = navigation.getParam("capture",[]);

  const [editPostMutation, { loading } ] = useMutation(UPLOAD_FEED,{
    variables:{location:tag,files,caption:bio},
    update:(_,data) => {
      navigation.navigate("Home")
    }
  })
  const onPress =  async () => {
    try {
    await editPostMutation()
    } catch (e) {
      console.log(e);
    } finally {
    }

  }

  return (
    <Touchable style={{paddingRight:10}} onPress={onPress}>
      {loading ? <Loader /> : <Text>완료</Text> }
    </Touchable>
  )
}

export default UploadPhoto;
