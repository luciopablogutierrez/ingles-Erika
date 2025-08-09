# Características de Accesibilidad

This website has been developed following web accessibility best practices to ensure it is usable by people with disabilities.

## Características Implementadas

### 1. Contraste de Color
- **Modo Claro**: Cumple con WCAG AA (4.5:1 mínimo)
- **Dark Mode**: Optimized to reduce visual fatigue
- Support for system `prefers-contrast: high`

### 2. Tipografía y Legibilidad
- Tamaño de fuente base: 18px (más grande que el estándar)
- Line height: 1.7 for better readability
- Sans-serif fonts for greater clarity
- Support for `prefers-reduced-motion`

### 3. Keyboard Navigation
- All interactive elements are keyboard accessible
- Visible focus indicators
- Support for Enter and Space keys
- Orden de tabulación lógico

### 4. Lectores de Pantalla
- Atributos ARIA apropiados en todos los elementos
- Anuncios dinámicos con `aria-live`
- Etiquetas descriptivas (`aria-label`)
- Roles semánticos correctos

### 5. Estructura Semántica
- HTML5 semántico apropiado
- Encabezados jerárquicos (h1, h2, h3)
- Navigation landmarks
- Listas estructuradas correctamente

### 6. Elementos Interactivos
- Áreas de toque mínimas de 44px (WCAG AA)
- Estados de hover, focus y active claramente definidos
- Retroalimentación visual y auditiva
- Mensajes de error descriptivos

### 7. Diseño Responsivo y Móvil
- **Viewport optimizado**: Meta tag viewport configurado correctamente
- **Breakpoints múltiples**: 1024px, 768px, 480px, 360px, 320px
- **Mobile navigation**: Adaptive menu for small screens
- **Áreas de toque ampliadas**: Mínimo 48px en dispositivos táctiles
- **Horizontal orientation**: Optimizations for landscape on mobile
- **Zoom iOS**: Prevención de zoom automático en inputs
- **Imágenes responsivas**: Max-width 100% y height auto
- **Mobile tables**: Automatic horizontal scroll
- **Optimized forms**: 16px font size to avoid zoom

### 8. Multimedia Content
- Text alternatives for visual content
- Accessible audio controls
- Support for subtitles (when applicable)
- Imágenes y videos responsivos

## Tecnologías de Asistencia Soportadas

- **Lectores de Pantalla**: NVDA, JAWS, VoiceOver, TalkBack
- **Keyboard Navigation**: Complete support
- **Magnificadores de Pantalla**: Diseño responsive y escalable
- **Software de Reconocimiento de Voz**: Elementos etiquetados apropiadamente

## Cumplimiento de Estándares

- **WCAG 2.1 Nivel AA**: Cumplimiento completo
- **Section 508**: Compatible
- **EN 301 549**: Estándares europeos de accesibilidad

## Características Específicas por Sección

### Main Page
- Skip link for quick navigation
- Estadísticas con etiquetas descriptivas
- Botones de acción con indicadores claros

### Lecciones
- Accessible lesson navigation
- Ejercicios interactivos con retroalimentación
- Progreso anunciado a lectores de pantalla

### Quizzes
- Opciones de radio con etiquetas claras
- Resultados anunciados dinámicamente
- Keyboard navigation between options

### Tema Oscuro/Claro
- Cambio de tema preserva el contraste
- Preferencias del sistema respetadas
- Transiciones suaves (respeta `prefers-reduced-motion`)

## Pruebas de Accesibilidad

Se recomienda probar el sitio con:
- Keyboard-only navigation (Tab, Enter, Space)
- Lectores de pantalla (NVDA gratuito recomendado)
- Zoom del navegador hasta 200%
- Modo de alto contraste del sistema

## Reportar Problemas de Accesibilidad

Si encuentras algún problema de accesibilidad, por favor reporta:
1. Descripción del problema
2. Tecnología de asistencia utilizada
3. Navegador y versión
4. Steps to reproduce the problem

## Recursos Adicionales

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)