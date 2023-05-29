$(document).ready(function(){
    // evento clic del botón ingresar

    function convertirFecha(fecha) {
        const partes = fecha.split('-'); // Divide la fecha en partes: [año, mes, dia]
        const año = partes[0];
        const mes = partes[1];
        const dia = partes[2];
        const fechaConvertida = `${dia}/${mes}/${año}`; // Formatea la fecha en "dia/mes/año"
        return fechaConvertida;
      }

    console.log("Información actualizada:");
    $('#btn_actualizar').click(function(e){
        e.preventDefault(); // previene la acción por defecto del botón
        // obtener valores del formulario
        var id = localStorage.getItem('id_g');
        var nombre = $('#nombre1_registro').val();
        var nombre_sec = $('#nombre2_registro').val();
        var apellido = $('#apellido1_registro').val();
        var apellido_sec = $('#apellido2_registro').val();
        var correo = $('#correo_registro').val();
        var telefono = $('#telefono_registro').val();
        var fecha_nac = $('#nacimiento_registro').val();
        var clave = $('#contrasena_registro').val();
        console.log("id:",id);
        // realizar la solicitud AJAX al servidor
        fecha_nac = convertirFecha(fecha_nac);
        $.ajax({
            url: 'http://localhost:4000/api/v1/carSante/updateUser/' + id + '/' + nombre + '/' + nombre_sec + '/'+ apellido + '/'+ apellido_sec + '/'+ correo + '/'+ telefono + '/'+ clave,
            type: 'PUT',
            dataType: 'json',
            success: function(data){
                // el usuario fue encontrado en la base de datos
                
                   console.log("Información actualizada:");
  
                alert("Información Atualizada " + data.nombre + " " + data.apellido);
                // redireccionar a la página de inicio del usuario
                window.location.href = 'main.html';
            },
            error: function(jqXHR, textStatus, errorThrown){
                // hubo un error en la solicitud AJAX
                console.log(textStatus + ': ' + errorThrown);
                if (jqXHR.status == 404) {
                  // no se encontró el usuario en la base de datos
                  alert('Usuario o contraseña incorrectos, intente nuevamente.');
              } else if (jqXHR.status == 500) {
                  // error de la base de datos
                  alert('Hubo un error en el servidor');
              }
          }
      });
    });
  });
  