import React, { useState } from 'react';
import styled from 'styled-components';
import { ScrollView, RefreshControl } from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks'
import constans from '../constans';
import Swiper from 'react-native-swiper'
import Loader from '../components/Loader'
import Post from '../components/Post';

const View = styled.View`
  flex:1;
`;
const Text = styled.Text``;

const Image = styled.Image`
  width:${constans.width};
  height:${constans.width};
`;

const SEE_FULL_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id:$id) {
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

export default ({navigation}) => {
  const { params } = navigation.state;
  const { data , loading, refetch } = useQuery(SEE_FULL_POST,{
    variables:{id: params.id},
    fetchPolicy:"network-only",
  })
  const [refresh, setRefresh] = useState(false);
  const onRefresh = () => {
    setRefresh(true)
    refetch();
    setRefresh(false)
  }
  return(
    <View>
      {loading ? <Loader /> :
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
          />
        }>
          <Post
            id={data.seeFullPost.id}
            location={data.seeFullPost.location}
            caption={data.seeFullPost.caption}
            user={data.seeFullPost.user}
            files={data.seeFullPost.files}
            likes={data.seeFullPost.likes}
            isLiked={data.seeFullPost.isLiked}
            likeCount={data.seeFullPost.likeCount}
            commentCount={data.seeFullPost.commentCount}
            comments={data.seeFullPost.comments}
            createdAt={data.seeFullPost.createdAt}
            updatedAt={data.seeFullPost.updatedAt}
          />
        </ScrollView>
      }
    </View>
  )}
