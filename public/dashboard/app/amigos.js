$(document).ready(function () {
    
    $('#btn-logout').click(function () {
        $.ajax({
            url: '/logout',
            method: 'get',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.status == 200) {
                    /* alert(data.mensaje) */
                    window.location = "../template/page-login.html";
                }
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
            }
        })  
    });

    $.ajax({
        url: '/obtener-amigos',
        method: 'get',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log(data);
             
            var fontAwesome = ''
            for( var i in data) {
                console.log(data[i]);

                $('#amigos').append(/* html */`

                <tr >
                    <td>
                        <a>
                            ${data[i].nombre_usuario}
                        </a>
                    </td>
                    <td>${data[i].txt_email}</td>
                    <td>${data[i].txt_username}</td>
                </tr>
                `)
                
            }
            console.log(textStatus);
            console.log(jqXHR);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
        }
    })

    $.ajax({
        url: "/obtener-usuarios",
        method: 'GET',
        dataType: "json",
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $("#slc-usuarios").append('<option value="' + data[i].id_usuario_pk + '">' + data[i].nombre_usuario + '</option>');
            }
        }
    });

    $('#btn-agregar').click(function () {
        
        var parametros = "idAmigo=" + $('#slc-usuarios').val()
        console.log(parametros);
        

        $.ajax({
            url: '/agregar-amigo',
            method: 'POST',
            data: parametros,
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.affectedRows == '1') {
                   /*  alert('Contacto agregado con éxito');
                    */ 
                   window.location = "amigos.html";
                }
            }
        })        
    })

    $.ajax({
        url: "/obtenerUsuario",
        method: "POST",
        dataType: "json",
        success: function (res) {
            console.log("Este es el resultado" + res[0]);
            $("#usuarioNombre").append("<h2>" + res[0].txt_username + "</h2>");

        },
        error: function (error) {
            console.log(error);
        }
    });
})