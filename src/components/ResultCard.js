import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  top: 40,
  height: 200,
  display: 'block'
};
const style_card = {
  height: 340,
};

const CardResult = () => (
  <Card style={style_card}>

    <CardMedia id="result_label_back"

      overlay={<CardTitle id='stylizedCardMedia' title="Stylized photo is not generated yet" />} style={style}>
      <img id="photoImg" src="" alt="" />

    </CardMedia>

  </Card>
);

export default CardResult;
