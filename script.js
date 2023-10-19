// Obtén referencias a los elementos del formulario y la tabla
const form = document.getElementById("reservation-form");
const movieSelect = document.getElementById("movie-select");
const movieImage = document.getElementById("movie-image");
const movieImages = document.getElementById("movie-images");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ticketsInput = document.getElementById("tickets");
const reservationsTable = document.querySelector("#reservations table tbody");

let editedRow = null;

// Maneja el evento change en el selector de películas
movieSelect.addEventListener("change", () => {
    const selectedMovie = movieSelect.value;
    if (selectedMovie === "") {
        // Si se selecciona la opción "Peliculas", muestra la imagen "Tapa.png"
        movieImage.style.display = "block";
        movieImage.src = "img/Tapa.png";
    } else {
        // Si se selecciona una película, muestra la imagen correspondiente
        movieImage.style.display = "block";
        movieImage.src = `img/${selectedMovie}.png`;
    }
});
movieSelect.addEventListener("change", () => {
    const selectedMovie = movieSelect.value;

    if (selectedMovie) {
        movieImage.src = `img/${selectedMovie}.png`;
        movieImage.style.display = "block";
    } else {
        movieImage.style.display = "none";
    }
});


// Maneja el evento submit del formulario
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const movie = movieSelect.value || "Tapa";
    const name = nameInput.value;
    const email = emailInput.value;
    const tickets = ticketsInput.value;

    if (!name || !email || !tickets) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (editedRow) {
        // Actualizar la fila previamente editada
        editedRow.cells[0].textContent = movie;

        // Actualiza la imagen
        const imgCell = editedRow.cells[1];
        imgCell.innerHTML = `<img src="img/${movie}.png" alt="Imagen de la película">`;

        editedRow.cells[2].textContent = name;
        editedRow.cells[3].textContent = email;
        editedRow.cells[4].textContent = tickets;

        // Limpiar el formulario y reiniciar el estado de edición
        nameInput.value = "";
        emailInput.value = "";
        ticketsInput.value = "";
        movieImage.style.display = "none";
        movieSelect.value = "";
        editedRow = null;
    } else {
        // Crea una nueva fila en la tabla
        const row = reservationsTable.insertRow();
        row.innerHTML = `
            <td>${movie}</td>
            <td class="movie-image-cell"><img src="img/${movie}.png" alt="Imagen de la película"></td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${tickets}</td>
            <td class="action-buttons">
                <button class="edit-button">Editar</button>
                <button class="delete-button">Borrar</button>
            </td>
        `;

        // Limpiar el formulario
        nameInput.value = "";
        emailInput.value = "";
        ticketsInput.value = "";
        movieImage.style.display = "none";
        movieSelect.value = "";

        const editButton = row.querySelector(".edit-button");
        const deleteButton = row.querySelector(".delete-button");

        // Maneja el evento click en el botón Editar
        editButton.addEventListener("click", () => {
            editedRow = row;

            // Llenar el formulario con los datos de la fila
            movieSelect.value = editedRow.cells[0].textContent;
            nameInput.value = editedRow.cells[2].textContent;
            emailInput.value = editedRow.cells[3].textContent;
            ticketsInput.value = editedRow.cells[4].textContent;
            movieImage.style.display = "block";
        });

        // Maneja el evento click en el botón Borrar
        deleteButton.addEventListener("click", () => {
            // Mostrar una alerta de confirmación antes de eliminar la fila
            if (confirm("¿Seguro que deseas eliminar esta reserva?")) {
                row.remove();
            }
        });
    }
    
});
