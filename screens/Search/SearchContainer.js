import React, { useState } from 'react';
import { Keyboard, FlatList } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';
import constans from '../../constans';

const WIDTH = constans.width;

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  flex-direction:row;

`;
const View = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`;
const Text = styled.Text``;
const Touchable = styled.TouchableOpacity`
  width:${constans.width / 3};
  height:${constans.width / 3};
`;
const Img = styled.Image`
  width:${constans.width / 3};
  height:${constans.width / 3};
`;

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
      setPosts(data);
    },});
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

  if( typing && !loading && once ) {
    searchPostMutation();
  };
  let columnStyle = null
  if(posts.length > 1) {
     columnStyle = { flexDirection:"column"}
  }
  return(
    <TouchableWithoutFeedback>
    { loading ? <Loader / > :
      <FlatList
        data={posts}
        keyExtractor={ item => item.id}
        numColumns={3}
        renderItem={({item}) => {
          return(
            <Touchable onPress={()=> navigation.navigate("Detail", { id : item.id } ) } >
              <Img source={{ uri: item.files[0].url}} />
            </Touchable>
          )
        }
      }
      />
    }
    </TouchableWithoutFeedback>
  )
}

SearchContainer.propTypes = {
  term:PropTypes.string.isRequired,
  typing:PropTypes.bool.isRequired,
};

export default SearchContainer;
