
$(document).ready(function () {
    // evento clic del botón ingresar
    function convertirFecha(fecha) {
        const partes = fecha.split('-'); // Divide la fecha en partes: [año, mes, dia]
        const año = partes[0];
        const mes = partes[1];
        const dia = partes[2];
        const fechaConvertida = `${dia}/${mes}/${año}`; // Formatea la fecha en "dia/mes/año"
        return fechaConvertida;
      }

    $('#btn_registrarse').click(function (e) {
        e.preventDefault(); // previene la acción por defecto del botón
        const url = "http://localhost:4000/api/v1/carSante/createUser";
        var nombre1 = $('#nombre1_registro').val();
        var nombre_sec1 = $('#nombre2_registro').val();
        var apellido1 = $('#apellido1_registro').val();
        var apellido_sec1 = $('#apellido2_registro').val();
        var correo1 = $('#correo_registro').val();
        var telefono1 = $('#telefono_registro').val();
        var fecha_nac1 = $('#nacimiento_registro').val();
        var clave1 = $('#contrasena_registro').val();
        var codigo_activacion1 = $('#codigo_registro').val();
        var anio1 = $('#ano_carro').val();
        var marca1 = $('#nombre_carro').val();
        var fecha_tecnomec1 = $('#fechatecno_carro').val();
        var km_actual1 = $('#kilometraje_carro').val();
        var uca_fecha1 = $('#fechaaceite_carro').val();
        var uca_km1 = $('#kilometrajeaceite_carro').val();
        var ucn_fecha1 = $('#fechaneumatico_carro').val();
        var ucn_km1 = $('#kilometrajeneumatico_carro').val();
        
        fecha_nac1 = convertirFecha(fecha_nac1);
        fecha_tecnomec1 = convertirFecha(fecha_tecnomec1);
        uca_fecha1 = convertirFecha(uca_fecha1);
        ucn_fecha1 = convertirFecha(ucn_fecha1);

        const data = {
            nombre: nombre1,
            nombre_sec: nombre_sec1,
            apellido: apellido1,
            apellido_sec: apellido_sec1,
            correo: correo1,
            telefono: telefono1,
            fecha_nac: fecha_nac1,
            clave: clave1,
            codigo_activacion: codigo_activacion1,
            anio:anio1,
            marca:marca1,
            fecha_tecnomec:fecha_tecnomec1,
            km_actual:km_actual1,
            uca_fecha:uca_fecha1,
            uca_km:uca_km1,
            ucn_fecha:uca_fecha1,
            ucn_km:uca_km1
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                alert('Registro exitoso');
                window.location.href = 'login.html';
                return response.json();
            } else {
                alert('Registro invalido');
                throw new Error("Error en la solicitud");
            }
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    });
});
