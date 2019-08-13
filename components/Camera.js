import React from 'react';
import styled from 'styled-components';
import NavIcon from './NavIcon';
import { TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera'
import PropTypes from 'prop-types';
import constans from '../constans';

const View = styled.View`
  flex: 1;
`;
const CameraView = styled.View``;
const FuncWrapper = styled.View`
  flex-direction:row;
  justify-content:space-between;
  height:50px;
`;

const Touchable = styled.TouchableOpacity``;
const Text = styled.Text``;
const Image = styled.Image`
  height:${constans.width};
`;
const CameraConstructor = ({
  hasPermission,
  type,
  flash,
  camera,
  onCamera,
  capture,
  reverseCamera,
  flashChange,
  takePhoto,
  cameraRef,
}) => {
  
  return (
    <View>
      <Camera
      style={{ justifyContent:"flex-end",height:constans.height/1.8, paddingBottom:10, paddingRight:25, paddingLeft:25,}}
      type={type === "front" ? Camera.Constants.Type.front : Camera.Constants.Type.back}
      flashMode={flash === "off" ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on}
      ref={ref => { cameraRef(ref) }}
      pictureSize={"Hign"}
      >
      <CameraView>
        <FuncWrapper>
          <TouchableOpacity onPress={reverseCamera}>
            <NavIcon color={"white"} size={45} name={"ios-reverse-camera"}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={flashChange}>
            <NavIcon color={"white"} size={45} name={flash === "on" ? "ios-flash" : "ios-flash-off"} />
          </TouchableOpacity>
        </FuncWrapper>
      </CameraView>
      </Camera>
      <View style={{justifyContent:"center", alignItems:"center"}}>
      <TouchableOpacity onPress={(takePhoto)}>
        <NavIcon name={"ios-radio-button-on"} size={70} />
      </TouchableOpacity>
      </View>
    </View>
  )
}

CameraConstructor.propTypes = {

}
export default CameraConstructor;
