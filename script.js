// Array de libros
let libros = [];

// Constructor de Libro
class Libro {
    constructor(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
    }
}

// Función para agregar un nuevo libro
function agregarLibro() {
    const titulo = document.getElementById('inputTitulo').value.trim();
    const autor = document.getElementById('inputAutor').value.trim();
    if (titulo && autor) {
        libros.push(new Libro(titulo, autor));
        guardarLibros();
        renderizarLibros();
        document.getElementById('inputTitulo').value = '';
        document.getElementById('inputAutor').value = '';

        Swal.fire({
            title: '<span style="color: green;">¡Libro Agregado!</span>',
            text: `${titulo} de ${autor} ha sido agregado a la lista.`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } else {
        Swal.fire({
            title: '<span style="color: red;">Error</span>',
            text: 'Por favor, completa ambos campos.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Función para renderizar los libros en el DOM
const renderizarLibros = (lista = libros) => {
    const listaLibros = document.getElementById('listaLibros');
    listaLibros.innerHTML = '';
    lista.forEach((libro, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${libro.titulo}</span> - <span>${libro.autor}</span>`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => {
            libros.splice(index, 1);
            guardarLibros();
            renderizarLibros();
        };
        li.appendChild(botonEliminar);
        listaLibros.appendChild(li);
    });
}

// Función para buscar libros por título
const buscarLibro = () => {
    const buscarTitulo = document.getElementById('inputBuscar').value.trim().toLowerCase();
    const librosEncontrados = libros.filter(libro => libro.titulo.toLowerCase().includes(buscarTitulo));
    renderizarLibros(librosEncontrados);
}

// Función para limpiar toda la lista de libros
const limpiarLibros = () => {
    libros = [];
    guardarLibros();
    renderizarLibros();
}

// Función para guardar los libros en localStorage
const guardarLibros = () => {
    localStorage.setItem('libros', JSON.stringify(libros));
}

// Función para cargar los libros desde localStorage
const cargarLibros = () => {
    const librosGuardados = localStorage.getItem('libros');
    if (librosGuardados) {
        libros = JSON.parse(librosGuardados);
    }
}

// Función para cambiar el tema
const cambiarTema = () => {
    const body = document.body;
    body.classList.toggle('modo-oscuro');
    guardarTema();
}

// Función para guardar el tema en localStorage
const guardarTema = () => {
    const esModoOscuro = document.body.classList.contains('modo-oscuro');
    localStorage.setItem('modoOscuro', esModoOscuro);
}

// Función para cargar el tema desde localStorage
const cargarTema = () => {
    const esModoOscuro = JSON.parse(localStorage.getItem('modoOscuro'));
    if (esModoOscuro) {
        document.body.classList.add('modo-oscuro');
    }
}

// Función asincrónica para cargar libros desde una API externa
const cargarLibrosDesdeAPI = async () => {
    try {
        const response = await fetch('https://api.example.com/libros');
        const data = await response.json();
        libros = data.map(libro => new Libro(libro.titulo, libro.autor));
        guardarLibros();
        renderizarLibros();
    } catch (error) {
        Swal.fire({
            title: '<span style="color: red;">Error</span>',
            text: 'No se pudieron cargar los libros desde la API.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Cargar los libros y renderizarlos al iniciar la aplicación
window.onload = () => {
    cargarLibros();
    renderizarLibros();
    cargarTema();
    cargarLibrosDesdeAPI();  // Cargar libros desde la API al inicio
};