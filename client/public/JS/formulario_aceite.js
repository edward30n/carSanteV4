$(document).ready(function(){
    // evento clic del botón ingresar
    console.log("Información actualizada:");
    $('#update_aceite').click(function(e){
       
        e.preventDefault(); // previene la acción por defecto del botón
        // obtener valores del formulario
        var id = localStorage.getItem('id_g');
        var km = localStorage.getItem('km_actual_g');
        var prueba = localStorage.getItem('pruebaTesteo');
        
const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son base 0 (enero = 0)
const año = fechaActual.getFullYear();
// Formatear la fecha como una cadena en el formato DD/MM/AAAA
const fechaActualString = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año}`;
        // realizar la solicitud AJAX al servidor
        $.ajax({
            url: 'http://localhost:4000/api/v1/carSante/actAceite/' + id + '/' + km,
            type: 'PUT',
            dataType: 'json',
            success: function(data){
                // el usuario fue encontrado en la base de datos
                
                   console.log("Información actualizada:");
                
                   localStorage.setItem('uca_km_g', km);
                   localStorage.setItem('uca_fecha_g', fechaActualString);
  
                alert("Información del aceite actualizacada satsifactoriamente.");
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
  