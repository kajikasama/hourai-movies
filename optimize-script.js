const cariFilm = document.querySelector(".pencarian-film");
const inputFilm = document.querySelector(".input-film");
const pesanErr = document.querySelector(".pesan-jika-error");

cariFilm.addEventListener("click", async function () {
  try {
    const movieNya = await getMovies(inputFilm.value);
    updateUI(movieNya);
  } catch (err) {
    pesanErr.innerHTML = tampilErr(err);
  }
});

function tampilErr(err) {
  return `
  <div class="alert alert-danger alert-dismissible fade show" role="alert">     
    ${err}       
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
}

function getMovies(keyWord) {
  return fetch("https://www.omdbapi.com/?apikey=790c7aa&s=" + keyWord)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => {
      if (res.Response === "False") {
        throw new Error(res.Error);
      }
      return res.Search;
    });
}

function updateUI(dataFilm) {
  let isiKartu = ``;
  dataFilm.forEach((film) => (isiKartu += tampilFilm(film)));
  const filmContainer = document.querySelector(".film-container");
  filmContainer.innerHTML = isiKartu;
}

//event binding tombol yg dlunya gak ada karena lagi loading
document.addEventListener("click", async function (el) {
  if (el.target.classList.contains("modal-detail-film-button")) {
    try {
      const imdbId = el.target.dataset.imdbid;
      const filmDetail = await getMoviesDetail(imdbId);
      updateUIDetail(filmDetail);
    } catch (err) {
      alert(err);
    }
  }
});

function getMoviesDetail(imdbId) {
  return fetch("https://www.omdbapi.com/?apikey=790c7aa&i=" + imdbId)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.Error);
      }
      return res.json();
    })
    .then((film) => {
      if (film.Response === "False") {
        throw new Error(film.Error);
      }
      return film;
    });
}

function updateUIDetail(film) {
  const modalKartu = tampilFilmDetail(film);
  const modalUbah = document.querySelector(".modal-ubah");
  modalUbah.innerHTML = modalKartu;
}

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
