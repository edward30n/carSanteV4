$(function(){
	//$(".opciones_desplegar_barra").hide();
	

	$(".btn_barra").click(function(){
		$(".opciones_desplegar_barra").removeClass("mover_cerrar");
		$(".opciones_desplegar_barra").addClass("mover_abierto");
	});
	$(".boton_cerrar").click(function(){
		$(".opciones_desplegar_barra").removeClass("mover_abierto");
		$(".opciones_desplegar_barra").addClass("mover_cerrar");
	});
	var desplazamiento = 1;
	const nombre_desplazamiento = "imagen_fondo";
	const punto_inicio = "#point";
	const punto_final = "_bar";


	function updateCounter() {
    $(".imagen_desplazamiento").removeClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).removeClass("point_now");
		desplazamiento = desplazamiento + 1;
		if(desplazamiento == 5){
			desplazamiento = 1;
		}
		$(".imagen_desplazamiento").addClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).addClass("point_now");
  	}

  	setInterval(updateCounter, 10000);

	$("#left_arrow").click(function(){
		$(".imagen_desplazamiento").removeClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).removeClass("point_now");
		desplazamiento = desplazamiento - 1;
		if(desplazamiento == 0){
			desplazamiento = 4;
		}
		$(".imagen_desplazamiento").addClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).addClass("point_now");
	});

	$("#right_arrow").click(function(){
		$(".imagen_desplazamiento").removeClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).removeClass("point_now");
		desplazamiento = desplazamiento + 1;
		if(desplazamiento == 5){
			desplazamiento = 1;
		}
		$(".imagen_desplazamiento").addClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).addClass("point_now");	
	});
	$("#point1_bar").click(function(){
		$(".imagen_desplazamiento").removeClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).removeClass("point_now");
		desplazamiento = 1;
		$(".imagen_desplazamiento").addClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).addClass("point_now");
	});
	$("#point2_bar").click(function(){
		$(".imagen_desplazamiento").removeClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).removeClass("point_now");
		desplazamiento = 2;
		$(".imagen_desplazamiento").addClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).addClass("point_now");
	});
	$("#point3_bar").click(function(){
		$(".imagen_desplazamiento").removeClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).removeClass("point_now");
		desplazamiento = 3;
		$(".imagen_desplazamiento").addClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).addClass("point_now");
	});
	$("#point4_bar").click(function(){
		$(".imagen_desplazamiento").removeClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).removeClass("point_now");
		desplazamiento = 4;
		$(".imagen_desplazamiento").addClass(nombre_desplazamiento+desplazamiento);
		$(punto_inicio+desplazamiento+punto_final).addClass("point_now");
	});
});
