
    var docxml;
var fecha;

    function rm() {
        $('#rmunicipal').val(localStorage.getItem("UDcodigoQR"));
    }
    function cargarFecha() {
        var fechaActual = new Date();
        var fecha_hora = fechaActual.getFullYear() + '-' + fechaActual.getMonth() + '-' + fechaActual.getDate() + ' ' + fechaActual.getHours() + ':' + fechaActual.getMinutes() + ':' + fechaActual.getSeconds();
        $('#fechaD').val(fecha_hora);
    }



function denunciaWsdl() {
    var wsUrl = 'http://192.168.1.103:8080/MetodosTransito/MetodosTransito?WSDL';
    var soapDenn = '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/">\
    <SOAP-ENV:Header/>\
    <S:Body>\
        <ns2:ingresar_denuncia xmlns:ns2="http://servicios.ws/">\
            <dencte>dd4</dencte>\
            <reg_denunciado>'+$('#rmunicipal').val()+'</reg_denunciado>\
            <descripcion>' + $('#descripcion').val() + '</descripcion>\
            <foto>'+localStorage.getItem("ImgD")+'</foto>\
        </ns2:ingresar_denuncia>\
    </S:Body>\
</S:Envelope>';
    $.ajax({
        type: 'POST',
        url: wsUrl,
        contentType: 'text/xml',
        dataType: 'xml',
        async: false,
        data: soapDenn,
        success: function(data, status, req) {
            if (status == "success") {
                var respd = $(req.responseXML).find("return").text();
                if (respd == "true") {
                    alert("ENVIADO CON EXITO");
                    window.location = 'index.html';
                } else {
                    alert("Error de envio!");
                }
            }
        },
        error: function(data, status, req) {
            alert("ERROR DE CONEXION");
            window.location = 'index.html';
        }
    });
}





function verdenunciaWsdl() {
    var wsUrl = 'http://192.168.1.103:8080/MetodosTransito/MetodosTransito?WSDL';
    var soapverDen = '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
    <SOAP-ENV:Header/>\
    <S:Body>\
        <ns2:ver_denucia xmlns:ns2="http://servicios.ws/">\
            <registro_denunciado>160-CU-UMTTT-L-2009</registro_denunciado>\
        </ns2:ver_denucia>\
    </S:Body>\
</S:Envelope>';
    $.ajax({
        type: 'POST',
        url: wsUrl,
        contentType: 'text/xml',
        dataType: 'xml',
        async: false,
        data: soapverDen,
        success: function(data, status, req) {
            if (status == "success") {
                //********************************************
                alert('ingresa Succes');
                var responde = req.responseText;
                var parser = new DOMParser();
                docxml = parser.parseFromString(responde, "text/xml");
                if (docxml != null) {
                    var parent = document.getElementById('listview');
                    // Obtenemos la lista de retornos
                    listaReturn = docxml.getElementsByTagName("Body")[0].getElementsByTagName("return");
                    for (var i = 0; i < listaReturn.length; i++) {
                        fecha = listaReturn[i].getElementsByTagName("fecha_denuncia")[0].childNodes[0].nodeValue;
                        $("#listview").append("<li data-name='" + fecha + "' data-theme='c'><a  href='#'>" + fecha + "</a></li>");
                        var list = document.getElementById('listview');
                        $(list).listview("refresh");
                    }
                }
                //********************************************
            }
        },
        error: function(data, status, req) {
            alert("ERROR DE CONEXION");
            window.location = 'index.html';
        }
    });
    $('#listview').children('li').on('click', function() {
        fecha = $(this).attr('data-name');
        detalles();
        verDialogo();
    });
}

function detalles() {
   // alert('entro a detalles');
    var listR = docxml.getElementsByTagName("Body")[0].getElementsByTagName("return");
    var i = 0;
    while (i < listR.length) {
        if (fecha == listR[i].getElementsByTagName("fecha_denuncia")[0].childNodes[0].nodeValue) {
            break;
            alert('BREAK');
        }
        i++;
    }
    var detalle_descripcion = listR[i].getElementsByTagName("descipcion_denuncia")[0].childNodes[0].nodeValue;
    var detalle_img = listR[i].getElementsByTagName("imagen")[0].childNodes[0].nodeValue;
    fecha = listR[i].getElementsByTagName("fecha_denuncia")[0].childNodes[0].nodeValue;
    //alert('detalle_img: ' + detalle_img);
    localStorage.setItem("Dfecha", fecha);
    localStorage.setItem("Ddescripcion", detalle_descripcion);
    localStorage.setItem("Dimagen", detalle_img);
    // ----------------------------
}

function verDialogo() {
   var f1= localStorage.getItem("Dfecha");
   var d1= localStorage.getItem("Ddescripcion");
   var i1= localStorage.getItem("Dimagen");
    message="FECHA:\n " + f1 + "\n" +"DESCRIPCION: \n" +d1+ "\n" +"IMAGEN: \n" +i1+"\n";
 window.alert(message);
// alert("\n     DETALLES      \n" +"\n"+
//                "FECHA: \n"+ f1 + "\n" +"\n" +
//                "DESCRIPCION: \n" +d1+ "\n" +"\n" +
//                "IMAGEN:\n "+i1+"\n");   
}
