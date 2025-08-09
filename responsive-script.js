/* ==========================================================================
   RESPONSIVE JAVASCRIPT - OPTIMIZADO PARA MÓVIL
   Funcionalidades: navegación móvil, lazy loading, smooth scroll, formularios
   ========================================================================== */

(function() {
    'use strict';
    
    // Variables globales
    let isMenuOpen = false;
    let scrollPosition = 0;
    
    // Elementos del DOM
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const contactForm = document.querySelector('.contact-form');
    
    /* ==========================================================================
       INICIALIZACIÓN
       ========================================================================== */
    
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initLazyLoading();
        initSmoothScroll();
        initFormValidation();
        initScrollEffects();
        initAccessibility();
        initPerformanceOptimizations();
        
        // Mostrar contenido después de la carga
        document.body.style.opacity = '1';
    });
    
    /* ==========================================================================
       NAVEGACIÓN MÓVIL
       ========================================================================== */
    
    function initNavigation() {
        if (!navToggle || !navMenu) return;
        
        // Toggle del menú móvil
        navToggle.addEventListener('click', toggleMobileMenu);
        
        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Cerrar menú con Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMobileMenu();
            }
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Manejar cambios de tamaño de ventana
        window.addEventListener('resize', debounce(handleResize, 250));
    }
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        navToggle.setAttribute('aria-expanded', isMenuOpen);
        navMenu.classList.toggle('active', isMenuOpen);
        
        // Prevenir scroll del body cuando el menú está abierto
        if (isMenuOpen) {
            scrollPosition = window.pageYOffset;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';
        } else {
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('position');
            document.body.style.removeProperty('top');
            document.body.style.removeProperty('width');
            window.scrollTo(0, scrollPosition);
        }
        
        // Focus management
        if (isMenuOpen) {
            navMenu.querySelector('.nav-link').focus();
        } else {
            navToggle.focus();
        }
    }
    
    function closeMobileMenu() {
        if (!isMenuOpen) return;
        
        isMenuOpen = false;
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        
        // Restaurar scroll del body
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('width');
        window.scrollTo(0, scrollPosition);
    }
    
    function handleResize() {
        // Cerrar menú móvil en pantallas grandes
        if (window.innerWidth >= 768 && isMenuOpen) {
            closeMobileMenu();
        }
    }
    
    /* ==========================================================================
       LAZY LOADING DE IMÁGENES
       ========================================================================== */
    
    function initLazyLoading() {
        // Usar Intersection Observer si está disponible
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            // Observar todas las imágenes con loading="lazy"
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback para navegadores sin soporte
            document.querySelectorAll('img[loading="lazy"]').forEach(loadImage);
        }
    }
    
    function loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        
        img.addEventListener('load', function() {
            img.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            img.alt = 'Error al cargar la imagen';
            img.classList.add('error');
        });
    }
    
    /* ==========================================================================
       SMOOTH SCROLL
       ========================================================================== */
    
    function initSmoothScroll() {
        // Solo si el usuario no prefiere movimiento reducido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignorar enlaces vacíos
                if (href === '#' || href === '#!') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    if (isMenuOpen) {
                        closeMobileMenu();
                    }
                    
                    // Focus en el elemento target para accesibilidad
                    setTimeout(() => {
                        target.focus({ preventScroll: true });
                    }, 500);
                }
            });
        });
    }
    
    /* ==========================================================================
       VALIDACIÓN DE FORMULARIOS
       ========================================================================== */
    
    function initFormValidation() {
        if (!contactForm) return;
        
        const inputs = contactForm.querySelectorAll('.form-input');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Validación en tiempo real
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
        
        // Validación al enviar
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        let isValid = true;
        let errorMessage = '';
        
        // Validar campo requerido
        if (required && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }
        // Validar email
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un email válido';
            }
        }
        // Validar longitud mínima
        else if (field.name === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'El nombre debe tener al menos 2 caracteres';
        }
        else if (field.name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'El mensaje debe tener al menos 10 caracteres';
        }
        
        showFieldError(field, isValid ? '' : errorMessage);
        return isValid;
    }
    
    function showFieldError(field, message) {
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
        
        field.classList.toggle('error', !!message);
        field.setAttribute('aria-invalid', !!message);
    }
    
    function clearFieldError(field) {
        if (field.classList.contains('error')) {
            showFieldError(field, '');
        }
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('.form-input');
        let isFormValid = true;
        
        // Validar todos los campos
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            submitForm();
        } else {
            // Focus en el primer campo con error
            const firstError = contactForm.querySelector('.form-input.error');
            if (firstError) {
                firstError.focus();
            }
        }
    }
    
    function submitForm() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Mostrar estado de carga
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simular envío (aquí iría la lógica real de envío)
        setTimeout(() => {
            showNotification('¡Mensaje enviado correctamente!', 'success');
            contactForm.reset();
            
            // Restaurar botón
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
    
    /* ==========================================================================
       EFECTOS DE SCROLL
       ========================================================================== */
    
    function initScrollEffects() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }
    
    function updateScrollEffects() {
        const scrollY = window.pageYOffset;
        
        // Header con backdrop blur al hacer scroll
        if (header) {
            header.classList.toggle('scrolled', scrollY > 50);
        }
        
        // Animaciones de entrada para elementos
        if ('IntersectionObserver' in window) {
            observeElements();
        }
        
        ticking = false;
    }
    
    function observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar elementos que queremos animar
        document.querySelectorAll('.service-card, .portfolio-item, .section-title').forEach(el => {
            observer.observe(el);
        });
    }
    
    /* ==========================================================================
       ACCESIBILIDAD
       ========================================================================== */
    
    function initAccessibility() {
        // Navegación por teclado en el menú móvil
        if (navMenu) {
            navMenu.addEventListener('keydown', handleMenuKeydown);
        }
        
        // Skip link para navegación por teclado
        addSkipLink();
        
        // Anunciar cambios dinámicos a lectores de pantalla
        createAriaLiveRegion();
    }
    
    function handleMenuKeydown(e) {
        const focusableElements = navMenu.querySelectorAll('.nav-link');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
    
    function addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    function createAriaLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }
    
    /* ==========================================================================
       OPTIMIZACIONES DE RENDIMIENTO
       ========================================================================== */
    
    function initPerformanceOptimizations() {
        // Precargar recursos críticos
        preloadCriticalResources();
        
        // Optimizar imágenes según el dispositivo
        optimizeImages();
        
        // Detectar conexión lenta
        detectSlowConnection();
    }
    
    function preloadCriticalResources() {
        // Precargar fuentes críticas
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }
    
    function optimizeImages() {
        // Detectar soporte para formatos modernos
        const supportsWebP = checkWebPSupport();
        const supportsAVIF = checkAVIFSupport();
        
        // Ajustar calidad según el dispositivo
        if (window.devicePixelRatio > 2) {
            document.documentElement.classList.add('high-dpi');
        }
    }
    
    function checkWebPSupport() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => resolve(webP.height === 2);
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    function checkAVIFSupport() {
        return new Promise(resolve => {
            const avif = new Image();
            avif.onload = avif.onerror = () => resolve(avif.height === 2);
            avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
        });
    }
    
    function detectSlowConnection() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.documentElement.classList.add('slow-connection');
                // Reducir animaciones y efectos
                document.documentElement.style.setProperty('--transition-normal', '0ms');
            }
        }
    }
    
    /* ==========================================================================
       NOTIFICACIONES
       ========================================================================== */
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Anunciar a lectores de pantalla
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
        
        // Remover después de 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    /* ==========================================================================
       UTILIDADES
       ========================================================================== */
    
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    /* ==========================================================================
       SERVICE WORKER PARA PWA (OPCIONAL)
       ========================================================================== */
    
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registrado: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW falló: ', registrationError);
                });
        });
    }
    
})();

/* ==========================================================================
   CSS ADICIONAL PARA ANIMACIONES (INYECTADO VÍA JS)
   ========================================================================== */

// Agregar estilos de animación dinámicamente
const animationStyles = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header.scrolled {
        backdrop-filter: blur(20px);
        background-color: rgba(255, 255, 255, 0.9);
    }
    
    .slow-connection * {
        animation: none !important;
        transition: none !important;
    }
    
    .high-dpi img {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);