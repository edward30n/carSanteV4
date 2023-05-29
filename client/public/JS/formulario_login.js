$(document).ready(function(){
  // evento clic del botón ingresar
  $('#btn_ingresar').click(function(e){
      e.preventDefault(); // previene la acción por defecto del botón
      // obtener valores del formulario
      var usuario = $('#usuario').val();
      var contrasena = $('#contrasena').val();
      // realizar la solicitud AJAX al servidor
      $.ajax({
          url: 'http://localhost:4000/api/v1/carSante/' + usuario + '/' + contrasena,
          type: 'GET',
          dataType: 'json',
          success: function(data){
              // el usuario fue encontrado en la base de datos
              var mensaje = data.mensaje;
              var nombre = data.nombre;
              var apellido = data.apellido;
              var marca = data.marca;
              var fecha_tecnomec = data.fecha_tecnomec;
              var km_actual = data.km_actual;
              var uca_fecha = data.uca_fecha;
              var uca_km = data.uca_km;
              var ucn_fecha = data.ucn_fecha;
              var ucn_km = data.ucn_km;
              var anio = data.anio;
              var huecos = data.huecos;
              var id = data.id_usuario;
              console.log("id: ", id);
              localStorage.setItem('nombre_g', nombre);
              localStorage.setItem('apellido_g', apellido);
              localStorage.setItem('km_actual_g', km_actual);
              localStorage.setItem('uca_km_g', uca_km);
              localStorage.setItem('fecha_tecnomec_g', fecha_tecnomec);
              localStorage.setItem('uca_fecha_g', uca_fecha);
              localStorage.setItem('ucn_km_g', ucn_km);
              localStorage.setItem('ucn_fecha_g', ucn_fecha);
              localStorage.setItem('huecos_g', huecos);
              localStorage.setItem('id_g', id);



              window.nombre_p=nombre;
              window.apellido_p=apellido;
              window.marca_p=marca;
              window.fecha_tecnomec_p=fecha_tecnomec;
              window.km_actual_p=km_actual;
              window.uca_fecha_p=uca_fecha;
              window.uca_km_p=uca_km;
              window.ucn_fecha_p=ucn_fecha;
              window.ucn_km_p=ucn_km;
              window.anio_p=anio;
              window.huecos_p=huecos;
              
                 console.log("Información almacenada en las variables globales:");
                 console.log("Nombre: ", window.nombre_p);
                 console.log("Apellido: ", window.apellido_p);
                 console.log("Marca: ", window.marca_p);
                 console.log("Fecha Tecnomecánica: ", window.fecha_tecnomec_p);
                 console.log("Kilómetros actuales: ", window.km_actual_p);
                 console.log("Fecha de última cita de mantenimiento: ", window.uca_fecha_p);
                 console.log("Kilómetros en la última cita de mantenimiento: ", window.uca_km_p);
                 console.log("Fecha de próxima cita de mantenimiento: ", window.ucn_fecha_p);
                 console.log("Kilómetros en la próxima cita de mantenimiento: ", window.ucn_km_p);
                 console.log("Año del vehículo: ", window.anio_p);
                 console.log("Arreglo de huecos: ", window.huecos_p);

              alert("Bienvenido de nuevo " + data.nombre + " " + data.apellido);
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
