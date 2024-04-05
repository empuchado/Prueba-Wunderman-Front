const section = document.querySelector('.cartelera-flex');
const posterElement = document.querySelector(".poster");
const titleElement = document.querySelector(".sinopsis h1");
const plotElement = document.querySelector(".sinopsis p");
const posterImg = document.querySelector('.poster img');
const sinopsisTitle = document.querySelector('.sinopsis-txt h1');
const sinopsisPlot = document.querySelector('.sinopsis-txt p');
const bg = document.querySelector('.bg');
const trailer = document.querySelector('.trailer-btn')
const arrwLeft = document.querySelector('.arrw-left')
const arrwRight = document.querySelector('.arrw-right')
const puntaje = document.querySelector('.puntaje')
// -------------------------------------------------------
const selectPeliculas = document.querySelector('#pelicula');
const nombre = document.querySelector('#nombre');
const emailInput = document.querySelector('#email');
const reseñaInput = document.querySelector('#reseña');
const finalizarButton = document.querySelector('#finalizar');
let nombreValid = false;
let emailValid = false;
let reseñaValid = false;

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

    if (posterImg && sinopsisTitle && sinopsisPlot && bg && trailer) {
        // Set poster image source
        posterImg.src = firstMovie.Poster;
        posterImg.alt = firstMovie.Title;

        // Set trailer link
        trailer.href = firstMovie.Trailer;

        // Set sinopsis title
        sinopsisTitle.textContent = firstMovie.Title;

        // Set sinopsis plot
        sinopsisPlot.textContent = firstMovie.Plot;

        // Set background image
        bg.style.backgroundImage = `url(${firstMovie.Poster})`;

        puntaje.textContent = firstMovie.imdbRating + "/10";

        // Handle arrow visibility based on the current movie index
        if (index === 0) {
            arrwLeft.style.display = 'none'; // Hide left arrow for the first movie
            arrwRight.style.display = 'flex'; // Show right arrow for the first movie
        } else if (index === 2) {
            arrwRight.style.display = 'none'; // Hide right arrow for the third movie
            arrwLeft.style.display = 'flex'; // Show left arrow for the third movie
        } else {
            arrwRight.style.display = 'flex'; // Show left arrow for the second movie
            arrwLeft.style.display = 'flex'; // Show right arrow for the second movie
        }
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

// -------------------------------------------------------------------

window.addEventListener('load', async () => {
    const response = await fetch('movies.json');
    const movies = await response.json();
  
    movies.forEach(movie => {
      const option = document.createElement('option');
      option.value = movie.Title;
      option.text = movie.Title;
      selectPeliculas.appendChild(option);
    });
  });

  nombre.addEventListener('keyup', () => {
    const minLength = 4;
    
    if (nombre.value.length < minLength) {
      if (!nombre.nextElementSibling || nombre.nextElementSibling.className !== 'error-message') {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'El Nombre debe tener al menos 4 caracteres';
        nombre.insertAdjacentElement('afterend', errorMessage);
      }
    } else {
      const errorMessage = nombre.nextElementSibling;
      if (errorMessage && errorMessage.className === 'error-message') {
        errorMessage.remove();
      }
    }
  });

  emailInput.addEventListener('keyup', () => {
    const email = emailInput.value;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
    if (!isValidEmail) {
      if (!emailInput.nextElementSibling || emailInput.nextElementSibling.className !== 'error-message') {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Por favor ingrese un email valido';
        emailInput.insertAdjacentElement('afterend', errorMessage);
      }
    } else {
      const errorMessage = emailInput.nextElementSibling;
      if (errorMessage && errorMessage.className === 'error-message') {
        errorMessage.remove();
      }
    }
  });

  reseñaInput.addEventListener('keyup', () => {
    const minLength = 10;
    
    if (reseñaInput.value.length < minLength) {
      if (!reseñaInput.nextElementSibling || reseñaInput.nextElementSibling.className !== 'error-message') {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Review must be at least 10 characters long.';
        reseñaInput.insertAdjacentElement('afterend', errorMessage);
      }
    } else {
      const errorMessage = reseñaInput.nextElementSibling;
      if (errorMessage && errorMessage.className === 'error-message') {
        errorMessage.remove();
      }
    }
  });

  finalizarButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    if (nombre.value.length >= 4) {
      nombreValid = true;
    }
  
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailValid = true;
    }
  
    if (reseña.value.length >= 10) {
      reseñaValid = true;
    }
  
    if (!nombreValid || !emailValid || !reseñaValid) {
      alert('Por favor, llene todos los campos correctamente.');
    } else {
    }
  });