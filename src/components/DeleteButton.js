import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/delete-forever';

const styles = {
  smallIcon: {
    width: 18,
    height: 18,
    color: 'rgb(207, 205, 205)',
  },
  small: {
    top: -5,
    right: 5,
    width: 36,
    height: 36,
  },
};

const DeleteBttn = () => (
  <div style={{ position: 'relative', float: 'left', marginLeft: '-30px' }}>
    <IconButton tooltip="delete" tooltipPosition="bottom-left" iconStyle={styles.smallIcon}
      style={styles.small}>
      <ActionGrade />
    </IconButton>
  </div>
);

export default DeleteBttn;