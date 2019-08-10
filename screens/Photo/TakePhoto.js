import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import NavIcon from '../../components/NavIcon';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera'
import { TouchableOpacity } from "react-native-gesture-handler";
import * as FileSystem from 'expo-file-system';
import constans from '../../constans';

const View = styled.View`
  flex: 1;
`;
const CameraView = styled.View``;
const FuncWrapper = styled.View`
  flex-direction:row;
  justify-content:space-between;
  height:50px;
`;
const Text = styled.Text``;
const Image = styled.Image`
  height:${constans.width};
`;

export default (props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState("back");
  const [flash, setFlash] = useState("off");
  const [camera, setCamera] = useState();
  const [onCamera, setOnCamera] = useState(true);
  const [capture, setCapture] = useState();

  const permissionCamera = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if(status === "granted"){
        setHasPermission(true)
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    } finally {
    }
  }

  const reverseCamera = () => {
    type === "front" ? setType("back") : setType("front");
  }
  const flashChange = () => {
    flash === "on" ? setFlash("off") : setFlash("on");
  }
  const takePhoto = async (e) => {
    try {
      if(camera){
        const { uri } = await camera.takePictureAsync();
        setCapture(uri);
        // const asset = await MediaLibrary.createAssetAsync(uri);
        // const { assets } = await MediaLibrary.getAssetsAsync();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setOnCamera(false);
    }
  }
  const fileStorage = () => {

  }
  useEffect(() => {
    permissionCamera();
  },[])
  return(
    <View>
      {
        hasPermission ?
        <View>
          {onCamera ?
            <>
          <Camera
            style={{ justifyContent:"flex-end",height:constans.height/1.8, paddingBottom:10, paddingRight:25, paddingLeft:25,}}
            type={type === "front" ? Camera.Constants.Type.front : Camera.Constants.Type.back}
            flashMode={flash === "off" ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on}
            ref={ref => { setCamera(ref)}}
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
          </>
          : <Image source={{uri:capture}} />
        }
        </View> :
          <Text>TakePhoto</Text>
      }
    </View>
  )
}
