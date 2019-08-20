import React,{ useState } from 'react';
import {Input } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import axios from 'axios';
import Loader from './Loader';
import { gql } from 'apollo-boost';
import { SEE_FEED } from '../screens/Home';

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
  const [loading, setLoading ] =useState(false)

  const [editPostMutation] = useMutation(UPLOAD_FEED)
  const onPress =  async (e) => {
    setLoading(true)
    const formdata = new FormData();
    const imgs = navigation.getParam("capture", []);
    imgs.forEach(el => {
      const name = el.filename;
      const [_,type] = el.filename.split('.');
      const uri = el.uri;
      formdata.append('file',{name, type:type.toLowerCase(), uri});
    })
    try {
      const { data: { location: imageUpload } } = await axios({
        url: `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://prismagram1.herokuapp.com/"}/api/feed`,
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        method: 'POST',
      })
      await editPostMutation({
        variables: { location: tag, files:imageUpload, caption: bio },
        refetchQueries: [`seeFeed`],
      })
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally{
      setLoading(false);
      navigation.navigate("Home")
    }
  }

  return (
      <Touchable style={{paddingRight:10}} onPress={onPress}>
        {loading ? <Loader /> : <Text>완료</Text> }
      </Touchable>
  )
}

export default UploadPhoto;
