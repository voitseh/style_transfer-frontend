import React from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  left:15,
  top:-75,
  width:300,
  height:300,
  margin: 12,
  marginLeft: 0, display: 'block'
};
const style_card = {
 
  width:330,
  height:330,
  margin:20
};

const CardResult = () => (
  <Card style={style_card}>
    
    <CardMedia 
      overlay={<CardTitle id='ttt' title="Stylized photo is not generated yet" />}  style={style}>
      <img id="photoImg" src="" alt="" />
      
    </CardMedia>
   
  </Card>
);

export default CardResult;
