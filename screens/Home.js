import React from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../components/Loader';
import Post from '../components/Post';


const SEE_FEED = gql`
  query seeFeed{
    seeFeed{
      id
      location
      caption
      user{
        id
        username
        photo
      }
      files{
        id
        url
      }
      likes{
        id
      }
      isLiked
      likeCount
      commentCount
      comments{
        id
        user{
          id
          username
        }
        text
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`

`;

export default (props) => {
  const { data: {seeFeed : data } , loading, refetch } = useQuery(SEE_FEED)
  const refreshHandle = () => {
    refetch();
    console.log('..')
  }
  return (
    <>
    {loading ? <Loader / > :
      <FlatList
        data={data}
        keyExtractor={ item => item.id}
        onRefresh={refreshHandle}
        refreshing={false}
        renderItem={({item}) =>
        <Post
        id={item.id}
        location={item.location}
        caption={item.caption}
        user={item.user}
        files={item.files}
        likes={item.likes}
        isLiked={item.isLiked}
        likeCount={item.likeCount}
        commentCount={item.commentCount}
        comments={item.comments}
        createdAt={item.createdAt}
        updatedAt={item.updatedAt}
        />}
        />
    }
    </>
      )
}
