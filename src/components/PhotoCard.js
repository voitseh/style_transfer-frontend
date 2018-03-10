import React, {Component} from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  left:15,
  top:-65,
  width:300,
  height:300,
  margin: 12, 
  marginLeft: 0, 
};

const style_card = {
 
  width:330,
  height:330,
  margin:20
};

export default class CardPhoto extends Component {
  
    constructor(props) {
      super(props)
      this.state = {
         disabled: true,
      }
    }

    render() {
      return (
        
        <Card style={style_card}>
         <img id="photoImg" src="" alt="" />
        <CardMedia id="photoCardMedia"
           overlay={  <CardTitle title="Drop your photo here or click 'Upload photo' button to select one from your computer." /> } style={style}>
        </CardMedia> 
       
      </Card>
      );
    }
  }