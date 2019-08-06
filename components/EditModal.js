import React, {useState} from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constans from '../constans';
import styles from '../styles';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import Loader from './Loader';


const Touchable = styled.TouchableOpacity`
  width:${(constans.width - 70) / 2};
  border:1px solid blue;
  border-radius:5;
`;
const ModalWapper = styled.View`
  position:absolute;
  align-items:center;
  flex:1;
  padding:15px;
  z-index:2;
`;
const ModalOpacity = styled.View`
  position:absolute;
  width:${constans.width};
  height:${constans.height};
  opacity:0.4;
  background-color:black;
`;
const Modal = styled.View`
  background-color:white;
  width:${constans.width - 30};
  opacity:1;
  z-index:3;
  padding:15px;
`;
const ButtonColumn = styled.View`
  flex-direction:row;
`;
const MarginR = styled.View`
  margin-right:10px;
`;
const Avatar = styled.Image`
  width:100px;
  height:100px;
  border-radius:50;
  align-self:center;
  margin-bottom:10px;
`;
const Bold = styled.Text`
  font-size:16px;
  font-weight:500;
  margin-left:5px;
`;
const Input = styled.TextInput`
  background-color:#E4E4E4;
  height:30px;
  padding:0px 10px;
  margin:10px 0px;
`;
const Button = styled.Button`
  background-color:black;
`;

const EDIT_USER = gql`
  mutation editUser(
    $username:String,
    $firstName:String,
    $bio:String!,
    $photo:String
  ){
    editUser(
      username:$username,
      firstName:$firstName,
      bio:$bio,
      photo:$photo
    ){
      id
      bio
    }
  }
`;
const EditModal = ({ fullName ,photo ,email ,bio, cancel, editBio, setModal }) => {
  const [editUserMutation, { loading }] = useMutation(EDIT_USER,{
    variables: {
      bio:bio,
      photo:photo,
    },
    update:(_,data) => {
      console.log(data);
    }
  });

  const change = async () => {
    if(!loading) {
      try {
        await editUserMutation();
      } catch (e) {
        console.log(e);
      } finally {
        setModal(false);
      }
    }
  }
  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <ModalWapper>
  <Modal>
  {loading && <Loader/>}
    <Avatar source={{uri:photo}} />
    <Touchable style={{alignSelf:"center",marginBottom:10,}}>
      <Button title={"프로필 사진 변경"} />
    </Touchable>
    <Bold>email</Bold>
    <Input value={email}/>
    <Bold>UserName</Bold>
    <Input value={fullName} returnKeyType={'next'}/>
    <Bold>Bio</Bold>
    <Input value={bio} onChangeText={editBio}  style={{height:90, paddingTop:10,}} multiline={true}/>
    <ButtonColumn>
      <Touchable>
        <Button title={"작성"} onPress={change} />
      </Touchable>
      <MarginR />
      <Touchable>
        <Button title={"취소"} onPress={cancel} />
      </Touchable>
    </ButtonColumn>
  </Modal>
    <ModalOpacity />
  </ModalWapper>
  </TouchableWithoutFeedback>
)}

EditModal.propTypes = {
  fullName:PropTypes.string.isRequired,
  photo:PropTypes.string.isRequired,
  email:PropTypes.string.isRequired,
  bio:PropTypes.string.isRequired,
  cancel:PropTypes.func.isRequired,
  editBio:PropTypes.func.isRequired,
  setModal:PropTypes.func.isRequired,
}

export default EditModal;
