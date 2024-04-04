const section = document.querySelector('.cartelera-flex');
const posterElement = document.querySelector(".poster");
const titleElement = document.querySelector(".sinopsis h1");
const plotElement = document.querySelector(".sinopsis p");

fetch('movies.json')
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data)) {
      data.forEach(movie => {
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
      });
    } else {
      console.error('Invalid data format');
    }
  })
  .catch(error => console.error('Error fetching data:', error));

document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON data
    fetch('movies.json')
    .then(response => response.json())
    .then(data => {
        const firstMovie = data[0]; // Assuming the JSON data is an array of movies
        const posterImg = document.querySelector('.poster img');
        const sinopsisTitle = document.querySelector('.sinopsis-txt h1');
        const sinopsisPlot = document.querySelector('.sinopsis-txt p');
        const bg = document.querySelector('.bg');

        // Set poster image source
        posterImg.src = firstMovie.Poster;
        posterImg.alt = firstMovie.Title;

        // Set sinopsis title
        sinopsisTitle.textContent = firstMovie.Title;

        // Set sinopsis plot
        sinopsisPlot.textContent = firstMovie.Plot;

        // Set background image of slider container directly
        if (bg) {
            bg.style.backgroundImage = `url(${firstMovie.Poster})`;
        } else {
            console.error('Slider container not found');
        }
    })
    .catch(error => console.error('Error fetching movie data:', error));
});