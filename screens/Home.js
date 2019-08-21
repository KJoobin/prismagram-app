import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../components/Loader';
import Post from '../components/Post';


export const SEE_FEED = gql`
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

export default () => {
  const [ refresh, setRefresh ] = useState(false);
  const { data  , loading, refetch } = useQuery(SEE_FEED);
  const refreshHandle = async () => {
    try {
      setRefresh(true);
      refetch();
    } catch (e) {
      console.log(e);
    } finally {
        setRefresh(false);
    }


  }
  return (
    <>
    {loading || data === undefined ? <Loader / > :
      <FlatList
        data={data.seeFeed}
        keyExtractor={ item => item.id}
        onRefresh={refreshHandle}
        refreshing={refresh}
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
