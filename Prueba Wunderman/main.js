const section = document.querySelector('.cartelera-flex');
const posterElement = document.querySelector(".poster");
const titleElement = document.querySelector(".sinopsis h1");
const plotElement = document.querySelector(".sinopsis p");

document.addEventListener("DOMContentLoaded", function() {

  
    function createMovieElement(movie) {
      const div = document.createElement('div');
      div.className = 'pelicula';
  
      const title = document.createElement('p');
      title.textContent = movie.Title;
  
      const poster = document.createElement('img');
      poster.src = movie.Poster;
  
      const buyTicket = document.createElement('a');
      buyTicket.textContent = 'Comprar ticket';
      buyTicket.href = '#'; // Add your ticket purchase link here
  
      div.appendChild(title);
      div.appendChild(poster);
      div.appendChild(buyTicket);
  
      if (section) {
        section.appendChild(div);
      } else {
        console.error('Section element not found');
      }
    }
  
    function handleFetchError(error) {
      console.error('Error fetching data:', error);
    }
  
    function displayMovies(data) {
      if (Array.isArray(data)) {
        data.forEach(createMovieElement);
      } else {
        console.error('Invalid data format');
      }
    }
  
    function fetchAndDisplayMovies() {
      fetch('movies.json')
        .then(response => response.json())
        .then(displayMovies)
        .catch(handleFetchError);
    }
  
    fetchAndDisplayMovies(); // Fetch JSON data and display movies when the page loads
  });

function handleFetchError(error) {
  console.error('Error fetching data:', error);
}

function displayMovies(data) {
  if (Array.isArray(data)) {
    data.forEach(createMovieElement);
  } else {
    console.error('Invalid data format');
  }
}

function fetchAndDisplayMovies() {
  fetch('movies.json')
    .then(response => response.json())
    .then(displayMovies)
    .catch(handleFetchError);
}

document.addEventListener("DOMContentLoaded", function() {
  let currentMovieIndex = 0;
  let moviesData = []; // Array to store the fetched movie data

  

  function handleMovieFetchError(error) {
    console.error('Error fetching movie data:', error);
  }

  function updateMovieDisplay(index) {
    const firstMovie = moviesData[index];
    const posterImg = document.querySelector('.poster img');
    const sinopsisTitle = document.querySelector('.sinopsis-txt h1');
    const sinopsisPlot = document.querySelector('.sinopsis-txt p');
    const bg = document.querySelector('.bg');

    if (posterImg && sinopsisTitle && sinopsisPlot && bg) {
      // Set poster image source
      posterImg.src = firstMovie.Poster;
      posterImg.alt = firstMovie.Title;

      // Set sinopsis title
      sinopsisTitle.textContent = firstMovie.Title;

      // Set sinopsis plot
      sinopsisPlot.textContent = firstMovie.Plot;

      // Set background image
      bg.style.backgroundImage = `url(${firstMovie.Poster})`;
    } else {
      console.error('One or more elements not found');
    }
  }

  function cycleMovies(direction) {
    if (direction === 'left') {
      currentMovieIndex = (currentMovieIndex - 1 + moviesData.length) % moviesData.length; // Circulate backwards
    } else if (direction === 'right') {
      currentMovieIndex = (currentMovieIndex + 1) % moviesData.length; // Circulate normally
    }
    updateMovieDisplay(currentMovieIndex);
  }

  function handleLeftArrowClick() {
    cycleMovies('left');
  }

  function handleRightArrowClick() {
    cycleMovies('right');
  }

  // Event listeners for arrow buttons
  document.querySelector('.arrw-left').addEventListener('click', handleLeftArrowClick);
  document.querySelector('.arrw-right').addEventListener('click', handleRightArrowClick);

  fetch('movies.json')
    .then(response => response.json())
    .then(data => {
      moviesData = data; // Store the fetched movie data
      updateMovieDisplay(currentMovieIndex); // Display the initial movie
    })
    .catch(handleMovieFetchError);
});