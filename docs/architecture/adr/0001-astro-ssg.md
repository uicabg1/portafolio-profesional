# ADR 0001: Astro como framework base

## Estado

Aprobado

## Contexto

El proyecto requiere una salida estática, buen rendimiento por defecto y la posibilidad de mezclar contenido MDX con componentes visuales e islas interactivas puntuales.

## Decisión

Usar Astro con `output: 'static'` como framework principal.

## Consecuencias

- El sitio puede desplegarse como artefacto estático.
- La mayor parte de la UI no requiere JavaScript en cliente.
- La generación de rutas dinámicas depende de `getStaticPaths()`.
