import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  margin: 12,
  marginLeft: 0
};



export default class RaisedButtonUpload_photo extends Component {
  constructor(props) {
    super(props)
  }
  
  onUploadPhotoBttnClick(event) {
    document.getElementById('photoFile').click()
    //window.sijax_data('curFrameId', window.curFrameId)
  }

  render() {
    return (
    <div>
       <RaisedButton label="Upload photo" style={style}
       onClick={this.onUploadPhotoBttnClick} />
    </div>
    )
  }

}
