function cargarfoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccess(imageData) {
    var image = document.getElementById('smallImage');
    image.src = "data:image/jpeg;base64," + imageData;
    var imgpasar = "data:image/jpeg;base64," + imageData;
    localStorage.setItem("ImgD", imgpasar);
    // base64File = base64File.replace('data:application/pdf;base64,', '');
}

function onFail(message) {
    alert('Failed because: ' + message);
}