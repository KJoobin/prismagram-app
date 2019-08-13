import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import useInput from '../../Hooks/useInput';
import NavIcon from '../../components/NavIcon';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from "react-native-gesture-handler";
import constans from '../../constans';
import styles from '../../styles'
import UploadFeed from '../../components/UploadFeed';

const View = styled.View`
`;
const ImageColumn = styled.View`
  width:${constans.width};
  height:${constans.width};
  margin-bottom:10px;
`;
const BioColumn = styled.View`
  margin-bottom:10px;
  align-items:center;
`;
const Tag = styled.View`
  height:20px;
  background-color:#D8E8F2;
  margin-right:10px;
`;
const Img = styled.Image``;
const Text = styled.Text``;

const TextInput = styled.TextInput`
  border:1px ${styles.lightGreyColor} solid;
  border-radius:10px;
  padding:10px;
  width:${constans.width / 1.2};
`;



export default class extends React.Component {

  constructor(props){
    super(props);
    const { navigation } = props
    this.state = ({
      text:"",
      tag:[],
      files:navigation.getParam("capture",[]),
      bio:"",
    })
  }

  static navigationOptions({ navigation }) {

    return ({
    headerLeft:
    <TouchableOpacity onPress={() => { navigation.goBack(null) }}>
      <NavIcon style={{paddingLeft:15}} name={"ios-arrow-back"} />
    </TouchableOpacity>,
    headerRight:<UploadFeed navigation={navigation}/>
  })
};

  hashtagInput = (e) => {
    if(e[e.length - 1] !== " ")
      this.setState({text:e});
  }
  onKeyPress = ({nativeEvent}) => {
    const { navigation } = this.props;
    const { key } = nativeEvent;
    const { text, tag } = this.state
    tagText = text[0] === "#" ? text : "#" + text;
    if(text !== "" && !tag.includes(tagText) && key === " ") {
      const tempTag = tag.slice();
      tempTag.push(tagText);
      this.setState({ tag:tempTag, text:"" })
      navigation.setParams({ tag:tempTag })
    } else if(tag.includes(tagText)) {
      this.setState({ text:"" })
    }

  }
  onChange = (e) => {
    const { navigation } = this.props;
    this.setState({bio:e})
    navigation.setParams({ bio:e })
  }
  edit = () => {
    console.log(edit);
  }
  render(){
    const { text, tag, bio,files } = this.state;
    return(
      <View style={{flex:1, padding:10,}}>
        <BioColumn>
          <Text style={{fontWeight:"500", fontSize:16, marginLeft:constans.width / 12.5, alignSelf:"flex-start"}}>게시글</Text>
          <TextInput style={{marginBottom:10, marginTop:10, height:constans.height / 10}} autoCompleteType={"off"}  multiline={true} placeholder={"지금 기분을 표현하세요..."} value={bio} onChangeText={this.onChange} />
          <Text style={{fontWeight:"500", fontSize:16, marginLeft:constans.width / 12.5, alignSelf:"flex-start"}} > 장소 태그하기 </Text>
          <TextInput returnKeyType={"go"} style={{marginBottom:10, marginTop:10,}} autoCompleteType={"off"} placeholder={"#prisma #관련된 #장소를 #추가해주세요"} value={text} onChangeText={this.hashtagInput} onKeyPress={this.onKeyPress} />
        </BioColumn>
        <FlatList
          data={tag}
          extraData={tag}
          horizontal={true}
          refreshing={false}
          onRefresh={() => null}
          keyExtractor={(item) => item}
          renderItem={({item}) =>
              <Tag>
                <Text>{item}</Text>
              </Tag>
          }/>
          <ImageColumn>
            <Swiper dot=<View style={{backgroundColor:'rgba(255,255,255,1)', width: 4, height: 4, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3,}} /> >
            {files.map((file,index) =>
              <Img style={{ width:constans.width - 30, height:constans.width }} key={index} source={{url:file}} />)}
            </Swiper>
          </ImageColumn>
      </View>
    )
  }
}
