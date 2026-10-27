
class Pelicula {
    constructor(titulo, genero, vista, reseña, stock) {
        this.titulo = titulo;
        this.genero = genero;
        this.vista = vista;
        this.reseña = reseña;
        this.stock = stock;
    }
}

// ARRAYS

const peliculasIniciales = [
    { titulo: "obsesión", genero: "Terror", vista: false, reseña: "", stock: 6 },
    { titulo: "son como niños", genero: "Comedia", vista: false, reseña: "", stock: 0 },
    { titulo: "maze runner", genero: "Ciencia ficción", vista: false, reseña: "", stock: 3 },
    { titulo: "e.t.", genero: "Ciencia ficción", vista: false, reseña: "", stock: 0 },
    { titulo: "toy story", genero: "Animación", vista: false, reseña: "", stock: 1 },
    { titulo: "Bajo la misma estrella", genero: "Drama", vista: false, reseña: "", stock: 3 },
    { titulo: "Siempre el mismo día", genero: "Romance", vista: false, reseña: "", stock: 5 },
    { titulo: "Hachiko", genero: "Drama", vista: false, reseña: "", stock: 0 },
    { titulo: "Titanic", genero: "Romance", vista: false, reseña: "", stock: 4 },
    { titulo: "La vida es bella", genero: "Drama", vista: false, reseña: "", stock: 6 }
];

const actores = JSON.parse(localStorage.getItem("actores")) || [];

let peliculas = [];

// RECUPERAR LOCALSTORAGE

const guardadas = localStorage.getItem("peliculas");

if (guardadas !== null) {
    peliculas = JSON.parse(guardadas);
} else {
    peliculasIniciales.forEach(pelicula => {
        peliculas.push({ ...pelicula });
    });
}

// ELEMENTOS 

const formulario = document.getElementById("formulario-pelicula");
const inputTitulo = document.getElementById("titulo");
const inputGenero = document.getElementById("genero");
const contenedor = document.getElementById("contenedorpeliculas");
const mensaje = document.getElementById("mensaje");

const selectAnimo = document.getElementById("estado-animo");
const botonRecomendar = document.getElementById("boton-recomendar");
const resultadoRecomendacion = document.getElementById("resultado-recomendacion");

const inputBuscar = document.getElementById("buscar-pelicula");
const botonBuscar = document.getElementById("boton-buscar");
const resultadoBusqueda = document.getElementById("resultado-busqueda");

const botonStock = document.getElementById("boton-stock");
const resultadoStock = document.getElementById("resultado-stock");

const inputActor = document.getElementById("actor-favorito");
const botonActor = document.getElementById("boton-actor");
const listaActores = document.getElementById("lista-actores");

const botonVaciar = document.getElementById("boton-vaciar");
const mensajeVaciar = document.getElementById("mensaje-vaciar");
const botonRecuperar = document.getElementById("boton-recuperar");

const formularioUsuario = document.getElementById("formulario-usuario");
const inputNombre = document.getElementById("nombre-usuario");
const inputAño = document.getElementById("año-nacimiento");
const mensajeBienvenida = document.getElementById("mensaje-bienvenida");

const filtroGenero = document.getElementById("filtro-genero");

const botonCargar = document.getElementById("boton-cargar");
const estadoCarga = document.getElementById("estado-carga");

// GUARDAR PELÍCULAS

function guardarPeliculas() {
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
}

// MOSTRAR PELÍCULAS

function renderizarPeliculas() {

    contenedor.innerHTML = "";

    const generoSeleccionado = filtroGenero.value;

    const peliculasFiltradas = peliculas.filter(pelicula =>
        generoSeleccionado === "Todos" ||
        pelicula.genero === generoSeleccionado
    );

    peliculasFiltradas.forEach((pelicula, indice) => {

        const { titulo, genero, vista } = pelicula;

        contenedor.innerHTML += `
            <article class="tarjeta-pelicula">
                <h3>${titulo}</h3>

                <p>Género: ${genero}</p>

                <p>Estado: ${vista ? "Vista" : "No vista"}</p>

                <textarea
                    id="resena-input-${indice}"
                    placeholder="Escribí tu reseña..."
                ></textarea>

                <button id="vista-${indice}">
                    ${vista ? "Marcar como no vista" : "Marcar como vista"}
                </button>

                <button id="resena-${indice}">
                    Guardar reseña
                </button>

                <button id="eliminar-${indice}">
                    Eliminar
                </button>
            </article>
        `;
    });

    peliculasFiltradas.forEach((pelicula, indice) => {

        const inputResena = document.getElementById("resena-input-" + indice);
        const botonVista = document.getElementById("vista-" + indice);
        const botonResena = document.getElementById("resena-" + indice);
        const botonEliminar = document.getElementById("eliminar-" + indice);

        inputResena.value = pelicula.reseña || "";

        botonVista.addEventListener("click", function () {

            pelicula.vista = !pelicula.vista;

            guardarPeliculas();
            renderizarPeliculas();
        });

        botonResena.addEventListener("click", function () {

            pelicula.reseña = inputResena.value.trim();

            guardarPeliculas();
            renderizarPeliculas();
        });

        botonEliminar.addEventListener("click", function () {

            peliculas = peliculas.filter(peli => peli !== pelicula);

            guardarPeliculas();
            renderizarPeliculas();
        });
    });
}

filtroGenero.addEventListener("change", renderizarPeliculas);

// AGREGAR PELÍCULA 
formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const titulo = inputTitulo.value.trim();
    const genero = inputGenero.value;

    if (titulo.length < 2) {
        mensaje.textContent = "Ingresá un título de al menos dos caracteres.";
        return;
    }

    if (genero === "") {
        mensaje.textContent = "Seleccioná un género.";
        return;
    }

    const existente = peliculas.find(
        pelicula => pelicula.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (existente) {
        mensaje.textContent = "Esta película ya está en tu diario.";
        return;
    }

    const nuevaPelicula = new Pelicula(titulo, genero, false, "", 0);

    peliculas.push(nuevaPelicula);

    guardarPeliculas();
    renderizarPeliculas();

    mensaje.textContent = "¡Película agregada a tu diario!";

    formulario.reset();
});

// VACIAR DIARIO

function vaciarDiario() {

    const confirmar = confirm("¿Estás seguro de que querés vaciar tu diario?");

    if (confirmar) {
        peliculas = [];

        guardarPeliculas();
        renderizarPeliculas();

        mensajeVaciar.textContent = "Tu diario fue vaciado correctamente.";
    }
}

botonVaciar.addEventListener("click", vaciarDiario);

// RECUPERAR DIARIO

function recuperarDiario() {

    const confirmar = confirm("¿Querés recuperar las películas originales?");

    if (confirmar) {

        peliculas = [];

        peliculasIniciales.forEach(pelicula => {
            peliculas.push({ ...pelicula });
        });

        filtroGenero.value = "Todos";

        guardarPeliculas();
        renderizarPeliculas();

        mensajeVaciar.textContent = "¡Diario recuperado correctamente!";
    }
}

botonRecuperar.addEventListener("click", recuperarDiario);

// BUSCAR PELÍCULA

function consultar() {

    const buscar = inputBuscar.value.trim().toLowerCase();

    if (buscar === "") {
        resultadoBusqueda.textContent = "Ingresá una película.";
        return;
    }

    const pelicula = peliculas.find(
        peli => peli.titulo.toLowerCase() === buscar
    );

    if (pelicula) {

        resultadoBusqueda.innerHTML = `
            <h3>${pelicula.titulo}</h3>
            <p>Género: ${pelicula.genero}</p>
            <p>Stock disponible: ${pelicula.stock}</p>
            <p>Estado: ${pelicula.vista ? "Vista" : "No vista"}</p>
            <p>Reseña: ${pelicula.reseña || "Todavía no tiene reseña"}</p>
        `;

    } else {
        resultadoBusqueda.textContent = "No encontramos esa película.";
    }
}

botonBuscar.addEventListener("click", consultar);

// STOCK TOTAL

function total() {

    const stockTotal = peliculas.reduce(
        (acumulado, pelicula) => acumulado + pelicula.stock,
        0
    );

    resultadoStock.textContent = "Stock total: " + stockTotal;
}

botonStock.addEventListener("click", total);

// RECOMENDAR PELÍCULAS

function recomendarPorEstadoDeAnimo() {

    const genero = selectAnimo.value;

    const recomendadas = peliculas.filter(
        pelicula => pelicula.genero === genero
    );

    const titulos = [];

    recomendadas.forEach(pelicula => {
        titulos.push(pelicula.titulo);
    });

    resultadoRecomendacion.textContent =
        recomendadas.length > 0
            ? "Te recomendamos: " + titulos.join(", ")
            : "No tenemos películas de ese género.";
}

botonRecomendar.addEventListener("click", recomendarPorEstadoDeAnimo);

//  ACTORES

function renderizarActores() {

    listaActores.innerHTML = "";

    actores.forEach((actor, indice) => {

        const li = document.createElement("li");

        const nombreActor = document.createElement("span");
        nombreActor.textContent = actor;

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.id = "editar-actor-" + indice;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.id = "eliminar-actor-" + indice;

        botonEliminar.addEventListener("click", function () {

            actores.splice(indice, 1);

            localStorage.setItem("actores", JSON.stringify(actores));

            renderizarActores();
        });

        botonEditar.addEventListener("click", function () {

            const inputEditar = document.createElement("input");
            inputEditar.type = "text";
            inputEditar.value = actor;

            const botonGuardar = document.createElement("button");
            botonGuardar.textContent = "Guardar";

            li.innerHTML = "";

            li.appendChild(inputEditar);
            li.appendChild(botonGuardar);

            botonGuardar.addEventListener("click", function () {

                const nuevoNombre = inputEditar.value.trim();

                if (
                    nuevoNombre === "" ||
                    !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.'-]+$/.test(nuevoNombre)
                ) {
                    inputEditar.value = "";
                    inputEditar.placeholder = "Ingresá un nombre válido";
                    return;
                }

                actores[indice] = nuevoNombre;

                localStorage.setItem("actores", JSON.stringify(actores));

                renderizarActores();
            });
        });

        li.appendChild(nombreActor);
        li.appendChild(botonEditar);
        li.appendChild(botonEliminar);

        listaActores.appendChild(li);
    });
}

renderizarActores();

// AGREGAR ACTOR

function actorFavorito() {

    const actor = inputActor.value.trim();

    if (
        actor === "" ||
        !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.'-]+$/.test(actor)
    ) {
        inputActor.value = "";
        inputActor.placeholder = "Ingresá un nombre válido";
        return;
    }

    actores.push(actor);

    localStorage.setItem("actores", JSON.stringify(actores));

    renderizarActores();

    inputActor.value = "";
}

botonActor.addEventListener("click", actorFavorito);

// FORMULARIO
formularioUsuario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre = inputNombre.value.trim();
    const añoTexto = inputAño.value.trim();
    const añoNacimiento = Number(añoTexto);

    if (
        nombre === "" ||
        !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(nombre)
    ) {
        mensajeBienvenida.textContent =
            "Ingresá un nombre válido, sin números ni símbolos.";
        return;
    }

    if (
        añoTexto === "" ||
        !/^\d{4}$/.test(añoTexto) ||
        añoNacimiento < 1900 ||
        añoNacimiento > new Date().getFullYear()
    ) {
        mensajeBienvenida.textContent =
            "Ingresá un año de nacimiento válido.";
        return;
    }

    mensajeBienvenida.textContent =
        "¡Bienvenido a Film Journal, " + nombre + "!";

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("añoNacimiento", añoNacimiento);
});

const nombreGuardado = localStorage.getItem("nombre");

if (nombreGuardado !== null) {
    mensajeBienvenida.textContent =
        "¡Bienvenido nuevamente, " + nombreGuardado + "!";
}

//  PROMESA 
function cargarPeliculas() {

    return new Promise((resolve) => {

        setTimeout(() => {

            const datosGuardados = localStorage.getItem("peliculas");

            if (datosGuardados !== null) {
                resolve(JSON.parse(datosGuardados));
            } else {

                const originales = [];

                peliculasIniciales.forEach(pelicula => {
                    originales.push({ ...pelicula });
                });

                resolve(originales);
            }

        }, 2000);
    });
}

// ASYNC 

async function mostrarDiario() {

    try {

        estadoCarga.textContent = "Cargando películas...";

        contenedor.innerHTML = "";

        const peliculasCargadas = await cargarPeliculas();

        peliculas = peliculasCargadas;

        renderizarPeliculas();

        estadoCarga.textContent =
            peliculas.length + " películas cargadas";

    } catch (error) {

        estadoCarga.textContent =
            "No se pudo cargar el diario. Intentá nuevamente.";

        renderizarPeliculas();

        console.error(error);

    } finally {

        console.log("Finalizó el proceso de carga del diario");
    }
}

botonCargar.addEventListener("click", mostrarDiario);

// TEMPORIZADOR

setTimeout(() => {

    const recordatorio = document.getElementById("recordatorio");

    if (recordatorio !== null) {
        recordatorio.textContent =
            "¡No olvides registrar las películas que viste!";
    }

}, 3000);

// INICIAR

renderizarPeliculas();
