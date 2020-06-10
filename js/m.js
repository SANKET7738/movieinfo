$(document).ready(function() {

    var apikey = "b675cc11"

    $('#searchForm').submit(function(event) {
        event.preventDefault()

        var searchText = $('#searchText').val()

        var result = ""

        var url = "http://www.omdbapi.com/?apikey=" + apikey

        $.ajax({
            method: 'GET',
            url: url + "&s=" + searchText,
            success: function(data) {
                console.log(data)

                let movies = data.Search;

                $.each(movies, (index, movie) => {
                    result += `
                        <div class="col-md-3">
                            <div class="well text-center'>
                                <img src="${movie.Poster}">
                                <img src="${movie.Poster}">
                                <h5>${movie.Title}</h5>
                                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                            </div>
                        </div>

                     `;

                })

                $("#movies").html(result)

            }


        })

    })

})

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    var apikey = "b675cc11"

    var url = "http://www.omdbapi.com/?apikey=" + apikey

    $.ajax({
        method: 'GET',
        url: url + "&i=" + movieId,
        success: function(data) {
            console.log(data);

            let movie = data;

            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail" alt="img not fount">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong>${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class=" btn btn-default">Go back to search</a>
                    </div>
                </div>
             `;

            $("#movie").html(output)


        }


    })
}