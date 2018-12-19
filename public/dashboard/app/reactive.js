var jsEditor = ace.edit("js-editor",{
    mode: "ace/mode/javascript",
    selectionStyle: "text",         
});
jsEditor.setTheme("ace/theme/monokai");
jsEditor.resize()


var htmlEditor = ace.edit("html-editor",{
    mode: "ace/mode/html",
    selectionStyle: "text",         
});
htmlEditor.setTheme("ace/theme/monokai");
htmlEditor.resize()


var cssEditor = ace.edit("css-editor",{
    mode: "ace/mode/css",
    selectionStyle: "text",         
});
cssEditor.setTheme("ace/theme/monokai");
cssEditor.resize()


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

var htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>${cssEditor.getValue()}</style>
</head>
<body>
    ${htmlEditor.getValue()}
    <script src="js/jquery-3.3.1.min.js"></script>
    <script>${jsEditor.getValue()}</script>
</body>
</html>
`

$(document).ready(function(){

    if ($.urlParam('idArchivo') == null) {
        console.log('Hola');
        
    } else {

        $.ajax({
            url:`/archivo`,
            method: "GET",
            data: `idArchivo=${$.urlParam('idArchivo')}`,
            dataType: "json",
            success: function (data, textStatus, jqXHR){
                if (data[0].id_tipo_archivo_fk == 1) {
                    htmlEditor.setValue(data[0].txt_contenido)
                }

                if (data[0].id_tipo_archivo_fk == 2) {
                    cssEditor.setValue(data[0].txt_contenido)
                }

                if (data[0].id_tipo_archivo_fk == 3) {
                    jsEditor.setValue(data[0].txt_contenido)
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
    }

    $("#btn-ejecutar").click(function() {

        console.log('ejecutar');
        
        htmlString = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <style>${cssEditor.getValue()}</style>
        </head>
        <body>
            ${htmlEditor.getValue()}
            <script src="js/jquery-3.3.1.min.js"></script>
            <script>${jsEditor.getValue()}</script>
        </body>
        </html>
        `
        $('#salida').attr("srcdoc", htmlString);
    });

    $("#btn-guardar").click(function() {

        let tipoArchivo = $.urlParam('tipo');
        let nombreArchivo = $.urlParam('nombre');
        let idArchivo = $.urlParam('idArchivo');
        
        if (idArchivo == null) {
            switch (tipoArchivo) {
                case "1":
                    
                    console.log(nombreArchivo);
                    var parametros = `tipoArchivo=${tipoArchivo}&nombreArchivo=${nombreArchivo}&extension=html&contenido=${htmlEditor.getValue()}`
                    console.log(parametros);
                    $.ajax({
                        url:"/archivo",
                        method: "POST",
                        data: parametros,
                        dataType: "json",
                        success: function (data, textStatus, jqXHR){
                            console.log(data);
                            
                            if (data.affectedRows == 1) {
                       /*          alert("Archivo guardado con éxito")
                        */     } else {                    
                       /*          alert("Error al guardar archivo");
                        */     }
            
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
                    break;
    
                case "2":
                    
                    console.log(nombreArchivo);
                   var parametros = `tipoArchivo=${tipoArchivo}&nombreArchivo=${nombreArchivo}&extension=css&contenido=${cssEditor.getValue()}`
                    console.log(parametros);

                    $.ajax({
                        url:"/archivo",
                        method: "POST",
                        data: parametros,
                        dataType: "json",
                        success: function (data, textStatus, jqXHR){
                            console.log(data);
                            
                            if (data.affectedRows == 1) {
                        /*         alert("Archivo guardado con éxito")
                         */    } else {                    
                        /*         alert("Error al guardar archivo");
                         */    }
            
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
                    break;
    
                case "3":
                    
                    console.log(nombreArchivo);
                   var parametros = `tipoArchivo=${tipoArchivo}&nombreArchivo=${nombreArchivo}&extension=js&contenido=${jsEditor.getValue()}`
                    console.log(parametros);

                    $.ajax({
                        url:"/archivo",
                        method: "POST",
                        data: parametros,
                        dataType: "json",
                        success: function (data, textStatus, jqXHR){
                            console.log(data);
                            
                            if (data.affectedRows == 1) {
                         /*        alert("Archivo guardado con éxito")
                          */   } else {                    
                         /*        alert("Error al guardar archivo");
                          */   }
            
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
                    break;
    
                default:
                    break;
            }
        } else {
            switch (tipoArchivo) {
                case "1":
                    
                    var parametros = `idArchivo=${idArchivo}&contenido=${htmlEditor.getValue()}`
                    console.log(parametros);
                    $.ajax({
                        url:"/actualizar-archivo",
                        method: "POST",
                        data: parametros,
                        dataType: "json",
                        success: function (data, textStatus, jqXHR){
                            console.log(data);
                            
                            if (data.affectedRows == 1) {
                        /*         alert("Archivo actualizado con éxito");
                         */    } else {                    
                        /*         alert("Error al actualizar archivo");
                         */    }
            
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
                    break;
    
                case "2":
                    
                    var parametros = `idArchivo=${idArchivo}&contenido=${cssEditor.getValue()}`
                    console.log(parametros);

                    $.ajax({
                        url:"/actualizar-archivo",
                        method: "POST",
                        data: parametros,
                        dataType: "json",
                        success: function (data, textStatus, jqXHR){
                            console.log(data);
                            
                            if (data.affectedRows == 1) {
                        /*         alert("Archivo actualizado con éxito");
                         */    } else {                    
                        /*         alert("Error al actualizar archivo");
                         */    }
            
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
                    break;
    
                case "3":
                    
                    console.log(nombreArchivo);
                    var parametros = `idArchivo=${idArchivo}&contenido=${jsEditor.getValue()}`
                    console.log(parametros);

                    $.ajax({
                        url:"/actualizar-archivo",
                        method: "POST",
                        data: parametros,
                        dataType: "json",
                        success: function (data, textStatus, jqXHR){
                            console.log(data);
                            
                            if (data.affectedRows == 1) {
                        /*         alert("Archivo actualizado con éxito");
                         */    } else {                    
                        /*         alert("Error al actualizar archivo");
                         */    }
            
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
                    break;
    
                default:
                    break;
            }
        }
        
    });

  });