import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
/*
const style = {
  margin: 12,
  marginRight: 0
};

const RaisedButtonStylize_photo = () => (
  <div>
    <RaisedButton label="Stylize photo" disabled={true} style={style} />
  </div>
);

export default RaisedButtonStylize_photo;
*/
const style = {
  margin: 12,
  marginLeft: 0
};

window.setBttnStylize_photoEnabled = function setBttnStylize_photoEnabled() {  
  RaisedButtonStylize_photo.setEnabled();
}
window.setBttnStylize_photoDisabled = function setBttnStylize_photoDisabled() { 
  RaisedButtonStylize_photo.setDisabled();
}

export default class RaisedButtonStylize_photo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
    }
    RaisedButtonStylize_photo.setEnabled = RaisedButtonStylize_photo.setEnabled.bind(this);
    RaisedButtonStylize_photo.setDisabled = RaisedButtonStylize_photo.setDisabled.bind(this);
  }
  static setEnabled() { 
    this.setState({disabled: false});
  }
  static setDisabled() { 
    this.setState({disabled: true});
  }
  render() {
    return (
      <div>
        <RaisedButton label="Stylize photo" disabled={this.state.disabled} style={style} onClick={() => window.onStylizeBttnClick()} />
      </div>
    );
  }
}