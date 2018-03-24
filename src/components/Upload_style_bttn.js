import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
  marginLeft: 0
};


export default class FlatButtonUpload_style extends Component {
  
    constructor(props) {
      super(props)
      this.state = {
        disabled: true,
      }
      
    }
  
    render() {
      return (
      
        <div>
            <RaisedButton label="UPLOAD STYLE"    disabled={this.state.disabled} style={style} fullWidth={true} onClick={() => window.addStyle()} />

        </div>
        
      );
    }
  }
