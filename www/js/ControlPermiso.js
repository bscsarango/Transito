function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

if(states[networkState]=='No network connection'){
 alert('Connection type: ' + states[networkState]);
}
     
}



function estado_conexion(){
    if (isOffline()) {
         $('#estadocx').show();
    }
} 

function obtenerValor() {
    var describe = document.getElementById("describe");
    valorSeleccionado = describe.options[describe.selectedIndex].value;
    if (valorSeleccionado == 'otro') {
        $('#nuevoD').show();
    }
}

function otra() {
    if (valorSeleccionado == 'otro') {
        var variable = $('#nuevoD').val();
        describe.options[describe.selectedIndex].value = variable;
        document.getElementById("describe").value = variable;
    }
}

function rm() {
    $('#rmunicipal').val(localStorage.getItem("UDcodigoQR"));
    $('#fechaD').attr("disabled", "disabled");
}

function pregDate(){
     
    if ((localStorage.getItem("gcedula")==null)|| (localStorage.getItem("estadoRegistro")!='si')) {
        swal({
                title: "Registro Datos",
                text: "Usted debe Registrar sus datos Personales Ahora. Los datos seran utilizados en el momento que realice sus denuncias",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: false,
            },
            function() {
                window.location = 'datosUsuario.html';
            });
    } else {
        window.location = 'usuarioQR.html';
    }

}

function preguntaRDatos() {
    
}

function cargarDatos() {
    document.getElementById("Mcedula").value = localStorage.getItem("gcedula");
    document.getElementById("Mnombres").value = localStorage.getItem("gnombres");
    document.getElementById("Mapellidos").value = localStorage.getItem("gapellidos");
    document.getElementById("Mtelefono").value = localStorage.getItem("gtelefono");
    document.getElementById("Mlugar").value = localStorage.getItem("glugar");
}

function llenarFormulario() {
    gcedula = $('#cedula').val();
    localStorage.setItem("gcedula", gcedula);
    gnombres = $('#nombres').val();
    localStorage.setItem("gnombres", gnombres);
    gapellidos = $('#apellidos').val();
    localStorage.setItem("gapellidos", gapellidos);
    gtelefono = $('#telefono').val();
    localStorage.setItem("gtelefono", gtelefono);
    glugar = $('#lugar').val();
    localStorage.setItem("glugar", glugar);
    if (validaCedula(gcedula)) {
        $("#visto").css("display", "block");
        camposObligatorios();
    }
}

function camposObligatorios() {
    var campo_ced = document.getElementById("cedula").value;
    var campo_nombres = document.getElementById("nombres").value;
    var campo_apellidos = document.getElementById("apellidos").value;
    var campo_telefono = document.getElementById("telefono").value;
    var campo_lugar = document.getElementById("lugar").value;
    if (campo_ced == '' || campo_nombres == '' || campo_apellidos == '' || campo_telefono == '' || campo_lugar == '') {
        swal('Todos los campos son obligatorios');
    } else {
        RegistroDenunciante();
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
            swal("El numero de cedula es incorrecto");

            return false;
        }
    } else {
        swal("El número de la cédula debe tener 10 digitos");
        return false;
    }
}

function validaNumero(e) {
    var tecla = document.all ? tecla = e.keyCode : tecla = e.which;
    return ((tecla > 47 && tecla < 58) || tecla == 8);

    function validLetter(e) {
        var tecla = document.all ? tecla = e.keyCode : tecla = e.which;
        var especiales = [8, 32, 13]; /*back, space, enter */

        for (var i in especiales) {
            if (tecla == especiales[i]) {
                return true; /*break; */
            }
        }
        return (((tecla > 96 && tecla < 123) || (tecla > 64 && tecla < 91)) || tecla == 8);
    }
}

function validaLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function cargarFecha() {
    var fechaActual = new Date();
    var mesActual = fechaActual.getMonth() + 1;
    var fecha_hora = fechaActual.getFullYear() + '-' + mesActual + '-' + fechaActual.getDate() + ' ' + fechaActual.getHours() + ':' + fechaActual.getMinutes() + ':' + fechaActual.getSeconds();
    $('#fechaD').val(fecha_hora);
}

function comprobarDatos() {
    if ((localStorage.getItem("gcedula") == null) || (localStorage.getItem("gnombres") == null) || (localStorage.getItem("gapellidos") == null) || (localStorage.getItem("gtelefono") == null) || (localStorage.getItem("glugar") == null)) {
        if (confirm('Aun no completa el registro de sus datos Personales')) {
            window.location = 'datosUsuario.html';
        } else {
            window.location = 'usuario_denuncia.html';
        }
    }
}

function pagina() {
    window.location = 'modificarDatosUsuario.html';
}

function nueva_consulta(){
    window.location = 'agentes.html';
    
}