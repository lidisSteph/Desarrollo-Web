var idArchivoCompartir
function obtenerIdArchivo(idArchivo) {
    idArchivoCompartir =  idArchivo
}

$(document).ready(function () {
    console.log('Ready');




    $.ajax({
        url: '/archivo-usuario',
        method: 'get',
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
                    <td>
                        <button type="button" data-toggle="modal" data-target="#friendModal" data-context="warning" data-message="This is warning info" data-position="top-right"
                            class="icon-size" onclick="obtenerIdArchivo(${data[i].id_archivo_pk})">
                            <i class="fas fa-share-alt "></i>                            
                        </button>
                        <button class="icon-size" onclick="favorito(${data[i].id_archivo_pk})">
                            <i class="far fa-heart "></i>
                        </button>
                        <button class="icon-size" onclick="eliminar(${data[i].id_archivo_pk})">
                            <i class="far fa-trash-alt "></i>
                        </button>
                    </td>
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

    $('#btn-html').click(function () {
        
        let nombreArchivo = $('#txt-nombre-archivo-html').val();

        if (nombreArchivo === '') {
           /*  alert("Debe escribir un nombre")
         */} else {
            window.location.href = `dashboard.html?tipo=1&nombre=${nombreArchivo}`;
        }
        console.log(nombreArchivo);

    });


    $('#btn-css').click(function () {
        
        let nombreArchivo = $('#txt-nombre-archivo-css').val();
        
        if (nombreArchivo === '') {
            /* alert("Debe escribir un nombre")
         */} else {
            window.location.href = `dashboard.html?tipo=2&nombre=${nombreArchivo}`;
        }
        console.log(nombreArchivo);

    });

    $('#btn-js').click(function () {
        
        let nombreArchivo = $('#txt-nombre-archivo-js').val();

        if (nombreArchivo === '') {
          /*   alert("Debe escribir un nombre")
         */} else {
            window.location.href = `dashboard.html?tipo=3&nombre=${nombreArchivo}`;
        }
        console.log(nombreArchivo);

    });    

    $('#btn-compartir').click(function () {
        console.log("Compartir");
        
        console.log(idArchivoCompartir);
        var idAmigo = $('#slc-amigos').val()

        console.log(idAmigo);
        
        var parametros = `idArchivo=${idArchivoCompartir}&idAmigo=${idAmigo}`
        $.ajax({
            url: '/compartir',
            method: 'POST',
            data: parametros,
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (data.affectedRows == 1) {
                  /*   alert("Archivo Compartido con éxito")
                   */  window.location = "home.html";
                }
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
               /*  alert("No se pudo compartir el archivo")
             */}
        })          
        
    })
    
    $.ajax({
        url: "/obtener-amigos",
        method: 'GET',
        dataType: "json",
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $("#slc-amigos").append('<option value="' + data[i].id_usuario_pk + '">' + data[i].nombre_usuario + '</option>');
            }
        }
    });
    $.ajax({
        url: "/obtenerUsuario",
        method: "POST",
        dataType: "json",
        success: function (res) {
            console.log("Este es el resultado" + res[0]);
            $("#usuarioNombre").append("<h2>"+res[0].txt_username+"</h2>");

        },
        error: function (error) {
            console.log(error);
        }
    });


});





function favorito(idArchivo) {

    var parametros = `idArchivo=${idArchivo}`
    $.ajax({
        url: '/archivo-favorito',
        method: 'POST',
        data: parametros,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.affectedRows == 1) {
           /*      alert("Archivo pineado a favoritos con éxito")
            */ } else {                    
           /*      alert("Error al pinear a favoritos");
            */ }
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
        }
    }) 
}

function eliminar(idArchivo) {

    var parametros = `idArchivo=${idArchivo}`
    $.ajax({
        url: '/archivo-papelera',
        method: 'POST',
        data: parametros,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.affectedRows == 1) {
          /*       alert("Archivo eliminado con éxito")
           */  } else {                    
          /*       alert("Error al eliminar favoritos");
           */  }
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
        }
    }) 
}