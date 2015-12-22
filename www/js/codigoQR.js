var QR; 
 function DleerQR() {
        cordova.plugins.barcodeScanner.scan(
            function(result) {
               validar_QR(result.text);
               localStorage.setItem("UDcodigoQR", result.text);
               if (QR=='valido') {
               alert("Registro: \n " +result.text);
                window.location = 'usuario_denuncia.html';
            }else{
                alert("Registro: \n "+"QR NO VALIDADO" );
              window.location = 'usuarioQR.html';  
            }
            },
            function(error) {
                alert("Scanning failed: " + error);
                window.location = 'index.html';
            }
        );
        QR=null;
    }
    
     function AleerQR() {
        cordova.plugins.barcodeScanner.scan(
            function(result) {
               validar_QR(result.text);
                localStorage.setItem("AcodigoQR", result.text);
if (QR=='valido') {
                    alert("Registro: \n " +result.text);
                window.location = 'agentesInformacion.html';
            }else{
                alert("Registro: \n "+"QR NO VALIDADO" );
              window.location = 'agentes.html';  
            }
            },
            function(error) {
                alert("Scanning failed: " + error);
                window.location = 'index.html';
            }
        );
        QR=null;   
    }


function validar_QR(valor_QR) {
    this.wsUrl='http://192.168.1.101:9090/MetodosTransito/MetodosTransito?WSDL';
    this.env_soap= '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
    <SOAP-ENV:Header/>\
    <S:Body>\
        <ns2:validadorQR xmlns:ns2="http://servicios.ws/">\
            <cod_QR>'+valor_QR+'</cod_QR>\
        </ns2:validadorQR>\
    </S:Body>\
</S:Envelope>';
    $.ajax({
        type: 'POST',
        url: wsUrl,
        contentType: 'text/xml',
        dataType: 'xml',
        async: false,
        data: env_soap,
        success: function(data, status, req) {
        QR = $(req.responseXML).find("return").text();
        },
        error: function(data, status, req) {
            alert("ERROR EN LECTURA");
          }
    });
  }