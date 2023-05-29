$(function(){
    var nombre_g =   localStorage.getItem('nombre_g');
    var apellido_g =      localStorage.getItem('apellido_g');
    var km_actual_g =    localStorage.getItem('km_actual_g');
    var uca_km_g =    localStorage.getItem('uca_km_g');
    var fecha_tecnomec_g =     localStorage.getItem('fecha_tecnomec_g');
    var uca_fecha_g =    localStorage.getItem('uca_fecha_g');
    var ucn_km_g =    localStorage.getItem('ucn_km_g');
    var ucn_fecha_g =    localStorage.getItem('ucn_fecha_g');
    var arreglo_huecos = localStorage.getItem('huecos_g');
    var notificacion_aceite = 0;
    var notificacion_neumaticos = 0;
    var notificacion_tecno = 0;
    var cantidad_notificaciones = 0;
    console.log("fecha: ", uca_fecha_g);
    var fechaActual = new Date();
    var partesFecha = uca_fecha_g.split('/');
    var fechaAlmacenada = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
    var diferenciaMilisegundos = fechaActual - fechaAlmacenada;
    
    console.log("diasuca: ", diferenciaDiasUca);

    function llamar_telegram_aceite(){
      const chatId = '1692714261'; // Reemplaza con tu ID de chat o ID del grupo
      const token = '6277870747:AAHl0-nhTnixA2d17YH9d8qQ7GgV1WEJ38Y'; // Reemplaza con tu token de la API de Telegram

      const mensaje = 'Car sante te informa que tienes que hacer cambio de aceite'; // El mensaje que deseas enviar

// Construye la URL de la API de Telegram para enviar el mensaje
      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(mensaje)}`;

  // Envía la solicitud HTTP GET para enviar el mensaje
    fetch(url)
    .then(response => response.json())
    .then(data => {
      // Verifica la respuesta de la API de Telegram
      if (data.ok) {
        console.log('Mensaje enviado correctamente');
      } else {
        console.log('Error al enviar el mensaje');
      }
    })
    .catch(error => {
      console.log('Error en la solicitud:', error);
    });
    }

    function llamar_telegram_neumaticos(){
      const chatId = '1692714261'; // Reemplaza con tu ID de chat o ID del grupo
      const token = '6277870747:AAHl0-nhTnixA2d17YH9d8qQ7GgV1WEJ38Y'; // Reemplaza con tu token de la API de Telegram

      const mensaje = 'Car sante te informa que tienes que hacer cambio de Neumaticos'; // El mensaje que deseas enviar

// Construye la URL de la API de Telegram para enviar el mensaje
      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(mensaje)}`;

  // Envía la solicitud HTTP GET para enviar el mensaje
    fetch(url)
    .then(response => response.json())
    .then(data => {
      // Verifica la respuesta de la API de Telegram
      if (data.ok) {
        console.log('Mensaje enviado correctamente');
      } else {
        console.log('Error al enviar el mensaje');
      }
    })
    .catch(error => {
      console.log('Error en la solicitud:', error);
    });
    }

    function llamar_telegram_Tecno(){
      const chatId = '1692714261'; // Reemplaza con tu ID de chat o ID del grupo
      const token = '6277870747:AAHl0-nhTnixA2d17YH9d8qQ7GgV1WEJ38Y'; // Reemplaza con tu token de la API de Telegram

      const mensaje = 'Car sante te informa que tienes que ir a la tecnomecanica'; // El mensaje que deseas enviar

// Construye la URL de la API de Telegram para enviar el mensaje
      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(mensaje)}`;

  // Envía la solicitud HTTP GET para enviar el mensaje
    fetch(url)
    .then(response => response.json())
    .then(data => {
      // Verifica la respuesta de la API de Telegram
      if (data.ok) {
        console.log('Mensaje enviado correctamente');
      } else {
        console.log('Error al enviar el mensaje');
      }
    })
    .catch(error => {
      console.log('Error en la solicitud:', error);
    });
    }
    var diferenciaDiasUca = 270-(Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24)));
    if(diferenciaDiasUca < 0){
        diferenciaDiasUca=0;
        notificacion_aceite = 1;
        cantidad_notificaciones += 1;
        llamar_telegram_aceite();
    }

    var partesFecha2 = ucn_fecha_g.split('/');
    var fechaAlmacenada2 = new Date(partesFecha2[2], partesFecha2[1] - 1, partesFecha2[0]);
    var diferenciaMilisegundos2 = fechaActual - fechaAlmacenada2;
    var diferenciaDiasUcn = 1825-(Math.floor(diferenciaMilisegundos2 / (1000 * 60 * 60 * 24)));
    if(diferenciaDiasUcn < 0){
        diferenciaDiasUcn=0;
        notificacion_neumaticos = 1;
        cantidad_notificaciones += 1;
        llamar_telegram_neumaticos();
    }
    console.log("dias UCN: ", diferenciaDiasUcn);

    var partesFecha3 = ucn_fecha_g.split('/');
    var fechaAlmacenada3 = new Date(partesFecha3[2], partesFecha3[1] - 1, partesFecha3[0]);
    var diferenciaMilisegundos3 = fechaActual - fechaAlmacenada3;
    var diferenciaDiasTecno = 365-(Math.floor(diferenciaMilisegundos3 / (1000 * 60 * 60 * 24)));
    if(diferenciaDiasTecno < 0){
        diferenciaDiasTecno=0;
        notificacion_tecno = 1;
        cantidad_notificaciones += 1;
        llamar_telegram_Tecno();
    }
 console.log("dias tecno: ", diferenciaDiasTecno);

    var lat_original = 4.733626666666667;
    var lng_original = -74.08529166666666;
    var zoom = 13;
    var mymap = L.map('mapid').setView([lat_original,lng_original], zoom);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18,
          }).addTo(mymap);
    
    var marker = L.marker([lat_original, lng_original]).addTo(mymap);
    var new_lat = lat_original;
    var new_lng = lng_original;
    var contador = 1;
    var i = 0;
    function actualizarMapa() {
       
       mymap.removeLayer(marker); 
       zoom = mymap.getZoom();
       marker = L.marker([lat_original+i*0.0001,lng_original+i*0.0001]).addTo(mymap);
       i = i + 1;
     }
    $("#volver_posicion").click(function(){
        mymap.setView([lat_original+i*0.0001, lng_original+i*0.0001], 25);
    });
    
    setInterval(actualizarMapa, 1000);
    

    var nombre_apellido = nombre_g + " " + apellido_g;
    var container = document.getElementById("nombre_bar");
    container.innerHTML = nombre_apellido;
    
    
    var kilometraje_total = km_actual_g;
    var container_2 = document.getElementById("kilometraje_total");
    container_2.innerHTML = kilometraje_total;
    
    var huecos = "30";
    var container_3 = document.getElementById("huecos_totales");
    container_3.innerHTML = huecos;
    
    var k_aciete = 5000 - (parseInt(km_actual_g) - parseInt(uca_km_g));
    var container_4 = document.getElementById("kilometros_aceite");
    container_4.innerHTML = k_aciete;
    if((k_aciete < 0) && (notificacion_aceite == 0)){
        notificacion_aceite = 1;
        cantidad_notificaciones += 1;
        llamar_telegram_aceite();
    }
    
    var k_neumaticos = 50000 - (parseInt(km_actual_g) - parseInt(ucn_km_g));
    var container_5 = document.getElementById("kilometros_neumaticos");
    container_5.innerHTML = k_neumaticos;
    
    if((k_neumaticos < 0) && (notificacion_neumaticos == 0)){
        notificacion_neumaticos = 1;
        cantidad_notificaciones += 1;
        llamar_telegram_neumaticos();
    }

    var f_aceite = diferenciaDiasUca;
    var container_6 = document.getElementById("fechas_aceite");
    container_6.innerHTML = f_aceite;
    
    var f_tecno = diferenciaDiasTecno;
    var container_7 = document.getElementById("fechas_tecnomecanica");
    container_7.innerHTML = f_tecno;
    
    var f_neumatico = diferenciaDiasUcn;
    var container_8 = document.getElementById("fechas_neumaticos");
    container_8.innerHTML = f_neumatico;
    
    if(notificacion_aceite == 1){
        var not_aceite = "<div class='row'><div class='col-12'><span>toca cambiar el Aceite</span><hr></div></div>";
        var container_9  = document.getElementById("cuadro_notificaciones");
        container_9.innerHTML = not_aceite;
    }
    if(notificacion_neumaticos == 1){
        var not_neumatico = "<div class='row'><div class='col-12'><span>toca cambiar Los Neumaticos</span><hr></div></div>";
        var container_10  = document.getElementById("cuadro_notificaciones");
        container_10.innerHTML += not_neumatico;
    }
    if(notificacion_tecno == 1){
        var not_tecno = "<div class='row'><div class='col-12'><span>toca realizar la tecnomecanica</span><hr></div></div>";
        var container_11  = document.getElementById("cuadro_notificaciones");
        container_11.innerHTML += not_tecno;
    }
    if(cantidad_notificaciones == 0){
        var not_nohay = "<div class='row'><div class='col-12'><span>No hay notificaciones</span><hr></div></div>";
        var container_12  = document.getElementById("cuadro_notificaciones");
        container_12.innerHTML = not_nohay;
    }
    var cant_notificaciones = cantidad_notificaciones;
    var container_13 = document.getElementById("cantidad_notificaciones");
    container_13.innerHTML = cant_notificaciones;
    $("#simbolo_opciones_oprimido").click(function(){
    
      $("#barra_desplegable").removeClass("barra_superior_desplegable_abierta");
      $("#barra_desplegable").addClass("barra_superior_desplegable");
      $("#simbolo_opciones_oprimido").removeClass("d-block");
      $("#simbolo_opciones_oprimido").addClass("d-none");
      $("#simbolo_opciones").removeClass("d-none");
      $("#simbolo_opciones").addClass("d-block");
    
      
    });
    $("#info_mapa").click(function(){
      $("#container-mapa").removeClass("d-none");
      $("#container-mapa").addClass("d-block");
      $("#container-carro").removeClass("d-block");
      $("#container-carro").addClass("d-none");
      $("#container-actualizar").removeClass("d-block");
      $("#container-actualizar").addClass("d-none");
    });
    $("#info_carro").click(function(){
      $("#container-mapa").removeClass("d-block");
      $("#container-mapa").addClass("d-none");
      $("#container-carro").removeClass("d-none");
      $("#container-carro").addClass("d-block");
      $("#container-actualizar").removeClass("d-block");
      $("#container-actualizar").addClass("d-none");
    });
    $("#ajust_carro").click(function(){
      $("#container-mapa").removeClass("d-block");
      $("#container-mapa").addClass("d-none");
      $("#container-carro").removeClass("d-block");
      $("#container-carro").addClass("d-none");
      $("#container-actualizar").removeClass("d-none");
      $("#container-actualizar").addClass("d-block");
    });
    
    $("#simbolo_opciones").click(function(){
      
      $("#barra_desplegable").removeClass("barra_superior_desplegable");
      $("#barra_desplegable").addClass("barra_superior_desplegable_abierta");
      $("#simbolo_opciones").removeClass("d-block");
      $("#simbolo_opciones").addClass("d-none");
      $("#simbolo_opciones_oprimido").removeClass("d-none");
      $("#simbolo_opciones_oprimido").addClass("d-block");
    
      
    });
    
    $("#boton_menu_contraido").click(function(){
      $(".menu_opciones").removeClass("d-none");
      $(".menu_opciones").addClass("d-block");
      $("#boton_menu_contraido").removeClass("d-block");
      $("#boton_menu_contraido").addClass("d-none");
      $("#boton_menu_expandido").removeClass("d-none");
      $("#boton_menu_expandido").addClass("d-block");
    });
    
    $("#notificacion_campana").click(function(){
      $(".notificaciones").removeClass("d-none");
      $(".notificaciones").addClass("d-block");
      $("#notificacion_campana").removeClass("d-block");
      $("#notificacion_campana").addClass("d-none");
      $("#notificacion_campana_expandido").removeClass("d-none");
      $("#notificacion_campana_expandido").addClass("d-block");
    });
    $("#notificacion_campana_expandido").click(function(){
        $(".notificaciones").removeClass("d-block");
        $(".notificaciones").addClass("d-none");
        $("#notificacion_campana").removeClass("d-none");
        $("#notificacion_campana").addClass("d-block");
        $("#notificacion_campana_expandido").removeClass("d-block");
        $("#notificacion_campana_expandido").addClass("d-none");
      });
      
      $("#boton_menu_expandido").click(function(){
        $(".menu_opciones").removeClass("d-block");
        $(".menu_opciones").addClass("d-none");
        $("#boton_menu_contraido").removeClass("d-none");
        $("#boton_menu_contraido").addClass("d-block");
        $("#boton_menu_expandido").removeClass("d-block");
        $("#boton_menu_expandido").addClass("d-none");
      });
    
    for(var i = 0;i<10;i++){
    var circle = L.circle([lat_original+i*0.001,lng_original+i*0.001],{
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius:4
    }).addTo(mymap);
    }
    
    
    
    
    /*
          var marker = L.marker([4.733583043013866,-74.08521072405183]).addTo(mymap);
          
            var bounds = [[4.733583043013866,-74.08521072405183], [4.75,-74.086]];
    
    // create an orange rectangle
    var rectangle = L.rectangle([[4.733583043013866,-74.08521072405183], [4.75,-74.086]], {
        color: "#ff7800", // Color del borde del rectángulo
        fillColor: '#f03', // Color del relleno del rectángulo
        fillOpacity: 0.5 // Opacidad del relleno del rectángulo
    }).addTo(mymap);
    map.fitBounds(bounds);
    */});