
function permisoWsdl() {
     this.wsUrl = 'http://192.168.1.101:9090/MetodosTransito/MetodosTransito?WSDL';
    //var resultado;
  this.env_soap= '<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
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
            data: env_soap,
         success: function(data, status, req) {
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
  }

   permisoWsdl.prototype = new conexion;