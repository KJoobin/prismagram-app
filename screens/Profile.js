import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { FlatList, TouchableOpacity } from 'react-native';
import Loader from '../components/Loader';
import User from '../components/User';
import Gallery from '../components/Gallery';

const ME = gql`
    {
    me{
      email
      id
      fullName
      bio
      photo
      postCount
      followingCount
      followerCount
      isSelf
      posts{
        id
        files{
          id
          url
        }
      }
    }
  }
`;




const View = styled.View`
  flex:1;
`;

export default ({ navigation }) => {
  const { data, loading, refetch } = useQuery(ME);
  const [ photo, setPhoto ] = useState(data.me.photo)
  const [ bio, setBio ] = useState(data.me.bio)
  const [ modal, setModal ] = useState(false)
  const [editAvatar, setEditAvatar] = useState(false);
  const editBio = (e) => {
    setBio(e);
  }
  const editProfile = () => {
    setModal(true);
  }
  const cancel = () => {
    setBio(data.me.bio);
    setModal(false);
  }
  useEffect(() => {
    refetch();
  },[])
  console.log(photo);
  return (
    <View>
    {loading ?
      <Loader /> :
      <View>
        {
          editAvatar ? < Gallery 
          setEditAvatar={setEditAvatar}
          photo={photo}
          ME={ME}
          /> :
      <User
        posts={data.me.posts}
        photo={photo}
        setPhoto={setPhoto}
        fullName={data.me.fullName}
        navigation={navigation}
        postCount={data.me.postCount}
        followingCount={data.me.followingCount}
        followerCount={data.me.followerCount}
        bio={bio}
        setBio={setBio}
        editBio={editBio}
        isSelf={data.me.isSelf}
        email={data.me.email}
        editProfile={editProfile}
        cancel={cancel}
        modal={modal}
        setModal={setModal}
        setEditAvatar={setEditAvatar}
        />
        }
        </View>
    }
    </View>
  )
}
