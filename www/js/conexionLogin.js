document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
    console.log(navigator.notification);
}

function usuarioWsdl() {
    this.wsUrl = 'http://192.168.1.101:9090/MetodosUsuario/MetodosUsuario?WSDL';
    //var resultado;
    this.env_soap= '<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/">\
        <SOAP-ENV:Header/>\
        <S:Body>\
            <ns1:logear_usuario xmlns:ns1="http://servicios.ws/">\
                <nombre>' + $('#nom_usuario').val() + '</nombre>\
                <contrasenia>' + $('#clave').val() + '</contrasenia>\
            </ns1:logear_usuario>\
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
            if (status == "success") {
                var resp = $(req.responseXML).find("return").text();
                if (resp == "true") {
                    window.location = 'agentes.html';
                } else {
                    swal("Error de usuario y/o contraseña");
                }
            }
        },
        error: function(data, status, req) {
            alert("ERROR DE CONEXION!");
            window.location = 'index.html';
        }
    });
}
usuarioWsdl.prototype = new conexion;


function RegistroDenunciante() {
    
    this.wsUrl= 'http://192.168.1.101:9090/MetodosTransito/MetodosTransito?WSDL';
    //var resultado;
    this.env_soap= '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
    <SOAP-ENV:Header/>\
    <S:Body>\
        <ns2:registrarDenunciante xmlns:ns2="http://servicios.ws/">\
            <ced>' + localStorage.getItem("gcedula") + '</ced>\
            <nombre>' + localStorage.getItem("gnombres") + '</nombre>\
            <apellidos>' + localStorage.getItem("gapellidos") + '</apellidos>\
            <telefono>' + localStorage.getItem("gtelefono") + '</telefono>\
            <lugar>' + localStorage.getItem("glugar") + '</lugar>\
        </ns2:registrarDenunciante>\
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
            if (status == "success") {
                var resp = $(req.responseXML).find("return").text();
                if (resp == "true") {
                    swal({
                            title: "Correcto!",
                            text: "Los datos se han Registrado con Exito!",
                            type: "info",
                            showCancelButton: false,
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                        },
                        function() {
                                localStorage.setItem("estadoRegistro",'si');
                               setTimeout(function() {
                               window.location = 'usuarioQR.html';
                                },
                                2000);
                        });

                } else {
                    swal({
                        title: "",
                        text: "Ya existe otro Usuario registrado con el mismo N° de Cedula!",
                        type: "warning",
                        closeOnConfirm: true,
                    });
                }
            }
        },
        error: function(data, status, req) {
              localStorage.setItem("estadoRegistro",'no');
              alert("ERROR DE CONEXION!");
            window.location = 'index.html';
        }
    });
}
RegistroDenunciante.prototype = new conexion;


function ModificarDenunciante() {
    
    camposObligatorios();
    this.wsUrl= 'http://192.168.1.101:9090/MetodosTransito/MetodosTransito?WSDL';
    //var resultado;
this.env_soap = '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
    <SOAP-ENV:Header/>\
    <S:Body>\
        <ns2:modificarDenunciante xmlns:ns2="http://servicios.ws/">\
            <ced>' + localStorage.getItem("gcedula") + '</ced>\
            <nombre>' + localStorage.getItem("gnombres") + '</nombre>\
            <apellidos>' + localStorage.getItem("gapellidos") + '</apellidos>\
            <telefono>' + localStorage.getItem("gtelefono") + '</telefono>\
            <lugar>' + localStorage.getItem("glugar") + '</lugar>\
        </ns2:modificarDenunciante>\
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
            if (status == "success") {
                var resp = $(req.responseXML).find("return").text();
                if (resp == "true") {
                    swal("correcto!", "Los datos se han modificado con Exito!", "success")

                    window.location = 'usuarioQR.html';
                } else {
                    swal("Error al ingresar los datos. Revise que los campos esten correctamente llenados");
                }
            }
        },
        error: function(data, status, req) {
            alert("ERROR DE CONEXION!");
            window.location = 'index.html';
        }
    });

}
ModificarDenunciante.prototype = new conexion;

