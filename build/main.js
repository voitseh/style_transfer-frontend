var uploadedPhoto = '';
var checkedStyle = '';
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
        //photoImage.width = 300;
        //photoImage.height = 300;
        photoImage.style.borderRadius = '10%';
        //photoImage.style.marginTop = '15px';
        //photoImage.style.marginLeft = '15px';

         uploadedPhoto = reader.result;
        if(checkedStyle != ""){
            setBttnStylize_photoEnabled()
        }
       
    }, false);

    document.getElementById('photoCardMedia').style.display = 'none'

}


// implementation of image drag & drop functionality
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files; // FileList object.
    uploadPhoto(true, files[0])
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
    checkedStyle = this.getAttribute("src");
    if(uploadedPhoto != ""){                
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
    sijax_data('style_gallery', 'style_gallery')
}

function onStylizeBttnClick(){
    document.getElementById('linearProgress').style.display = 'block'
    sijax_data('photo', uploadedPhoto)
    sijax_data('style', checkedStyle);
}