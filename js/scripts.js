
$(document).ready(function () {

    const apiBaseUrl = 'http://api.themoviedb.org/3';
    const imageBaseUrl = 'http://image.tmdb.org/t/p/';
    const nowPlayingURL = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey;
    console.log(nowPlayingURL);

    $.getJSON(nowPlayingURL,function (nowPlayingData) {
        console.log(nowPlayingData);

        nowPlayingHTML = '';
        for(var i = 0; i < nowPlayingData.results.length; i++){
            var posterURL = imageBaseUrl + 'w300'  + nowPlayingData.results[i].poster_path;
            nowPlayingHTML += '<div class="col-sm-6 col-sm-3">';
            nowPlayingHTML += '<img src="' + posterURL + '">';
            nowPlayingHTML += '</div>';



        }
        $('#movie-grid').html(nowPlayingHTML);
    });

    $('#movie-form').submit(function (event) {
       event.preventDefault();
       var userInput = encodeURI($('#search-input').val());
       $('#search-input').html('');
       var searchURL = apiBaseUrl + '/search/movie?query=' + userInput + '&api_key=' + apiKey;
       //console.log(searchURL);

        $.getJSON(searchURL, function (searchMovieData) {
            var searchMovieHTML = getHTML(searchMovieData);
            $('#movie-grid').html(searchMovieHTML);


        })


    });

    function getHTML(nowPlayingData) {
        var nowPlayingHTML = '';
        for(var i = 0; i < nowPlayingData.results.length; i++) {
            var posterURL = imageBaseUrl + 'w300' + nowPlayingData.results[i].poster_path;
            nowPlayingHTML += '<div class="col-sm-6 col-sm-3">';
            nowPlayingHTML += '<img src="' + posterURL + '">';
            nowPlayingHTML += '</div>';

            return nowPlayingHTML;

        }
    }
});