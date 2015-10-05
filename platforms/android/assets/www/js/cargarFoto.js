/*function cargarfoto() {
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() { //console.log(navigator.camera);
    }
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 70,
        destinationType: Camera.DestinationType.FILE_URI
    });
}

function galeriafoto() {
    navigator.camera.getPicture(onSuccessFile, onFail, {
        quality: 70,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: 2,
        mediaType: 2
    });
}

function onSuccess(imageURI) {
    //EN imageURI tienes ya la url de la imagen, si te interesa solo la ruta, CON ESTO YA VALE
    window.resolveLocalFileSystemURL(imageURI,
        function(fileEntry) {
            pathFile = fileEntry.fullPath;
            fileEntry.file(
                function(file) {
                    try {
                        var reader = new FileReader();
                        reader.onloadend = function(evt) {
                            base64File = evt.target.result;
                            //EN ESTE REPLACE DEBES QUITARLE LAS CABECERAS ESTA ES LA DEL PDF DEBERAS PONER LAS DE LA IMAGENES
                            base64File = base64File.replace('data:application/jpg;base64,', '');
                            //AQUI YA TIENES EL BASE64 PARA GUARDAR
                        };
                        reader.readAsDataURL(file);
                    } catch (err) {}
                } else {}
            );
        },function(){},function(){}

    );
var image = document.getElementById('smallImage');
image.src = "data:image/jpeg;base64," + imageData;
}

function onSuccessFile(imageURI) {
    //EN imageURI tienes ya la url de la imagen, si te interesa solo la ruta, CON ESTO YA VALE
    window.resolveLocalFileSystemURL(imageURI,
        function(fileEntry) {
            pathFile = fileEntry.fullPath;
            fileEntry.file(
                function(file) {
                    try {
                        var reader = new FileReader();
                        reader.onloadend = function(evt) {
                            base64File = evt.target.result;
                            //EN ESTE REPLACE DEBES QUITARLE LAS CABECERAS ESTA ES LA DEL PDF DEBERAS PONER LAS DE LA IMAGENES
                            base64File = base64File.replace('data:application/jpg;base64,', '');
                            //AQUI YA TIENES EL BASE64 PARA GUARDAR
                        };
                        reader.readAsDataURL(file);
                    } catch (err) {}
                } else {}
            );
        }, function(){},function(){}
    );
var image = document.getElementById('smallImage');
image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}*/

function cargarfoto(){
  navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
    destinationType: Camera.DestinationType.DATA_URL 
}); 

}

function onSuccess(imageData) { 
    var image = document.getElementById('smallImage'); 
    image.src = "data:image/jpeg;base64," + imageData; 
    var imgpasar = "data:image/jpeg;base64," + imageData; 
      localStorage.setItem("ImgD", imgpasar);
    alert('pasar'+ imgpasar);
    alert('Typepasar'+ typeof imgpasar);
    // base64File = base64File.replace('data:application/pdf;base64,', '');
} 

function onFail(message) { 
    alert('Failed because: ' + message); 
}
