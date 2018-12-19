var idArchivoCompartir
function obtenerIdArchivo(idArchivo) {
    idArchivoCompartir =  idArchivo
}

$(document).ready(function () {
    console.log('Ready');

    $.ajax({
        url: '/archivos-compartidos',
        method: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log(data);
             
            var fontAwesome = ''
            for( var i in data) {
                console.log(data[i]);

                if (data[i].id_tipo_archivo_fk == 1) {
                    fontAwesome = '<i class="fab fa-html5"></i>'
                }

                if (data[i].id_tipo_archivo_fk == 2) {
                    fontAwesome = '<i class="fab fa-css3-alt"></i>'
                }

                if (data[i].id_tipo_archivo_fk == 3) {
                    fontAwesome = '<i class="fab fa-js"></i>'
                }

                $('#archivos').append(/* html */`

                <tr >
                    <td>
                        <a href="dashboard.html?tipo=${data[i].id_tipo_archivo_fk}&idArchivo=${data[i].id_archivo_pk }">
                            ${data[i].txt_nombre_archivo}
                        </a>
                    </td>
                    <td>${fontAwesome}</td>
                    <td>${data[i].txt_extension}</td>
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
});