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
      typing:true,
    });
    navigation.setParams({
      term: text,
    })
  };

  shouldComponentUpdate(_,nextState){
    this.state.term === nextState.term && this.state.typing && this.setState({typing:false})
    return ( nextState.term !== "" && this.state.term !== nextState.term || this.state.typing !== nextState.typing)
  };

  componentDidUpdate(){
    this.setState({
      typing:false
    });
  }
  render() {
   return (
        <SearchContainer navigation={this.props.navigation} term={this.state.term} typing={this.state.typing} />
    )
  }
}
