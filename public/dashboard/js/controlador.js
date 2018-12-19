$("#btn-registrarse").click(function(){
	var usuario = "2"
	
	var a = `nom=${$("#txt-nombre").val()}&username=${$("#txt-username").val()}&email=${$("#txt-email").val()}&password=${$("#txt-password").val()}&sexo=${$("#slc-sexo").val()}`;
	
	if ($("#txt-nombre").val() == "" || $("#txt-username").val() == "" || $("#txt-email").val() == "" || $("#txt-password").val() == "" || $("#slc-sexo").val() == ""){
		$("#error").css({
			color: "red",
			display: "block"
		});
	} else {

	
		$.ajax({
			
			url:"/registroUsuario",
			data:a,
			dataType:"json",
			method:"POST",
			success:function(result){
				//console.log(res);

					if (result.affectedRows == 1){
						window.location.href = "../template/page-login.html";
				}else{
					console.log(result);
					
				} 
			},
			error:function(error){
				console.log(error);
			}
		});
}
});