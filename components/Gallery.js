import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import { FlatList, Image, ActivityIndicator } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';
import constans from '../constans';
import {gql} from 'apollo-boost';
import {useMutation} from 'react-apollo-hooks';
const View = styled.View`
    flex:1;
`;
const AvatarColumn = styled.View`
    justify-content:center;
    align-items:center;
    margin:20px 0px;
`;
const GalleyColumn = styled.View``;
const Avatar = styled.Image`
    border-radius:100;
`;
const Text = styled.Text``;

const TouchableOpacity = styled.TouchableOpacity``;
const Button = styled.Button``;

const EDIT_USER = gql `
  mutation editUser($photo: String) {
    editUser(photo: $photo) {
      photo
    }
  }
`;

export default ({
    setEditAvatar,
    photo,
    refetch,
}) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [photos, setPhotos] = useState();
    const [selectPhoto, setSelectPhoto] = useState({uri : photo});
    const [same, setSame] = useState(true);
    const [loading, setLoading] = useState(false);
    const [editUserMutation] = useMutation(EDIT_USER);

    const permission = async () => {
        try{
            const {permissions:{cameraRoll:{status}}} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if(status === "granted") {
                const { assets } = await MediaLibrary.getAssetsAsync();
                setPhotos(assets);
                setHasPermission(true);
            }
            

        } catch(e){
            console.log(e);
        } finally{
        }
    }
    const permissionIsF = () => {
        setEditAvatar(false);
    }
    const onChange = async (e) => {
        setLoading(true);
        const file = selectPhoto;
        const name = file.filename;
        const [_, type] = file.filename.toLowerCase().split('.')
        const uri = file.uri;
        const formdata = new FormData();
        formdata.append("file", { name, type, uri });
        try {
            const {data: { location: imageUpload }} = await axios({
                url: `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://prismagram1.herokuapp.com/"}/api/image`,
                data: formdata,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                method: 'POST',
            })
            console.log(imageUpload);
            await editUserMutation({
                variables: {
                    photo: imageUpload
                },
            });
            await refetch();
            setEditAvatar(false);
        } catch (error) {
            const { response } = error;
            console.log(response.data);
            console.log(response.status);
            console.log(response.headers);
            setLoading(false);
        }
    }


    useEffect(() => {
        permission();
    },[]);
    useEffect(() => {
        if (!same && selectPhoto.uri === photo) {
            setSame(true);
        } else if(same && selectPhoto.uri !== photo) {
            setSame(false);
        }
    }, [selectPhoto])
    return (
        <View>
            {hasPermission ? 
                <View>
                    { loading ? <View style={{justifyContent:"center", alignItems:"center"}}>< ActivityIndicator size={"large"} /></View> :
                    <View>
                    < AvatarColumn>
                        <Avatar style={{height:constans.width / 2, width:constans.width / 2}} source={{uri: selectPhoto.uri}}/>
                        <TouchableOpacity style={{marginTop:5, flexDirection:"row"}}>
                            {!same && 
                            < Button style={{width:30}}title={"변경"} onPress={onChange}/>}
                            < Button style={{width:30}}title={"취소"} onPress={() => setEditAvatar(false)}/>
                        </TouchableOpacity>
                    </AvatarColumn>
                    <GalleyColumn>
                        < FlatList
                        data = {
                            photos
                        }
                        keyExtractor = {(item) => 
                            item.id
                        }
                        numColumns={3}
                        renderItem = {({item}) =>
                        <TouchableOpacity onPress={() => setSelectPhoto(item)}>
                            <Image style={{height:constans.width / 3, width:constans.width / 3}} source={{uri:item.uri}} />
                        </TouchableOpacity>} />
                    </GalleyColumn>
                    </View>
                    }
                </View> 
            : 
                <View style={{justifyContent:"center", alignItems:"center"}}>
                    <TouchableOpacity >
                        < Button title = {
                            "카메라 접근을 허용해주세요~"
                        }
                        onPress = {
                            permissionIsF
                        }
                        />
                    </TouchableOpacity>
                </View>}    
        </View>
    )
}