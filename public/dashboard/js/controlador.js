/* $("#slc-usuario").change(function(){
	//alert("USUARIO seleccionado: " + $("#slc-usuario").val());
});

function seleccionarContacto(codigoContacto, nombreContacto, urlImagen){
	//alert("Obtener conversación entre: " + codigoContacto + ",  y " + $("#slc-usuario").val());
	$("#receptor").val(codigoContacto);
	$("#contacto-seleccionado").html(nombreContacto);
	$("#imagen-contacto").attr("src",urlImagen);
	cargarConversacion(codigoContacto);
}

function cargarConversacion(codigoContacto){
	$.ajax({
		url:`/mensajes/${$("#slc-usuario").val()}/${codigoContacto}`,
		method:"GET",
		dataType:"json",
		success:function(res){
			console.log(res);
			$("#conversation").html("");
			for (var i=0;i<res.length;i++){
				var claseCss="receiver";
				if (res[i].codigo_usuario_emisor == $("#slc-usuario").val())
					claseCss="sender";
				anexarMensaje(claseCss,res[i].mensaje,res[i].hora_mensaje);
			}
		},
		error:function(error){
			console.error(error);
		}
	});
}

function anexarMensaje(claseCss,mensaje,hora_mensaje){
	$("#conversation").append(
		`<div class="row message-body">
		<div class="col-sm-12 message-main-${claseCss}">
		  <div class="${claseCss}">
			<div class="message-text">
			 ${mensaje}
			</div>
			<span class="message-time pull-right">
			  ${hora_mensaje}
			</span>
		  </div>
		</div>
	  </div>`
	);
}
 */
$("#btn-registrarse").click(function(){
	var usuario = "2"
/* 	alert(` 
			  nombre=${$("#txt-nombre").val()}
			  &username=${$("#txt-username").val()}
			  &email=${$("#txt-email").val()}
			  &password=${$("#txt-password").val()}
			  &sexo=${$("#slc-sexo").val()}`);  */
	/* var men = $("#txta-mensaje").val() */
	
	var a = `nom=${$("#txt-nombre").val()}&username=${$("#txt-username").val()}&email=${$("#txt-email").val()}&password=${$("#txt-password").val()}&sexo=${$("#slc-sexo").val()}`;
	$.ajax({
		
		url:"/registroUsuario",
		data:a,
		dataType:"json",
		method:"POST",
		success:function(result){
			//console.log(res);

			 if (result.affectedRows==1){
				 window.location.href = "../dashboard/dashboard.html";
				 /* claseCss="sender";
				 *//* anexarMensaje(claseCss,$("#txta-mensaje").val(),"66:66"); */
				/* $("#txta-mensaje").val(""); */
			}else{
				console.log(result);
				
			} 
		},
		error:function(error){
			console.log(error);
		}
	});
});
/* 
$(document).ready(function(){
	$.ajax({
		url:"/usuarios",
		method:"GET",
		dataType:"json",
		success:function(res){
			console.log(res);
			for (var i=0;i<res.length;i++){
				$("#slc-usuario").append(`<option value="${res[i].codigo_usuario}">${res[i].nombre_usuario}</option>`);
				$("#contactos").append(
					`<div class="row sideBar-body" onclick="seleccionarContacto(${res[i].codigo_usuario},'${res[i].nombre_usuario}','${res[i].url_imagen_perfil}');">
						<div class="col-sm-3 col-xs-3 sideBar-avatar">
						<div class="avatar-icon">
							<img src="${res[i].url_imagen_perfil}">
						</div>
						</div>
						<div class="col-sm-9 col-xs-9 sideBar-main">
						<div class="row">
							<div class="col-sm-8 col-xs-8 sideBar-name">
							<span class="name-meta">${res[i].nombre_usuario}
							</span>
							</div>
							<div class="col-sm-4 col-xs-4 pull-right sideBar-time">
							<span class="time-meta pull-right">18:18
							</span>
							</div>
						</div>
						</div>
					</div>`
				);
			}
		},
		error:function(error){
			console.error(error);
		}
	}); */

	/*setInterval(function(){
			if($("#receptor").val()!=""){
				$("#conversation").html("");
				cargarConversacion($("#receptor").val());
			}
		},	5000
	);
});*/