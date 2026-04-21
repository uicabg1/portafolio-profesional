# Accesibilidad

## Objetivo

Mantener una base razonable de accesibilidad en navegación, estructura semántica y legibilidad.

## Implementado actualmente

- `skip-link` en `src/layouts/Layout.astro`
- foco visible y navegación por teclado básica
- uso de headings semánticos en secciones principales
- contenido estático disponible sin depender del filtro interactivo

## Verificación manual sugerida

1. Navegar con teclado desde el inicio de la página.
2. Confirmar que el `skip-link` aparece al enfocarse.
3. Revisar que los enlaces y botones tengan nombre visible o accesible.
4. Ejecutar Lighthouse Accessibility en la home.
5. Revisar al menos una página de proyecto.

## Fuente histórica

El archivo `lighthouse-accessibility.json` puede conservarse como evidencia puntual, pero no sustituye una política de accesibilidad ni una revisión reciente.
