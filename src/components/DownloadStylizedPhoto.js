import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
  marginRight: 0
};

window.setBttnDownloadStylized_photoEnabled = function setBttnDownloadStylized_photoEnabled() {
  RaisedButtonDownloadStylized_photo.setEnabled();
}
window.setBttnDownloadStylized_photoDisabled = function setBttnDownloadStylized_photoDisabled() {
  RaisedButtonDownloadStylized_photo.setDisabled();
}

export default class RaisedButtonDownloadStylized_photo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
    }
    RaisedButtonDownloadStylized_photo.setEnabled = RaisedButtonDownloadStylized_photo.setEnabled.bind(this);
    RaisedButtonDownloadStylized_photo.setDisabled = RaisedButtonDownloadStylized_photo.setDisabled.bind(this);
  }
  static setEnabled() {
    this.setState({ disabled: false });
  }
  static setDisabled() {
    this.setState({ disabled: true });
  }
  render() {
    return (
      <div>
        <RaisedButton label="Download stylized photo" disabled={this.state.disabled} style={style} onClick={() => window.onDownloadStylized_photoBttnClick()} />
      </div>
    );
  }
}