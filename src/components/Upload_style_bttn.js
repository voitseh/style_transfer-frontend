import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
  marginLeft: 0
};

const FlatButtonUpload_style = () => (
  <div>
   <RaisedButton label="UPLOAD STYLE" style={style} fullWidth={true}  onClick={() => window.addStyle()}/>
  </div>
);

export default FlatButtonUpload_style;

