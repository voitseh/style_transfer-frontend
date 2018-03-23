var uploadedPhoto = [];
var checkedStyle = [];
var client_data = {};
var photoImage = null;
var borderProportion = ''
var photoElementWidth = ''
var photoElementHeight = ''
var photoBorderHeight;
var photoBorderWidth;
var uploaded_image;
var stylized_img

///////////////////utils/////////////////////////
function sijax_data(key, value) {
    Sijax.setRequestUri('http://93.77.34.47:63101/');
    client_data[key] = value;
    Sijax.request('client_data', [client_data]);
    delete client_data[key];
}

function element_dim(border_id) {
    var photoElement = document.getElementById(border_id);
    photoElementWidth = photoElement.clientWidth;
    photoElementHeight = photoElement.clientHeight;
    borderProportion = photoElementWidth / photoElementHeight;
}

function uploadedImgProps(img_width, img_height, aspectRatio, flag) {
    photoImage.style.width = (img_width).toString().concat('px');
    photoImage.style.height = (img_height).toString().concat('px');
    element_dim('card_photo');
    if (flag) {
        var delta = photoElementHeight - photoBorderHeight;
        photoImage.style.marginTop = (delta / 2).toString().concat('px');
        photoImage.style.marginLeft = ((photoElementWidth - photoBorderHeight * aspectRatio) / 2).toString().concat('px');
    }
    else {
        var delta = photoElementWidth - photoBorderWidth;
        photoImage.style.marginLeft = (delta / 2).toString().concat('px');
        photoImage.style.marginTop = ((photoElementHeight - photoBorderWidth / aspectRatio) / 2).toString().concat('px');
    }
    element_dim('drop_area');
}
function stylizedImgProps(stylized_img, photoImage) {
    stylized_img.style.width = photoImage.style.width;
    stylized_img.style.height = photoImage.style.height;
    stylized_img.style.top = photoImage.style.marginTop;
    stylized_img.style.left = photoImage.style.marginLeft;
}

function setImageProperties(photoImage, width, height) {
    var aspectRatio = width / height;
    photoBorderHeight = photoElementHeight;
    photoBorderWidth = photoBorderHeight * photoElementWidth / photoElementHeight;
    if (aspectRatio <= borderProportion) {
        uploadedImgProps(photoBorderHeight * aspectRatio, photoBorderHeight, aspectRatio, true)
    }
    else {
        uploadedImgProps(photoBorderWidth, photoBorderWidth / aspectRatio, aspectRatio, false)
    }
}

window.onresize = function () {
    // resize uploaded image
    element_dim('drop_area');
    photoBorderHeight = photoElementHeight
    setImageProperties(photoImage, uploaded_image.width, uploaded_image.height)
    // resize stylized image
    stylizedImgProps(stylized_img, photoImage)
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
        uploaded_image = new Image();
        uploaded_image.src = reader.result;

        uploaded_image.onload = function () {
            // send loaded img dimensions to PhotoCard component
            //element_dim('drop_area');
            setImageProperties(photoImage, uploaded_image.width, uploaded_image.height)
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
        var uploadedStyle = [file.name, reader.result]
        sijax_data('styleFile', uploadedStyle)
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
    element_dim('drop_area');

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

    stylized_img = event.target;
    if (event.target.localName == 'img') {
        stylizedImgProps(stylized_img, photoImage)
        document.getElementById('stylizedCardMedia').style.display = 'none'
        document.getElementById('linearProgress').style.display = 'none'
        setBttnDownloadStylized_photoEnabled();
    }
};
//check stylized image loads event
document.getElementById("card_result")
    .addEventListener('DOMNodeInserted', onStylizedImgLoadsHandler);

function onGalletyLoadsHandler(event) {
    document.getElementById("_img0").click();
}
//click style image on styles gallery loads event
document.getElementById("style_gallery")
    .addEventListener('DOMNodeInserted', onGalletyLoadsHandler);

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

