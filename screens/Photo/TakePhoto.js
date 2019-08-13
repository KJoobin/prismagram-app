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
    this.camera = "";
    this.state = {
      hasPermission:false,
      type:"back",
      flash:"off",
      camera:"",
      onCamera:true,
      capture:[],
      selectPhoto:"",
    }
  }

  static navigationOptions = ({ navigation }) => {
    const capture = navigation.getParam("capture",[])
    return ({
    headerLeft:
    <Touchable onPress={() => { navigation.goBack(null) }}>
      <NavIcon style={{paddingLeft:15}} name={"ios-arrow-back"} />
    </Touchable>,
    headerRight:<Touchable style={{paddingRight:10}} onPress={() => navigation.navigate("UploadPhoto",{ capture })}>{capture.length > 0 && <Text>완료</Text> }</Touchable>
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
  this.camera = ref;
  }

  reverseCamera = () => {
    this.state.type === "front" ? this.setState({type:"back"}) : this.setState({type:"front"});
  }
  flashChange = () => {
    this.state.flash === "on" ? this.setState({flash:"off"}) : this.setState({flash:"on"});
  }
  takePhoto = async (e) => {
    try {
      if(this.camera !== ""){
        const { navigation } = this.props;
        const { capture } = this.state
        const { uri } = await this.camera.takePictureAsync();
        capture.push(uri);
        this.setState({ capture:capture, selectPhoto:uri});
        navigation.setParams({capture:capture})
        // const asset = await MediaLibrary.createAssetAsync(uri);
        // const { assets } = await MediaLibrary.getAssetsAsync();
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({onCamera:false});
    }
  }
  addPhoto = () => {
    const { capture } = this.state
    capture.length < 10 && this.setState({ onCamera:true })
  }

  removePhoto = () => {
    const { capture, selectPhoto } = this.state
    const index = capture.indexOf(selectPhoto);
    capture.splice(index,1)
    this.setState({ capture:capture })
    if(capture.length === 0 ) {
      this.setState({ onCamera:true });
    } else if (index > 0) {
      this.setState({ selectPhoto:capture[index - 1] });
    } else if (index === 0 ) {
      this.setState({ selectPhoto:capture[index] });
    }
  }
  changeSelect = (uri) => {
    this.setState({ selectPhoto:uri });
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
                camera={this.camera}
                onCamera={this.state.onCamera}
                capture={this.state.capture}
                reverseCamera={this.reverseCamera}
                flashChange={this.flashChange}
                takePhoto={this.takePhoto}
                cameraRef={this.cameraRef}
                /> :
                <UploadPhoto
                  photos={this.state.capture}
                  addPhoto={this.addPhoto}
                  selectPhoto={this.state.selectPhoto}
                  removePhoto={this.removePhoto}
                  changeSelect={this.changeSelect}
                    />
               }
           </View> :
           <Text>TakePhoto</Text>
       }
      </View>
    )
  }
}
