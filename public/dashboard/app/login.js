$(document).ready( function(){

    console.log('Ready');
    
	$("#login").submit(function(e){

		e.preventDefault();

		var params = "email=" +$("#txt-email").val() + "&password="+$("#txt-password").val();
		$.ajax({
			url:"/login",
			method: "POST",
			data: params,
			dataType: "json",
			success: function (data, textStatus, jqXHR){
                console.log(data);
                
				if (data.length == 1){
					window.location.href = "../dashboard/home.html";
				} else {  
					$("#error").css({
						color: "red",
						display: "block"
					});
				                  
                    /* alert("Usuario Inválido"); */
                }

                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
			},
			error: function (jqXHR, textStatus, errorThrown){
				console.log(jqXHR);
				console.log("Estado: " + textStatus);
				console.log(errorThrown);
			}
		});
	});	
});
