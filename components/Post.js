import React, { useState } from 'react';
import styled from 'styled-components';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import constans from '../constans';

const View = styled.View``;
const UserColumn = styled.View`
  padding:10px;
  flex-direction:row;
`;
const UserRow = styled.View`
  margin-left:15px;
`
const Touchable = styled.TouchableOpacity``;

const UserText = styled.Text`
  font-weight:700;
  margin-right:5px;
`;
const Text = styled.Text``;

const Img = styled.Image`
  width:40px;
  height:40px;
`;
const IconWrapper = styled.View`
  flex-direction:row;
  padding:10px;
`;
const IconContainer = styled.View`
  margin-right:15px;
`
const InfoCotainer = styled.View`
`;
const LikeColumn = styled.View`
  margin-bottom:5px;
`;
const CaptionColumn = styled.View`
  flex-direction:row;
`;
const CommentWrapper = styled.View`
  padding:0px 10px;
`;
const CommentContainer = styled.View`
  flex-direction:row;
  margin-bottom:3px;
`;
const Comments = styled.View``;
const CommentCounting = styled.Text`
  opacity:0.5;
  margin-bottom:5px;
`
const TOGGLE_LIKE = gql`
  mutation toggleLike($postId:String!) {
    toggleLike(postId:$postId)
  }
`;

const Post = ({id,location,caption, user, files = [], likeCount, comments = [], commentCount, isLiked}) => {
  const [ liked, setLiked] = useState(isLiked);
  const [ counting, setCounting] = useState(likeCount)
  const [ likeToggle, {loading }] = useMutation(TOGGLE_LIKE,{
    variables:{ postId : id },
    update: (_, { data: { toggleLike } }) => {
      console.log(isLiked);
      console.log(toggleLike);
      console.log(id);
    }
  })
  const likePress = async () => {
    try {
      setCounting(counting + 1)
      likeToggle();
      setLiked(!liked)
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
  return (
    <View>
      <UserColumn>
        <Touchable>
          <Img source={{url:user.photo}} />
        </Touchable>
        <UserRow>
          <Touchable>
            <UserText>{user.username}</UserText>
          </Touchable>
          {location &&
            <Touchable>
              <Text style={{fontWeight:"100"}}>{location}</Text>
            </Touchable>}
        </UserRow>
      </UserColumn>

      <Swiper loop={false} dot=<View style={{backgroundColor:'rgba(255,255,255,1)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3,}} /> style={{height:constans.height / 2.5}}>
      {files.map(file =>
        <Img style={{ width:constans.width, height:constans.height / 2.5 }}key={file.id} source={{url:file.url}} />)}
      </Swiper>
      <IconWrapper>
        <Touchable onPress={likePress}>
          {liked ?
            <Ionicons size={32} name={Platform.OS === 'Ios' ? 'ios-heart' : 'md-heart'} />
            :
            <Ionicons size={32} name={Platform.OS === 'Ios' ? 'ios-heart-empry' : 'md-heart-empty'} />
          }
        </Touchable>
        <IconContainer />
        <Touchable>
          <SimpleLineIcons size={32} name="bubbles" />
        </Touchable>
      </IconWrapper>
      <CommentWrapper>
        <InfoCotainer>
          <LikeColumn>
            <Text>좋아요 갯수 {counting}</Text>
          </LikeColumn>
          <CaptionColumn>
            <Touchable>
              <UserText>{user.username}</UserText>
            </Touchable>
            <Text>{caption}</Text>
          </CaptionColumn>
        </InfoCotainer>
        {commentCount > 2 ? (
          <>
          <CommentCounting>댓글 {commentCount}개 모두 보기</CommentCounting>
          {comments.slice(0,2).map(comment =>
            <CommentContainer key={comment.id}>
            <Touchable>
              <UserText>{comment.user.username}</UserText>
            </Touchable>
            <Text>{comment.text}</Text>
            </CommentContainer>
          )}
          </>
        ) :
        <>
          {comments.map(comment =>
            <CommentContainer key={comment.id}>
            <Touchable>
              <UserText>{comment.user.username}</UserText>
            </Touchable>
            <Text>{comment.text}</Text>
            </CommentContainer>
          )}
        </>
      }
      </CommentWrapper>
    </View>
  )
}




PropTypes.Post = {
    id:PropTypes.string.isRequired,
    location:PropTypes.string,
    caption:PropTypes.string.isRequired,
    user:PropTypes.shape({
      id:PropTypes.string.isRequired,
      username:PropTypes.string.isRequired,
      photo:PropTypes.string.isRequired,
    }).isRequired,
    files:PropTypes.shape({
    }),
    likes:PropTypes.shape({
      id:PropTypes.string.isRequired
    }),
    isLiked:PropTypes.bool.isRequired,
    likeCount:PropTypes.number.isRequired,
    commentCount:PropTypes.number.isRequired,
    comments:PropTypes.shape({
      id:PropTypes.string.isRequired,
      user:PropTypes.shape({
        id:PropTypes.string.isRequired,
        username:PropTypes.string.isRequired
      }).isRequired,
      text:PropTypes.string.isRequired,
      createdAt:PropTypes.string.isRequired,
      updatedAt:PropTypes.string.isRequired
    }),
    createdAt:PropTypes.string.isRequired,
    updatedAt:PropTypes.string.isRequired
  }

export default Post
