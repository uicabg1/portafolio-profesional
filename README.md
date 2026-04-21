# Portafolio profesional

Portafolio static-first construido con Astro, TypeScript, Tailwind CSS v4, MDX y Preact Islands. El sitio prioriza salida estática, contenido versionado en el repositorio y mínima hidratación en cliente.

## Estado actual

- Home one-page con narrativa `web-first` y secciones de `Hero`, `Services`, `ProjectFilter`, `About`, `Infrastructure`, `Contact` y `Footer`
- Páginas estáticas de detalle en `/proyectos/[slug]`
- Content Collections con proyectos en `src/content/projects/*.mdx`
- Tres islas Preact activas: filtro de proyectos, botón de WhatsApp y formulario de contacto
- Sección de contacto con WhatsApp, correo y formulario con validación inline; el envío real depende de `PUBLIC_CONTACT_FORM_ENDPOINT`
- Dominio real publicado en `https://uicabgadiel.com`
- Despliegue automático a VPS propio mediante GitHub Actions, SSH y `rsync`
- Operación base con Nginx, UFW, Let's Encrypt, Cloudflare, IPv4 e IPv6

## Stack

- Astro SSG
- TypeScript
- Tailwind CSS v4 con enfoque CSS-first
- Preact Islands
- MDX + `astro:content`
- GitHub Actions para CI/CD
- VPS Linux con Nginx para serving estático

## Requisitos previos

- Node.js `>= 22.12.0`
- npm

## Comandos

```bash
npm install
npm run dev
npm test
npm run astro -- check
npm run build
npm run preview
```

## Estructura principal

```text
.
├── docs/
├── public/
├── src/
│   ├── components/
│   │   ├── astro/
│   │   └── islands/
│   ├── content/projects/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── AGENTS.md
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Flujo de contenido

1. Los casos de estudio viven en `src/content/projects/*.mdx`.
2. El schema se valida en `src/content.config.ts`.
3. `src/lib/projects.server.ts` obtiene y ordena la colección.
4. `src/pages/index.astro` consume los proyectos para el grid filtrable.
5. `src/pages/proyectos/[slug].astro` genera una página estática por slug.

## Documentación

- Índice general: [docs/README.md](docs/README.md)
- Sprint activo y siguientes: [docs/sprints/README.md](docs/sprints/README.md)
- Requisitos de producto: [docs/product/requisitos.md](docs/product/requisitos.md)
- Backlog vigente: [docs/product/backlog.md](docs/product/backlog.md)
- Arquitectura actual: [docs/architecture/overview.md](docs/architecture/overview.md)
- Desarrollo local: [docs/operations/local-development.md](docs/operations/local-development.md)
- Verificación: [docs/quality/verification.md](docs/quality/verification.md)
- Historial y documentos supersedidos: [docs/archive/](docs/archive/)

## Variable de entorno para contacto

Para habilitar el envío real del formulario, crea un archivo `.env.local` en la raíz del proyecto:

```bash
PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/tu-id-real
```

Después de guardar el archivo, reinicia `npm run dev` o vuelve a correr `npm run build`.

Sin esa variable, la UI del formulario funciona, pero el usuario verá fallback a WhatsApp o correo.

## Verificación mínima antes de integrar cambios

```bash
npm test
npm run astro -- check
npm run build
```

Para cambios visuales o de interacción también conviene ejecutar `npm run dev` y revisar manualmente la home y al menos una ruta de proyecto.

## Deploy

El deploy principal corre desde GitHub Actions al hacer `push` a `main`.

Flujo:

```text
GitHub Actions -> npm ci/test/check/build -> backup remoto -> rsync -> VPS -> checks publicos
```

Runbooks:

- [docs/operations/github-actions-deploy.md](docs/operations/github-actions-deploy.md)
- [docs/operations/deployment-vps.md](docs/operations/deployment-vps.md)
