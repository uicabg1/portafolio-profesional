# Design system

## Fuente de verdad

El sistema visual base vive en `src/styles/global.css` y se apoya en tokens CSS definidos con `@theme`.

## Principios

- Static-first también en UI: la mayor parte del layout se resuelve en Astro y CSS.
- Tokens antes que valores aislados.
- Islas solo cuando la interacción aporta valor real.
- Estética técnica y sobria, sin depender de librerías de componentes.

## Tokens principales

- Colores: `--color-bg-*`, `--color-text-*`, `--color-accent*`
- Espaciado: `--space-*`
- Bordes: `--radius-*`
- Tipografía: `--font-display`, `--font-body`, `--font-mono`

## Convenciones de implementación

- `.astro` usa estilos scoped cuando una sección necesita identidad propia.
- `global.css` contiene reset, tema, layout base y utilidades transversales.
- El tema claro/oscuro se resuelve con variables y `data-theme`.
- El verde de WhatsApp se reserva para ese canal; el acento general del sitio es azul.

## Tipografía actual

- Display: `Instrument Serif`
- Body: `Geist`
- Mono: `Geist Mono`

## Dónde extender el sistema

- Si la regla aplica a más de una vista, evaluar `global.css`.
- Si la regla es específica de una sección, mantenerla scoped en el componente.
- Si una nueva sección necesita UI interactiva, revisar primero si puede resolverse sin isla.
