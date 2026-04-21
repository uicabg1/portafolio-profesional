# Accesibilidad

## Objetivo

Mantener una base razonable de accesibilidad en navegación, estructura semántica y legibilidad.

## Implementado actualmente

- `skip-link` en `src/layouts/Layout.astro`
- foco visible y navegación por teclado básica
- uso de headings semánticos en secciones principales
- contenido estático disponible sin depender del filtro interactivo
- contraste corregido para botones de acento en modo oscuro
- nombres accesibles alineados con el texto visible en CTAs principales
- separación táctil reforzada en filtros de proyecto

## Evidencia reciente

Fecha: 2026-04-21

- Lighthouse Accessibility home: `100`
- Lighthouse Accessibility `/proyectos/portafolio-m4/`: `100`
- revisión responsive visual en `375px`, `390px`, `768px` y desktop amplio
- revisión cross-browser con Chromium/Chrome, WebKit y Firefox mediante Playwright

## Verificación manual sugerida

1. Navegar con teclado desde el inicio de la página.
2. Confirmar que el `skip-link` aparece al enfocarse.
3. Revisar que los enlaces y botones tengan nombre visible o accesible.
4. Ejecutar Lighthouse Accessibility en la home.
5. Revisar al menos una página de proyecto.

## Fuente histórica

El archivo `lighthouse-accessibility.json` puede conservarse como evidencia puntual, pero no sustituye una política de accesibilidad ni una revisión reciente.
