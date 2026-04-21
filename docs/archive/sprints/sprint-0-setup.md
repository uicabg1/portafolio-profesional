# Runbook — Sprint S0: Setup Front-end

**Proyecto:** Portafolio Profesional · Gadiel · UADY / TIDE Fellows
**Sprint:** S0 — Inicialización del entorno de desarrollo local
**Prerrequisito:** Node.js ≥ 20.x instalado (`node -v`). Git inicializado en el repositorio.
**Referencia:** Fase 1 v1.1 · Fase 2 v1.0

---

## ⚠️ Correcciones arquitectónicas respecto a Fase 2

Las siguientes correcciones fueron aplicadas durante la ejecución de este sprint. Se documenta aquí para trazabilidad.

| ID | Elemento | Problema en Fase 2 | Corrección aplicada en este Runbook |
|---|---|---|---|
| **FIX-01** | ADR-02 y ADR-04 | Referencia a `@astrojs/tailwind` y `tailwind.config.mjs` con array `content`. Ese flujo corresponde a Tailwind v3. | Tailwind v4 usa `@tailwindcss/vite` como plugin de Vite. Sin `tailwind.config.mjs`. Sin `content` array. Configuración CSS-first vía directiva `@theme`. |
| **FIX-02** | ADR-04 `astro.config.mjs` | Falta la integración `@astrojs/mdx`. Sin ella, los archivos `.mdx` de `src/content/projects/` no son procesados. | Se añade `@astrojs/mdx` a las integraciones. |
| **FIX-03** | ADR-03 schema `slug` | El campo `slug` en frontmatter puede divergir del slug real que Astro infiere del nombre de archivo, generando rutas inconsistentes. | Se mantiene el campo en el schema como `z.string()` pero se establece la convención: **el valor del campo `slug` debe ser idéntico al nombre del archivo sin la extensión**. Se añade ejemplo explícito. |

---

## 1. Inicialización del proyecto Astro

### 1.1 Crear el proyecto

Ejecutar en el directorio donde vivirá el repositorio:

```bash
npm create astro@latest portafolio -- \
  --template minimal \
  --typescript strict \
  --no-git \
  --no-install
```

> `--template minimal`: punto de partida limpio, sin páginas de ejemplo.
> `--typescript strict`: activa `tsconfig` con `strict: true`, necesario para el tipado del schema Zod.
> `--no-git`: el repositorio ya está inicializado externamente.
> `--no-install`: instalaremos todas las dependencias juntas en el paso 1.3.

```bash
cd portafolio
```

### 1.2 Verificar la versión de Astro

```bash
cat package.json | grep '"astro"'
# Debe mostrar astro >= 5.x
```

### 1.3 Instalar integraciones y dependencias — un solo comando

```bash
npm install \
  @astrojs/preact \
  @astrojs/mdx \
  preact \
  tailwindcss \
  @tailwindcss/vite
```

> **Nota FIX-01:** Se instala `@tailwindcss/vite` (plugin oficial de Tailwind v4 para Vite/Astro) y **no** `@astrojs/tailwind`, que corresponde a Tailwind v3 y quedó deprecado para v4.

Verificar que no haya conflictos de pares:

```bash
npm ls tailwindcss
# Debe mostrar tailwindcss >= 4.x sin warnings
```

---

## 2. Configuración de `astro.config.mjs`

Reemplazar el contenido del archivo generado por el scaffolding:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',          // RNF-19: HTML estático puro, sin runtime de Node en VPS
  site: 'https://tudominio.com', // Reemplazar con el dominio real — necesario para sitemap y canonical URLs

  integrations: [
    preact(),                // ADR-04: Islas interactivas (~3 KB runtime)
    mdx(),                   // FIX-02: Procesamiento de archivos .mdx en Content Collections
  ],

  vite: {
    plugins: [
      tailwindcss(),         // FIX-01: Plugin oficial de Tailwind v4 para Vite
    ],
  },
});
```

**Por qué `tailwindcss()` va en `vite.plugins` y no en `integrations`:**
Tailwind v4 es un plugin de PostCSS/Vite, no una integración de Astro. Al declararlo en `vite.plugins`, se inyecta en el pipeline de transformación de Vite que Astro usa internamente. El resultado es idéntico funcionalmente, pero la arquitectura es correcta.

---

## 3. Configuración de TypeScript

Verificar que `tsconfig.json` esté configurado con `strict` y con los paths correctos para Content Collections:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*":    ["src/layouts/*"],
      "@styles/*":     ["src/styles/*"],
      "@content/*":    ["src/content/*"],
      "@islands/*":    ["src/components/islands/*"]
    }
  }
}
```

> Los path aliases evitan imports relativos frágiles como `../../../components/Card.astro`. Se usan desde el primer commit para no tener que refactorizar después.

---

## 4. Arquitectura de carpetas `src/`

Crear la estructura completa con un solo bloque de comandos:

```bash
mkdir -p \
  src/components/astro \
  src/components/islands \
  src/content/projects \
  src/layouts \
  src/pages/proyectos \
  src/styles \
  src/lib \
  src/assets/images
```

Árbol resultante de `src/`:

```
src/
├── assets/
│   └── images/                  # Imágenes estáticas procesadas por Astro (optimización automática)
│
├── components/
│   ├── astro/                   # Componentes .astro — zero JS, server-only rendering
│   │   ├── ProjectCard.astro    # Tarjeta de proyecto (PYME view)
│   │   ├── Badge.astro          # Pill de stack tecnológico
│   │   ├── Nav.astro            # Barra de navegación
│   │   └── Footer.astro
│   │
│   └── islands/                 # Componentes Preact — hidratados en el cliente
│       ├── ProjectFilter.tsx    # client:load  — filtro de proyectos por categoría
│       ├── RSASimulator.tsx     # client:visible — simulador interactivo RSA
│       ├── IPv6Map.tsx          # client:visible — diagrama de red IPv6
│       ├── WhatsAppButton.tsx   # client:load  — botón flotante WhatsApp
│       └── ContactForm.tsx      # client:idle  — formulario de contacto
│
├── content/
│   ├── config.ts                # Schema Zod de Content Collections (ver sección 5)
│   └── projects/                # Colección de proyectos en MDX
│       ├── rsa-en-c.mdx         # Caso de estudio: cifrador RSA · HU-04, HU-05
│       ├── analisis-ipv6.mdx    # Caso de estudio: análisis redes IPv6 · HU-05
│       ├── proyecto-web-1.mdx   # Proyecto web · HU-02
│       └── proyecto-web-2.mdx   # Proyecto web · HU-02
│
├── layouts/
│   └── Layout.astro             # Layout base — <head>, fuentes, meta tags, theme script
│
├── lib/
│   └── projects.ts              # Helpers: getCollection, sorting, filtering
│
├── pages/
│   ├── index.astro              # Home — one-page con anclas (#hero, #servicios, etc.)
│   ├── infraestructura.astro    # Página de infraestructura (indexable por Google)
│   ├── 404.astro                # Página de error personalizada
│   └── proyectos/
│       └── [slug].astro         # Ruta dinámica — vista detalle de cada proyecto
│
└── styles/
    └── global.css               # Design system: @import tailwindcss + @theme tokens
```

**Convención de nombres:**
- Archivos `.astro` en `components/astro/` → PascalCase
- Archivos `.tsx` en `components/islands/` → PascalCase
- Archivos `.mdx` en `content/projects/` → kebab-case (el nombre es el slug de la ruta)
- Archivos de utilidad en `lib/` → camelCase

---

## 5. Content Collections — `src/content/config.ts`

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

/**
 * Collection: projects
 *
 * Cada archivo .mdx en src/content/projects/ representa un caso de estudio.
 * El slug de la ruta es inferido del nombre del archivo (kebab-case).
 *
 * FIX-03: El campo `slug` en frontmatter DEBE coincidir con el nombre del archivo
 * sin extensión para garantizar consistencia. Ejemplo: el archivo `rsa-en-c.mdx`
 * debe declarar `slug: "rsa-en-c"` en su frontmatter.
 *
 * Referencia: ADR-03 · Fase 2 v1.0
 */
const projects = defineCollection({
  type: 'content', // Procesa el cuerpo del MDX como contenido renderizable

  schema: z.object({
    // ── Identificación ──────────────────────────────────────────────
    title: z.string()
      .min(3, 'El título debe tener al menos 3 caracteres')
      .max(80, 'El título no debe superar 80 caracteres'),

    slug: z.string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'El slug debe ser kebab-case (ej: rsa-en-c). Debe coincidir con el nombre del archivo.'
      ),

    category: z.enum(['web', 'sistemas', 'redes', 'infraestructura']),
    // web           → proyectos de desarrollo web (audiencia: PYME)
    // sistemas      → proyectos C/C++, bajo nivel (audiencia: tech lead)
    // redes         → proyectos de redes, IPv6 (audiencia: tech lead)
    // infraestructura → el portafolio mismo como caso de estudio (audiencia: tech lead)

    // ── Contenido para tarjeta (vista PYME) ─────────────────────────
    summary: z.string()
      .min(20, 'El resumen debe tener al menos 20 caracteres')
      .max(300, 'El resumen no debe superar 300 caracteres'),
    // Texto que aparece en ProjectCard.astro. Orientado a beneficio de negocio,
    // no a descripción técnica.

    // ── Estructura del caso de estudio (vista detalle) ───────────────
    problem: z.string()
      .min(10, 'Describe el problema en al menos 10 caracteres'),
    // Qué necesitaba resolverse. Contexto de negocio o técnico.

    solution: z.string()
      .min(10, 'Describe la solución en al menos 10 caracteres'),
    // Qué se construyó. Decisiones de diseño clave. Puede referenciar
    // secciones del cuerpo MDX con más detalle.

    result: z.string()
      .min(10, 'Describe el resultado en al menos 10 caracteres'),
    // Métricas, logros, aprendizajes. Qué se demostró.

    // ── Stack tecnológico ────────────────────────────────────────────
    stack: z.array(z.string())
      .min(1, 'Debe declarar al menos una tecnología del stack')
      .max(10, 'Máximo 10 tecnologías por proyecto'),
    // Ejemplo: ['C', 'GMP Library', 'Makefile']
    // Renderizado como badges en ProjectCard.astro y en la vista detalle.

    // ── Links externos ───────────────────────────────────────────────
    githubUrl: z.string()
      .url('githubUrl debe ser una URL válida')
      .optional(),

    demoUrl: z.string()
      .url('demoUrl debe ser una URL válida')
      .optional(),

    // ── Flags de comportamiento ──────────────────────────────────────
    hasInteractiveComponent: z.boolean().default(false),
    // true → el MDX del proyecto inyecta una isla Preact (RSASimulator, IPv6Map).
    // Usado en [slug].astro para renderizar un indicador visual
    // y en la tarjeta para mostrar un badge "Interactivo".

    featured: z.boolean().default(false),
    // true → el proyecto aparece en la sección Hero y al tope de /proyectos.
    // Máximo 2 proyectos con featured: true para no diluir el énfasis.

    // ── Metadatos ────────────────────────────────────────────────────
    publishedAt: z.coerce.date(),
    // z.coerce.date() convierte strings ISO 8601 del frontmatter a objetos Date.
    // Formato recomendado en frontmatter: publishedAt: 2024-11-15
    // Usado para ordenar proyectos cronológicamente y para el meta og:updated_time.
  }),
});

export const collections = {
  projects,
};
```

### 5.1 Ejemplo de frontmatter válido para un proyecto

Crear el primer archivo de prueba para validar el schema:

```mdx
---
# src/content/projects/rsa-en-c.mdx
title: "Cifrador RSA implementado en C"
slug: "rsa-en-c"
category: "sistemas"
summary: "Implementación completa del algoritmo RSA desde cero en C puro, sin librerías de criptografía externas. Demuestra comprensión de aritmética modular, generación de primos grandes y manejo seguro de memoria."
problem: "Comprender e implementar criptografía asimétrica sin abstracciones de alto nivel, partiendo únicamente de operaciones matemáticas fundamentales sobre enteros de precisión arbitraria."
solution: "Implementación en C con la librería GMP para aritmética de enteros grandes. El sistema genera pares de llaves, cifra y descifra bloques de texto usando exponenciación modular rápida."
result: "Sistema funcional capaz de cifrar mensajes de hasta 2048 bits. El código incluye tests unitarios con CUnit y documentación completa del proceso matemático."
stack: ["C", "GMP Library", "Makefile", "CUnit"]
githubUrl: "https://github.com/tu-usuario/rsa-en-c"
hasInteractiveComponent: true
featured: true
publishedAt: 2024-09-15
---

## El algoritmo

El contenido detallado del caso de estudio va aquí en formato Markdown.
Puedes importar componentes Preact directamente:

import RSASimulator from '@islands/RSASimulator.tsx';

<RSASimulator client:visible githubUrl="https://github.com/tu-usuario/rsa-en-c" />

El texto continúa después del componente interactivo...
```

---

## 6. Sistema de Diseño — `src/styles/global.css`

**Nota sobre Tailwind v4 CSS-first:**
En v4, toda la configuración de tokens se hace con la directiva `@theme` dentro del CSS. No existe `tailwind.config.mjs`. La directiva `@import "tailwindcss"` inyecta las utilidades base y expone el sistema de `@theme` para customización. La detección de clases usadas es automática (Vite escanea los archivos en tiempo de build).

```css
/* src/styles/global.css */

/* ── 1. Importar Tailwind v4 (CSS-first, sin config file) ─────────── */
@import "tailwindcss";

/* ── 2. Importar tipografías de Google Fonts ──────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&family=Geist+Mono:wght@400&family=Instrument+Serif:ital@0;1&display=swap');
/*
  Geist           → Cuerpo, UI, navegación (wght: 300 light, 400 regular, 500 medium)
  Geist Mono      → Snippets de código, sección de infraestructura
  Instrument Serif → Display / Headings editoriales (H1 Hero, títulos de casos de estudio)
  display=swap    → font-display: swap — previene FOIT (Flash of Invisible Text) [RNF-03/CLS]

  ADVERTENCIA CSP: el header Content-Security-Policy en Nginx (Fase 2 §4.4) debe
  incluir exactamente estas directivas para permitir la carga:
    style-src  'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src   'self' https://fonts.gstatic.com;
  Sin ellas, las fuentes no cargarán en producción.
*/

/* ── 3. Tokens del sistema de diseño via @theme ───────────────────── */
/*
  @theme expone los tokens como utilidades de Tailwind.
  Ejemplo: --color-accent → bg-accent, text-accent, border-accent
  Las variables CSS custom también quedan disponibles para uso directo en
  componentes con var(--color-accent).

  Referencia: Fase 2 §5.2, §5.3, §5.4
*/
@theme {

  /* ── Tipografía ───────────────────────────────────────────────── */
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body:    'Geist', system-ui, sans-serif;
  --font-mono:    'Geist Mono', 'Fira Code', monospace;

  /* Escala tipográfica — Fase 2 §5.2 */
  --text-xs:   0.75rem;    /* 12px — etiquetas, metadata, badges */
  --text-sm:   0.875rem;   /* 14px — subtítulos de tarjeta, secundario */
  --text-base: 1rem;       /* 16px — cuerpo, párrafos */
  --text-lg:   1.125rem;   /* 18px — descripción Hero, resumen */
  --text-xl:   1.25rem;    /* 20px — títulos de sección */
  --text-2xl:  1.5rem;     /* 24px — títulos proyectos, H2 */
  --text-4xl:  2.25rem;    /* 36px — Hero heading (Instrument Serif) */
  --text-6xl:  3.75rem;    /* 60px — Display desktop (Instrument Serif, solo Hero) */

  /* ── Espaciado — múltiplos de 4px · Fase 2 §5.4 ──────────────── */
  --space-1:  0.25rem;   /*  4px */
  --space-2:  0.5rem;    /*  8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-24: 6rem;      /* 96px */

  /* ── Layout ───────────────────────────────────────────────────── */
  --container-max:   1200px;  /* Contenedor principal */
  --container-prose: 720px;   /* Texto de casos de estudio */

  /* ── Border radius ────────────────────────────────────────────── */
  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   16px;
  --radius-full: 9999px;   /* Pills de badges de stack */

  /* ── Paleta modo claro (default) · Fase 2 §5.3 ───────────────── */

  /* Neutrales */
  --color-bg:               #FAFAFA;  /* Fondo principal — casi blanco */
  --color-bg-subtle:        #F4F4F5;  /* Fondo de tarjetas y secciones alternas */
  --color-bg-muted:         #E4E4E7;  /* Bordes, separadores */
  --color-text-primary:     #09090B;  /* Texto principal */
  --color-text-secondary:   #71717A;  /* Texto secundario, metadata */
  --color-text-muted:       #A1A1AA;  /* Placeholders, texto terciario */

  /* Acento primario — identidad del portafolio [MOD-02] */
  /* REGLA: usar SOLO en links activos, CTA buttons, badges de tech,
     bordes hover de tarjetas. NO en fondos grandes ni headings. */
  --color-accent:            #1D4ED8;  /* Azul índigo profundo */
  --color-accent-hover:      #1E40AF;  /* Estado hover del acento */
  --color-accent-subtle:     #DBEAFE;  /* Fondo de badges de stack */
  --color-accent-text:       #1E40AF;  /* Texto sobre fondo accent-subtle */

  /* WhatsApp — color FUNCIONAL, no de identidad [MOD-02] */
  /* REGLA CRÍTICA: este color aparece EXCLUSIVAMENTE en el botón flotante
     de WhatsApp (WhatsAppButton.tsx) y en el botón de WhatsApp del módulo
     de contacto. En ningún otro elemento del sitio. */
  --color-whatsapp:          #25D366;
  --color-whatsapp-hover:    #1DAA52;
  --color-whatsapp-text:     #FFFFFF;

  /* Semánticos */
  --color-success:           #16A34A;
  --color-error:             #DC2626;
}

/* ── 4. Modo oscuro via [data-theme="dark"] ───────────────────────── */
/*
  El modo oscuro se activa añadiendo data-theme="dark" al elemento <html>.
  El toggle de tema en JavaScript modifica este atributo.
  El modo oscuro es el predeterminado para la audiencia técnica (Fase 2 §5.1).
  Sobrescribe los tokens de @theme con los valores del tema oscuro.
*/
[data-theme="dark"] {
  --color-bg:               #09090B;
  --color-bg-subtle:        #18181B;
  --color-bg-muted:         #27272A;
  --color-text-primary:     #FAFAFA;
  --color-text-secondary:   #A1A1AA;
  --color-text-muted:       #52525B;

  /* El azul de acento se aclara en oscuro para mantener contraste WCAG AA [RNF-08] */
  --color-accent:            #60A5FA;
  --color-accent-hover:      #93C5FD;
  --color-accent-subtle:     #1E3A5F;
  --color-accent-text:       #93C5FD;
}

/* ── 5. Reset y estilos base ─────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  scroll-behavior: smooth;
  /* Inicializa en modo oscuro — el toggle en Layout.astro puede cambiar esto */
  /* Eliminar esta línea si se prefiere claro por defecto */
  /* color-scheme: dark; */
}

body {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ── 6. Tipografía global ─────────────────────────────────────────── */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 400;   /* Instrument Serif es elegante en weight regular */
  line-height: 1.2;
  color: var(--color-text-primary);
}

/*
  Excepción: los headings de UI (nav, badges, labels) usan font-body.
  Para headings de UI, aplicar la clase Tailwind `font-body` explícitamente
  o sobreescribir con style inline en el componente.
*/

p {
  font-family: var(--font-body);
  color: var(--color-text-primary);
  max-width: var(--container-prose);
}

code, pre, kbd {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

pre {
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-bg-muted);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  overflow-x: auto;
}

a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 150ms ease;
}

a:hover {
  color: var(--color-accent-hover);
}

/* ── 7. Contenedor principal ──────────────────────────────────────── */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--space-6);
}

@media (min-width: 640px) {
  .container {
    padding-inline: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .container {
    padding-inline: var(--space-12);
  }
}

/* ── 8. Grid de proyectos · Fase 2 §5.4 ──────────────────────────── */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;           /* Mobile: 1 columna */
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);  /* Tablet: 2 columnas */
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);  /* Desktop: 3 columnas */
  }
}

/* ── 9. Focus visible global — accesibilidad [RNF-09] ────────────── */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* ── 10. Reducción de movimiento — accesibilidad ──────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Layout base — `src/layouts/Layout.astro`

```astro
---
// src/layouts/Layout.astro
// Layout base que envuelve todas las páginas del sitio.
// Gestiona: <head>, fuentes, meta tags SEO, script de tema, y accesibilidad.

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const {
  title,
  description = 'Desarrollador de Software especializado en soluciones web para PYMES. Estudiante de Ingeniería de Software en UADY, becario TIDE Fellows.',
  ogImage = '/og-default.jpg',
  canonicalUrl = Astro.url.href,
} = Astro.props;

const fullTitle = title === 'Home'
  ? 'Gadiel | Desarrollador de Software'
  : `${title} · Gadiel`;
---

<!doctype html>
<html lang="es" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO básico -->
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="Gadiel" />

  <!-- Open Graph -->
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(ogImage, Astro.site)} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="es_MX" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={new URL(ogImage, Astro.site)} />

  <!-- Fuentes Google — preconnect para reducir latencia [RNF-04 FCP] -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- CSS global con design tokens y Tailwind v4 -->
  <link rel="stylesheet" href="/src/styles/global.css" />
  <!--
    En producción, Astro procesa y optimiza este import automáticamente.
    El output en dist/ será un archivo CSS minificado con solo las clases usadas.
  -->

  <!--
    Script inline de tema — debe ejecutarse antes del render para evitar
    flash of wrong theme (FOWT). Se coloca en <head> antes del body.
    Lee la preferencia del sistema y la del usuario guardada en localStorage.
  -->
  <script is:inline>
    (function() {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored ?? (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
</head>

<body>
  <!-- Skip link — accesibilidad [RNF-09]: permite saltar al contenido principal con teclado -->
  <a
    href="#main-content"
    style="
      position: absolute;
      top: -100%;
      left: 0;
      padding: 0.5rem 1rem;
      background: var(--color-accent);
      color: white;
      z-index: 9999;
      border-radius: 0 0 var(--radius-md) 0;
    "
    class="focus:top-0"
  >
    Saltar al contenido
  </a>

  <main id="main-content">
    <slot />
  </main>
</body>
</html>
```

---

## 8. Helper de Content Collections — `src/lib/projects.ts`

```typescript
// src/lib/projects.ts
// Funciones de acceso a la colección de proyectos.
// Centraliza la lógica de consulta para no repetirla en cada página.

import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * Devuelve todos los proyectos ordenados por fecha descendente (más reciente primero).
 */
export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

/**
 * Devuelve proyectos filtrados por categoría.
 * category === 'all' devuelve todos sin filtrar.
 */
export async function getProjectsByCategory(
  category: 'web' | 'sistemas' | 'redes' | 'infraestructura' | 'all'
): Promise<Project[]> {
  const all = await getAllProjects();
  if (category === 'all') return all;
  return all.filter((p) => p.data.category === category);
}

/**
 * Devuelve los proyectos marcados como featured.
 * Máximo 2 (ver convención en config.ts).
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.data.featured).slice(0, 2);
}

/**
 * Devuelve un proyecto por su slug.
 * Lanza un error si no existe — se usa en [slug].astro para generar 404.
 */
export async function getProjectBySlug(slug: string): Promise<Project> {
  const all = await getAllProjects();
  const project = all.find((p) => p.data.slug === slug);
  if (!project) {
    throw new Error(`Proyecto con slug "${slug}" no encontrado en la colección.`);
  }
  return project;
}
```

---

## 9. Ruta dinámica — `src/pages/proyectos/[slug].astro`

```astro
---
// src/pages/proyectos/[slug].astro
// Genera una página estática por cada proyecto en la colección.
// getStaticPaths() es obligatorio con output: 'static'.

import Layout from '@layouts/Layout.astro';
import { getAllProjects } from '@lib/projects';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    params: { slug: project.data.slug },
    props: { project },
  }));
};

const { project } = Astro.props;
const { Content } = await project.render();

const {
  title,
  summary,
  category,
  stack,
  problem,
  solution,
  result,
  githubUrl,
  demoUrl,
  hasInteractiveComponent,
  publishedAt,
} = project.data;
---

<Layout
  title={title}
  description={summary}
>
  <article class="container" style="padding-block: var(--space-16);">

    <!-- Breadcrumb -->
    <nav aria-label="Ruta de navegación" style="margin-bottom: var(--space-6); font-size: var(--text-sm); color: var(--color-text-secondary);">
      <a href="/">Inicio</a>
      <span aria-hidden="true"> / </span>
      <a href="/#proyectos">Proyectos</a>
      <span aria-hidden="true"> / </span>
      <span aria-current="page">{title}</span>
    </nav>

    <!-- Header del caso de estudio -->
    <header style="margin-bottom: var(--space-12);">
      <span style="
        display: inline-block;
        background: var(--color-accent-subtle);
        color: var(--color-accent-text);
        font-size: var(--text-xs);
        font-family: var(--font-mono);
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-full);
        margin-bottom: var(--space-4);
        text-transform: uppercase;
        letter-spacing: 0.08em;
      ">
        {category}
      </span>

      {hasInteractiveComponent && (
        <span style="
          display: inline-block;
          background: var(--color-bg-subtle);
          color: var(--color-text-secondary);
          font-size: var(--text-xs);
          font-family: var(--font-mono);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: var(--space-4);
          margin-left: var(--space-2);
          border: 1px solid var(--color-bg-muted);
        ">
          Interactivo
        </span>
      )}

      <h1 style="font-size: var(--text-4xl); margin-bottom: var(--space-4);">{title}</h1>
      <p style="font-size: var(--text-lg); color: var(--color-text-secondary); font-family: var(--font-body);">{summary}</p>

      <!-- Stack de tecnologías -->
      <ul role="list" style="display: flex; flex-wrap: wrap; gap: var(--space-2); list-style: none; margin-top: var(--space-6);">
        {stack.map((tech) => (
          <li style="
            background: var(--color-bg-subtle);
            color: var(--color-text-secondary);
            font-size: var(--text-xs);
            font-family: var(--font-mono);
            padding: 0.25rem 0.625rem;
            border-radius: var(--radius-full);
            border: 1px solid var(--color-bg-muted);
          ">
            {tech}
          </li>
        ))}
      </ul>
    </header>

    <!-- Estructura del caso de estudio -->
    <section style="display: grid; gap: var(--space-12); margin-bottom: var(--space-12);">

      <div>
        <h2 style="font-size: var(--text-xl); font-family: var(--font-body); font-weight: 500; color: var(--color-text-secondary); margin-bottom: var(--space-3);">El Problema</h2>
        <p>{problem}</p>
      </div>

      <div>
        <h2 style="font-size: var(--text-xl); font-family: var(--font-body); font-weight: 500; color: var(--color-text-secondary); margin-bottom: var(--space-3);">La Solución</h2>
        <p>{solution}</p>
      </div>

      <!-- Contenido MDX: componentes interactivos + texto extendido -->
      <div class="prose">
        <Content />
      </div>

      <div>
        <h2 style="font-size: var(--text-xl); font-family: var(--font-body); font-weight: 500; color: var(--color-text-secondary); margin-bottom: var(--space-3);">El Resultado</h2>
        <p>{result}</p>
      </div>

    </section>

    <!-- Links externos -->
    <footer style="display: flex; gap: var(--space-4); flex-wrap: wrap; border-top: 1px solid var(--color-bg-muted); padding-top: var(--space-8);">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style="
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: 0.625rem 1.25rem;
            border: 1px solid var(--color-bg-muted);
            border-radius: var(--radius-md);
            font-size: var(--text-sm);
            font-family: var(--font-body);
            color: var(--color-text-primary);
            transition: border-color 150ms ease, color 150ms ease;
          "
        >
          Ver código en GitHub ↗
        </a>
      )}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          style="
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: 0.625rem 1.25rem;
            background: var(--color-accent);
            border-radius: var(--radius-md);
            font-size: var(--text-sm);
            font-family: var(--font-body);
            color: white;
            transition: background 150ms ease;
          "
        >
          Ver demo en vivo ↗
        </a>
      )}
    </footer>

  </article>
</Layout>
```

---

## 10. `.gitignore` — actualizar el generado por Astro

Verificar que estas entradas estén presentes (el scaffolding de Astro ya incluye la mayoría):

```gitignore
# Astro
dist/
.astro/

# Node
node_modules/

# Entorno local — NUNCA commitear
.env
.env.local
.env.production

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/settings.json
.idea/
```

---

## 11. Verificación de la instalación

Ejecutar en orden:

```bash
# 1. Arrancar el servidor de desarrollo
npm run dev
# Debe mostrar: "🚀 astro dev server running at http://localhost:4321"
# Sin errores de TypeScript ni de Vite en la terminal.

# 2. Verificar que Tailwind v4 procesa el CSS
# Abrir http://localhost:4321 — si el fondo es #09090B (casi negro, modo oscuro),
# el CSS global y @theme están funcionando.

# 3. Build de producción
npm run build
# Debe completar sin errores.
# El output en dist/ debe contener solo archivos .html, .css, .js y assets.

# 4. Verificar el bundle CSS
ls -lh dist/_astro/*.css
# El archivo CSS debe pesar < 15 KB (Tailwind v4 auto-purga clases no usadas).

# 5. Preview del build estático
npm run preview
# Sirve el contenido de dist/ en http://localhost:4321
# Verificar que la página carga correctamente.

# 6. Verificar TypeScript
npx astro check
# Output esperado: "No errors found" o solo advertencias de archivos vacíos.
```

### Checklist de cierre de Sprint S0

```
Setup
  [ ] npm run dev arranca sin errores
  [ ] npm run build completa sin errores
  [ ] npx astro check sin errores de tipos

CSS
  [ ] Modo oscuro activo por defecto (fondo #09090B)
  [ ] Fuentes Geist e Instrument Serif cargan en el navegador (DevTools > Network > Fonts)
  [ ] bundle CSS del build < 15 KB

Content Collections
  [ ] src/content/config.ts sin errores de TypeScript
  [ ] El archivo rsa-en-c.mdx de prueba pasa la validación del schema
      (verificar con: npx astro check)

Estructura
  [ ] Árbol de src/ coincide con el árbol definido en la sección 4
  [ ] Path aliases (@components, @layouts, @islands, @lib) resuelven sin errores
  [ ] .gitignore incluye dist/, .astro/, .env
```

---

## 12. Comandos de referencia rápida

| Acción | Comando |
|---|---|
| Servidor de desarrollo | `npm run dev` |
| Build de producción | `npm run build` |
| Preview del build | `npm run preview` |
| Verificación de tipos | `npx astro check` |
| Agregar integración | `npx astro add <nombre>` |
| Ver versiones instaladas | `npm ls astro tailwindcss @tailwindcss/vite` |

---

*Sprint S0 completado. Continuar con Sprint S1 — Core: Nginx, SSL, IPv6, Layout Hero.*
*Referencia para S1: Fase 2 §4 Plan de Infraestructura.*
