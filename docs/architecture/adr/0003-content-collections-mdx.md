# ADR 0003: Content Collections + MDX para proyectos

## Estado

Aprobado

## Contexto

Los proyectos deben ser editables dentro del repositorio, validados por schema y aptos para generar páginas estáticas sin backend ni CMS externo.

## Decisión

Usar `astro:content` con archivos `.mdx` locales en `src/content/projects/`.

## Consecuencias

- El contenido queda versionado junto con el código.
- El schema garantiza campos mínimos por proyecto.
- Se evita depender de servicios externos para renderizar contenido.
