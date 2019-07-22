import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import constans from '../../constans';
import useInput from '../../Hooks/useInput';

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
  const password = useInput("")
  return (
    <View>
      <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
      <AuthInput
        autoCompleteType={"password"}
        autoCapitalize={"none"}
        placeholder={"비밀번호"}
        secureTextEntry={true}
        {...password}
      />
      <AuthButton text={"로그인"} onPress={() => navigation.navigate("Login")}/>
      <RowTouch onPress={() => navigation.navigate("Login")}>
        <GreyText>로그인 상세 정보를 잊으셨나요? </GreyText><Text>로그인 도움말 보기</Text>
      </RowTouch>
      <Signup>
        <RowTouch onPress={() => navigation.navigate("Signup")}>
          <GreyText>계정이 없으신가요? </GreyText><Text>가입하기</Text>
        </RowTouch>
      </Signup>
    </View>
  )
}
