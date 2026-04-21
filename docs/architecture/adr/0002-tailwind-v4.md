# ADR 0002: Tailwind CSS v4 con enfoque CSS-first

## Estado

Aprobado

## Contexto

Se necesita un sistema visual basado en tokens, con bajo costo de mantenimiento y sin una capa adicional de configuración cuando no es necesaria.

## Decisión

Usar Tailwind CSS v4 junto con tokens definidos en `src/styles/global.css` mediante `@theme`.

## Consecuencias

- Los tokens viven cerca del CSS real del proyecto.
- Las utilidades de Tailwind conviven con estilos scoped en componentes Astro.
- El sistema depende de consistencia manual al no tener, por ahora, linting específico de estilos.
