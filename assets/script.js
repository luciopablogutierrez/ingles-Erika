// Funciones para ejercicios interactivos

// Funciones de accesibilidad
function anunciarParaLectorPantalla(mensaje) {
    const anuncio = document.createElement('div');
    anuncio.setAttribute('aria-live', 'polite');
    anuncio.setAttribute('aria-atomic', 'true');
    anuncio.className = 'sr-only';
    anuncio.textContent = mensaje;
    document.body.appendChild(anuncio);
    
    // Remover el anuncio después de 1 segundo
    setTimeout(() => {
        document.body.removeChild(anuncio);
    }, 1000);
}

function manejarNavegacionTeclado(event, callback) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        callback();
    }
}

// Mostrar respuesta de ejercicios simples
function mostrarRespuesta(elementId, respuesta) {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.textContent = respuesta;
        elemento.classList.add('show');
        elemento.setAttribute('aria-expanded', 'true');
        anunciarParaLectorPantalla('Respuesta mostrada: ' + respuesta);
    }
}

// Función genérica para mostrar/ocultar respuestas
function toggleRespuesta(elementId) {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        const isVisible = elemento.style.display !== 'none' && elemento.style.display !== '';
        if (isVisible) {
            elemento.style.display = 'none';
            elemento.setAttribute('aria-expanded', 'false');
            anunciarParaLectorPantalla('Respuesta ocultada');
        } else {
            elemento.style.display = 'block';
            elemento.setAttribute('aria-expanded', 'true');
            anunciarParaLectorPantalla('Respuesta mostrada: ' + elemento.textContent);
        }
    }
}

// Sistema de cambio de tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Actualizar icono del botón
    const themeIcon = document.querySelector('.theme-toggle i');
    const themeButton = document.querySelector('.theme-toggle');
    if (themeIcon && themeButton) {
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        themeButton.setAttribute('aria-label', 
            newTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        anunciarParaLectorPantalla(
            'Tema cambiado a modo ' + (newTheme === 'dark' ? 'oscuro' : 'claro'));
    }
}

// Cargar tema guardado
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Actualizar icono del botón
    const themeIcon = document.querySelector('.theme-toggle i');
    const themeButton = document.querySelector('.theme-toggle');
    if (themeIcon && themeButton) {
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        themeButton.setAttribute('aria-label', 
            savedTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
}

// Sistema de quiz interactivo
function verificarQuiz(quizId, respuestaCorrecta, mensajeExito, mensajeError) {
    const quiz = document.querySelector(`#${quizId}`);
    const opciones = quiz.querySelectorAll('input[type="radio"]');
    const resultado = quiz.querySelector('.quiz-result');
    
    let respuestaSeleccionada = null;
    
    opciones.forEach(opcion => {
        if (opcion.checked) {
            respuestaSeleccionada = opcion.value;
        }
    });
    
    if (!respuestaSeleccionada) {
        anunciarParaLectorPantalla('Por favor selecciona una respuesta antes de continuar');
        // Enfocar la primera opción para ayudar al usuario
        if (opciones.length > 0) {
            opciones[0].focus();
        }
        return;
    }
    
    resultado.style.display = 'block';
    resultado.setAttribute('aria-live', 'polite');
    resultado.setAttribute('role', 'status');
    
    if (respuestaSeleccionada === respuestaCorrecta) {
        resultado.className = 'quiz-result correct';
        const mensaje = mensajeExito || '¡Correcto! 🎉';
        resultado.textContent = mensaje;
        anunciarParaLectorPantalla('Respuesta correcta: ' + mensaje);
    } else {
        resultado.className = 'quiz-result incorrect';
        const mensaje = mensajeError || `Incorrecto. La respuesta correcta es: ${respuestaCorrecta}`;
        resultado.textContent = mensaje;
        anunciarParaLectorPantalla('Respuesta incorrecta: ' + mensaje);
    }
    
    // Enfocar el resultado para que sea leído por lectores de pantalla
    resultado.setAttribute('tabindex', '-1');
    resultado.focus();
}

// Función para reproducir audio (si se agregan archivos de audio)
function reproducirAudio(audioId) {
    const audio = document.getElementById(audioId);
    if (audio) {
        audio.play();
    }
}

// Función para ejercicios de completar espacios
function verificarCompletar(inputId, respuestaCorrecta, resultadoId) {
    const input = document.getElementById(inputId);
    const resultado = document.getElementById(resultadoId);
    const respuestaUsuario = input.value.trim().toLowerCase();
    const respuestasCorrectas = Array.isArray(respuestaCorrecta) 
        ? respuestaCorrecta.map(r => r.toLowerCase()) 
        : [respuestaCorrecta.toLowerCase()];
    
    if (respuestasCorrectas.includes(respuestaUsuario)) {
        resultado.textContent = '¡Correcto! 🎉';
        resultado.className = 'answer correct show';
        resultado.style.background = '#c8e6c9';
        resultado.style.color = '#2e7d32';
    } else {
        resultado.textContent = `Incorrecto. Respuesta correcta: ${respuestaCorrecta}`;
        resultado.className = 'answer incorrect show';
        resultado.style.background = '#ffcdd2';
        resultado.style.color = '#c62828';
    }
    resultado.style.display = 'block';
}

// Función para ejercicios de ordenar palabras
function verificarOrden(contenedorId, ordenCorrecto) {
    const contenedor = document.getElementById(contenedorId);
    const palabras = Array.from(contenedor.querySelectorAll('.palabra'));
    const ordenActual = palabras.map(palabra => palabra.textContent.trim());
    const resultado = contenedor.querySelector('.resultado-orden');
    
    if (JSON.stringify(ordenActual) === JSON.stringify(ordenCorrecto)) {
        resultado.textContent = '¡Perfecto! El orden es correcto 🎉';
        resultado.className = 'answer correct show';
    } else {
        resultado.textContent = `Orden correcto: ${ordenCorrecto.join(' ')}`;
        resultado.className = 'answer incorrect show';
    }
    resultado.style.display = 'block';
}

// Función para crear ejercicios de arrastrar y soltar (drag & drop)
function habilitarDragDrop(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    const palabras = contenedor.querySelectorAll('.palabra');
    
    palabras.forEach(palabra => {
        palabra.draggable = true;
        palabra.addEventListener('dragstart', handleDragStart);
        palabra.addEventListener('dragover', handleDragOver);
        palabra.addEventListener('drop', handleDrop);
        palabra.addEventListener('dragend', handleDragEnd);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.style.opacity = '0.5';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    if (this !== draggedElement) {
        const parent = this.parentNode;
        const draggedIndex = Array.from(parent.children).indexOf(draggedElement);
        const targetIndex = Array.from(parent.children).indexOf(this);
        
        if (draggedIndex < targetIndex) {
            parent.insertBefore(draggedElement, this.nextSibling);
        } else {
            parent.insertBefore(draggedElement, this);
        }
    }
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    draggedElement = null;
}

// Función para ejercicios de matching (emparejar)
function verificarMatching(contenedorId, paresCorrectos) {
    const contenedor = document.getElementById(contenedorId);
    const selects = contenedor.querySelectorAll('select');
    const resultado = contenedor.querySelector('.resultado-matching');
    let correctos = 0;
    
    selects.forEach((select, index) => {
        if (select.value === paresCorrectos[index]) {
            correctos++;
        }
    });
    
    const porcentaje = (correctos / paresCorrectos.length) * 100;
    
    if (porcentaje === 100) {
        resultado.textContent = '¡Excelente! Todas las respuestas son correctas 🎉';
        resultado.className = 'answer correct show';
    } else {
        resultado.textContent = `${correctos}/${paresCorrectos.length} correctas (${porcentaje.toFixed(0)}%)`;
        resultado.className = 'answer partial show';
    }
    resultado.style.display = 'block';
}

// Función para navegación entre lecciones
function irALeccion(url) {
    window.location.href = url;
}

// Función para mostrar progreso
function actualizarProgreso(leccionesCompletadas, totalLecciones) {
    const progreso = document.getElementById('progreso');
    if (progreso) {
        const porcentaje = (leccionesCompletadas / totalLecciones) * 100;
        progreso.style.width = `${porcentaje}%`;
        progreso.textContent = `${porcentaje.toFixed(0)}%`;
    }
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar tema guardado
    loadTheme();
    
    // Habilitar drag & drop en elementos que lo requieran
    const contenedoresDragDrop = document.querySelectorAll('.drag-drop-container');
    contenedoresDragDrop.forEach(contenedor => {
        habilitarDragDrop(contenedor.id);
    });
    
    // Agregar efectos de hover a las tarjetas
    const tarjetas = document.querySelectorAll('.level-card');
    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        tarjeta.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Agregar navegación por teclado a las tarjetas
        tarjeta.addEventListener('keydown', function(event) {
            manejarNavegacionTeclado(event, () => {
                const enlace = this.querySelector('a');
                if (enlace) {
                    enlace.click();
                }
            });
        });
    });
    
    // Agregar navegación por teclado a botones de ejercicios
    const botonesEjercicio = document.querySelectorAll('.exercise button');
    botonesEjercicio.forEach(boton => {
        boton.addEventListener('keydown', function(event) {
            manejarNavegacionTeclado(event, () => {
                this.click();
            });
        });
    });
    
    // Agregar navegación por teclado a botones de quiz
    const botonesQuiz = document.querySelectorAll('.quiz-submit');
    botonesQuiz.forEach(boton => {
        boton.addEventListener('keydown', function(event) {
            manejarNavegacionTeclado(event, () => {
                this.click();
            });
        });
    });
    
    // Mejorar navegación por teclado en opciones de radio
    const opcionesRadio = document.querySelectorAll('input[type="radio"]');
    opcionesRadio.forEach(radio => {
        radio.addEventListener('focus', function() {
            anunciarParaLectorPantalla(`Opción: ${this.nextElementSibling ? this.nextElementSibling.textContent : this.value}`);
        });
    });
    
    // Event listener para el botón de cambio de tema
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Funciones específicas para cada nivel (se pueden expandir)
const funcionesA1 = {
    verificarSaludo: function(respuesta) {
        mostrarRespuesta('respuesta-saludo', respuesta);
    },
    
    verificarAbecedario: function(letra, sonido) {
        mostrarRespuesta('respuesta-abc', `La letra ${letra} suena como "${sonido}"`);
    }
};

const funcionesA2 = {
    verificarPresenteSimple: function(verbo, forma) {
        mostrarRespuesta('respuesta-presente', `${verbo} en tercera persona: ${forma}`);
    }
};

// Exportar funciones para uso global
window.mostrarRespuesta = mostrarRespuesta;
window.toggleRespuesta = toggleRespuesta;
window.verificarQuiz = verificarQuiz;
window.verificarCompletar = verificarCompletar;
window.verificarOrden = verificarOrden;
window.verificarMatching = verificarMatching;
window.reproducirAudio = reproducirAudio;
window.irALeccion = irALeccion;
window.toggleTheme = toggleTheme;
window.loadTheme = loadTheme;
window.funcionesA1 = funcionesA1;
window.funcionesA2 = funcionesA2;