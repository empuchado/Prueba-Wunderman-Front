const section = document.querySelector('.cartelera-flex');

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