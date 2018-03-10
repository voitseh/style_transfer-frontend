
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButtonUpload_photo from './components/Upload_photo_bttn';
import RaisedButtonStylize_photo from './components/StylizePhoto';
import FlatButtonUpload_style from './components/Upload_style_bttn';
import CardPhoto from './components/PhotoCard';
import CardResult from './components/ResultCard';
import RaisedButtonDownloadStylized_photo from './components/DownloadStylizedPhoto';
import DeleteBttn from './components/DeleteButton';
import RefreshIndicatorStylizedImgLoading from './components/LoadingProgress';
import $ from "jquery";
import registerServiceWorker from './registerServiceWorker';

/*
import { red500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme({
    palette: {
      textColor: red500,
    },
  });*/

// add Delete buttons to style gallery images
function addDelBttns(container_id) {
    var imgId;
    var imgsCount = $(container_id).children().length;
    for (var i = 0; i <= imgsCount; i++) {
      if (i == imgsCount - 1) {
        imgId = $(container_id).children()[i].lastChild.lastChild.lastChild.id;
        ReactDOM.render(<MuiThemeProvider><DeleteBttn /></MuiThemeProvider>, document.getElementById(imgId));
      }
    }
  };
  //check style gallery image load event
  document.getElementById("style_gallery")
    .addEventListener('DOMNodeInserted', function (event) {
      addDelBttns('#style_gallery');
    });


ReactDOM.render(<MuiThemeProvider><RaisedButtonUpload_photo /></MuiThemeProvider>, document.getElementById('upload_photo_bttn'));
ReactDOM.render(<MuiThemeProvider><RaisedButtonStylize_photo /></MuiThemeProvider>, document.getElementById('stylize_photo_bttn'));
ReactDOM.render(<MuiThemeProvider><FlatButtonUpload_style /></MuiThemeProvider>, document.getElementById('upload_style_bttn'));
ReactDOM.render(<MuiThemeProvider><CardPhoto /></MuiThemeProvider>, document.getElementById('card_photo'));
ReactDOM.render(<MuiThemeProvider><CardResult /></MuiThemeProvider>, document.getElementById('card_result'));
ReactDOM.render(<MuiThemeProvider><RaisedButtonDownloadStylized_photo /></MuiThemeProvider>, document.getElementById('download_resultphoto_bttn'));
ReactDOM.render(<MuiThemeProvider><RefreshIndicatorStylizedImgLoading /></MuiThemeProvider>, document.getElementById('loading_progress'));


registerServiceWorker();
