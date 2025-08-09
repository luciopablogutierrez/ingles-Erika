// Funciones para ejercicios interactivos - Mobile First

// Detección de dispositivos móviles y touch
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0);
};

const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Optimizaciones para dispositivos móviles
function optimizarParaMovil() {
    // Prevenir zoom en inputs en iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
            viewport.setAttribute('content', 
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
            );
        }
    }
    
    // Mejorar rendimiento en móviles
    if (isMobile()) {
        // Reducir animaciones en dispositivos lentos
        document.body.classList.add('mobile-device');
        
        // Optimizar scroll en iOS
        document.body.style.webkitOverflowScrolling = 'touch';
    }
}

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
        themeIcon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
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
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
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

// Función para inicializar el menú hamburguesa
function initializeHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    if (hamburgerBtn && mobileMenu) {
        // Toggle del menú hamburguesa
        function toggleMobileMenu() {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
        
        function openMobileMenu() {
            mobileMenu.classList.add('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
            hamburgerBtn.classList.add('active');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            hamburgerBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
            anunciarParaLectorPantalla('Menú abierto');
            
            // Enfocar el primer enlace del menú
            if (mobileMenuLinks.length > 0) {
                setTimeout(() => mobileMenuLinks[0].focus(), 100);
            }
        }
        
        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            hamburgerBtn.setAttribute('aria-label', 'Abrir menú de navegación');
            document.body.style.overflow = ''; // Restaurar scroll
            anunciarParaLectorPantalla('Menú cerrado');
        }
        
        // Event listeners
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
        
        // Botón de cerrar en el menú
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }
        
        // Cerrar con overlay
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        }
        
        // Navegación por teclado en el menú hamburguesa
        hamburgerBtn.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMobileMenu();
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
                // Pequeño delay para permitir la navegación
                setTimeout(() => hamburgerBtn.focus(), 100);
            });
        });
        
        // Cerrar menú con Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
                hamburgerBtn.focus();
            }
        });
        
        // Navegación por teclado dentro del menú
        mobileMenu.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                const focusableElements = mobileMenu.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Optimizaciones móviles
    optimizarParaMovil();
    
    // Cargar tema guardado
    loadTheme();
    
    // Inicializar menú hamburguesa
    initializeHamburgerMenu();
    
    // Configurar botón de tema
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Navegación por teclado para el botón de tema
        themeToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleTheme();
            }
        });
    }
    
    // Configurar elementos de drag and drop si existen
    const dragContainers = document.querySelectorAll('[data-drag-container]');
    dragContainers.forEach(container => {
        habilitarDragDrop(container.id);
    });
    
    // Habilitar drag & drop en elementos que lo requieran
    const contenedoresDragDrop = document.querySelectorAll('.drag-drop-container');
    contenedoresDragDrop.forEach(contenedor => {
        habilitarDragDrop(contenedor.id);
    });
    
    // Configurar elementos de audio si existen
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.addEventListener('error', function() {
            console.warn('Error al cargar audio:', audio.src);
        });
    });
    
    // Configurar formularios para prevenir envío accidental
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            // Solo prevenir si no es un formulario de ejercicio
            if (!form.classList.contains('exercise-form')) {
                event.preventDefault();
            }
        });
    });
    
    // Funcionalidad de flip para las tarjetas
    const tarjetas = document.querySelectorAll('.level-card');
    tarjetas.forEach(tarjeta => {
        let isFlipped = false;
        
        // Función para alternar el flip
        function toggleFlip() {
            isFlipped = !isFlipped;
            if (isFlipped) {
                tarjeta.classList.add('flipped');
            } else {
                tarjeta.classList.remove('flipped');
            }
        }
        
        // Click en la tarjeta para flip
        tarjeta.addEventListener('click', function(event) {
            // Si se hace clic en un enlace, no hacer flip
            if (event.target.tagName === 'A' || event.target.closest('a')) {
                return;
            }
            event.preventDefault();
            toggleFlip();
        });
        
        // Touch events para móviles
        tarjeta.addEventListener('touchstart', function(event) {
            if (event.target.tagName === 'A' || event.target.closest('a')) {
                return;
            }
            event.preventDefault();
        });
        
        tarjeta.addEventListener('touchend', function(event) {
            if (event.target.tagName === 'A' || event.target.closest('a')) {
                return;
            }
            event.preventDefault();
            toggleFlip();
        });
        
        // Navegación por teclado
        tarjeta.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleFlip();
            } else if (event.key === 'Escape') {
                if (isFlipped) {
                    isFlipped = false;
                    tarjeta.classList.remove('flipped');
                }
            }
        });
        
        // Hacer la tarjeta focusable
        tarjeta.setAttribute('tabindex', '0');
        tarjeta.setAttribute('role', 'button');
        tarjeta.setAttribute('aria-label', 'Tarjeta de nivel - presiona Enter o espacio para voltear');
    });
    
    // Configurar navegación por teclado para elementos interactivos
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .level-card');
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                if (element.tagName !== 'A' && element.tagName !== 'BUTTON') {
                    event.preventDefault();
                    element.click();
                }
            }
        });
        
        // Optimizaciones touch para dispositivos móviles
        if (isTouchDevice()) {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        }
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
    
    // Configurar skip link
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Anunciar carga de página para lectores de pantalla
    anunciarParaLectorPantalla('Página cargada correctamente');
    
    // Configurar lazy loading para imágenes si el navegador no lo soporta nativamente
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Configurar manejo de errores de imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Error al cargar imagen:', this.src);
        });
    });
    
    // Optimizaciones específicas para móviles
    if (isMobile()) {
        // Prevenir zoom en doble tap en iOS
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Mejorar rendimiento de scroll
        document.addEventListener('touchmove', function(event) {
            if (event.scale !== 1) {
                event.preventDefault();
            }
        }, { passive: false });
    }
    
    // Detectar orientación y ajustar layout
    function handleOrientationChange() {
        setTimeout(() => {
            // Forzar recálculo de viewport height en móviles
            if (isMobile()) {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }
        }, 100);
    }
    
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Configuración inicial de viewport height
    handleOrientationChange();
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
window.initializeHamburgerMenu = initializeHamburgerMenu;
window.funcionesA1 = funcionesA1;
window.funcionesA2 = funcionesA2;