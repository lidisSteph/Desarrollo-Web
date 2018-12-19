$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

$(document).ready(function (){
    console.log('Ready');

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
        url: '/archivo-papelera',
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
                        <a>
                            ${data[i].txt_nombre_archivo}
                        </a>
                    </td>
                    <td>${fontAwesome}</td>
                    <td>${data[i].txt_extension}</td>
                    <td>
                        <button class="icon-size" onclick="quitarPapelera(${data[i].id_archivo_pk})">
                            <i class="far fa-trash-alt "></i>
                        </button>
                        <button class="icon-size" onclick="eliminarPapelera(${data[i].id_archivo_pk})">
                            <i class="fas fa-trash" style="color: #C9302C;"></i>
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

function quitarPapelera(idArchivo) {

    var parametros = `idArchivo=${idArchivo}`
    $.ajax({
        url: '/archivo-papelera-quitar',
        method: 'POST',
        data: parametros,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.affectedRows == 1) {
           /*      alert("Archivo movido de la papelera con éxito")
            */     location.reload()
            } else {                    
           /*      alert("Error al mover el archivo de la papelera");
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

function eliminarPapelera(idArchivo) {

    var parametros = `idArchivo=${idArchivo}`
    $.ajax({
        url: '/archivo-papelera-eliminar',
        method: 'POST',
        data: parametros,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.affectedRows == 1) {
          /*       alert("Archivo eliminado con éxito")
           */      location.reload()
            } else {                    
          /*       alert("Error al eliminar de la papelera");
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