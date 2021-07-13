$(".pencarian-film").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=790c7aa&s=" + $(".input-film").val(),
    success: (hasil) => {
      const filmNya = hasil.Search;
      let isiKartu = ``;
      filmNya.forEach((film) => {
        isiKartu += tampilFilm(film);
      });
      $(".film-container").html(isiKartu);
      $(".modal-detail-film-button").on("click", function () {
        $.ajax({
          url: `http://www.omdbapi.com/?apikey=790c7aa&i=` + $(this).data("imdb-id"),
          success: (film) => {
            const modalKartu = tampilFilmDetail(film);
            $(".modal-ubah").html(modalKartu);
          },
          error: (err) => {
            console.log(err.responseText);
            $(".film-container").html("<h1>Film Tidak Ditemukan</h1>");
          },
        });
      });
    },
    error: (err) => {
      console.log(err.responseText);
    },
  });
});

function tampilFilm(film) {
  return `<div class="col-md-3 mb-4">
  <div class="card bg-dark text-light">
    <img src="${film.Poster}" class="card-img-top" alt="pictures of movies" />
  <div class="card-body">
   <h5 class="card-title">${film.Title}</h5>
   <h6 class="card-subtitle mb-2 text-muted">${film.Year}</h6>
   <!-- Button trigger modal -->
  <button type="button" class="btn btn-secondary modal-detail-film-button" data-toggle="modal" data-target="#detailMoviesModal" data-imdb-id="${film.imdbID}">Show Details</button>
  </div>
</div>
</div>`;
}

function tampilFilmDetail(film) {
  return `<div class="container-fluid">
  <div class="row ">
    <div class="col-md-3">
      <img src="${film.Poster}" class="img-fluid" alt="" />
    </div>
    <div class="col">
      <ul class="list-group">
        <li class="list-group-item"><h4>${film.Title} (${film.Year})</h4></li>
        <li class="list-group-item"><strong>Director: </strong>${film.Director}</li>
        <li class="list-group-item"><strong>Genre</strong>: ${film.Genre}</li>
        <li class="list-group-item"><strong>Actors</strong>: ${film.Actors}</li>
        <li class="list-group-item"><strong>Plot</strong>: ${film.Plot}</li>
      </ul>
    </div>
  </div>
</div>`;
}
