import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
  marginRight: 0
};

const RaisedButtonDownloadStylized_photo = () => (
  <div>
    <RaisedButton label="Download stylized photo!" disabled={true} style={style} />
  </div>
);

export default RaisedButtonDownloadStylized_photo;

