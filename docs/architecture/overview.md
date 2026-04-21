# Arquitectura actual

## Resumen

El proyecto es un portafolio static-first construido con Astro SSG. El contenido se genera en build time y la salida esperada en producción es HTML, CSS y JavaScript estático. No existe runtime de backend de aplicación en producción.

La dirección vigente del producto es **web-first con diferenciador técnico**: la home prioriza una oferta comercial de servicios web, mientras que la capa de infraestructura y redes funciona como evidencia de criterio técnico y profundidad.

## Componentes principales

- `src/pages/index.astro`
  Orquesta la home one-page en orden comercial `web-first`, con jerarquía de CTA hacia `#contacto`, y pasa los proyectos reales al filtro como props SSR.
- `src/pages/proyectos/[slug].astro`
  Genera una página estática por caso de estudio usando `getStaticPaths()`.
- `src/layouts/Layout.astro`
  Centraliza meta tags, fuentes, tema y accesibilidad base.
- `src/components/astro/Contact.astro`
  Expone los canales activos de contacto y monta el formulario dentro de la home.
- `src/components/islands/ContactForm.tsx`
  Maneja validación inline, honeypot, estado de envío y fallback a WhatsApp cuando el endpoint externo no está configurado o falla.
- `src/content.config.ts`
  Define el schema de la colección `projects`.
- `src/lib/contact-form.ts`
  Centraliza validación y construcción del payload del formulario.
- `src/lib/projects.server.ts`
  Carga proyectos, valida slugs y órdenes de navegación únicos, y expone orden cronológico y orden editorial para navegación interna.
- `src/lib/project-interactives.ts`
  Centraliza la metadata de laboratorios interactivos por proyecto.
- `src/lib/project-seo.ts`
  Centraliza canonical, Open Graph y structured data para la página de detalle.
- `src/components/astro/*`
  Secciones renderizadas del lado del servidor.
- `src/components/islands/*`
  Componentes interactivos puntuales que justifican hidratación.

## Modelo de render

- La home se prerenderiza.
- Las páginas de proyecto se prerenderizan a partir de la colección MDX.
- Los laboratorios interactivos de proyecto se resuelven con metadata centralizada y render controlado desde `[slug].astro`.
- La interacción en cliente se limita a islas puntuales:
  - `ProjectFilter.tsx`
  - `WhatsAppButton.tsx`
  - demos de proyecto como `RSASimulator.tsx` e `IPv6MigrationMap.tsx`

## Flujo de datos

1. El contenido vive en `src/content/projects/*.mdx`.
2. `astro:content` valida frontmatter usando Zod.
3. `getAllProjects()` construye la lista canónica y verifica slugs únicos.
4. `index.astro` consume esa lista para el grid filtrable.
5. `getProjectsForNavigation()` construye la secuencia usada por breadcrumb y vecinos anterior/siguiente.
6. `getProjectSeo()` construye canonical, `og:image` y JSON-LD por proyecto.
7. `[slug].astro` resuelve cada proyecto, renderiza el contenido MDX y conecta navegación interna más metadata SEO.

## Estado de infraestructura

- El código genera salida estática y ya se publica en infraestructura propia.
- La narrativa de infraestructura y operación vive dentro de `Infrastructure.astro`.
- El sitio está publicado en un Droplet Basic de DigitalOcean con Ubuntu, Nginx, UFW, Let's Encrypt e IPv6.
- El dominio real es `https://uicabgadiel.com`.
- El pipeline de despliegue a VPS está versionado en `.github/workflows/deploy.yml`.
- GitHub Actions publica automáticamente `dist/` en `/var/www/portafolio` mediante SSH y `rsync`.
- El workflow crea backups remotos en `/home/deploy/portafolio-backups/` antes de publicar.
- La primera ejecución real y una ejecución manual posterior quedaron validadas con estado `success`.

## Límites actuales

- La integración del formulario ya existe y el envío real quedó validado mediante Formspree.
- La documentación de despliegue ya incluye workflow versionado, runbook de secrets y evidencia de ejecución real en GitHub Actions.
- No existe una suite amplia de tests; la validación base hoy combina `npm test`, `astro check`, `build` y revisión manual.
- `astro.config.mjs` ya apunta al dominio real para metadata absoluta.
- Los servicios de hosting propio y despliegue administrado pueden comunicarse como complemento técnico acotado, sin reemplazar la oferta principal `web-first`.
