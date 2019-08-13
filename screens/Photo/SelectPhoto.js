import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Linking,  } from 'react-native';
import styled from 'styled-components';
import NavIcon from '../../components/NavIcon'
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

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const selectPhotos = navigation.getParam("selectPhotos",[]);
    return({
      headerLeft:
        <Touchable onPress={() => { navigation.goBack(null) }}>
          <NavIcon style={{paddingLeft:15}} name={"ios-arrow-back"} />
        </Touchable>,
      headerRight:
        <Touchable onPress={() => { navigation.navigate('UploadPhoto',{ capture:selectPhotos } )}}>
          {selectPhotos.length > 0 && <View style={{flexDirection:"row", padding:10}}><Text> 포스팅</Text><Text style={{fontSize:16,fontWeight:"700"}}> {selectPhotos.length} </Text></View> }
        </Touchable>
    })
  }
  constructor(props) {
    super(props);
    const {navigation} = props;
    this.state = {
      hasPermission:false,
      photos:[],
      selectPhoto:"",
      selectPhotos:[],
      loading:true,
      refreshing:false,
    }
  }

  getPermission = async () => {
    try {
      const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);

      if(status === "granted"){
        this.setState({ hasPermission : true})
        await this.getPhoto();
      }
    } catch (e) {
      console.log(e);
      this.setState({ hasPermission : false})
    } finally{
      this.setState({ loading:false });
    }
  }

  setSelectPhoto = (item) => {
    const { navigation } = this.props
    const { selectPhotos } = this.state;
    if(selectPhotos.length < 10 ) {
      selectPhotos.push(item.uri);
      this.setState({ selectPhoto:item, selectPhotos })
      navigation.setParams({ selectPhotos });
    }
  }
  removeSelectPhoto = (item) => {
    const { navigation } = this.props
    const { selectPhotos } = this.state;
    const index = selectPhotos.indexOf(item.uri);
    selectPhotos.splice(index,1);
    this.setState({ selectPhotos, selectPhoto:item })
    navigation.setParams({ selectPhotos });
  }

  getPhoto = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      this.setState({ photos: assets, loading:false });
    } catch (e) {
      console.log(e);
      this.setState({ photos: [] });
    }
  }
  onRefresh = async () => {
    this.setState({ refreshing:true })
    try {
      await this.getPermission();
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ refreshing:false })
    }
  }

  componentDidMount(){
    this.getPermission();
  }

  render(){
    const { loading,selectPhotos,selectPhoto,photos,hasPermission,refreshing } = this.state;
    return (
      <View>
      {loading ? < Loader /> :
        (
          <View>
            {hasPermission ?
              <View>
                <SelectPhoto source={{uri:selectPhoto.uri || photos[0].uri}} />
                <FlatList
                data={photos}
                extraData={this.state}
                numColumns={3}
                refreshing={refreshing}
                onRefresh={this.onRefresh}
                keyExtractor={ item => item.id}
                renderItem={({item}) =>{
                  const include = selectPhotos.includes(item.uri)
                  return ( <Touchable
                activeOpacity={1}
                ref="touch"
                onPress={() => {
                  include ? this.removeSelectPhoto(item) : this.setSelectPhoto(item)
              }}>
                <Image style={{opacity: include ? 0.2 : 1 }}source={{uri:item.uri}} />
                  </Touchable> )}
                } />
              </View>
                :
              <Text>접근을 허가해주세요</Text> }
          </View>
        )
      }
      </View>
    )
  }
}
// export default ({ navigation }) => {
//   const [loading, setLoading] = useState(true);
//   const [state, setState] = useState(false);
//   const [selectPhoto, setSelectPhoto] = useState();
//   const [allPhotos, setAllPhotos] = useState();
//   const [refreshing, setRefreshing] = useState(false);
//   let opacity = 1;
//
//   const setPermission = async () => {
//       try {
//         const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//         if(status === "granted" ) {
//           setState(true)
//           getAlbum();
//         }
//       } catch (e) {
//         console.log(e);
//         useState(false);
//       }
//   }
//   const getAlbum = async () => {
//     try {
//       const { assets } = await MediaLibrary.getAssetsAsync();
//       const [first] = assets;
//       await setSelectPhoto(first);
//       await setAllPhotos(assets);
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setLoading(false);
//     }
//   }
//   const requestPermission = () => {
//     Alert.alert(
//       "접근을 허가해 주세요",
//       '업로드 기능을 이용하기 위해서는 사진에 접근이 필요합니다.',
//       [
//         {
//           text:'허용',
//           onPress: () =>{
//           Linking.openURL('app-settings:');
//           navigation.goBack(null);
//         },
//       },
//       {
//         text:'취소',
//         onPress: () => {
//           navigation.goBack(null);
//         }
//       }
//     ]
//   )
//   }
//   const onRefresh = async () => {
//     setRefreshing(true);
//     try {
//       await setPermission();
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setRefreshing(false);
//     }
//   }
//
//
//   useEffect(() => {
//     setPermission();
//   },[]);
//
//   if(loading){
//     // console.log(selectPhoto);
//   }
//
//   return (
    // <View>
    // {loading ? < Loader /> :
    //   (
    //     <View>
    //       {state ?
    //         <View>
    //           <SelectPhoto source={{uri:selectPhoto.uri}} />
    //           <FlatList
    //           data={allPhotos}
    //           extraData={selectPhoto}
    //           numColumns={3}
    //           refreshing={refreshing}
    //           onRefresh={onRefresh}
    //           keyExtractor={ item => item.id}
    //           renderItem={({item}) =>
    //           <Touchable
    //           activeOpacity={1}
    //           ref="touch"
    //           onPress={() => {
    //             setSelectPhoto(item)
    //         }}>
    //           <Image style={{opacity:item.id === selectPhoto.id ? 0.2 : 1}}source={{uri:item.uri}} />
    //             </Touchable>
    //           } />
    //         </View>
    //           :
    //         requestPermission() }
    //     </View>
    //   )
    // }
    // </View>
// )}
