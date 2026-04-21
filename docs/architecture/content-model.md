# Modelo de contenido

## Colección vigente

El proyecto usa una única colección principal: `projects`.

Archivo fuente:

- `src/content.config.ts`

Origen del contenido:

- `src/content/projects/*.mdx`

## Campos del schema

Cada proyecto define:

- `title`
- `summary`
- `category`
- `slug` opcional
- `problem`
- `solution`
- `result`
- `stack`
- `githubUrl` opcional
- `demoUrl` opcional
- `ogImage` opcional
- `hasInteractiveComponent`
- `interactiveDemo` opcional
- `navigationOrder` opcional
- `publishedAt`
- `featured`

## Categorías permitidas

Las categorías viven en `src/lib/project-categories.ts`:

- `Web Dev`
- `Ciberseguridad`
- `Redes & IPv6`
- `Gestión de Redes`

## Reglas de slug

- Si existe `data.slug`, se usa como slug público.
- Si no existe, se usa `project.id`.
- La resolución se centraliza en `src/lib/project-slug.ts`.
- `src/lib/projects.server.ts` rechaza slugs duplicados en tiempo de carga.

## Reglas para demos interactivas

- `hasInteractiveComponent` controla la señal visual de que el proyecto incluye laboratorio interactivo.
- `interactiveDemo` define qué demo reusable debe renderizarse en la página de detalle.
- La metadata del laboratorio vive en `src/lib/project-interactives.ts`.
- El render de la isla se resuelve en `src/pages/proyectos/[slug].astro`.

## Reglas de navegación entre proyectos

- `navigationOrder` define la secuencia editorial usada en la página de detalle.
- El orden explícito debe ser único cuando se declara; `src/lib/projects.server.ts` rechaza duplicados.
- Si un proyecto no define `navigationOrder`, el fallback es `publishedAt` descendente y luego `slug` ascendente para mantener estabilidad.
- La home sigue consumiendo el orden cronológico de `getAllProjects()`.

## Reglas SEO por proyecto

- `ogImage` define la imagen social específica del proyecto.
- Si `ogImage` no existe, el fallback es `/og/default.svg`.
- La construcción de canonical, Open Graph y JSON-LD vive en `src/lib/project-seo.ts`.
- `src/pages/proyectos/[slug].astro` consume esa capa y la pasa a `src/layouts/Layout.astro`.

## Flujo para agregar un proyecto

1. Crear un archivo `.mdx` en `src/content/projects/`.
2. Completar el frontmatter según el schema.
3. Escribir el cuerpo MDX del caso de estudio.
4. Ejecutar:

```bash
npx astro check
npm run build
```

## Riesgos conocidos

- `githubUrl` y `demoUrl` usan `z.string().url()`, lo que hoy genera hints de deprecación desde Zod en `astro check`.
- Un `slug` manual inconsistente puede romper enlaces esperados entre la home y la ruta dinámica.
- Un `navigationOrder` mal asignado puede alterar la continuidad editorial del detalle de proyectos.
- Mientras `astro.config.mjs` use un dominio placeholder en `site`, canonical y `og:url` seguirán saliendo con esa base.
