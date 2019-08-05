import React from 'react';
import styled from 'styled-components';
import { FlatList, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import PostCard from './PostCard';
import constans from '../constans';


const Touchable = styled.TouchableOpacity`
`;
const View = styled.View`
  flex:1;
`;
const UserWapper = styled.View`
  width:${constans.width};
  padding:15px;
  flex-direction:row;
  margin-bottom:15px;
`;
const BioWapper = styled.View`
  padding:15px;
  width:${constans.width};
  margin-bottom:15px;
`;
const Summary = styled.View`
height:${constans.width / 4};
flex:1;
justify-content:center;
align-items:center;
padding:15px;
`;
const EditButton = styled.Button``;
const Avatar = styled.Image`
  width:${constans.width / 4};
  height:${constans.width / 4};
  border-radius: 50;
  background-color:black;
  margin-right:15px;
`;
const Bold = styled.Text`
  font-weight:500;
  font-size:20px;
  text-align:center;
`;
const Text = styled.Text``;
const BioText = styled.Text`
  font-weight:400;
  font-size:15px;
`;

const User =  ({
  navigation,
  photo,
  posts,
  fullName,
  postCount,
  followingCount,
  followerCount,
  bio,
  isSelf,
 }) => {
  return (
    <ScrollView style={{backgroundColor:"#efefef",}}>
      <UserWapper>
          <Avatar source={{uri : photo}} />
          <Summary>
            <Text>게시글</Text>
            <Touchable>
              <Bold>{postCount}</Bold>
            </Touchable>
          </Summary>
          <Summary>
            <Text>팔로워</Text>
            <Touchable>
              <Bold>{followerCount}</Bold>
            </Touchable>
          </Summary>
          <Summary>
            <Text>팔로잉</Text>
            <Touchable>
              <Bold>{followingCount}</Bold>
            </Touchable>
          </Summary>
      </UserWapper>
      <BioWapper>
        <BioText>{bio}</BioText>
        {isSelf &&
          <Touchable style={{backgroundColor:"white", borderRadius:10, marginTop:15,}}>
            <EditButton color={""}title={"프로필 수정"}/>
          </Touchable>
        }
      </BioWapper>
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
    </ScrollView>
  )
}

User.propTypes = {
  photo:PropTypes.string.isRequired,
  posts:PropTypes.array.isRequired,
  fullName:PropTypes.string.isRequired,
  postCount:PropTypes.number.isRequired,
  followingCount:PropTypes.number.isRequired,
  followerCount:PropTypes.number.isRequired,
  bio:PropTypes.string.isRequired,
  isSelf:PropTypes.bool.isRequired,
}

export default User;
