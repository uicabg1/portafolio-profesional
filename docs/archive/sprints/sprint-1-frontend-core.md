# Runbook — Sprint 1: Front-End Core & Hero Section

**Proyecto:** Portafolio Profesional · Gadiel · UADY / TIDE Fellows
**Sprint:** S1 — Layout base, navegación, Hero, footer y botón WhatsApp flotante
**Prerrequisito:** Sprint S0 completado. `npm run dev` arranca sin errores. `npx astro check` sin errores de tipos.
**Estimación:** 6–8 h (Fase 2 §6)
**Requisitos que cubre:** RF-01, RF-03, RF-12 · RNF-01 a RNF-09 · HU-01, HU-03, HU-06

---

## Contexto y propósito del sprint

El Sprint 1 establece la **estructura permanente del sitio**: todo lo que existe en cada página (Layout), la barra de navegación, el Hero (la sección más crítica del portafolio según HU-01), el footer con los links externos obligatorios (RF-03), y el botón flotante de WhatsApp (RF-12, HU-03).

Al terminar este sprint tendrás:
- Una página `index.astro` funcional con Hero visible above-the-fold en mobile y desktop (RF-01)
- Navegación accesible por teclado con focus visible (RNF-09)
- Botón flotante de WhatsApp operativo en mobile (HU-03, HU-06)
- Footer con links a GitHub, LinkedIn y correo (RF-03)
- Toggle de modo oscuro/claro funcional
- Todos los meta tags SEO del Layout conectados
- Score de Lighthouse ≥ 95 en Accesibilidad desde el primer commit real

Lo que **no** entra en este sprint: secciones de Servicios, Sobre mí, Proyectos, Contacto ni Infraestructura — eso es S2, S3, S4 y S5.

---

## Decisiones de diseño que guían todo el código de este sprint

Antes de escribir una línea, internaliza estas decisiones de la Fase 2 porque afectan cada componente:

**Audiencia dual (Fase 2 §1.1):** el Hero habla primero al dueño de PYME en su idioma (negocio, no código). El título técnico/stack viene después como información secundaria.

**Flujo A (Fase 2 §1.3):** El dueño de PYME en mobile debe poder contactar sin scroll. Eso significa que el botón de WhatsApp flotante es visible desde el frame 0.

**Sistema de color (Fase 2 §5.3 MOD-02):** El verde `#25D366` aparece **únicamente** en el botón de WhatsApp. El acento de identidad del sitio es azul índigo `#1D4ED8`. No mezclar.

**Tipografía (Fase 2 §5.2 MOD-01):** Instrument Serif para el H1 del Hero. Geist para todo el resto. Esto es lo que crea el contraste editorial-técnico que transmite seniority.

**Principio rector del diseño (Fase 2 §5.1):** la referencia es Xcode/iTerm2. Oscuro, denso de información, completamente legible, cero ornamentos innecesarios.

---

## Tarea 1 — Auditoría y ajuste fino del Layout base

### Por qué es lo primero

El `Layout.astro` creado en el Sprint 0 tiene la estructura correcta pero necesita ajustes específicos antes de construir encima de él. Si hay un error en el Layout, se propaga a todas las páginas.

### 1.1 Verificar el script de tema antes de todo

El script `is:inline` de detección de tema debe ejecutarse **síncronamente** antes de que el browser pinte el primer frame. Si no, el visitante verá un flash del tema incorrecto (FOWT — Flash of Wrong Theme) que daña el CLS (RNF-03).

Abre `src/layouts/Layout.astro` y verifica que el script de tema esté en `<head>`, antes del `<slot />` y antes de cualquier `<link>` de CSS. Debe quedar exactamente así:

```astro
---
// src/layouts/Layout.astro
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

  <!--
    TEMA: este script DEBE ir primero, antes del CSS.
    Al ejecutarse síncronamente bloquea el render hasta que el atributo
    data-theme esté correcto, eliminando el FOWT.
    is:inline = Astro no lo procesa ni lo defer-ea.
  -->
  <script is:inline>
    (function () {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored ?? (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>

  <!-- SEO primario -->
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="Gadiel" />

  <!-- Open Graph (WhatsApp, LinkedIn y redes usan estos tags al compartir el link) -->
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

  <!--
    FUENTES: preconnect reduce el tiempo de DNS lookup a fonts.googleapis.com
    y fonts.gstatic.com. Debe ir antes del <link> de la hoja de estilos.
    display=swap → font-display: swap. Previene FOIT (Flash of Invisible Text).
    Estos tres weights de Geist son todos los que usa el design system (§5.2).
  -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&family=Geist+Mono:wght@400&family=Instrument+Serif:ital@0;1&display=swap"
    rel="stylesheet"
  />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!--
    global.css importa Tailwind v4 vía @import "tailwindcss" y define
    los tokens de @theme. Este link es procesado por Vite en dev y
    minificado + purgado en build de producción.
  -->
  <link rel="stylesheet" href="/src/styles/global.css" />
</head>

<body>
  <!--
    SKIP LINK: requerido por WCAG 2.1 §2.4.1 (RNF-09).
    Invisible hasta que recibe foco por teclado (Tab).
    Permite a usuarios de teclado y lectores de pantalla saltar la
    navegación repetitiva e ir directo al contenido principal.
    La clase focus:top-0 de Tailwind lo hace aparecer cuando está enfocado.
  -->
  <a
    href="#main-content"
    class="skip-link"
  >
    Saltar al contenido principal
  </a>

  <!--
    Los slots de Nav y Footer envuelven el contenido de cada página.
    slot="nav" y slot="footer" permiten que páginas específicas
    (ej: /infraestructura) usen un header diferente en el futuro.
    Por ahora usamos el layout sin named slots.
  -->
  <slot />
</body>
</html>
```

### 1.2 Agregar estilos del skip link en global.css

El skip link necesita estilos que no dependen de Tailwind para garantizar que funcione incluso si el CSS falla en cargar. Abre `src/styles/global.css` y agrega al final:

```css
/* ── Skip Link — accesibilidad [RNF-09] ──────────────────────────── */
/*
  El skip link es el primer elemento enfocable del DOM.
  En estado normal está fuera de la pantalla (no oculto con display:none
  porque eso lo elimina del flujo de teclado).
  Al recibir foco, aparece en la esquina superior izquierda.
*/
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  padding: var(--space-3) var(--space-6);
  background: var(--color-accent);
  color: white;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  z-index: 9999;
  border-radius: 0 0 var(--radius-md) 0;
  text-decoration: none;
  transition: top 150ms ease;
}

.skip-link:focus {
  top: 0;
}
```

---

## Tarea 2 — Componente Nav.astro

### Por qué este componente es crítico para el negocio

La navegación es lo primero que un PYME ve después del Hero. Tiene dos trabajos: llevar al usuario al contacto lo más rápido posible (WhatsApp / formulario), y en mobile ser completamente operable con el pulgar (elementos táctiles ≥ 44×44 px, HU-06).

Para el tech lead, la navegación debe mostrar el link a `/infraestructura` — eso señaliza de inmediato que hay contenido técnico profundo.

### 2.1 Crear `src/components/astro/Nav.astro`

La navegación es un componente Astro estático (zero JS). El único JavaScript es el del toggle de tema, que se maneja con un pequeño `<script>` inline al final del componente. No se usa Preact aquí porque no justifica el overhead — una operación de DOM tan simple se resuelve con vanilla JS.

```astro
---
// src/components/astro/Nav.astro
//
// Navegación principal del portafolio.
// Zero-JS excepto el toggle de tema (vanilla JS inline al final).
//
// Links de navegación: los anclas (#) llevan a secciones de la home.
// /infraestructura es una ruta de página completa (indexable por Google).
//
// Decisiones:
// - Logo = nombre completo en Instrument Serif. No un ícono anónimo.
// - Links en Geist 400. El peso visual pertenece al contenido, no a la nav.
// - El único CTA de color en la nav es "Contacto" con acento índigo.
//   Principio: una sola llamada a la acción por área visual.
// - Toggle de tema: ícono de sol/luna. Sin texto para ahorrar espacio en mobile.
// - Mobile: hamburger menu. El menú se expande hacia abajo ocupando el viewport.

const navLinks = [
  { href: '/#proyectos',      label: 'Proyectos' },
  { href: '/#servicios',      label: 'Servicios' },
  { href: '/infraestructura', label: 'Infraestructura' },
];

// Usamos Astro.url.pathname para marcar el link activo.
// En la home, todos los links ancla (#) se consideran "no activos"
// excepto cuando el usuario está en /infraestructura.
const currentPath = Astro.url.pathname;
---

<header class="nav-header" role="banner">
  <nav
    class="nav-inner container"
    aria-label="Navegación principal"
  >
    <!-- Logo / nombre -->
    <!--
      El logo es tu nombre. Esto cumple dos funciones:
      1. Brand recognition: el visitante sabe inmediatamente quién eres.
      2. SEO: el link del logo lleva a / y refuerza la URL canónica.
      Usa Instrument Serif para distinguirlo del cuerpo del texto (Geist).
    -->
    <a
      href="/"
      class="nav-logo"
      aria-label="Ir al inicio — Gadiel, desarrollador de software"
    >
      Gadiel
    </a>

    <!-- Links desktop: visibles en md+ -->
    <ul
      class="nav-links"
      role="list"
      aria-label="Links de navegación"
    >
      {navLinks.map(({ href, label }) => (
        <li>
          <a
            href={href}
            class={`nav-link ${currentPath === href ? 'nav-link--active' : ''}`}
            aria-current={currentPath === href ? 'page' : undefined}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>

    <!-- Acciones: toggle de tema + CTA de contacto -->
    <div class="nav-actions">
      <!--
        Toggle de tema: accesible por teclado, con aria-label dinámico.
        El label cambia con JS según el tema actual.
        El ícono de sol/luna se muestra mediante CSS pseudo-elementos
        para evitar hidratación de JavaScript.
      -->
      <button
        id="theme-toggle"
        class="theme-toggle"
        aria-label="Cambiar a modo claro"
        title="Cambiar tema"
        type="button"
      >
        <!-- Sol (modo claro) -->
        <svg
          class="icon-sun"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
        <!-- Luna (modo oscuro) -->
        <svg
          class="icon-moon"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>

      <!--
        CTA principal de la nav: lleva al formulario de contacto.
        Usa el color de acento índigo (--color-accent), no WhatsApp green.
        En mobile este botón se mantiene visible incluso con menú cerrado
        porque es la acción más importante de la nav.
      -->
      <a
        href="/#contacto"
        class="nav-cta"
        aria-label="Ir a la sección de contacto"
      >
        Contacto
      </a>

      <!--
        Hamburger: solo visible en mobile (< md).
        aria-expanded se actualiza con JS cuando el menú se abre/cierra.
        aria-controls apunta al id del menú móvil.
      -->
      <button
        id="mobile-menu-toggle"
        class="hamburger"
        aria-label="Abrir menú de navegación"
        aria-expanded="false"
        aria-controls="mobile-menu"
        type="button"
      >
        <span class="hamburger-line" aria-hidden="true"></span>
        <span class="hamburger-line" aria-hidden="true"></span>
        <span class="hamburger-line" aria-hidden="true"></span>
      </button>
    </div>
  </nav>

  <!-- Menú móvil: oculto por defecto, se activa con JS -->
  <!--
    Se usa aria-hidden="true" en estado cerrado para que lectores de
    pantalla no lean los links cuando el menú no está visible.
    El id="mobile-menu" conecta con aria-controls del hamburger.
  -->
  <div
    id="mobile-menu"
    class="mobile-menu"
    aria-hidden="true"
    role="dialog"
    aria-label="Menú de navegación móvil"
  >
    <ul role="list" class="mobile-menu-links">
      {navLinks.map(({ href, label }) => (
        <li>
          <a
            href={href}
            class="mobile-menu-link"
            aria-current={currentPath === href ? 'page' : undefined}
          >
            {label}
          </a>
        </li>
      ))}
      <!-- En mobile también se muestra el CTA dentro del menú -->
      <li>
        <a href="/#contacto" class="mobile-menu-link mobile-menu-link--cta">
          Contacto
        </a>
      </li>
    </ul>
  </div>
</header>

<!--
  Estilos escopados al componente Nav.
  Tailwind se usa para utilidades puntuales.
  Los estilos estructurales (layout de la nav) van en <style> para
  mantener la legibilidad y el aislamiento del componente.
-->
<style>
  /* ── Header ─────────────────────────────────────────────────────── */
  .nav-header {
    position: sticky;       /* Se queda en la parte superior al hacer scroll */
    top: 0;
    z-index: 40;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-bg-muted);
    /*
      backdrop-filter: blur() crea el efecto "frosted glass" de macOS.
      Solo funciona si el fondo tiene algo de transparencia.
      El efecto es sutil — no cambia la opacidad del texto.
    */
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  /* ── Fila interior de la nav ─────────────────────────────────────── */
  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;           /* Altura fija. El contenido no desplaza el layout. */
  }

  /* ── Logo ────────────────────────────────────────────────────────── */
  .nav-logo {
    font-family: var(--font-display);   /* Instrument Serif */
    font-size: var(--text-xl);          /* 20px */
    font-weight: 400;
    color: var(--color-text-primary);
    text-decoration: none;
    letter-spacing: -0.01em;
    transition: opacity 150ms ease;
    flex-shrink: 0;                     /* No se comprime en pantallas pequeñas */
  }

  .nav-logo:hover {
    opacity: 0.75;
  }

  /* ── Links desktop ───────────────────────────────────────────────── */
  .nav-links {
    display: none;          /* Oculto en mobile */
    list-style: none;
    gap: var(--space-8);
    align-items: center;
  }

  @media (min-width: 768px) {
    .nav-links {
      display: flex;
    }
  }

  .nav-link {
    font-family: var(--font-body);      /* Geist */
    font-size: var(--text-sm);          /* 14px */
    font-weight: 400;
    color: var(--color-text-secondary);
    text-decoration: none;
    padding: var(--space-2) 0;
    position: relative;
    transition: color 150ms ease;
  }

  /* Subrayado animado en hover — reemplaza el subrayado nativo */
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--color-accent);
    transition: width 200ms ease;
  }

  .nav-link:hover {
    color: var(--color-text-primary);
  }

  .nav-link:hover::after,
  .nav-link--active::after {
    width: 100%;
  }

  .nav-link--active {
    color: var(--color-text-primary);
  }

  /* ── Acciones (toggle + CTA) ─────────────────────────────────────── */
  .nav-actions {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  /* ── Toggle de tema ──────────────────────────────────────────────── */
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--color-bg-muted);
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: color 150ms ease, border-color 150ms ease;
    flex-shrink: 0;
  }

  .theme-toggle:hover {
    color: var(--color-text-primary);
    border-color: var(--color-text-muted);
  }

  /*
    Control de visibilidad de íconos según el tema activo.
    El script de detección de tema en Layout.astro pone data-theme="dark"
    o data-theme="light" en el <html>. Estos selectores leen ese atributo.
  */
  [data-theme="dark"] .icon-moon {
    display: none;          /* En modo oscuro: muestra el sol (para cambiar a claro) */
  }

  [data-theme="light"] .icon-sun {
    display: none;          /* En modo claro: muestra la luna (para cambiar a oscuro) */
  }

  /* ── CTA de contacto ─────────────────────────────────────────────── */
  .nav-cta {
    display: inline-flex;
    align-items: center;
    padding: var(--space-2) var(--space-4);
    background: var(--color-accent);
    color: white;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 500;
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: background 150ms ease;
    /*
      min-height: 36px garantiza área táctil suficiente.
      WCAG 2.5.5 recomienda 44px pero 36px en desktop es aceptable
      ya que el usuario tiene cursor, no dedo.
    */
    min-height: 36px;
  }

  .nav-cta:hover {
    background: var(--color-accent-hover);
  }

  /* ── Hamburger (mobile) ──────────────────────────────────────────── */
  .hamburger {
    display: flex;          /* Visible solo en mobile */
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 44px;            /* Mínimo táctil HU-06: ≥ 44×44 px */
    height: 44px;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: var(--space-2);
    border-radius: var(--radius-md);
    transition: background 150ms ease;
  }

  .hamburger:hover {
    background: var(--color-bg-subtle);
  }

  @media (min-width: 768px) {
    .hamburger {
      display: none;
    }
  }

  .hamburger-line {
    display: block;
    width: 22px;
    height: 1.5px;
    background: var(--color-text-primary);
    border-radius: 2px;
    transition: transform 200ms ease, opacity 200ms ease;
    transform-origin: center;
  }

  /* Animación hamburger → X cuando el menú está abierto */
  .hamburger[aria-expanded="true"] .hamburger-line:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }

  .hamburger[aria-expanded="true"] .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .hamburger[aria-expanded="true"] .hamburger-line:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }

  /* ── Menú móvil ──────────────────────────────────────────────────── */
  .mobile-menu {
    display: none;
    border-top: 1px solid var(--color-bg-muted);
    background: var(--color-bg);
    padding: var(--space-4) 0 var(--space-6);
  }

  /*
    El menú se activa con la clase .mobile-menu--open que agrega JS.
    No usamos visibility ni opacity para que el browser pueda
    optimizar el repaint correctamente.
  */
  .mobile-menu.mobile-menu--open {
    display: block;
  }

  @media (min-width: 768px) {
    .mobile-menu {
      display: none !important;   /* Siempre oculto en desktop */
    }
  }

  .mobile-menu-links {
    list-style: none;
    display: flex;
    flex-direction: column;
  }

  .mobile-menu-link {
    display: block;
    padding: var(--space-4) var(--space-6);
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    text-decoration: none;
    border-bottom: 1px solid var(--color-bg-muted);
    min-height: 48px;           /* Área táctil HU-06: ≥ 44px (usamos 48 para holgura) */
    display: flex;
    align-items: center;
    transition: color 150ms ease, background 150ms ease;
  }

  .mobile-menu-link:hover {
    color: var(--color-text-primary);
    background: var(--color-bg-subtle);
  }

  /* El CTA dentro del menú mobile tiene acento */
  .mobile-menu-link--cta {
    color: var(--color-accent);
    font-weight: 500;
  }

  .mobile-menu-link--cta:hover {
    color: var(--color-accent-hover);
  }
</style>

<!--
  JavaScript del componente Nav.
  Se encarga de:
  1. Toggle del menú móvil (hamburger)
  2. Cerrar el menú al hacer clic en un link (navegación one-page)
  3. Toggle de tema (dark/light)

  No se usa Preact porque la lógica es trivial — 3 operaciones de DOM.
  Agregar una isla de Preact aquí aumentaría el JS bundle en ~3 KB sin
  ningún beneficio real.
-->
<script>
  // ── Toggle de menú móvil ──────────────────────────────────────────
  const hamburger = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    const nextState = !isOpen;

    hamburger.setAttribute('aria-expanded', String(nextState));
    hamburger.setAttribute(
      'aria-label',
      nextState ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );
    mobileMenu?.setAttribute('aria-hidden', String(!nextState));
    mobileMenu?.classList.toggle('mobile-menu--open', nextState);
  });

  // Cerrar el menú al hacer clic en cualquier link del menú móvil.
  // En un sitio one-page esto es crítico: el ancla cambia el hash
  // pero el menú quedaría abierto tapando el contenido.
  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger?.setAttribute('aria-expanded', 'false');
      hamburger?.setAttribute('aria-label', 'Abrir menú de navegación');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.classList.remove('mobile-menu--open');
    });
  });

  // ── Toggle de tema ────────────────────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    themeToggle.setAttribute(
      'aria-label',
      next === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
  });

  // Sincronizar el aria-label con el tema que cargó el script inline de Layout.
  // Esto corre después del render, cuando el DOM está disponible.
  const initialTheme = document.documentElement.getAttribute('data-theme');
  if (themeToggle && initialTheme) {
    themeToggle.setAttribute(
      'aria-label',
      initialTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
  }
</script>
```

---

## Tarea 3 — Componente Footer.astro

### Por qué el footer cumple RF-03 de forma obligatoria

RF-03 exige que GitHub, LinkedIn y correo de contacto sean verificables y abran en nueva pestaña. El footer es el lugar canónico para estos links. El tech lead que termina de revisar la sección de Infraestructura busca el GitHub instintivamente en el footer.

### 3.1 Crear `src/components/astro/Footer.astro`

```astro
---
// src/components/astro/Footer.astro
//
// Footer del portafolio. Cubre RF-03 (links externos verificables).
//
// Contenido:
// - Copyright + año dinámico
// - Links a GitHub, LinkedIn, correo electrónico
// - Link a /infraestructura (para el tech lead que llegue desde el footer)
// - Nota de stack tecnológico (señal de credibilidad técnica)
//
// PERSONALIZAR: reemplaza los placeholders de GitHub, LinkedIn y email.

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    href: 'https://github.com/TU-USUARIO-GITHUB',   // ← REEMPLAZAR
    label: 'GitHub',
    ariaLabel: 'Ver perfil de GitHub de Gadiel (abre en nueva pestaña)',
    // Ícono SVG de GitHub
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  },
  {
    href: 'https://linkedin.com/in/TU-USUARIO-LINKEDIN', // ← REEMPLAZAR
    label: 'LinkedIn',
    ariaLabel: 'Ver perfil de LinkedIn de Gadiel (abre en nueva pestaña)',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  },
  {
    href: 'mailto:tu@correo.com',  // ← REEMPLAZAR
    label: 'Email',
    ariaLabel: 'Enviar correo a Gadiel',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  },
];
---

<footer class="site-footer" role="contentinfo">
  <div class="footer-inner container">
    <!-- Columna izquierda: identidad + descripción corta -->
    <div class="footer-brand">
      <a href="/" class="footer-logo" aria-label="Ir al inicio">
        Gadiel
      </a>
      <p class="footer-tagline">
        Desarrollador de Software · UADY · TIDE Fellows
      </p>
      <!--
        El stack técnico en el footer es una señal sutil para el tech lead.
        No es texto de marketing, es metadata técnica.
      -->
      <p class="footer-stack">
        Construido con Astro · Tailwind v4 · Desplegado en VPS con Nginx
      </p>
    </div>

    <!-- Columna derecha: links -->
    <div class="footer-links">
      <!-- Links sociales (RF-03) -->
      <div class="footer-social">
        <span class="footer-section-label">Contacto</span>
        <ul role="list" class="social-list">
          {socialLinks.map(({ href, label, ariaLabel, icon }) => (
            <li>
              <a
                href={href}
                class="social-link"
                aria-label={ariaLabel}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              >
                <span set:html={icon} />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <!-- Links del sitio -->
      <div class="footer-nav">
        <span class="footer-section-label">Sitio</span>
        <ul role="list" class="footer-nav-list">
          <li><a href="/#proyectos" class="footer-nav-link">Proyectos</a></li>
          <li><a href="/#servicios" class="footer-nav-link">Servicios</a></li>
          <li><a href="/#sobre-mi" class="footer-nav-link">Sobre mí</a></li>
          <li><a href="/infraestructura" class="footer-nav-link">Infraestructura</a></li>
          <li><a href="/#contacto" class="footer-nav-link">Contacto</a></li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Barra de copyright -->
  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <p class="footer-copyright">
        © {currentYear} Gadiel. Hecho en Mérida, México.
      </p>
      <p class="footer-legal">
        Código disponible en <a href="https://github.com/TU-USUARIO-GITHUB/portafolio" target="_blank" rel="noopener noreferrer" class="footer-code-link">GitHub</a>
      </p>
    </div>
  </div>
</footer>

<style>
  /* ── Footer principal ─────────────────────────────────────────────── */
  .site-footer {
    border-top: 1px solid var(--color-bg-muted);
    background: var(--color-bg-subtle);
    padding-top: var(--space-16);
  }

  /* ── Layout interno ───────────────────────────────────────────────── */
  .footer-inner {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    padding-bottom: var(--space-12);
  }

  @media (min-width: 768px) {
    .footer-inner {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }
  }

  /* ── Marca ────────────────────────────────────────────────────────── */
  .footer-logo {
    display: inline-block;
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    color: var(--color-text-primary);
    text-decoration: none;
    margin-bottom: var(--space-3);
    transition: opacity 150ms ease;
  }

  .footer-logo:hover {
    opacity: 0.75;
  }

  .footer-tagline {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-2);
    max-width: 100%;
  }

  .footer-stack {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }

  /* ── Links ────────────────────────────────────────────────────────── */
  .footer-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }

  .footer-section-label {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: var(--space-4);
  }

  .social-list,
  .footer-nav-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 150ms ease;
    min-height: 32px;         /* Área táctil adecuada */
  }

  .social-link:hover {
    color: var(--color-accent);
  }

  .footer-nav-link {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 150ms ease;
    display: inline-block;
    min-height: 32px;
    line-height: 32px;
  }

  .footer-nav-link:hover {
    color: var(--color-text-primary);
  }

  /* ── Barra de copyright ───────────────────────────────────────────── */
  .footer-bottom {
    border-top: 1px solid var(--color-bg-muted);
    padding: var(--space-6) 0;
  }

  .footer-bottom-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-4);
  }

  .footer-copyright,
  .footer-legal {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }

  .footer-code-link {
    color: var(--color-accent);
    text-decoration: none;
  }

  .footer-code-link:hover {
    text-decoration: underline;
  }
</style>
```

---

## Tarea 4 — Hero section en `index.astro`

### Por qué el Hero es la decisión de diseño más crítica del portafolio

HU-01 lo define con precisión: el dueño de una PYME debe entender quién eres, qué haces y para quién en menos de 10 segundos. Ningún elemento debajo del fold importa si el Hero falla en esa prueba.

**El test de los 5 segundos:** muéstrale el Hero a alguien que no sabe de tecnología y pregúntale qué hace el desarrollador del sitio. Si no puede responderlo, el copy falló, no el diseño.

**RF-01 en detalle:** nombre + título profesional + propuesta de valor en ≤ 20 palabras orientada a PYMES. Verifica que tu copy cumpla esto exactamente antes de escribir el código.

**Estructura del Hero (Fase 2 §1.2, Flujo A):** el CTA más visible debe llevar al canal de conversión más rápido. Para el mercado de Mérida eso es WhatsApp (RF-12, HU-03). El CTA secundario lleva a los proyectos.

### 4.1 Actualizar `src/pages/index.astro`

```astro
---
// src/pages/index.astro
//
// Página principal del portafolio. Estructura one-page con anclas.
//
// Este archivo solo orquesta las secciones. La lógica y los estilos
// de cada sección viven en sus componentes respectivos.
//
// Sprint 1: Hero + Nav + Footer + WhatsApp button.
// Sprints 2-4: secciones #sobre-mi, #servicios, #proyectos, #contacto.

import Layout from '../layouts/Layout.astro';
import Nav from '../components/astro/Nav.astro';
import Footer from '../components/astro/Footer.astro';
import Hero from '../components/astro/Hero.astro';
import WhatsAppButton from '../components/islands/WhatsAppButton.tsx';
---

<Layout
  title="Home"
  description="Gadiel — Desarrollador de Software especializado en soluciones web para PYMES en Mérida. Estudiante de Ingeniería de Software en UADY, becario TIDE Fellows."
>
  <!-- Navegación sticky en la parte superior -->
  <Nav />

  <!-- Contenido principal — el id="main-content" conecta con el skip link -->
  <main id="main-content">

    <!-- ── HERO (Sprint 1) ──────────────────────────────────────────── -->
    <Hero />

    <!-- ── SOBRE MÍ (Sprint 2) ─────────────────────────────────────── -->
    <!--
      Placeholder visual para confirmar que el layout funciona.
      Se reemplaza con el componente real en Sprint 2.
    -->
    <section id="sobre-mi" style="min-height: 200px; padding: var(--space-24) 0; border-top: 1px solid var(--color-bg-muted);">
      <div class="container">
        <p style="color: var(--color-text-muted); font-family: var(--font-mono); font-size: var(--text-sm);">// Sprint 2 → Sección Sobre mí</p>
      </div>
    </section>

    <!-- ── SERVICIOS (Sprint 2) ─────────────────────────────────────── -->
    <section id="servicios" style="min-height: 200px; padding: var(--space-24) 0; border-top: 1px solid var(--color-bg-muted);">
      <div class="container">
        <p style="color: var(--color-text-muted); font-family: var(--font-mono); font-size: var(--text-sm);">// Sprint 2 → Sección Servicios</p>
      </div>
    </section>

    <!-- ── PROYECTOS (Sprint 2-3) ───────────────────────────────────── -->
    <section id="proyectos" style="min-height: 200px; padding: var(--space-24) 0; border-top: 1px solid var(--color-bg-muted);">
      <div class="container">
        <p style="color: var(--color-text-muted); font-family: var(--font-mono); font-size: var(--text-sm);">// Sprint 2-3 → Sección Proyectos</p>
      </div>
    </section>

    <!-- ── CONTACTO (Sprint 4) ──────────────────────────────────────── -->
    <section id="contacto" style="min-height: 200px; padding: var(--space-24) 0; border-top: 1px solid var(--color-bg-muted);">
      <div class="container">
        <p style="color: var(--color-text-muted); font-family: var(--font-mono); font-size: var(--text-sm);">// Sprint 4 → Módulo de Contacto</p>
      </div>
    </section>

  </main>

  <!-- Footer con links sociales (RF-03) -->
  <Footer />

  <!--
    Botón flotante de WhatsApp.
    client:load → se hidrata inmediatamente al cargar la página.
    Justificación: el botón debe estar disponible desde el frame 0,
    antes de que el usuario haga scroll (HU-03, HU-06, RF-12).
    Ver ADR-04 en Fase 2 para la tabla completa de directivas de hidratación.
  -->
  <WhatsAppButton client:load />
</Layout>
```

---

## Tarea 5 — Componente Hero.astro

### 5.1 Crear `src/components/astro/Hero.astro`

```astro
---
// src/components/astro/Hero.astro
//
// Sección Hero — primera impresión del portafolio.
//
// Cumple: RF-01 (nombre + título + propuesta de valor ≤ 20 palabras)
//         HU-01 (comprensible en < 10 segundos para dueño de PYME)
//         RNF-01 (visible above-the-fold sin scroll en 375px y 1280px)
//
// Jerarquía visual:
// 1. Eyebrow (badge): contexto de credibilidad sin leer el título
// 2. H1 (Instrument Serif): propuesta de valor directa para PYME
// 3. Párrafo: credenciales técnicas en lenguaje humano
// 4. CTAs: WhatsApp primario, Proyectos secundario
// 5. Stack badges: señal para el tech lead (no para el PYME)
//
// IMPORTANTE: el H1 NO empieza con "Hola, soy Gadiel".
// Ese patrón es genérico y pierde los primeros 4 palabras en información
// que el visitante ya sabe (está en tu portafolio, sabe que eres tú).
// El H1 debe responder: ¿qué problema resuelves?
//
// PERSONALIZAR: edita las variables al inicio del frontmatter.

// ── Variables de personalización ────────────────────────────────────
// Edita estos valores. No modifiques el markup.

const NAME = 'Gadiel';
const ROLE = 'Desarrollador de Software';

// Propuesta de valor: ≤ 20 palabras, orientada a PYMES, sin jerga técnica.
// Test: un dueño de taquería debe entenderlo en 5 segundos.
const VALUE_PROP = 'Soluciones web que hacen crecer tu negocio, sin complicaciones técnicas.';

// Descripción corta: credenciales + diferenciador técnico en lenguaje humano.
// Este párrafo es para el PYME que quiere saber "¿por qué tú?".
const DESCRIPTION = `Estudiante de Ingeniería de Software en la UADY y becario TIDE Fellows.
Construyo sitios web y sistemas a medida para pequeñas y medianas empresas en Mérida y el sureste de México.`;

// Stack: para el tech lead. Máximo 6 tecnologías.
const STACK = ['C / C++', 'Astro', 'Tailwind', 'Linux', 'Nginx', 'Git'];

// WhatsApp: número con código de país + mensaje predefinido (RF-12)
// El mensaje se codifica con encodeURIComponent para URL correcta.
const WHATSAPP_NUMBER = '521XXXXXXXXXX'; // ← REEMPLAZAR con tu número real
const WHATSAPP_MESSAGE = `Hola ${NAME}, vi tu portafolio y me interesa cotizar un proyecto para mi empresa.`;
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
---

<!--
  section role="region" + aria-labelledby conecta el landmark con su heading.
  Los lectores de pantalla anuncian: "Región: presentación" al entrar.
-->
<section
  id="hero"
  role="region"
  aria-labelledby="hero-heading"
  class="hero-section"
>
  <div class="container hero-inner">

    <!--
      Eyebrow badge: contexto de credibilidad antes del título principal.
      "UADY · TIDE Fellows · Mérida, MX" establece legitimidad institucional
      sin requerir que el visitante lea el párrafo completo.
      Para el PYME local de Mérida, UADY es una señal de confianza inmediata.
    -->
    <div class="hero-eyebrow" aria-label="Credenciales">
      <span class="eyebrow-badge">
        <!-- Punto de estatus -->
        <span class="status-dot" aria-hidden="true"></span>
        UADY · TIDE Fellows · Mérida, MX
      </span>
    </div>

    <!--
      H1: la propuesta de valor.
      Instrument Serif — el contraste con el cuerpo Geist crea el efecto
      "editorial + técnico" que define la identidad visual del portafolio.
      font-size: text-4xl en mobile, text-6xl en desktop.
      No uses font-weight alto — Instrument Serif es elegante en 400.
    -->
    <h1 id="hero-heading" class="hero-title">
      {VALUE_PROP}
    </h1>

    <!--
      Párrafo de descripción.
      Geist, text-lg, color-text-secondary.
      No compite visualmente con el H1. Es información de soporte.
    -->
    <p class="hero-description">
      {DESCRIPTION}
    </p>

    <!--
      CTAs: dos opciones, jerarquía clara.
      Primario: WhatsApp (canal de conversión más rápido para PYME en Mérida).
      Secundario: Ver proyectos (para quien quiere evaluar antes de contactar).
      El verde de WhatsApp SOLO aquí y en el botón flotante (MOD-02).
    -->
    <div class="hero-ctas" role="group" aria-label="Acciones principales">
      <a
        href={WHATSAPP_URL}
        class="btn-whatsapp-hero"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contactar a ${NAME} por WhatsApp (abre WhatsApp en nueva pestaña)`}
      >
        <!--
          Ícono de WhatsApp inline SVG.
          No se usa una librería de íconos para no agregar dependencias.
          El SVG es aria-hidden porque el texto del botón ya describe la acción.
        -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        Escríbeme por WhatsApp
      </a>

      <a
        href="/#proyectos"
        class="btn-secondary"
        aria-label="Ver proyectos de Gadiel"
      >
        Ver proyectos
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>

    <!--
      Stack de tecnologías.
      Para el tech lead que llega desde GitHub o LinkedIn.
      El PYME lo ve como "badges de credibilidad" sin leer el texto.
      Posicionado debajo de los CTAs para no competir con la propuesta de valor.
    -->
    <div class="hero-stack" aria-label="Tecnologías">
      <span class="stack-label">Stack</span>
      <ul role="list" class="stack-list">
        {STACK.map((tech) => (
          <li class="stack-badge">{tech}</li>
        ))}
      </ul>
    </div>

  </div>
</section>

<style>
  /* ── Sección ──────────────────────────────────────────────────────── */
  .hero-section {
    /*
      min-height: 100svh usa "small viewport height" — en mobile descuenta
      la barra del navegador. Garantiza que el Hero sea visible above-the-fold
      en iOS Safari y Chrome Android (RNF-01, HU-06).
      El fallback 100vh cubre browsers sin soporte a svh.
    */
    min-height: 100vh;
    min-height: 100svh;
    display: flex;
    align-items: center;
    padding: var(--space-16) 0;
    /*
      Padding-top extra en mobile para compensar la nav sticky (60px).
      Sin esto el H1 queda pegado a la nav.
    */
    padding-top: calc(60px + var(--space-12));
  }

  /* ── Layout interno ───────────────────────────────────────────────── */
  .hero-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;   /* Alineación izquierda — más formal que centrado */
    gap: var(--space-8);
    max-width: var(--container-prose);  /* 720px: Hero no debe ser full-width */
  }

  /* ── Eyebrow ──────────────────────────────────────────────────────── */
  .hero-eyebrow {
    display: flex;
    align-items: center;
  }

  .eyebrow-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-1) var(--space-3);
    background: var(--color-bg-subtle);
    border: 1px solid var(--color-bg-muted);
    border-radius: var(--radius-full);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--color-text-secondary);
    letter-spacing: 0.04em;
  }

  /*
    El punto de estatus es un indicador visual de que el desarrollador
    está disponible para proyectos. Simple pero efectivo.
    Color verde semántico (--color-success), no el verde de WhatsApp.
  */
  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-success);
    /*
      Animación de pulso sutil — comunica "activo/disponible".
      Solo en dispositivos sin prefers-reduced-motion.
    */
    animation: pulse 2s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .status-dot {
      animation: none;
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.85); }
  }

  /* ── H1 ───────────────────────────────────────────────────────────── */
  .hero-title {
    font-family: var(--font-display);   /* Instrument Serif */
    font-size: var(--text-4xl);         /* 36px mobile */
    font-weight: 400;
    line-height: 1.15;
    color: var(--color-text-primary);
    letter-spacing: -0.02em;           /* Tracking negativo — se ve más refinado */
    /*
      max-width evita líneas de más de 12 palabras que son difíciles de leer.
      En tipografía, la medida ideal de línea es 45-75 caracteres.
    */
    max-width: 18ch;
  }

  @media (min-width: 768px) {
    .hero-title {
      font-size: var(--text-6xl);       /* 60px desktop */
      max-width: 16ch;
    }
  }

  /* ── Descripción ──────────────────────────────────────────────────── */
  .hero-description {
    font-family: var(--font-body);
    font-size: var(--text-lg);          /* 18px */
    line-height: 1.7;
    color: var(--color-text-secondary);
    max-width: 52ch;                   /* ~8 palabras por línea */
  }

  /* ── CTAs ─────────────────────────────────────────────────────────── */
  .hero-ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    align-items: center;
  }

  /* Botón primario WhatsApp */
  .btn-whatsapp-hero {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    background: var(--color-whatsapp);        /* #25D366 — SOLO aquí y en el flotante */
    color: white;
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: 500;
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: background 150ms ease, transform 100ms ease;
    min-height: 48px;                         /* Área táctil HU-06 */
    white-space: nowrap;
  }

  .btn-whatsapp-hero:hover {
    background: var(--color-whatsapp-hover);
  }

  .btn-whatsapp-hero:active {
    transform: scale(0.98);
  }

  /* Botón secundario — outline estilo */
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    border: 1px solid var(--color-bg-muted);
    color: var(--color-text-primary);
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: 400;
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: border-color 150ms ease, background 150ms ease;
    min-height: 48px;
    white-space: nowrap;
  }

  .btn-secondary:hover {
    border-color: var(--color-text-muted);
    background: var(--color-bg-subtle);
  }

  /* ── Stack badges ─────────────────────────────────────────────────── */
  .hero-stack {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-wrap: wrap;
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-bg-muted);
    width: 100%;
  }

  .stack-label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }

  .stack-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .stack-badge {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--color-accent-text);
    background: var(--color-accent-subtle);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
    white-space: nowrap;
  }
</style>
```

---

## Tarea 6 — Componente WhatsAppButton.tsx (isla Preact)

### Por qué es una isla Preact y no un componente Astro

El botón flotante necesita detectar si el usuario está en mobile o desktop para mostrarse u ocultarse (`client:load`). Aunque podría resolverse con CSS puro (y es la mejor opción en términos de performance), usar Preact aquí nos da un patrón que podemos reutilizar en el Sprint 4 cuando el formulario de contacto también necesite estado.

En este sprint el componente es deliberadamente simple — solo renderiza el botón con la lógica de visibilidad via CSS.

### 6.1 Crear `src/components/islands/WhatsAppButton.tsx`

```tsx
// src/components/islands/WhatsAppButton.tsx
//
// Botón flotante de WhatsApp. Isla Preact hidratada con client:load.
//
// Cumple: RF-12, HU-03, HU-06
//
// Visible: siempre en mobile (< 1024px)
// Oculto: en desktop (≥ 1024px) — en desktop el botón de WA está en #contacto
//
// El CSS de visibilidad se maneja con @media en <style> para que funcione
// incluso antes de que Preact hidrate el componente (evita layout shift).
//
// PERSONALIZAR: modifica WHATSAPP_NUMBER y el mensaje.

const WHATSAPP_NUMBER = '521XXXXXXXXXX'; // ← REEMPLAZAR
const WHATSAPP_MESSAGE = 'Hola Gadiel, vi tu portafolio y me interesa cotizar un proyecto para mi empresa.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function WhatsAppButton() {
  return (
    <>
      {/*
        El <style> dentro de una isla Preact se inyecta en el <head>.
        En Astro + Vite esto funciona correctamente.
        La alternativa es global.css, pero mantener los estilos del componente
        junto al componente mejora la mantenibilidad.
      */}
      <style>{`
        .whatsapp-float {
          /* Posición fija — visible en cualquier punto del scroll */
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 50;

          /* Dimensiones — área táctil mínima HU-06: ≥ 44×44px */
          width: 56px;
          height: 56px;
          border-radius: 9999px;

          /* Color funcional WhatsApp [MOD-02] */
          background: #25D366;
          color: white;
          border: none;

          /* Layout interno */
          display: flex;
          align-items: center;
          justify-content: center;

          /* Interacciones */
          cursor: pointer;
          text-decoration: none;
          transition: background 150ms ease, transform 150ms ease;

          /*
            Sombra con tono verde — la sombra refuerza el color funcional
            y hace que el botón sea legible sobre cualquier fondo.
          */
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        }

        .whatsapp-float:hover {
          background: #1DAA52;
          transform: scale(1.05);
        }

        .whatsapp-float:active {
          transform: scale(0.95);
        }

        /*
          En desktop (≥ 1024px) el botón flotante desaparece.
          El botón de WhatsApp en el módulo de contacto (#contacto) lo reemplaza.
          Ocultar con display:none es correcto aquí porque el botón de contacto
          en la sección #contacto TAMBIÉN estará disponible en desktop.
        */
        @media (min-width: 1024px) {
          .whatsapp-float {
            display: none;
          }
        }

        /* Tooltip que aparece al hover en desktop
           (aunque el botón está oculto, por si se muestra en algún breakpoint intermedio) */
        .whatsapp-float::before {
          content: 'WhatsApp';
          position: absolute;
          right: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          background: #1C1C1E;
          color: white;
          font-family: system-ui, sans-serif;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 6px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 150ms ease;
        }

        .whatsapp-float:hover::before {
          opacity: 1;
        }
      `}</style>

      <a
        href={WHATSAPP_URL}
        class="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        /*
          aria-label descriptivo — lectores de pantalla anuncian la acción completa.
          No uses solo "WhatsApp" como label — describe la acción.
        */
        aria-label="Contactar por WhatsApp (abre en nueva pestaña)"
        title="Contactar por WhatsApp"
      >
        {/* Ícono de WhatsApp — aria-hidden porque el aria-label del <a> lo cubre */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </>
  );
}
```

---

## Tarea 7 — Favicon

Un favicon ausente genera un error 404 en cada carga de página que afecta el score de Lighthouse. Crea `public/favicon.svg` con un favicon minimalista:

```svg
<!-- public/favicon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#1D4ED8"/>
  <text
    x="16"
    y="22"
    font-family="Georgia, serif"
    font-size="18"
    font-weight="400"
    fill="white"
    text-anchor="middle"
  >G</text>
</svg>
```

> Este favicon usa tu inicial en Instrument Serif (aproximado con Georgia). Lo reemplazarás en Sprint 7 con uno generado correctamente. Por ahora elimina el 404.

---

## Tarea 8 — Verificación del sprint

Ejecuta estos comandos en orden. Cada uno tiene un resultado esperado claro.

### 8.1 Verificación en desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Verificar en el navegador:
# 1. http://localhost:4321 — la página carga sin errores de consola
# 2. DevTools > Console: sin errores rojos (solo warnings son aceptables)
# 3. DevTools > Network: no hay requests fallidos (404, etc.)
```

### 8.2 Verificación de TypeScript

```bash
npx astro check
# Resultado esperado: "No errors found"
# Si hay errores: son bloquantes. Corregir antes de continuar.
```

### 8.3 Verificación de build de producción

```bash
npm run build
# Debe completar sin errores.
# Ignorar los warnings de "stylesheets" — son informativos.

# Inspeccionar el output:
ls -lh dist/
# Debe existir: index.html, _astro/ (con CSS y JS), favicon.svg

# Verificar el tamaño del bundle CSS:
ls -lh dist/_astro/*.css
# Debe ser < 15 KB (Tailwind v4 auto-purga clases no usadas)
```

### 8.4 Verificación de accesibilidad

```bash
# Preview del build de producción
npm run preview

# Abrir http://localhost:4321 y ejecutar Lighthouse:
# DevTools → Lighthouse → Accessibility
# Score esperado: ≥ 95
#
# Si el score es menor, los errores más comunes en este sprint son:
# - aria-label faltante en algún botón
# - contraste insuficiente (verificar en modo claro)
# - heading hierarchy incorrecta (H1 → H2 → H3, sin saltos)
```

### 8.5 Verificación de contraste [RNF-08]

Verifica manualmente en DevTools el contraste de los colores más críticos:

| Elemento | Foreground | Background | Ratio mínimo WCAG AA |
|---|---|---|---|
| Texto primario (dark) | `#FAFAFA` | `#09090B` | 21:1 ✓ |
| Texto secundario (dark) | `#A1A1AA` | `#09090B` | 4.7:1 ✓ |
| CTA WhatsApp | `#FFFFFF` | `#25D366` | 2.9:1 ⚠️ |
| Texto sobre accent-subtle | `#1E40AF` | `#DBEAFE` | 5.1:1 ✓ |

> El CTA de WhatsApp tiene ratio 2.9:1, que no cumple WCAG AA para texto normal. Es un trade-off conocido con el verde de WhatsApp — la marca lo exige. Para mitigarlo, el texto del botón está en `font-weight: 500` lo que mejora la legibilidad perceptual aunque no el ratio calculado. Documenta este trade-off en el código con un comentario.

### 8.6 Verificación mobile (HU-06)

```bash
# En Chrome DevTools:
# 1. Abrir http://localhost:4321
# 2. Toggle Device Toolbar (Ctrl+Shift+M)
# 3. Seleccionar "iPhone SE" (375px)
# Verificar:
# [ ] Hero es visible completo above-the-fold (sin scroll)
# [ ] Botón de WhatsApp flotante visible en la esquina inferior derecha
# [ ] Hamburger menu funciona y abre/cierra
# [ ] Links del menú mobile tienen altura ≥ 44px
# [ ] No hay scroll horizontal en ninguna sección
```

---

## Checklist de cierre del Sprint 1

```
Layout
  [ ] Script de tema en <head>, antes del CSS — sin FOWT verificado
  [ ] Meta tags Open Graph completos (verificar con: https://metatags.io)
  [ ] Skip link funciona al presionar Tab como primera acción en la página
  [ ] Favicon carga sin 404 en DevTools > Network

Navegación
  [ ] Nav es sticky y permanece visible al hacer scroll
  [ ] Hamburger abre y cierra el menú mobile
  [ ] Al hacer clic en un link del menú mobile, el menú se cierra
  [ ] Toggle de tema funciona y persiste entre recargas (localStorage)
  [ ] Todos los links de la nav tienen mínimo 36px de área táctil (desktop)
  [ ] Todos los links del menú mobile tienen mínimo 44px de área táctil (HU-06)
  [ ] El link activo de /infraestructura muestra aria-current="page"

Hero (RF-01)
  [ ] H1 es visible above-the-fold en 375px (iPhone SE) sin scroll
  [ ] H1 es visible above-the-fold en 1280px (desktop) sin scroll
  [ ] La propuesta de valor tiene ≤ 20 palabras
  [ ] Test de los 5 segundos superado con una persona no técnica
  [ ] Botón de WhatsApp del Hero abre wa.me con mensaje predefinido correcto
  [ ] El encoding del mensaje URL no tiene caracteres mal formateados
  [ ] El número de WhatsApp incluye código de país +52

Footer (RF-03)
  [ ] Link a GitHub abre en nueva pestaña con rel="noopener noreferrer"
  [ ] Link a LinkedIn abre en nueva pestaña con rel="noopener noreferrer"
  [ ] Link de email abre el cliente de correo (mailto:)
  [ ] Los 3 links llevan a URLs reales (no placeholders)

WhatsApp flotante (RF-12, HU-03, HU-06)
  [ ] Botón visible en mobile (375px) sin hacer scroll
  [ ] Botón oculto en desktop (≥ 1024px)
  [ ] Área táctil ≥ 44×44 px (actualmente 56×56 px ✓)
  [ ] El link abre WhatsApp con mensaje predefinido correcto
  [ ] El botón tiene aria-label descriptivo

Rendimiento (pre-validación — validación completa en Sprint 7)
  [ ] npm run build completa sin errores
  [ ] Bundle CSS < 15 KB
  [ ] Sin requests 404 en DevTools > Network

Accesibilidad (RNF-08, RNF-09, RNF-12)
  [ ] Lighthouse Accessibility ≥ 95
  [ ] Tab navigation funciona en todo el sitio en orden lógico
  [ ] Todos los botones e imágenes tienen aria-label o alt descriptivos
  [ ] npx astro check sin errores de tipos
```

---

## Qué viene en el Sprint 2

El Sprint 2 cubre las secciones `#sobre-mi`, `#servicios` y las tarjetas de proyectos (vista general con filtros). Los placeholders de `index.astro` se reemplazarán con componentes reales. También se escriben los 4 primeros archivos `.mdx` en `src/content/projects/`.

Antes de iniciar el Sprint 2, reemplaza los 3 placeholders que dejaste en `index.astro` y los valores `TU-USUARIO-GITHUB`, `TU-USUARIO-LINKEDIN`, `tu@correo.com` y `521XXXXXXXXXX` con datos reales.

---

*Sprint 1 — Front-End Core & Hero Section*
*Referencia: Fase 1 v1.1 · Fase 2 v1.0 · Runbook Sprint 0*
*Autor del documento: Senior Frontend Architecture Session · Gadiel · UADY / TIDE Fellows*
