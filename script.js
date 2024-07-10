// Array de libros
let libros = [];

// Constructor de Libro
function Libro(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
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
function renderizarLibros(lista = libros) {
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
function buscarLibro() {
    const buscarTitulo = document.getElementById('inputBuscar').value.trim().toLowerCase();
    const librosEncontrados = libros.filter(libro => libro.titulo.toLowerCase().includes(buscarTitulo));
    renderizarLibros(librosEncontrados);
}

// Función para limpiar toda la lista de libros
function limpiarLibros() {
    libros = [];
    guardarLibros();
    renderizarLibros();
}

// Función para guardar los libros en localStorage
function guardarLibros() {
    localStorage.setItem('libros', JSON.stringify(libros));
}

// Función para cargar los libros desde localStorage
function cargarLibros() {
    const librosGuardados = localStorage.getItem('libros');
    if (librosGuardados) {
        libros = JSON.parse(librosGuardados);
    }
}

// Cargar los libros y renderizarlos al iniciar la aplicación
window.onload = function() {
    cargarLibros();
    renderizarLibros();
    cargarTema();
};

// Función para cambiar el tema
function cambiarTema() {
    const body = document.body;
    body.classList.toggle('modo-oscuro');
    guardarTema();
}

// Función para guardar el tema en localStorage
function guardarTema() {
    const esModoOscuro = document.body.classList.contains('modo-oscuro');
    localStorage.setItem('modoOscuro', esModoOscuro);
}

// Función para cargar el tema desde localStorage
function cargarTema() {
    const esModoOscuro = JSON.parse(localStorage.getItem('modoOscuro'));
    if (esModoOscuro) {
        document.body.classList.add('modo-oscuro');
    }
}