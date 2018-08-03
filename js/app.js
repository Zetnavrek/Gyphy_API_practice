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
    return t;
}
    const ajaxGif = (gif) => {
        $.ajax({
            url: 'http://api.giphy.com/v1/gifs/search',
            type: 'GET',
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
        ajaxGif (gif);
        $('#gif-text').empty();
    });
});
