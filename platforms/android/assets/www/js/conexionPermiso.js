
function permisoWsdl() {
    var wsUrl = 'http://192.168.1.103:8080/MetodosTransito/MetodosTransito?WSDL';
    var resultado;
    var llamarsoap = '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
    <SOAP-ENV:Header/>\
    <S:Body>\
        <ns2:consultar_permiso xmlns:ns2="http://servicios.ws/">\
            <num_registro>'+localStorage.getItem("AcodigoQR")+'</num_registro>\
        </ns2:consultar_permiso>\
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
          //alert("FIN NOMBRES : "+ $(req.responseXML).find("nombres_socio").text());
          $('#tablaNombre').val($(req.responseXML).find("nombres_socio").text());          
          $('#tablaApellido').val($(req.responseXML).find("apellidos_socio").text());          
          $('#tablaCedula').val($(req.responseXML).find("ced_socio").text());          
          $('#tablaPermiso').val($(req.responseXML).find("cod_permiso").text());          
          $('#tablaCodVehiculo').val($(req.responseXML).find("codigo_vehiculo").text());          
          $('#tablaPlaca').val($(req.responseXML).find("placa_vehiculo").text());  
          $('#tablaMarca').val($(req.responseXML).find("marca_vehiculo").text());                  
          $('#tablaModelo').val($(req.responseXML).find("modelo_vehiculo").text());          
          $('#tablaChasis').val($(req.responseXML).find("num_chasis_vehiculo").text());          
          $('#tablaMotor').val($(req.responseXML).find("num_motor_vehiculo").text());          
          $('#tablaTipoVehiculo').val($(req.responseXML).find("tipo_vehiculo").text());          
          $('#tablaNomEmpresa').val($(req.responseXML).find("nombre_empresa").text());          
          $('#tablaRevision').val($(req.responseXML).find("revision").text());          
          $('#n_registro').val(localStorage.getItem("AcodigoQR"));      
          },
                error: function(data, status, req) {
                    alert("ERROR DE CONEXION!");
                }
            });
    
   // $('#Denuncias').on('click', function() {verdenunciaWsdl();});


 //   $('#listview').children('li').on('click', function() {
 //       fecha = $(this).attr('data-name');
 //       detalles();
 //       verDialogo();
   //  });


  }

   