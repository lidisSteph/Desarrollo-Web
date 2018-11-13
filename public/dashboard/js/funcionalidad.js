
$(document).ready(function(){
    var inicio = 0;
    var presionar = false;
    var heightInicio = 0;

    $('#expandir').mousedown(function(event){
        inicio = event.clientY;
        presionar = true;
        heightInicio = $('#Contenido-1').height();
        heightInicio = $('#Contenido-2').height();
        heightInicio = $('#Contenido-3').height();
        heightInicio = $('#separador-1').height();
        heightInicio = $('#separador-2').height();
        $('#salida').animate({
            'height': '+=300px'
        });
        $('footer').css({
            'position': 'fixed',
            'top': '630px'
        });
    });

    $(document).mousemove(function(event){
        if(presionar){
            var agregado = event.clientY - inicio;
            $('#Contenido-1').height(heightInicio + agregado);
            $('#Contenido-2').height(heightInicio + agregado);
            $('#Contenido-3').height(heightInicio + agregado);
            $('#separador-1').height(heightInicio + agregado);
            $('#separador-2').height(heightInicio + agregado);
            
        }
    });

    $(document).mouseup(function(event){
        presionar = false;
    });
});