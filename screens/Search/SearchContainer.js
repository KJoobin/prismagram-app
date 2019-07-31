import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';

const View = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`;
const Text = styled.Text``;
const Touchable = styled.TouchableOpacity``;

const SEARCH_POST = gql`
  query searchPost($term: String!) {
    searchPost(term: $term){
      id,
      likeCount,
      commentCount,
      files{
        id
        url
      }
    }
  }
`;

const SearchContainer = ({ term, typing, navigation }) => {
  const [once, setOnce ] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchPost, { loading }] = useMutation(SEARCH_POST,{
    variables:{ term: term },
    update:(_,{ data: { searchPost : data } }) => {
      console.log(term);
      setPosts(data);
    }
  },);
  const searchPostMutation = async () => {
    try {
      await searchPost();
      setOnce(false);
    } catch (e) {
      console.log(e);
    }
  }
  if(!typing && !once) {
    setOnce(true);
  }

  console.log(typing, loading, once);

  if( typing && !loading && once ) {
    searchPostMutation();
  }
  console.log(posts.length);
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
      {loading ? <Loader /> : (
        <>
      {posts.map((post) =>{
        if(post.files[0].url.length >= 1) {
        return (
          <Touchable key={post.id}>
            <Text>{post.files[0].url}</Text>
          </Touchable>
          )
        }
        })
      }
      </>
    )}

        <Text>search</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

SearchContainer.propTypes = {
  term:PropTypes.string.isRequired,
  typing:PropTypes.bool.isRequired,
};

export default SearchContainer;
