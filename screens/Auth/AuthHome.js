import React, { useState } from 'react';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import styled from 'styled-components';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN } from './AuthQuery';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import constans from '../../constans';
import useInput from '../../Hooks/useInput';
import emailReg from '../../emailReg';

const View = styled.View`
  flex: 1;
  justify-content:center;
  align-items: center;
`;

const Text = styled.Text`
  font-size:16px;
`
const GreyText = styled.Text`
  font-size:16px;
  color:${(props) => props.theme.lightGreyColor}
`;
const WhiteText = styled.Text`
  color:white;
`

const Image = styled.Image`
  width:${constans.width / 2};
  margin-bottom: 30px;
`

const RowTouch = styled.TouchableOpacity`
  flex-direction: row;
  margin-top:30px;
  margin-bottom:30px;
`

const Signup = styled.View`
  bottom:0;
`

// <Input placeholder={"비밀번호"} secureTextEntry={true}/>
export default ({ navigation }) => {
  const email = useInput("")
  const [requestSecret, {loading}] = useMutation(LOG_IN,{
    variables: {
      email:email.value
    },
    update: (_, {data: { requestSecret }}) => {
      const [hasEmail, hasSecret] = requestSecret;
      if(hasEmail === "false") {
        Alert.alert("존재하지 않는 email 입니다.")
    } else if (hasSecret === "false") {
        navigation.navigate("SendConfrimSecret")
      } else {
        navigation.navigate("Confirm",{ email: email.value });
      }
    }
  });

  const handleLogin = async () => {

  if(email.value === "" ) {
     Alert.alert("empty");
  } else if (!emailReg(email.value)) {
     Alert.alert("not email")
  }
  try {
    await requestSecret();
  } catch (e){
    console.log(e);
  }
}
  if(navigation.getParam('email') !== undefined) {
    email.onChangeText = navigation.getParam('email');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
        <AuthInput
          placeholder={"전화번호, 이메일 주소 또는 사용자 이름"}
          keyboardType={"email-address"}
          autoCompleteType={'email'}
          autoCapitalize={'none'}
          autoCorrect={false}
          returnKeyType={"send"}
          onSubmitEditing={handleLogin}
          {...email} />
        <AuthButton text={"로그인"} loading={loading} onPress={handleLogin} />
        <RowTouch onPress={() => navigation.navigate("Login")}>
          <GreyText>로그인 상세 정보를 잊으셨나요? </GreyText><Text>로그인 도움말 보기</Text>
        </RowTouch>
        <Signup>
          <RowTouch onPress={() => navigation.navigate("Signup")}>
            <GreyText>계정이 없으신가요? </GreyText><Text>가입하기</Text>
          </RowTouch>
        </Signup>
      </View>
    </TouchableWithoutFeedback>
  )
}
