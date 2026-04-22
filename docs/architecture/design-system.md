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

## Sprint 8 visual direction

El rediseño usa una dirección `portfolio editorial técnico + laboratorio interactivo`.

- `--color-signal-*` se reserva para estados técnicos, flujos, nodos y señales operativas.
- `.editorial-section` y `.editorial-title` dan ritmo amplio a secciones principales.
- `.section-kicker` unifica etiquetas editoriales sin repetir estilos scoped.
- `.motion-rise` permite motion de entrada reutilizable y respeta `prefers-reduced-motion`.
- Las tarjetas dejan de ser estructura principal; se usan solo para elementos repetidos, controles, formularios o demos.

## Dónde extender el sistema

- Si la regla aplica a más de una vista, evaluar `global.css`.
- Si la regla es específica de una sección, mantenerla scoped en el componente.
- Si una nueva sección necesita UI interactiva, revisar primero si puede resolverse sin isla.
