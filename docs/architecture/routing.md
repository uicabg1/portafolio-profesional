# Routing

## Rutas actuales

- `/`
  Home principal con secciones ancladas y carga SSR de proyectos para el filtro.
- `/proyectos/[slug]`
  Ruta dinámica prerenderizada para cada caso de estudio.
- `/404`
  Página de error estática.

## Generación de rutas de proyecto

La generación ocurre en `src/pages/proyectos/[slug].astro`:

1. `getAllProjects()` obtiene la colección ordenada.
2. `getProjectsForNavigation()` construye la secuencia editorial del detalle.
3. `resolveSlug(project)` determina el slug.
4. `getStaticPaths()` devuelve una ruta estática por proyecto y sus vecinos de navegación.

## Contrato entre home y detalle

- La home enlaza a `/proyectos/${resolveSlug(project)}` desde `ProjectFilter.tsx`.
- La ruta dinámica usa la misma función `resolveSlug()`.
- La consistencia de slug depende de una sola implementación compartida.
- La URL canonical del detalle también se deriva del mismo slug.

## Consideraciones de navegación

- La home usa anclas para secciones internas.
- El breadcrumb del detalle enlaza a `/` y `/#proyectos` y mantiene semántica de `BreadcrumbList`.
- La navegación anterior/siguiente del detalle usa una secuencia editorial explícita con `navigationOrder`.
- Si no existe `navigationOrder`, el fallback es `publishedAt` descendente y luego slug ascendente.

## Consideraciones SEO del detalle

- Cada proyecto expone canonical dinámico por slug.
- `og:title` y `og:description` se derivan del contenido validado.
- `og:image` usa el valor de `ogImage` en frontmatter o `/og/default.svg` como fallback.
- La ruta dinámica emite `CreativeWork`, `BreadcrumbList` y `SoftwareSourceCode` cuando existe `githubUrl`.
- Para que las URLs absolutas sean correctas, `astro.config.mjs` debe apuntar al dominio real en `site`.
