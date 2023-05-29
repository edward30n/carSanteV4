async function extraerDatos() {
    const url = 'https://api.thingspeak.com/channels/2120854/feeds.json?results=1';
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const feeds = data.feeds;
      const feed = feeds[0];
  
      const field1Value = feed.field1;
      const field2Value = feed.field2;
      const field3Value = feed.field3;
      const field4Value = feed.field4;
      const field5Value = feed.field5;
      const field6Value = feed.field6;
      const field7Value = feed.field7;
      const field8Value = feed.field8;
  
      const posicionax = field3Value.indexOf('ax');
      const posicionay = field3Value.indexOf('ay');
      const posicionaz = field3Value.indexOf('az');
      const posicionwx = field4Value.indexOf('gx');
      const posicionwy = field4Value.indexOf('gy');
      const posicionwz = field4Value.indexOf('gz');
  
      const ax = field3Value.substring(0, posicionax);
      const ay = field3Value.substring(posicionax + 2, posicionay);
      const az = field3Value.substring(posicionay + 2, posicionaz);
      const wx = field4Value.substring(0, posicionwx);
      const wy = field4Value.substring(posicionwx + 2, posicionwy);
      const wz = field4Value.substring(posicionwy + 2, posicionwz);
  
      const codigo = field1Value;
      const tiempo = field2Value;
      const longitud = field5Value;
      const latitud = field6Value;
      const velocidad = field8Value;
  
      return {
        codigo,
        tiempo,
        ax,
        ay,
        az,
        wx,
        wy,
        wz,
        longitud,
        latitud,
        velocidad
      };
    } catch (error) {
      throw new Error('Error al obtener los datos: ' + error.message);
    }
  }
  
  let datosAnteriores = null;


  
  function enviarDatos() {
    const url = "http://localhost:4000/api/v1/carSante/sendData";
    var id_cocheT = localStorage.getItem('id2_g');
    var tiempoT = localStorage.getItem('tiempo_g');
    var latitudT = localStorage.getItem('latitud_g');
    var longitudT = localStorage.getItem('longitud_g');
    var axT = localStorage.getItem('ax_g');
    var ayT = localStorage.getItem('ay_g');
    var azT = localStorage.getItem('az_g');
    var wxT = localStorage.getItem('wx_g');
    var wyT = localStorage.getItem('wy_g');
    var wzT = localStorage.getItem('wz_g');


    const data = {
        id_cocheT,
        tiempoT,
        latitudT,
        longitudT
       // axT,
        //ayT,
        //azT,
        //wxT,
        //wyT,
        //wzT,
        
    };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok) {
            //alert('Registro exitoso');
            //window.location.href = 'login.html';
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
};
  
  function obtenerDatosContinuamente(intervalo) {
    setInterval(async () => {
      try {
        const datos = await extraerDatos();
        
        if (datosAnteriores !== null) {
          // Realizar la comparación con los datos anteriores
          // Aquí puedes agregar tu lógica de comparación y realizar las operaciones deseadas
          // Por ejemplo:
          if (datos.tiempo == datosAnteriores.tiempo) {
            console.log('mismo tiempo');
          } else {
            console.log(datos);
            
            localStorage.setItem('tiempo_g',datos.tiempo);
            localStorage.setItem('latitud_g',datos.latitud);
            localStorage.setItem('longitud_g',datos.longitud);
            localStorage.setItem('ax_g',datos.ax);
            localStorage.setItem('ay_g',datos.ay);
            localStorage.setItem('az_g',datos.az);
            localStorage.setItem('wx_g',datos.wx);
            localStorage.setItem('wy_g',datos.wy);
            localStorage.setItem('wz_g',datos.wz);
            localStorage.setItem('id2_g',datos.codigo);
            enviarDatos();


            //aqui se pondria el codigo para integrarlo a la base de datos
          }
        }
        
        datosAnteriores = datos;
      } catch (error) {
        console.error(error);
      }
    }, intervalo);
  }
  
  // Obtener los datos cada 5 segundos (5000 milisegundos)
  obtenerDatosContinuamente(1000);
