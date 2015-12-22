var docxml;
var fecha;

function verificarDatos() {
    
    otra();
    if (localStorage.getItem("gcedula") == null || localStorage.getItem("gnombres") == null || localStorage.getItem("gapellidos") == null || localStorage.getItem("gtelefono") == null || localStorage.getItem("glugar") == null) {
        swal({
            title: "",
            text: "Usted aun no ha  completado el registro de sus datos personales. (Menu-> Confg->Datos Usuario)",
            type: "warning",
            closeOnConfirm: true,
        });
    } else {
        denunciaWsdl();
    }
}

function denunciaWsdl() {
    this.wsUrl='http://192.168.1.101:9090/MetodosTransito/MetodosTransito?WSDL';
    this.env_soap= '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
    <SOAP-ENV:Header/>\
    <S:Body>\
        <ns2:ingresarDenuncia xmlns:ns2="http://servicios.ws/">\
            <dencte>' + localStorage.getItem("gcedula") + '</dencte>\
            <reg_denunciado>' + $('#rmunicipal').val() + '</reg_denunciado>\
            <fecha_hora>' + $('#fechaD').val() + '</fecha_hora>\
            <descripcion>' + $('#describe').val() + '</descripcion>\
            <foto>' + localStorage.getItem("ImgD") + '</foto>\
            <lugar>' + $('#lugarD').val() + '</lugar>\
        </ns2:ingresarDenuncia>\
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
                var respd = $(req.responseXML).find("return").text();
                if (respd == "true") {
                   swal({
                            title: "Correcto!",
                            text: "La denuncia se ha realizado!",
                            type: "info",
                            showCancelButton: false,
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                        },
                        function() {
                            setTimeout(function() {
                    window.location = 'usuarioQR.html';
                                },
                                2000);
                        });
                   
                } else {
                    swal({
                        title: "Error de envio!",
                        text: "Espere unos segundos y vuelva a intentar",
                        type: "info",
                        closeOnConfirm: true,
                    });
                }
            }
        },
        error: function(data, status, req) {
            alert("ERROR DE CONEXION");
            window.location = 'usuarioQR.html';
        }
    });
}
denunciaWsdl.prototype = new conexion;

function verdenunciaWsdl() {
    this.wsUrl = 'http://192.168.1.101:9090/MetodosTransito/MetodosTransito?WSDL';
    this.env_soap= '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
    <SOAP-ENV:Header/>\
    <S:Body>\
        <ns2:ver_denucia xmlns:ns2="http://servicios.ws/">\
            <registro_denunciado>' + localStorage.getItem("AcodigoQR") + '</registro_denunciado>\
        </ns2:ver_denucia>\
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
    });
}
verdenunciaWsdl.prototype = new conexion;


function detalles() {
    var listR = docxml.getElementsByTagName("Body")[0].getElementsByTagName("return");
    var i = 0;
    while (i < listR.length) {
        if (fecha == listR[i].getElementsByTagName("fecha_denuncia")[0].childNodes[0].nodeValue) {
            break;
        }
        i++;
    }
    var detalle_descripcion = listR[i].getElementsByTagName("descipcion_denuncia")[0].childNodes[0].nodeValue;
    fecha = listR[i].getElementsByTagName("fecha_denuncia")[0].childNodes[0].nodeValue;
    var detalle_lugar = listR[i].getElementsByTagName("lugar")[0].childNodes[0].nodeValue;
    localStorage.setItem("Ddescripcion", detalle_descripcion);
    localStorage.setItem("Dfecha", fecha);
    localStorage.setItem("Dlugar", detalle_lugar);
    verDialogo();
}

function verDialogo() {
    
    var f1 = localStorage.getItem("Dfecha");
    var d1 = localStorage.getItem("Ddescripcion");
    var l1 = localStorage.getItem("Dlugar");
    swal({
        title: "<small>Detalles Denuncia</small>!",
        text: "<span style='color:blue'>FECHA:\n</span>" + f1 + " \n <span style='color:blue'>DESCRIPCION: \n</span>" + d1 + "\n<span style='color:blue'>LUGAR:\n</span>" + l1 + "",
        html: true,
    });
}
