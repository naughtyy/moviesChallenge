const moviesWrapper = document.querySelector("#movies_wrapper");
const baseImgURL = "https://image.tmdb.org/t/p/w500";
const search = document.querySelector("input");
const genresWrapper = document.querySelector("#genres_wrapper");
const apiGenresURL =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";
const home = document.querySelector(".home");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzJlNDU3ZWU0MGU3NzZiMTllMjEzZGJjM2UzYTAwZCIsInN1YiI6IjYzODlkNjRkNjllYjkwMDA3YmRiYjQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VMC465KfRUjijF4_S0mvtrWAtzp09OaiuNP4gkOIllY",
  },
};

let movies = [];

//fetch the section part
const fetchMovieData = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    options
  );
  const responseData = await response.json();
  //console.log(responseData);
  return responseData;
};

const getMovies = () => {
  fetchMovieData().then((data) => {
    movies = data.results;
    displayMovies(movies);
  });
};
getMovies();

//display the movies in the HTML document
const displayMovies = (arr) => {
  moviesWrapper.innerHTML = "";
  arr.forEach((element) => {
    moviesWrapper.innerHTML += `
                  <div>
                      <div>
                      <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="" />
                      </div>
                      <h6>${element.title}</h6>
                      <p>${element.release_date}</p>
                  </div>`;
  });
};

const fetchGenresData = async () => {
  const response = await fetch(apiGenresURL, options);
  const data = await response.json();
  //console.log(responseData);
  return data;
};

const getGenres = () => {
  fetchGenresData().then((data) => {
    let dataGenre = data.genres;
    displayGenres(dataGenre);
  });
};
getGenres();

const displayGenres = (arr) => {
  genresWrapper.innerHTML = "";
  arr.forEach((element) => {
    genresWrapper.innerHTML += `<div class="my-2">
                  <button class="btn btn-outline-dark p-0 genreBtn" id= "${element.id}">
                    <h6>${element.name}</h6>
                  </button>
                </div>`;
    moviesOfGenre();
  });
};

const filterMovies = (arr) => {
  const searchValue = search.value.toLowerCase();
  displayMovies(
    arr.filter((e) => {
      return e.title.toLowerCase().includes(searchValue);
    })
  );
};

search.addEventListener("keydown", () => {
  filterMovies(movies);
});

const fetchGenreData = async (genreId) => {
  const apiGenreURL = "https://api.themoviedb.org/3/list/" + genreId;
  const response = await fetch(apiGenreURL, options);
  const data = await response.json();
  //console.log(data);
  return data;
};

const getGenreData = (genreId) => {
  fetchGenreData(genreId).then((data) => {
    movies = data.items;
    displayGenre(movies);
  });
};

const displayGenre = (arr) => {
  moviesWrapper.innerHTML = "";
  arr.forEach((element) => {
    moviesWrapper.innerHTML += `<div>
    <div>
    <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="" />
    </div>
    <h6>${element.title}</h6>
    <p>${element.release_date}</p>
</div>`;
  });
};
const moviesOfGenre = () => {
  var genreBtn = document.querySelectorAll(".genreBtn");
  console.log(genreBtn);
  genreBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      getGenreData(btn.getAttribute("id"));
    });
  });
};
home.addEventListener("click", () => {
  getMovies();
});
