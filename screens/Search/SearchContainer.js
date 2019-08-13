import React, { useState, useEffect } from 'react';
import { Keyboard, FlatList } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';
import constans from '../../constans';
import PostCard from '../../components/PostCard';
import UserCard from '../../components/UserCard'

const WIDTH = constans.width;

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  flex-direction:row;
  padding:10px 0px;

`;
const View = styled.View`
  flex:1;
  padding:10px;
`;
const Text = styled.Text``;
const Touchable = styled.TouchableOpacity`
  width:${constans.width / 3};
  height:${constans.width / 3};
`;


const SEARCH_POST = gql`
  query searchPost($term: String!) {
    searchPost(term: $term){
      id,
      files{
        id
        url
      }
    }
  }
`;
const SEARCH_USER = gql`
  query searchUser($term: String!) {
    searchUser(term: $term) {
      id
      photo
      fullName
      isFollowing
      isSelf
    }
  }
`;
const SearchContainer = ({ term, typing, navigation }) => {
  const [once, setOnce ] = useState(true);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPost] = useMutation(SEARCH_POST,{
    variables:{ term: term },
    update:(_,{ data: { searchPost : data } }) => {
      setPosts(data);
    },});
    const [searchUser] = useMutation(SEARCH_USER,{
      variables:{ term: term },
      update: (_, { data }) => {
        setUsers(data.searchUser)
      }
    })
  const searchPostMutation = async () => {
    try {
      setLoading(true);
      await searchPost();
      await searchUser();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setOnce(false);
    }
  }

  if( typing && !loading && once ) {
    searchPostMutation();
  };

  let columnStyle;
  if(posts.length > 1) {
     columnStyle = { flexDirection:"column"}
  }
  useEffect( ()=> {
    setOnce(true);
  },[typing])
  return(
    <TouchableWithoutFeedback>
    { loading ?
      <Loader / > :
      <View>
      {users.length > 1 && <FlatList
        horizontal={true}
        data={users}
        keyExtractor={ item => item.id}
        renderItem={({item}) => {
          return(
            <UserCard
              id={item.id}
              photo={item.photo}
              fullName={item.fullName}
              isFollowing={item.isFollowing}
              isSelf={item.isSelf}
              navigation={navigation}/>
          )
        }}
        />
      }
      <FlatList
        data={posts}
        keyExtractor={ item => item.id}
        numColumns={3}
        renderItem={({item}) => {
          return(
            <PostCard
              id={item.id}
              file={item.files[0]}
              navigation={navigation}/>
          )
        }}
      />
      </View>
    }
    </TouchableWithoutFeedback>
  )
}

SearchContainer.propTypes = {
  term:PropTypes.string.isRequired,
  typing:PropTypes.bool.isRequired,
};

export default SearchContainer;
