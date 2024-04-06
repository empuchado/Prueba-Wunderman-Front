const selectPeliculas = document.querySelector("#pelicula");
const nombre = document.querySelector("#nombre");
const emailInput = document.querySelector("#email");
const reseñaInput = document.querySelector("#reseña");
const finalizarButton = document.querySelector("#finalizar");
const sectionForm = document.querySelector(".section-form");
let nombreValid = false;
let emailValid = false;
let reseñaValid = false;
const sectionMessage = document.querySelector(".section-message");
const nameMessage = document.querySelector("#name-message");
const reseñaMessage = document.querySelector("#reseña-message");

window.addEventListener("load", async () => {
  const response = await fetch("https://gist.githubusercontent.com/empuchado/4a582285c7cef873b8dcbf566a4ae4b6/raw/adbf460bc6bf8845ad199f363c509a37cf0f9f8d/Movie.json");
  const movies = await response.json();

  movies.forEach((movie) => {
    const option = document.createElement("option");
    option.value = movie.Title;
    option.text = movie.Title;
    selectPeliculas.appendChild(option);
  });
});

nombre.addEventListener("keyup", () => {
  const minLength = 4;

  if (nombre.value.length < minLength) {
    if (
      !nombre.nextElementSibling ||
      nombre.nextElementSibling.className !== "error-message"
    ) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      errorMessage.textContent = "El Nombre debe tener al menos 4 caracteres";
      nombre.insertAdjacentElement("afterend", errorMessage);
    }
  } else {
    const errorMessage = nombre.nextElementSibling;
    if (errorMessage && errorMessage.className === "error-message") {
      errorMessage.remove();
    }
  }
});

emailInput.addEventListener("keyup", () => {
  const email = emailInput.value;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail) {
    if (
      !emailInput.nextElementSibling ||
      emailInput.nextElementSibling.className !== "error-message"
    ) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      errorMessage.textContent = "Por favor ingrese un email valido";
      emailInput.insertAdjacentElement("afterend", errorMessage);
    }
  } else {
    const errorMessage = emailInput.nextElementSibling;
    if (errorMessage && errorMessage.className === "error-message") {
      errorMessage.remove();
    }
  }
});

reseñaInput.addEventListener("keyup", () => {
  const minLength = 10;

  if (reseñaInput.value.length < minLength) {
    if (
      !reseñaInput.nextElementSibling ||
      reseñaInput.nextElementSibling.className !== "error-message"
    ) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      errorMessage.textContent = "La Reseña debe tener al menos 10 caracteres";
      reseñaInput.insertAdjacentElement("afterend", errorMessage);
    }
  } else {
    const errorMessage = reseñaInput.nextElementSibling;
    if (errorMessage && errorMessage.className === "error-message") {
      errorMessage.remove();
    }
  }
});

finalizarButton.addEventListener("click", (event) => {
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
    alert("Por favor, llene todos los campos correctamente.");
  } else {
    sectionMessage.style.display = "flex";
    sectionForm.style.display = "none";
    nameMessage.textContent = nameMessage.textContent + nombre.value + "!";
    reseñaMessage.textContent =
      reseñaMessage.textContent + selectPeliculas.value + '" ha sido enviada!';
  }
});
