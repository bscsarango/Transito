 function DleerQR() {
        cordova.plugins.barcodeScanner.scan(
            function(result) {
                alert("Registro: " + result.text);
                localStorage.setItem("UDcodigoQR", result.text);
                window.location = 'usuario_denuncia.html';
            },
            function(error) {
                alert("Scanning failed: " + error);
                window.location = 'index.html';
            }
        );

    }
     function AleerQR() {
      var codigo;
        cordova.plugins.barcodeScanner.scan(
            function(result) {
                localStorage.setItem("AcodigoQR", result.text);
                alert("Registro: " + result.text);
                window.location = 'agentesInformacion.html';
            },
            function(error) {
                alert("Scanning failed: " + error);
                window.location = 'index.html';
            }
        );
          
    }
