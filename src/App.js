import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import ModalComponent from './ModalComponent';


class App extends Component {
  state = {
    modalOpen: false,
    modalParams:[],
  };
  
  handleOpen = (passedParams) => {
    if (!passedParams) {
      this.setState({modalParams: passedParams})
    }
    this.setState({modalOpen: !this.state.modalOpen});
  };
  
  render() {
    return(
      <MuiThemeProvider>
        <RaisedButton label="Dialog" onClick={this.handleOpen} />
        <ModalComponent openControl={this.handleOpen} open={this.state.modalOpen}/>
      </MuiThemeProvider>
    )
  }
};

export default App;