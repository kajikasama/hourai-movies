const cariFilm = document.querySelector(".pencarian-film");
const inputFilm = document.querySelector(".input-film");
const filmContainer = document.querySelector(".film-container");

cariFilm.addEventListener("click", () => {
  const keyWord = inputFilm.value;
  fetch("http://www.omdbapi.com/?apikey=790c7aa&s=" + keyWord)
    .then((res) => res.json())
    .then((res) => {
      dataFilm = res.Search;
      let isiKartu = ``;
      dataFilm.forEach((film) => {
        isiKartu += tampilFilm(film);
        filmContainer.innerHTML = isiKartu;
        const detailFilmButton = document.querySelectorAll(".modal-detail-film-button");
        detailFilmButton.forEach((btn) => {
          btn.addEventListener("click", function () {
            const imdbID = this.dataset.imdbid;
            fetch("http://www.omdbapi.com/?apikey=790c7aa&i=" + imdbID)
              .then((res) => res.json())
              .then((film) => {
                const modalKartu = tampilFilmDetail(film);
                const modalUbah = document.querySelector(".modal-ubah");
                modalUbah.innerHTML = modalKartu;
              })
              .catch((err) => console.log(response.text(err)));
          });
        });
      });
    })
    .catch((err) => console.log(response.text(err)));
});

function tampilFilm(film) {
  return `<div class="col-md-3 mb-4">
  <div class="card bg-dark text-light">
    <img src="${film.Poster}" class="card-img-top" alt="pictures of movies" />
  <div class="card-body">
   <h5 class="card-title">${film.Title}</h5>
   <h6 class="card-subtitle mb-2 text-muted">${film.Year}</h6>
   <!-- Button trigger modal -->
  <button type="button" class="btn btn-secondary modal-detail-film-button" data-toggle="modal" data-target="#detailMoviesModal" data-imdbid="${film.imdbID}">Show Details</button>
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
