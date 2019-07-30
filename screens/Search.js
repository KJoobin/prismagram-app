import React from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TouchableOpacity  } from 'react-native-gesture-handler'
import SearchInput from '../components/SearchInput';
const View = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`
const Text = styled.Text``

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return ({
    headerTitle:<SearchInput
      value={navigation.getParam('term',"") }
      onChange={navigation.getParam('onChange',()=>null) }
      onSubmit={navigation.getParam('onSubmit',()=>null) }
      />
  })};
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      term:""
    };
    navigation.setParams({
      term : this.state.term,
      onSubmit : this.onSubmit,
      onChange : this.onChange,
    })
  };

  onSubmit = () => {
    console.log(null)
  };
  onChange = (text) => {
    const { navigation } = this.props
    this.setState({ term : text });
    navigation.setParams({
      term: text
    })
  };

  render() {
   return (
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text> Search</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
