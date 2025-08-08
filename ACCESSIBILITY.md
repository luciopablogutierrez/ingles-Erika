# Características de Accesibilidad

Este sitio web ha sido desarrollado siguiendo las mejores prácticas de accesibilidad web para garantizar que sea usable por personas con discapacidades.

## Características Implementadas

### 1. Contraste de Color
- **Modo Claro**: Cumple con WCAG AA (4.5:1 mínimo)
- **Modo Oscuro**: Optimizado para reducir fatiga visual
- Soporte para `prefers-contrast: high` del sistema

### 2. Tipografía y Legibilidad
- Tamaño de fuente base: 18px (más grande que el estándar)
- Altura de línea: 1.7 para mejor legibilidad
- Fuentes sans-serif para mayor claridad
- Soporte para `prefers-reduced-motion`

### 3. Navegación por Teclado
- Todos los elementos interactivos son accesibles por teclado
- Indicadores de foco visibles y mejorados
- Soporte para teclas Enter y Espacio
- Orden de tabulación lógico

### 4. Lectores de Pantalla
- Atributos ARIA apropiados en todos los elementos
- Anuncios dinámicos con `aria-live`
- Etiquetas descriptivas (`aria-label`)
- Roles semánticos correctos

### 5. Estructura Semántica
- HTML5 semántico apropiado
- Encabezados jerárquicos (h1, h2, h3)
- Landmarks de navegación
- Listas estructuradas correctamente

### 6. Elementos Interactivos
- Áreas de toque mínimas de 44px (WCAG AA)
- Estados de hover, focus y active claramente definidos
- Retroalimentación visual y auditiva
- Mensajes de error descriptivos

### 7. Contenido Multimedia
- Alternativas textuales para contenido visual
- Controles de audio accesibles
- Soporte para subtítulos (cuando aplique)

## Tecnologías de Asistencia Soportadas

- **Lectores de Pantalla**: NVDA, JAWS, VoiceOver, TalkBack
- **Navegación por Teclado**: Soporte completo
- **Magnificadores de Pantalla**: Diseño responsive y escalable
- **Software de Reconocimiento de Voz**: Elementos etiquetados apropiadamente

## Cumplimiento de Estándares

- **WCAG 2.1 Nivel AA**: Cumplimiento completo
- **Section 508**: Compatible
- **EN 301 549**: Estándares europeos de accesibilidad

## Características Específicas por Sección

### Página Principal
- Skip link para navegación rápida
- Estadísticas con etiquetas descriptivas
- Botones de acción con indicadores claros

### Lecciones
- Navegación de lecciones accesible
- Ejercicios interactivos con retroalimentación
- Progreso anunciado a lectores de pantalla

### Quizzes
- Opciones de radio con etiquetas claras
- Resultados anunciados dinámicamente
- Navegación por teclado entre opciones

### Tema Oscuro/Claro
- Cambio de tema preserva el contraste
- Preferencias del sistema respetadas
- Transiciones suaves (respeta `prefers-reduced-motion`)

## Pruebas de Accesibilidad

Se recomienda probar el sitio con:
- Navegación solo por teclado (Tab, Enter, Espacio)
- Lectores de pantalla (NVDA gratuito recomendado)
- Zoom del navegador hasta 200%
- Modo de alto contraste del sistema

## Reportar Problemas de Accesibilidad

Si encuentras algún problema de accesibilidad, por favor reporta:
1. Descripción del problema
2. Tecnología de asistencia utilizada
3. Navegador y versión
4. Pasos para reproducir el problema

## Recursos Adicionales

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)