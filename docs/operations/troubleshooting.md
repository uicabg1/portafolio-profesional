# Troubleshooting

## `astro check` falla por contenido

Revisar:

- frontmatter en `src/content/projects/*.mdx`
- categorías válidas definidas en `src/lib/project-categories.ts`
- formato de fecha en `publishedAt`
- URLs válidas en `githubUrl` y `demoUrl`

## Error por slug duplicado

`src/lib/projects.server.ts` lanza un error si dos proyectos resuelven al mismo slug. Revisar:

- `data.slug`
- nombre del archivo MDX
- coincidencia con otros proyectos existentes

## La ruta de un proyecto no se genera

Revisar:

- que el archivo esté dentro de `src/content/projects/`
- que pase el schema de `src/content.config.ts`
- que `npm run build` complete sin errores

## La home muestra contenido pero el filtro no responde

Revisar:

- que `ProjectFilter.tsx` siga siendo isla Preact
- que el proyecto compile sin errores de TypeScript
- que el navegador no esté bloqueando JavaScript por una extensión o política local

## El tema o los estilos se ven rotos

Revisar:

- `src/styles/global.css`
- el script de tema en `src/layouts/Layout.astro`
- el uso de tokens `--color-*`, `--space-*` y `--radius-*`

## Un cambio documental contradice al código

La documentación canónica debe corregirse o marcar explícitamente el gap. No se debe dejar una afirmación operativa que el repositorio no pueda respaldar.

## GitHub Actions falla en `Verify deployed files on VPS`

Si el paso falla sin más detalle o menciona un archivo faltante en `/var/www/portafolio`, revisar primero que el archivo exista en `public/` y esté trackeado por Git.

Comandos útiles:

```bash
git ls-files --error-unmatch public/og/default.svg
npm test
npm run build
test -f dist/og/default.svg
```

Causa ya observada:

- `public/og/` existía localmente, pero no estaba versionado
- GitHub Actions construyó el sitio sin esos assets
- `rsync --delete-after` eliminó la copia anterior en el VPS
- el workflow falló correctamente al no encontrar `/var/www/portafolio/og/default.svg`

Solución aplicada:

- versionar `public/og/`
- agregar prueba automatizada para assets Open Graph
- hacer que el workflow imprima qué archivo desplegado falta
