var uploadedPhoto = [];
var checkedStyle = [];
var client_data = {};
///////////////////utils/////////////////////////
function sijax_data(key, value) { 
    Sijax.setRequestUri('http://93.77.34.47:63101/');
    //Sijax.setRequestUri('http://localhost:8000/');
    client_data[key] = value;
    Sijax.request('client_data', [client_data]);
    delete client_data[key];
}
//////////// form submit settings ///////////////
function uploadPhoto(drug = false, _file = null) {
    var photoImage = document.getElementById('photoImg');
    var file;
    if(drug == false){
        file = document.getElementById('photoFile').files[0];
    }
    else{
        file = _file;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {   
        photoImage.setAttribute('src', reader.result); 
        photoImage.style.borderRadius = '10%';
        uploadedPhoto.splice(0, uploadedPhoto.length);
        uploadedPhoto.push(file.name)
        uploadedPhoto.push(reader.result);
        if(checkedStyle.length != 0){
            setBttnStylize_photoEnabled()
        }
       
    }, false);
    document.getElementById('photoCardMedia').style.display = 'none'
}
// implementation of image drag & drop functionality
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if(evt.dataTransfer != undefined){
    var files = evt.dataTransfer.files; // FileList object.
    uploadPhoto(true, files[0])}
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
    if(uploadedPhoto.length != 0){                
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
function onStylizeBttnClick(){
    document.getElementById('linearProgress').style.display = 'block'
    var data = [uploadedPhoto[0],uploadedPhoto[1],checkedStyle[0],checkedStyle[1]];
    sijax_data('data', data);    
    setBttnDownloadStylized_photoDisabled();
    if( document.getElementById('stylized_img') != null){
    document.getElementById('stylized_img').remove();
    }
   }
function onStylizedImgLoadsHandler(event) {
     var img = event.target;
    if (event.target.localName == 'img') {
     
        img.style.width = '100%';
        img.style.height =  '299px';       
        img.style.borderRadius = '10%';
         console.log(img)
       }
       setBttnDownloadStylized_photoEnabled();
   };
   //check stylized image loads event
   document.getElementById("border_result")
       .addEventListener('DOMNodeInserted', onStylizedImgLoadsHandler);

function onDownloadStylized_photoBttnClick(){
   console.log('Download click!')
}