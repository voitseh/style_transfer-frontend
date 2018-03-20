import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  container: {
    position: 'relative',
    display: 'none',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

const RefreshIndicatorStylizedImgLoading = () => (
  <div id='linearProgress' style={style.container}>

    <RefreshIndicator
      size={50}
      left={-20}
      top={0}
      loadingColor="#FF9800"
      status="loading"
      style={style.refresh}
    />
  </div>
);

export default RefreshIndicatorStylizedImgLoading;