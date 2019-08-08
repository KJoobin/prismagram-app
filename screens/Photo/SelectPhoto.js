import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Linking,  } from 'react-native';
import styled from 'styled-components';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Loader from '../../components/Loader';
import constans from '../../constans';

const View = styled.View`
  flex: 1;
`;
const Touchable = styled.TouchableOpacity``;

const Text = styled.Text`

`;
const SelectPhoto = styled.Image`
  width:${constans.width};
  height:${constans.height / 2};
`;

const Image = styled.Image`
  width:${constans.width / 3};
  height:${constans.width / 3};
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState();
  const [allPhotos, setAllPhotos] = useState();
  let opacity = 1;

  const setPermission = async () => {
      try {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(status === "granted" ) {
          setState(true)
          getAlbum();
        }
      } catch (e) {
        console.log(e);
        useState(false);
      }
  }
  const getAlbum = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [first] = assets;
      await setSelectPhoto(first);
      await setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  const requestPermission = () => {
    Alert.alert(
      "접근을 허가해 주세요",
      '업로드 기능을 이용하기 위해서는 사진에 접근이 필요합니다.',
      [
        {
          text:'허용',
          onPress: () =>{
          Linking.openURL('app-settings:');
          navigation.goBack(null);
        },
      },
      {
        text:'취소',
        onPress: () => {
          navigation.goBack(null);
        }
      }
    ]
  )
  }


  useEffect(() => {
    setPermission();
  },[]);

  if(loading){
    // console.log(selectPhoto);
  }

  return (
    <View>
    {loading ? < Loader /> :
      (
        <View>
          {state ?
            <View>
              <SelectPhoto source={{uri:selectPhoto.uri}} />
              <FlatList
              data={allPhotos}
              extraData={selectPhoto}
              numColumns={3}
              keyExtractor={ item => item.id}
              renderItem={({item}) =>
              <Touchable
              activeOpacity={100}
              ref="touch"
              onPress={() => {
                setSelectPhoto(item)
            }}>
              <Image style={{opacity:item.id === selectPhoto.id ? 0.2 : 1}}source={{uri:item.uri}} />
                </Touchable>
              } />
            </View>
              :
            requestPermission() }
        </View>
      )
    }
    </View>
)}
