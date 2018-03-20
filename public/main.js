var uploadedPhoto = [];
var checkedStyle = [];
var client_data = {};
var photoImage = null;
var borderProportion = ''
var photoBorderWidth = ''
var photoBorderHeight = ''

///////////////////utils/////////////////////////
function sijax_data(key, value) {
    Sijax.setRequestUri('http://93.77.34.47:63101/');
    client_data[key] = value;
    Sijax.request('client_data', [client_data]);
    delete client_data[key];
}

function element_dim(border_id) {
    var photoBorder = document.getElementById(border_id);
    photoBorderWidth = photoBorder.clientWidth;
    photoBorderHeight = photoBorder.clientHeight;
    borderProportion = photoBorderWidth / photoBorderHeight;
}

function imageProperties(photoImage, width, height) {
    var imageProportion = width / height;

    if (imageProportion <= borderProportion) {
        photoImage.style.width = (photoBorderWidth * imageProportion).toString().concat('px')
        photoImage.style.height = (photoBorderHeight).toString().concat('px');
        var photoImageHeight = photoBorderHeight;
        element_dim('card_photo');
        var delta = photoBorderHeight - photoImageHeight;
        photoImage.style.marginLeft = ((photoBorderWidth - photoBorderWidth * imageProportion) / 2 + delta / 2).toString().concat('px')
        photoImage.style.marginTop = (delta / 2).toString().concat('px');
    }
    else {
        photoImage.style.width = (photoBorderWidth).toString().concat('px');
        photoImage.style.height = (photoBorderHeight / imageProportion).toString().concat('px');
        var photoImageWidth = photoBorderWidth;
        element_dim('card_photo');
        var delta = photoBorderWidth - photoImageWidth;
        photoImage.style.marginLeft = (delta / 2).toString().concat('px');
        photoImage.style.marginTop = ((photoBorderHeight - photoBorderHeight / imageProportion) / 2 + delta / 2).toString().concat('px');
    }

}


//////////// form submit settings ///////////////
function uploadPhoto(drug = false, _file = null) {
    photoImage = document.getElementById('photoImg');
    var file;
    if (drug == false) {
        file = document.getElementById('photoFile').files[0];
    }
    else {
        file = _file;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {
        photoImage.setAttribute('src', reader.result);
        var image = new Image();
        image.src = reader.result;

        image.onload = function () {
            // send loaded img dimensions to PhotoCard component
            element_dim('drop_area');
            imageProperties(photoImage, image.width, image.height)
        };
        uploadedPhoto.splice(0, uploadedPhoto.length);
        uploadedPhoto.push(file.name)
        uploadedPhoto.push(reader.result);
        if (checkedStyle.length != 0) {
            setBttnStylize_photoEnabled()
        }

    }, false);
    document.getElementById('photoCardMedia').style.display = 'none'
}
// implementation of image drag & drop functionality
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (evt.dataTransfer != undefined) {
        var files = evt.dataTransfer.files; // FileList object.
        uploadPhoto(true, files[0])
    }
}
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
// Setup the dnd listeners.
var dropZone = document.getElementById('drop_area');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
document.getElementById('photoFile').addEventListener('change', handleFileSelect, false);
function uploadStyleFile() {
    var file = document.getElementById('styleFile').files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {
        sijax_data('styleFile', reader.result)
    }, false);
}
function addStyle() {
    document.getElementById('styleFile').click();
}
// handle style check event
$('body').on('click', 'img', function () {
    checkedStyle.splice(0, checkedStyle.length);
    checkedStyle.push(this.getAttribute("name"));
    checkedStyle.push(this.getAttribute("src"));
    if (uploadedPhoto.length != 0) {
        setBttnStylize_photoEnabled();
    }

});
// delete style gallery image on right click
$(function () {
    $('ul').on('click', 'button', function (e) { //Get li under ul and invoke on contextmenu
        e.preventDefault(); //Prevent defaults
        //confirm window
        if (window.confirm("Do you really want to delete an image?")) {
            imgName = $(this).parent().parent().parent().parent().find('img').attr('name');
            sijax_data('delGalleryImg', imgName)
            $(this).parent().parent().parent().parent().remove();
        }
    });
});
//////////// fill styles gallery///////////////////
window.onload = function () {
    setBttnDownloadStylized_photoDisabled();
    sijax_data('style_gallery', 'style_gallery')
}
function onStylizeBttnClick() {
    sijax_data('message', '');
    document.getElementById('stylizedCardMedia').style.display = 'block'
    document.getElementById('linearProgress').style.display = 'block'
    var data = [uploadedPhoto[0], uploadedPhoto[1], checkedStyle[0], checkedStyle[1]];
    sijax_data('data', data);
    document.getElementById('result_label_back').style.display = 'none'
    setBttnDownloadStylized_photoDisabled();
    if (document.getElementById('stylized_img') != null) {
        document.getElementById('stylized_img').remove();
    }
}
function onStylizedImgLoadsHandler(event) {
    // hide loadind element when "Mistake!" occured
    if (document.getElementById('server_response').innerHTML == "Mistake!") {
        document.getElementById('linearProgress').style.display = 'none'

    }

    var img = event.target;
    if (event.target.localName == 'img') {
        img.style.width = photoImage.style.width;
        img.style.height = photoImage.style.height;
        img.style.top = photoImage.style.marginTop;
        img.style.left = photoImage.style.marginLeft;
        document.getElementById('stylizedCardMedia').style.display = 'none'
        setBttnDownloadStylized_photoEnabled();
    }


};
//check stylized image loads event
document.getElementById("border_result")
    .addEventListener('DOMNodeInserted', onStylizedImgLoadsHandler);

/* Download an img */
function download(img, title) {
    var download = document.createElement('a');
    download.href = img;
    download.download = title;
    download.click();
    //for firefox
    fireEvent(download, 'click')
}
//for firefox browsers:
function fireEvent(obj, evt) {
    var fireOnThis = obj;
    if (document.createEvent) {
        var evObj = document.createEvent('MouseEvents');
        evObj.initEvent(evt, true, false);
        fireOnThis.dispatchEvent(evObj);
    } else if (document.createEventObject) {
        var evObj = document.createEventObject();
        fireOnThis.fireEvent('on' + evt, evObj);
    }
}
function onDownloadStylized_photoBttnClick() {
    title = document.getElementById('stylized_img').name;
    src = document.getElementById('stylized_img').src;
    download(src, title);
}

