const section = document.querySelector(".cartelera-flex");
const posterElement = document.querySelector(".poster");
const titleElement = document.querySelector(".sinopsis h1");
const plotElement = document.querySelector(".sinopsis p");
const posterImg = document.querySelector(".poster img");
const sinopsisTitle = document.querySelector(".sinopsis-txt h1");
const sinopsisPlot = document.querySelector(".sinopsis-txt p");
const bg = document.querySelector(".bg");
const trailer = document.querySelector(".trailer-btn");
const arrwLeft = document.querySelector(".arrw-left");
const arrwRight = document.querySelector(".arrw-right");
const puntaje = document.querySelector(".puntaje");

document.addEventListener("DOMContentLoaded", function () {
  function createMovieElement(movie) {
    const div = document.createElement("div");
    div.className = "pelicula";

    const title = document.createElement("p");
    title.textContent = movie.Title;

    const poster = document.createElement("img");
    poster.src = movie.Poster;

    const buyTicket = document.createElement("a");
    buyTicket.textContent = "Comprar ticket";
    buyTicket.href = "#";

    div.appendChild(title);
    div.appendChild(poster);
    div.appendChild(buyTicket);

    if (section) {
      section.appendChild(div);
    } else {
      console.error("Section element not found");
    }
  }

  function handleFetchError(error) {
    console.error("Error fetching data:", error);
  }

  function displayMovies(data) {
    if (Array.isArray(data)) {
      data.forEach(createMovieElement);
    } else {
      console.error("Invalid data format");
    }
  }

  function fetchAndDisplayMovies() {
    fetch("https://gist.githubusercontent.com/empuchado/4a582285c7cef873b8dcbf566a4ae4b6/raw/adbf460bc6bf8845ad199f363c509a37cf0f9f8d/Movie.json")
      .then((response) => response.json())
      .then(displayMovies)
      .catch(handleFetchError);
  }

  fetchAndDisplayMovies();
});

function handleFetchError(error) {
  console.error("Error fetching data:", error);
}

function displayMovies(data) {
  if (Array.isArray(data)) {
    data.forEach(createMovieElement);
  } else {
    console.error("Invalid data format");
  }
}

function fetchAndDisplayMovies() {
  fetch("https://gist.githubusercontent.com/empuchado/4a582285c7cef873b8dcbf566a4ae4b6/raw/adbf460bc6bf8845ad199f363c509a37cf0f9f8d/Movie.json")
    .then((response) => response.json())
    .then(displayMovies)
    .catch(handleFetchError);
}

document.addEventListener("DOMContentLoaded", function () {
  let currentMovieIndex = 0;
  let moviesData = [];

  function handleMovieFetchError(error) {
    console.error("Error fetching movie data:", error);
  }

  function updateMovieDisplay(index) {
    const firstMovie = moviesData[index];

    if (posterImg && sinopsisTitle && sinopsisPlot && bg && trailer) {
      posterImg.src = firstMovie.Poster;
      posterImg.alt = firstMovie.Title;

      trailer.href = firstMovie.Trailer;

      sinopsisTitle.textContent = firstMovie.Title;

      sinopsisPlot.textContent = firstMovie.Plot;

      bg.style.backgroundImage = `url(${firstMovie.Poster})`;

      puntaje.textContent = firstMovie.imdbRating + "/10";

      if (index === 0) {
        arrwLeft.style.display = "none";
        arrwRight.style.display = "flex";
      } else if (index === 2) {
        arrwRight.style.display = "none";
        arrwLeft.style.display = "flex";
      } else {
        arrwRight.style.display = "flex";
        arrwLeft.style.display = "flex";
      }
    } else {
      console.error("Uno o mas elementos no encontrados");
    }
  }

  function cycleMovies(direction) {
    if (direction === "left") {
      currentMovieIndex =
        (currentMovieIndex - 1 + moviesData.length) % moviesData.length; // Circulate backwards
    } else if (direction === "right") {
      currentMovieIndex = (currentMovieIndex + 1) % moviesData.length; // Circulate normally
    }
    updateMovieDisplay(currentMovieIndex);
  }

  function handleLeftArrowClick() {
    cycleMovies("left");
  }

  function handleRightArrowClick() {
    cycleMovies("right");
  }

  // Event listeners for arrow buttons
  document
    .querySelector(".arrw-left")
    .addEventListener("click", handleLeftArrowClick);
  document
    .querySelector(".arrw-right")
    .addEventListener("click", handleRightArrowClick);

  fetch("https://gist.githubusercontent.com/empuchado/4a582285c7cef873b8dcbf566a4ae4b6/raw/adbf460bc6bf8845ad199f363c509a37cf0f9f8d/Movie.json")
    .then((response) => response.json())
    .then((data) => {
      moviesData = data;
      updateMovieDisplay(currentMovieIndex);
    })
    .catch(handleMovieFetchError);
});
