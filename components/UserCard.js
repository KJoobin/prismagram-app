import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constans from '../constans';
import styles from '../styles'

const Img = styled.Image`
  width:${constans.width / 7};
  height:${constans.width / 7};
  border-radius: 30;
  margin-bottom:10px;
`;
const MarginB = styled.View`
  margin-bottom:10px;
`;

const WhiteBox = styled.View`
  padding:10px;
  ${styles.whiteBox};
  width:${constans.width / 3};
  justify-content:center;
  align-items:center;
`;
const Touchable = styled.TouchableOpacity`
  margin-right:5px;
`;
const TouchButton = styled.TouchableOpacity`
  margin:10px 0px;
`;
const Bold = styled.Text`
  font-weight:600;
`;
const Text = styled.Text`
  font-size:16px;
`;
const Button = styled.Button`
  width:${constans.width / 3 - 20};
`;

const UserCard = ({ navigation, id, photo, fullName, isSelf, isFollowing }) => {
  return(
    <Touchable onPress={()=> navigation.navigate("Detail", { id } ) } >
      <WhiteBox>
        <Img source={{ uri:photo}} />
        <Bold>{fullName}</Bold>
        <TouchButton style={{borderWidth:1, borderStyle:"solid", borderColor:styles.lightGreyColor, borderRadius:5, width:constans.width/3-20,}}>
          {isSelf ? <Button title={'내 정보'} /> : <Button title={"팔로우"} />}
        </TouchButton>
      </WhiteBox>
    </Touchable>
  )
}

UserCard.propTypes = {
  id:PropTypes.string.isRequired,
  photo:PropTypes.string.isRequired,
  fullName:PropTypes.string.isRequired,
  isFollowing:PropTypes.bool.isRequired,
  isSelf:PropTypes.bool.isRequired,
}

export default UserCard;
