import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { CONFIRM_SECRET } from './AuthQuery';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import constans from '../../constans';
import useInput from '../../Hooks/useInput';
import { useLogIn } from '../../AuthContext';

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
  const {state: { params : email } } = navigation;
  const password = useInput("")
  const logIn = useLogIn();
  const [confirmSecret, {loading}] = useMutation(CONFIRM_SECRET,{
    variables:{email: navigation.getParam("email"), secret: password.value},
    update: (_, {data: { confirmSecret } } ) => {
      if(confirmSecret !== "" && confirmSecret !== "false") {
        logIn(confirmSecret);
      } else {
        Alert.alert("Wrong email / password combination");
      }
    }
  })
  const confirmLogin = async () => {
    if(password.value === "" ) {
      Alert.alert("empty password");
    } else {
      try {
        await confirmSecret();
      } catch (e) {
        Alert.alert("Wrong email/password combination")
      } finally {

      }
    }
  }
  return (
    <View>
      <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
      <AuthInput
        autoCompleteType={"password"}
        autoCapitalize={"none"}
        placeholder={"비밀번호"}
        secureTextEntry={true}
        returnKeyType={"send"}
        {...password}
        onSubmitEditing={confirmLogin}
      />
      <AuthButton text={"로그인"} loading={loading} onPress={confirmLogin}/>
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
