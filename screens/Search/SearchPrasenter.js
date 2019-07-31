import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity  } from 'react-native-gesture-handler'
import SearchInput from '../../components/SearchInput';
import SearchContainer from './SearchContainer';

const View = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`
const Text = styled.Text``

export default class extends React.Component {

  constructor(props) {
    console.log("constructor")
    super(props);
    const { navigation } = props;
    this.state = {
      term:"",
      typing:false,
    };

    navigation.setParams({
      term : this.state.term,
      onSubmit : this.onSubmit,
      onChange : this.onChange,
    })
  };

  static navigationOptions = ({ navigation }) => {
    console.log("navigationOptions")
    return ({
    headerTitle:<SearchInput
      value={navigation.getParam('term',"") }
      onChange={navigation.getParam('onChange',()=>null) }
      onSubmit={navigation.getParam('onSubmit',()=>null) }
      />
  })};

  onSubmit = () => {
    const { navigation } = this.props
    this.setState({ term : "" })
    navigation.setParams({
      term: ""
    })
  };

  onChange = (text) => {
    const { navigation } = this.props
    this.setState({
      term : text,
      typing: true
    });
    navigation.setParams({
      term: text
    })
    setTimeout(()=> {
      console.log("setTiem")
      this.setState({ typing:true })
    },4000);
  };

  shouldComponentUpdate(_,nextState){
    console.log("shouldComponentUpdate",this.state, "\n" ,nextState)
    return ( this.state.term !== nextState.term ||
      this.state.typing !== nextState.typing )
  };

  componentDidUpdate(){
    console.log("componentDidUpdate")
    this.setState({
      typing:false
    });
  }
  render() {
    console.log("render")
   return (
        <SearchContainer term={this.state.term} typing={this.state.typing} />
    )
  }
}
