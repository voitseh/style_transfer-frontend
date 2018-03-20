import React, { Component } from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  top: 40,
  height: 200,
};

const style_card = {
  height: 340,
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
          overlay={<CardTitle title="Drop your photo here or click 'Upload photo' button to select one from your computer." />} style={style}>
        </CardMedia>

      </Card>
    );
  }

}