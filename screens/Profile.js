import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { FlatList, TouchableOpacity } from 'react-native';
import Loader from '../components/Loader';
import User from '../components/User';

const ME = gql`
    {
    me{
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
  !loading && console.log(data.me.posts);
  return (
    <View>
    {loading ?
      <Loader /> :
      <User
        photo={data.me.photo}
        posts={data.me.posts}
        fullName={data.me.fullName}
        navigation={navigation}
        postCount={data.me.postCount}
        followingCount={data.me.followingCount}
        followerCount={data.me.followerCount}
        bio={data.me.bio}
        isSelf={data.me.isSelf}/>
    }
    </View>
  )
}
