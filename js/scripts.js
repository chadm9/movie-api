
$(document).ready(function () {

    const apiBaseUrl = 'http://api.themoviedb.org/3';
    const imageBaseUrl = 'http://image.tmdb.org/t/p/';
    const nowPlayingURL = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey;

    $.getJSON(nowPlayingURL,function (nowPlayingData) {
        //console.log(nowPlayingData);

/*
        nowPlayingHTML = '';
        for(var i = 0; i < nowPlayingData.results.length; i++){
            var posterURL = imageBaseUrl + 'w300'  + nowPlayingData.results[i].poster_path;
            nowPlayingHTML += '<div class="col-sm-6 col-sm-3">';
            nowPlayingHTML += '<img src="' + posterURL + '">';
            nowPlayingHTML += '</div>';
*/


        $('#movie-grid').html(getHTML(nowPlayingData));




        $('.movie-poster').click(function(){
            // Change teh HTML inside the modal
            var thisMovieId = $(this).attr('movie-id');
            //console.log(thisMovieId);
            var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey}`;
            $.getJSON(thisMovieUrl,(thisMovieData)=>{
                //console.log(thisMovieData);
                $('#myModalLabel').html(thisMovieData.title);
            $('.modal-body').html(thisMovieData.overview);
            // Open teh modal
                $("#myModal").modal();
            });
        });



    });

    $('#movie-form').submit(function (event) {
       event.preventDefault();
       var userInput = encodeURI($('#search-input').val());
       $('#search-input').html('');
       var searchURL = apiBaseUrl + '/search/movie?query=' + userInput + '&api_key=' + apiKey;
       //console.log(searchURL);

        $.getJSON(searchURL, function (searchMovieData) {
            console.log($);
            var searchMovieHTML = getHTML(searchMovieData);
            $('#movie-grid').html(searchMovieHTML);
            $('.movie-poster').click(function(){
                // Change teh HTML inside the modal
                var thisMovieId = $(this).attr('movie-id');
                //console.log(thisMovieId);
                var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${apiKey}`;
                $.getJSON(thisMovieUrl,(thisMovieData)=>{
                    //console.log(thisMovieData);
                    $('#myModalLabel').html(thisMovieData.title);
                    $('.modal-body').html(thisMovieData.overview);
                // Open teh modal
                    $("#myModal").modal();
                });
            });

        })


    });

    function getHTML(nowPlayingData) {
        var nowPlayingHTML = '';
        //console.log(nowPlayingData.results.length);
        //console.log(nowPlayingData);


        for(var i = 0; i < nowPlayingData.results.length; i++) {
            var posterURL = imageBaseUrl + 'w300' + nowPlayingData.results[i].poster_path;
            nowPlayingHTML += '<div class="col-md-3 col-sm-6 movie-poster" movie-id=' + nowPlayingData.results[i].id + '>';
            nowPlayingHTML += '<img src="' + posterURL + '">';
            nowPlayingHTML += '</div>';



        }
        return nowPlayingHTML;

    }
});