import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import constans from '../../constans';

const View = styled.View`
  flex: 1;
  align-items: center;
  top:${constans.height/4};
`;

const Text = styled.Text`
  font-size:20px;
  margin-bottom:30px;
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
  const email = navigation.getParam("email");
  return (
    <View>
      <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
      <Text>등록하신 이메일로 비밀번호가 전송됩니다.</Text>
      <AuthButton text={"다음"} onPress={() => navigation.navigate("Confirm",{ email })}/>
    </View>
  )
}
