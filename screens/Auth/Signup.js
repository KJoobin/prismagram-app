import React, {useState} from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import useInput from '../../Hooks/useInput';
import constans from '../../constans';
import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';
import { useMutation } from 'react-apollo-hooks';
import { EMAIL_OVERLAP } from './AuthQuery';
import emailReg from '../../emailReg';

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
  const email = useInput("");
  const phone = useInput("");
  const lightGreyColor = "#c7c7c7";
  const [phoneColor, setPhoneColor] = useState("black");
  const [emailColor, setEmailColor] = useState(lightGreyColor)

  const [isOverlap, {loading}] = useMutation(EMAIL_OVERLAP,{
    variables:{email : email.value},
    update:(_, {data: { isOverlap } }) => {
      if(isOverlap) {
        Alert.alert("중복되는 이메일 입니다!")
        console.log(email.onChangeText(""));
      } else {
        navigation.navigate("SignInfo",{ email: email.value });
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
  const pressButton = () => {
    if(emailReg(email.value)) {
      isOverlap();
    } else {
      Alert.alert("유요하지 않은 이메일입니다.")
    }
  }
  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View>
      <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
        <RowPosition>
          <TouchableOpacity changeColor={phoneColor} onPress={pressPhone}>
          <Text textColor={phoneColor}> 전화번호 </Text>
          </TouchableOpacity>
          <TouchableOpacity changeColor={emailColor} onPress={pressEmail}>
            <Text textColor={emailColor}> 이메일 </Text>
          </TouchableOpacity>
        </RowPosition>
        {emailColor === "black" ? <AuthInput onSubmitEditing={pressButton} placeholder={"email"} returnKeyType={"send"} {...email} /> : <AuthInput onSubmitEditing={pressButton} placeholder={"000-0000-0000"} keyboardType={"phone-pad"} {...phone} />}
        <AuthButton onPress={pressButton} text={"다음"} loading={loading}/>
    </View>
  </TouchableWithoutFeedback>
)}
