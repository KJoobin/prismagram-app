import React, {useState} from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import useInput from '../../Hooks/useInput';
import constans from '../../constans';
import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';
import { CREATE_ACCOUNT } from './AuthQuery';
import { useMutation } from 'react-apollo-hooks';


const TouchableOpacity = styled.TouchableOpacity`
  border-bottom-width:1px;
  width:${constans.width / 3};
  border-bottom-color:${(props) => props.changeColor}
`

const RowPosition = styled.View`
  flex-direction:row;
  display:flex;
  justify-content:center;
  width:${constans.width};
  margin-bottom:30px;
`
const View = styled.View`
  flex: 1;
  align-items: center;
`;


const Text = styled.Text`
  font-size:17px;
  font-weight:300;
  text-align:center;
  margin-bottom:15px;
  color:${(props) => props.textColor};
`;

const Image = styled.Image`
  width:${constans.width / 2};
  margin-top:${constans.height / 8};
  margin-bottom: 30px;
`

export default ({ navigation }) => {
  const email = navigation.getParam("email");
  const username = useInput("");
  const firstName = useInput("");
  const bio = useInput("");
  const [createAccount, {loading} ] = useMutation(CREATE_ACCOUNT,{
    variables:{email, username: username.value, firstName: firstName.value, bio: bio.value},
    update: (_,{data: { createAccount } }) => {
      if(createAccount) {
        navigation.navigate("AuthHome",{ email: email.value } );
      } else {
        Alert.alert("username 이 중복됩니다.")
        username.onChangeText = "";
      }
    }
  })

  const pressPhone = () => {
    setPhoneColor("black")
    setEmailColor(lightGreyColor)
  }
  const pressEmail = () => {
    setPhoneColor(lightGreyColor)
    setEmailColor("black")
  }
  const createUser = async () => {
    if(username.value === "") {
      Alert.alert("empty username")
    } else if ( username.value.includes(" ")) {
      Alert.alert("유저 네임에는 공백을 넣을수 없습니다.")
    } else {
      try{
        await createAccount();
      } catch(e) {
        console.log(e);
      }
    }
  }
  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View>
      <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
        <AuthInput placeholder={"email"} value={email} editale={false} returnKeyType={"next"} />
        <AuthInput placeholder={"FirstName"} {...firstName} returnKeyType={"next"} />
        <AuthInput placeholder={"Username"} {...username} returnKeyType={"next"} />
        <AuthInput placeholder={"Bio"} {...bio} returnKeyType={"send"} onSubmitEditing={createUser} />
        <AuthButton onPress={createUser} text={"회원가입"} loading={loading}/>
    </View>
  </TouchableWithoutFeedback>
)}
