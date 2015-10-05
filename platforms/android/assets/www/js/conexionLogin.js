function llenarFormulario() {
    var gcedula = $('#cedula').val();
    localStorage.setItem("gcedula", gcedula);
    var gnombres = $('#nombres').val();
    localStorage.setItem("gnombres", gnombres);
    var gapellidos = $('#apellidos').val();
    localStorage.setItem("gapellidos", gapellidos);
    var gtelefono = $('#telefono').val();
    localStorage.setItem("gtelefono", gtelefono);
    var glugar = $('#lugar').val();
    localStorage.setItem("glugar", glugar);
    if (validaCedula(gcedula)) {
        $("#visto").css("display", "block");
        alert("Se Guardo con Exito!!");
        window.location = 'usuarioQR.html';
    }
}

function validaCedula(cedula) {
    var array = cedula;
    var num = array.length;
    if (num == 10) {
        var total = 0;
        var digito = (array[9] * 1);
        for (i = 0; i < (num - 1); i++) {
            if ((i % 2) != 0) {
                total = total + (array[i] * 1);
            } else {
                var mult = array[i] * 2;
                if (mult > 9) total = total + (mult - 9);
                else total = total + mult;
            }
        }
        var decena = total / 10;
        decena = Math.floor(decena);
        decena = (decena + 1) * 10;
        final = (decena - total);
        if ((final == 10 && digito == 0) || (final == digito)) {

            return true;
        } else {
            alert("El numero de cedula es incorrecto");

            return false;
        }
    } else {
        alert("El número de la cédula debe tener 10 digitos");
        return false;
    }
}

function usuarioWsdl() {
    var wsUrl = 'http://192.168.1.103:8080/MetodosUsuario/MetodosUsuario?WSDL';
    var resultado;
    var llamarsoap = '<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/">\
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
        data: llamarsoap,
        success: function(data, status, req) {
            if (status == "success") {
                var resp = $(req.responseXML).find("return").text();
                if (resp == "true") {
                    window.location = 'agentes.html';
                } else {
                    alert("Error de usuario y/o contraseña");
                }
            }
        },
        error: function(data, status, req) {
            alert("ERROR DE CONEXION!");
            window.location = 'index.html';
        }
    });
}