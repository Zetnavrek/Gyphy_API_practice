$(document).ready (() => {
    const dibujarGifs = (data) => {
        let gif= "";
        let url = ""; 
        data.forEach ((element) => {
            gif= element.images.downsized_large.url;
            url= element.bitly_gif_url;
        $('#elements').append(armarTemplate(gif, url));
        }) 
    }
    const armarTemplate = (gif,url) => {
    let t = "<div class= 'element'><img src='" + gif + "'/><a href= '" + url +"'>Ver Mas</a></div>"
    // Te reto a que armes esta template con un template string y concatenacion de variables de ES6
    return t;
}
    const ajaxGif = (gif) => {
        $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search',
            /* Sin la s aqui, te refieres a un contenido no seguro para la web, que 
             Choca con la seguridad de github, es por este pequeño detaller
             que en el servidor de github pages no funciona tu llamada a la API 
             Si el error dice Mixed Content, asegurate de que estas
             enviando en todos lados contenido con el mismo protocolo
             de seguridad. 
            
            */
            type: 'GET',
            crossDomain:true,
            // Esto también resuelve ese problema ;)
            datatype: 'json',
            data: {
                q:gif,
                api_key: 'dA3LjFG9OSXn9udSl8TMq4tvEve3PsOw'
            }
        })
        .done((response) => {
            console.log(response);
            dibujarGifs(response.data);
        })
        .fail(() => {
            console.log('error');
        });
    }
    $('#buscar-gif').click (() => {
        console.log("entro");
        $('#elements').empty();
        let gif = $('#gif-text').val();
        ajaxGif(gif);
        /* En las ejecuciones de funciones se 
        recomienda que los parentesis vayan 
        inmediatamente después del nombre de 
        la función*/
        $('#gif-text').empty();
    });
});
