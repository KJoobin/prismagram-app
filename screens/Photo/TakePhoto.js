import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import NavIcon from '../../components/NavIcon';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity } from "react-native-gesture-handler";
import UploadPhoto from '../../components/UploadPhoto';
import Camera from '../../components/Camera';


const View = styled.View`
  flex: 1;
`;
const Text = styled.Text``;

const Touchable = styled.TouchableOpacity``;


export default class extends React.Component {

  constructor(props) {
    super(props);
    const { navigation } = props;

    this.state = {
      hasPermission:false,
      type:"back",
      flash:"off",
      camera:"",
      onCamera:true,
      capture:[],
    }
  }

  static navigationOptions = ({ navigation }) => {
    return ({
    headerLeft:
    <Touchable onPress={() => { navigation.goBack(null) }}>
      <NavIcon style={{paddingLeft:15}} name={"ios-arrow-back"} />
    </Touchable>,
    headerRight:<Touchable style={{paddingRight:10}}>{navigation.getParam("onCamera",true) === false && <Text>완료</Text> }</Touchable>
  })
};

  permissionCamera = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if(status === "granted"){
        this.setState({hasPermission:true})
      }
    } catch (e) {
      console.log(e);
      this.setState({hasPermission:false})
    }
  }
  cameraRef = (ref) => {
  this.state.camera === "" && this.setState({camera:ref})
  }

  reverseCamera = () => {
    this.state.type === "front" ? this.setState({type:"back"}) : this.setState({type:"front"});
  }
  flashChange = () => {
    this.state.flash === "on" ? this.setState({flash:"off"}) : this.setState({flash:"on"});
  }
  takePhoto = async (e) => {
    try {
      if(this.state.camera !== ""){

        const { uri } = await this.state.camera.takePictureAsync();
        this.state.capture.push(uri);
        this.setState({capture:this.state.capture});
        // const asset = await MediaLibrary.createAssetAsync(uri);
        // const { assets } = await MediaLibrary.getAssetsAsync();
      }
    } catch (e) {
      console.log(e);
    } finally {
      const { navigation } = this.props;
      navigation.setParams({onCamera:false})
      this.setState({onCamera:false});
    }
  }
  componentDidMount(){
    this.permissionCamera()
  }

  render() {
   return (
       <View>
         {
           this.state.hasPermission ?
           <View>
             {this.state.onCamera ?<Camera
               hasPermission={this.state.hasPermission}
               type={this.state.type}
               flash={this.state.flash}
               camera={this.state.camera}
               onCamera={this.state.onCamera}
               capture={this.state.capture}
               reverseCamera={this.reverseCamera}
               flashChange={this.flashChange}
               takePhoto={this.takePhoto}
               cameraRef={this.cameraRef}
               />:
               <UploadPhoto
                 photos={this.state.capture}
                 setState={this.setState} />
           }
           </View> :
             <Text>TakePhoto</Text>
         }
       </View>
    )
  }
}
