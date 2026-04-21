# Runbook — Sprint 2: Services, About & Project Filter

**Proyecto:** Portafolio Profesional · Gadiel · UADY / TIDE Fellows
**Sprint:** S2 — Secciones de contenido comercial y técnico: Servicios, Sobre mí, y Proyectos con filtro dinámico
**Prerrequisito:** Sprint S1 completado. Hero funcional, navegación sticky, footer con links reales, WhatsApp flotante operativo. `npm run dev` arranca sin errores.
**Estimación:** 8–10 h (Fase 2 §6)
**Requisitos que cubre:** RF-02, RF-04, RF-05, RF-06 · RNF-01 a RNF-09 · HU-02, HU-04, HU-05

---

## Contexto y propósito del sprint

El Sprint 2 completa la **capa de contenido comercial y técnico** de la home. Al terminar este sprint, tu portafolio dejará de ser solo estructura y se convertirá en una pieza creíble de presentación profesional que:

- **Traduce tu experiencia técnica a valor para PYMES** mediante la sección Servicios (RF-02, HU-02)
- **Conecta tu perfil analítico con tu disciplina musical** en la sección Sobre mí (RF-04)
- **Muestra tus proyectos segmentados por dominio técnico** con un filtro client-side sin recarga (RF-05, RF-06, HU-04, HU-05)

Al terminar este sprint tendrás:
- Sección **Servicios** orientada a negocio con 4 ofertas concretas
- Sección **Sobre mí** que posiciona tu perfil dual: ingeniería + jazz
- Grid de **Proyectos** con filtro interactivo en Preact Islands
- Schema de Content Layer actualizado con las nuevas categorías
- 4 archivos `.mdx` mockeados listos para el Content Layer

Lo que **no** entra en este sprint: sección de Infraestructura (S3), módulo de Contacto (S4), ni páginas individuales de proyectos (S5).

---

## Decisiones de diseño que guían este sprint

Antes de escribir código, internaliza estas decisiones porque afectan cada componente:

**Audiencia dual preservada (Fase 1 §1.1):** La sección Servicios traduce IPv6, NOC, DNSSEC y criptografía a resultados comprensibles para el dueño de PYME. La sección Proyectos mantiene profundidad técnica para tech leads y reclutadores.

**Filtrado sin recarga (Fase 2 §3.2):** El grid de proyectos usa Preact Islands (`client:load`) para filtrar categorías instantáneamente. No hay llamadas a API, no hay fetch, no hay CMS. Todo el filtrado ocurre en cliente con datos locales.

**Tipografía consistente (Fase 2 §5.2 MOD-01):** Instrument Serif solo en H1 del Hero. Geist para todo el resto. Los H2 de secciones son Geist, no serif.

**Sistema de color preservado (Fase 2 §5.3 MOD-02):** Acento azul índigo `#1D4ED8`. Verde `#25D366` únicamente en WhatsApp. Los badges de categorías usan `--color-accent-subtle` y `--color-accent-text`.

**Iconografía ligera (Fase 2 §5.4):** Se introduce `lucide-preact` como única dependencia de iconos. Bundle pequeño, tree-shakeable, sin React.

---

## Cambios respecto a la arquitectura previa

Este sprint **no altera la arquitectura base** definida en Sprint 0 y 1. La expande con tres adiciones puntuales:

| Elemento | Estado previo | Cambio en S2 | Justificación |
|---|---|---|---|
| **Content Layer schema** | Categorías: `web`, `sistemas`, `redes`, `infraestructura` | Nuevo enum: `Web Dev`, `Ciberseguridad`, `Redes & IPv6`, `Gestión de Redes` | Las categorías previas eran abstractas. Las nuevas son vendibles y precisas para tu perfil. |
| **Dependencia de iconografía** | Sin librería de iconos | Se agrega `lucide-preact` | Requerimiento expreso del sprint. Bundle < 5 KB, tree-shakeable. |
| **Placeholders en `index.astro`** | `#sobre-mi`, `#servicios`, `#proyectos` son comentarios | Se reemplazan con componentes reales | Este sprint consiste precisamente en llenar esos vacíos. |
| **Design tokens** | Definidos en `global.css` | Sin cambios — se consumen tal cual | Los componentes del sprint usan los tokens existentes. No se redefinen colores. |

---

## Tarea 0 — Instalación de dependencia necesaria

### 0.1 Instalar `lucide-preact`

Ejecutar en la raíz del proyecto:

```bash
npm install lucide-preact
```

Verificar que se instaló correctamente:

```bash
npm ls lucide-preact
# Debe mostrar lucide-preact@0.x.x sin warnings
```

> **Nota arquitectónica:** No estamos introduciendo un framework nuevo. `lucide-preact` es la versión ligera de Lucide diseñada específicamente para Preact. Es tree-shakeable, lo que significa que solo los iconos que importes se incluirán en el bundle final.

---

## Tarea 1 — Actualización del Content Layer schema

### Por qué este cambio es necesario

Tu `src/content/config.ts` actual usa categorías genéricas (`web`, `sistemas`, `redes`, `infraestructura`) que no sirven bien para el grid filtrable que este sprint requiere. Las nuevas categorías traducen mejor tu perfil técnico a dominios específicos y vendibles.

### 1.1 Reemplazar completamente `src/content/config.ts`

Abre `src/content/config.ts` y reemplaza su contenido con esto:

```typescript
// src/content/config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Categorías de proyectos — Sprint 2
 *
 * Estas categorías reemplazan las genéricas del Sprint 0.
 * Son más específicas, más vendibles y mejor alineadas con tu perfil real.
 *
 * - Web Dev: proyectos de desarrollo web estático
 * - Ciberseguridad: cifrado, criptografía, DNSSEC
 * - Redes & IPv6: laboratorios de transición, NDP, SLAAC
 * - Gestión de Redes: monitoreo, NOC, observabilidad
 */
const projectCategories = [
  'Web Dev',
  'Ciberseguridad',
  'Redes & IPv6',
  'Gestión de Redes',
] as const;

const projects = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/projects',
  }),
  schema: z.object({
    // ── Identificación ──────────────────────────────────────────────
    title: z.string()
      .min(3, 'El título debe tener al menos 3 caracteres')
      .max(80, 'El título no debe superar 80 caracteres'),

    summary: z.string()
      .max(160, 'El resumen no debe superar 160 caracteres'),

    category: z.enum(projectCategories),

    // ── Contenido del caso de estudio ──────────────────────────────
    problem: z.string(),
    solution: z.string(),
    result: z.string(),

    // ── Tecnologías y metadatos ─────────────────────────────────────
    stack: z.array(z.string())
      .min(1, 'Debe haber al menos una tecnología')
      .max(10, 'No más de 10 tecnologías por proyecto'),

    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),

    hasInteractiveComponent: z.boolean().default(false),

    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
export type ProjectCategory = (typeof projectCategories)[number];
export { projectCategories };
```

### 1.2 Verificar que no hay errores de tipos

```bash
npx astro check
# Resultado esperado: "No errors found"
# Si hay errores relacionados con el schema, son bloquantes — corregir antes de continuar.
```

---

## Tarea 2 — Componente `Services.astro`

### Por qué esta sección es crítica

La sección Servicios es la traducción directa de tu experiencia técnica (LACNIC, IPv6, criptografía, IaaS) a ofertas comprensibles para el dueño de PYME. Fase 1 lo exige explícitamente: el stakeholder PYME debe entender **qué puedes hacer por su negocio**, no solo qué tecnologías conoces.

### 2.1 Crear `src/components/astro/Services.astro`

```astro
---
// src/components/astro/Services.astro
import {
  Globe,
  Activity,
  ShieldCheck,
  LayoutTemplate,
  ArrowRight,
} from 'lucide-preact';

/**
 * Servicios — Sprint 2
 *
 * Cada servicio traduce experiencia técnica a valor de negocio.
 * Estructura: título técnico + descripción técnica + valor de negocio + bullets ejecutivos.
 *
 * Decisión de diseño: no hablamos de "MRTG" o "NDP" como fin en sí mismos.
 * Los usamos como fundamento técnico detrás de una propuesta comercial.
 *
 * RF-02: "El portafolio debe presentar servicios orientados a PYMES"
 */
const services = [
  {
    title: 'Transición a IPv6',
    icon: Globe,
    description:
      'Consultoría técnica para preparar la red de tu empresa ante el agotamiento de IPv4 mediante mecanismos de transición como Dual Stack y túneles.',
    businessValue:
      'Reduce riesgo operativo, mejora escalabilidad y prepara tu infraestructura para crecimiento, conectividad moderna y adopción gradual sin detener la operación.',
    bullets: [
      'Diagnóstico de red actual y viabilidad de transición',
      'Diseño de estrategia Dual Stack o túneles',
      'Laboratorios y validación de direccionamiento, NDP y autoconfiguración',
    ],
  },
  {
    title: 'Implementación de NOC & Monitoreo',
    icon: Activity,
    description:
      'Despliegue de monitoreo open source para supervisar disponibilidad, tráfico y comportamiento de la red local en entornos LAN y WLAN.',
    businessValue:
      'Detecta incidencias antes de que afecten a usuarios, mejora tiempos de respuesta y aporta visibilidad real sobre ancho de banda, latencia y estabilidad.',
    bullets: [
      'Monitoreo con Nagios, Cacti y Wireshark',
      'Visibilidad operativa para enlaces, servicios y hosts',
      'Base técnica para operación estilo NOC con procedimientos claros',
    ],
  },
  {
    title: 'Ciberseguridad y Criptografía',
    icon: ShieldCheck,
    description:
      'Desarrollo de software seguro a bajo nivel y fortalecimiento de identidad digital mediante criptografía aplicada y administración segura de DNS.',
    businessValue:
      'Aumenta confianza técnica, protege flujos críticos y refuerza la integridad de servicios expuestos a internet mediante software robusto y DNSSEC.',
    bullets: [
      'Desarrollo en C/C++ con enfoque en control y eficiencia',
      'Implementaciones criptográficas con GMP',
      'Administración de DNS seguro con DNSSEC y BIND',
    ],
  },
  {
    title: 'Desarrollo Web Estático',
    icon: LayoutTemplate,
    description:
      'Sitios web estáticos de alto rendimiento construidos con Astro y desplegados sobre infraestructura virtualizada en nube tipo IaaS.',
    businessValue:
      'Carga rápida, menor complejidad operativa y una presencia digital profesional lista para convertirse en canal comercial y carta técnica de presentación.',
    bullets: [
      'Arquitectura Astro estática con enfoque en performance',
      'UI mantenible con Tailwind v4 y design tokens',
      'Despliegue sobre infraestructura cloud virtualizada tipo IaaS',
    ],
  },
];
---

<section
  id="servicios"
  aria-labelledby="services-heading"
  class="border-t"
  style="border-color: var(--color-bg-muted);"
>
  <div class="container py-24">
    <!-- Header de la sección -->
    <div class="max-w-3xl">
      <p
        class="mb-3 font-mono text-sm uppercase tracking-[0.12em]"
        style="color: var(--color-text-secondary);"
      >
        Engineered Solutions para PYMES
      </p>

      <h2
        id="services-heading"
        class="text-4xl md:text-6xl"
        style="color: var(--color-text-primary);"
      >
        Servicios diseñados con criterio técnico y enfoque de negocio.
      </h2>

      <p
        class="mt-5 max-w-2xl text-base md:text-lg"
        style="color: var(--color-text-secondary);"
      >
        Cada servicio traduce experiencia en redes, criptografía e ingeniería web
        a soluciones concretas para operación, seguridad y crecimiento digital.
      </p>
    </div>

    <!-- Grid de servicios -->
    <div class="mt-12 grid gap-6 md:grid-cols-2">
      {services.map(({ title, icon: Icon, description, businessValue, bullets }) => (
        <article
          class="rounded-[var(--radius-lg)] border p-6 transition-transform duration-200 hover:-translate-y-1"
          style="
            background: var(--color-bg-subtle);
            border-color: var(--color-bg-muted);
          "
        >
          <!-- Header del servicio -->
          <div class="mb-5 flex items-center gap-3">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)]"
              style="
                background: var(--color-accent-subtle);
                color: var(--color-accent-text);
              "
            >
              <Icon size={20} strokeWidth={2} />
            </div>

            <h3
              class="font-body text-2xl font-medium"
              style="color: var(--color-text-primary);"
            >
              {title}
            </h3>
          </div>

          <!-- Descripción técnica -->
          <p class="text-base leading-7" style="color: var(--color-text-primary);">
            {description}
          </p>

          <!-- Valor de negocio (destacado) -->
          <p
            class="mt-4 rounded-[var(--radius-md)] border px-4 py-3 text-sm leading-6"
            style="
              border-color: var(--color-bg-muted);
              color: var(--color-text-secondary);
              background: var(--color-bg);
            "
          >
            <strong style="color: var(--color-text-primary);">Valor para negocio:</strong>{' '}
            {businessValue}
          </p>

          <!-- Bullets ejecutivos -->
          <ul class="mt-5 space-y-3">
            {bullets.map((item) => (
              <li class="flex items-start gap-3 text-sm leading-6" style="color: var(--color-text-secondary);">
                <span
                  class="mt-2 h-2 w-2 rounded-full flex-shrink-0"
                  style="background: var(--color-accent);"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <!-- CTA al módulo de contacto -->
          <a
            href="/#contacto"
            class="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style="color: var(--color-accent);"
            aria-label={`Solicitar diagnóstico inicial de ${title}`}
          >
            Solicitar diagnóstico inicial
            <ArrowRight size={16} />
          </a>
        </article>
      ))}
    </div>
  </div>
</section>
```

### 2.2 Qué resuelve este componente

- ✅ Traduce IPv6, NOC, DNSSEC, GMP, Astro e IaaS a **resultados comprensibles**
- ✅ Mantiene coherencia con tus tokens actuales de color y layout (`global.css`)
- ✅ No mete tecnologías nuevas fuera de tu contexto técnico
- ✅ Cumple RF-02: "El portafolio debe presentar servicios orientados a PYMES"

---

## Tarea 3 — Componente `About.astro`

### Por qué esta sección conecta identidad con capacidad

La sección Sobre mí debe unir dos dimensiones: tu rigor como estudiante de Ingeniería de Software y operador técnico, y tu disciplina musical como saxofonista enfocado en teoría de jazz. El punto no es "decorar" tu perfil, sino mostrar una **lógica de transferencia de disciplina**: precisión, escucha, estructura y ejecución.

### 3.1 Crear `src/components/astro/About.astro`

```astro
---
// src/components/astro/About.astro
import { GraduationCap, Award, Music4, Network } from 'lucide-preact';

/**
 * Sobre mí — Sprint 2
 *
 * Conecta identidad personal con capacidad profesional.
 * No es un bloque autobiográfico genérico — es una narrativa que muestra
 * la lógica de transferencia entre disciplina musical y rigor técnico.
 *
 * RF-04: "Incluir sección Sobre mí que posicione el perfil dual"
 */
---

<section
  id="sobre-mi"
  aria-labelledby="about-heading"
  class="border-t"
  style="border-color: var(--color-bg-muted);"
>
  <div class="container py-24">
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <!-- Narrativa principal -->
      <div>
        <p
          class="mb-3 font-mono text-sm uppercase tracking-[0.12em]"
          style="color: var(--color-text-secondary);"
        >
          The Polymath Profile
        </p>

        <h2
          id="about-heading"
          class="text-4xl md:text-6xl"
          style="color: var(--color-text-primary);"
        >
          Ingeniería, sistemas y jazz como una misma disciplina de precisión.
        </h2>

        <div class="mt-6 space-y-5 text-base leading-8 md:text-lg" style="color: var(--color-text-secondary);">
          <p>
            Soy estudiante de <strong style="color: var(--color-text-primary);">Ingeniería de Software en la UADY</strong>,
            <strong style="color: var(--color-text-primary);"> TIDE Fellow 2026</strong> y saxofonista con enfoque en teoría de Jazz.
            Mi forma de construir software nace de la misma lógica con la que se estudia, interpreta y estructura una pieza compleja:
            entender el sistema, escuchar sus tensiones y ejecutar con control.
          </p>

          <p>
            En redes y sistemas trabajo con planificación, direccionamiento, operación y validación técnica.
            Eso incluye laboratorios con Linux/Unix, configuración de mecanismos de transición IPv6,
            análisis de topologías y una visión operativa que valora estabilidad, observabilidad y orden.
          </p>

          <p>
            En música entreno oído, disciplina, lectura estructural y sensibilidad al detalle.
            En ingeniería, eso se traduce en decisiones más limpias: componentes con propósito, arquitectura clara,
            documentación útil y soluciones que no solo funcionan, sino que se entienden y se sostienen en el tiempo.
          </p>
        </div>
      </div>

      <!-- Sidebar de señales de perfil -->
      <aside
        class="rounded-[var(--radius-lg)] border p-6"
        style="
          background: var(--color-bg-subtle);
          border-color: var(--color-bg-muted);
        "
      >
        <h3
          class="font-body text-xl font-medium"
          style="color: var(--color-text-primary);"
        >
          Señales de perfil
        </h3>

        <div class="mt-6 space-y-4">
          <!-- UADY -->
          <div class="flex items-start gap-4">
            <div
              class="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)]"
              style="background: var(--color-accent-subtle); color: var(--color-accent-text);"
              aria-hidden="true"
            >
              <GraduationCap size={18} />
            </div>
            <div>
              <p class="font-medium" style="color: var(--color-text-primary);">UADY</p>
              <p class="text-sm leading-6" style="color: var(--color-text-secondary);">
                Formación en Ingeniería de Software con enfoque analítico y estructural.
              </p>
            </div>
          </div>

          <!-- TIDE Fellows -->
          <div class="flex items-start gap-4">
            <div
              class="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)]"
              style="background: var(--color-accent-subtle); color: var(--color-accent-text);"
              aria-hidden="true"
            >
              <Award size={18} />
            </div>
            <div>
              <p class="font-medium" style="color: var(--color-text-primary);">TIDE Fellows 2026</p>
              <p class="text-sm leading-6" style="color: var(--color-text-secondary);">
                Entorno de alto rendimiento, criterio técnico y proyección profesional.
              </p>
            </div>
          </div>

          <!-- Redes y Linux -->
          <div class="flex items-start gap-4">
            <div
              class="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)]"
              style="background: var(--color-accent-subtle); color: var(--color-accent-text);"
              aria-hidden="true"
            >
              <Network size={18} />
            </div>
            <div>
              <p class="font-medium" style="color: var(--color-text-primary);">Redes y Linux</p>
              <p class="text-sm leading-6" style="color: var(--color-text-secondary);">
                Planes de direccionamiento, operación técnica y laboratorios con criterio de sistema.
              </p>
            </div>
          </div>

          <!-- Jazz y saxofón -->
          <div class="flex items-start gap-4">
            <div
              class="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)]"
              style="background: var(--color-accent-subtle); color: var(--color-accent-text);"
              aria-hidden="true"
            >
              <Music4 size={18} />
            </div>
            <div>
              <p class="font-medium" style="color: var(--color-text-primary);">Jazz y saxofón</p>
              <p class="text-sm leading-6" style="color: var(--color-text-secondary);">
                Técnica, constancia, lectura fina del contexto y ejecución disciplinada.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>
```

### 3.2 Qué resuelve este componente

- ✅ No rompe el tono del portafolio
- ✅ Conecta identidad personal con capacidad profesional
- ✅ Refuerza credibilidad académica y técnica sin caer en un bloque autobiográfico genérico
- ✅ Cumple RF-04: "Incluir sección Sobre mí que posicione el perfil dual"

---

## Tarea 4 — Isla interactiva `ProjectFilter.tsx`

### Por qué Preact está justificado aquí

El filtro debe ser instantáneo y sin recarga. Ese comportamiento ya estaba definido como requisito funcional en la Fase 2. Preact Islands permite hidratación selectiva: solo este componente carga JavaScript, el resto de la página permanece estático.

### 4.1 Crear `src/components/islands/ProjectFilter.tsx`

```tsx
// src/components/islands/ProjectFilter.tsx
import { useMemo, useState } from 'preact/hooks';
import { FolderCode, Shield, Router, Activity, Globe } from 'lucide-preact';

/**
 * ProjectFilter — Sprint 2
 *
 * Filtro client-side sin recarga de página.
 * Usa Preact Islands (client:load) para hidratación selectiva.
 *
 * Decisión arquitectónica:
 * - Los datos están mockeados dentro del componente en este sprint.
 * - En Sprint 3, se migrará a `getCollection('projects')` para leer del Content Layer.
 *
 * RF-05: "Grid de proyectos con filtro por categoría"
 * RF-06: "Filtrado client-side sin recarga"
 * HU-04: "Como tech lead, quiero filtrar proyectos por dominio técnico"
 */

type Category =
  | 'All'
  | 'Ciberseguridad'
  | 'Redes & IPv6'
  | 'Gestión de Redes'
  | 'Web Dev';

type Project = {
  title: string;
  category: Exclude<Category, 'All'>;
  summary: string;
  stack: string[];
  href?: string;
};

const categories: Category[] = [
  'All',
  'Ciberseguridad',
  'Redes & IPv6',
  'Gestión de Redes',
  'Web Dev',
];

/**
 * Datos mockeados — Sprint 2
 *
 * Estos 4 proyectos coinciden con los archivos .mdx que crearás en la Tarea 5.
 * En Sprint 3, este array se reemplazará con una llamada a `getCollection('projects')`.
 */
const projects: Project[] = [
  {
    title: 'RSA en C',
    category: 'Ciberseguridad',
    summary: 'Implementación matemática de RSA en C usando GMP para enteros de precisión arbitraria.',
    stack: ['C', 'GMP', 'Criptografía'],
    href: '/proyectos/rsa-en-c',
  },
  {
    title: 'Migración IPv6',
    category: 'Redes & IPv6',
    summary: 'Configuración de NDP y SLAAC en laboratorios VirtualBox para transición y validación de conectividad.',
    stack: ['IPv6', 'NDP', 'SLAAC', 'VirtualBox'],
    href: '/proyectos/migracion-ipv6',
  },
  {
    title: 'Dashboard NOC',
    category: 'Gestión de Redes',
    summary: 'Implementación de monitoreo de red con MRTG y Nagios para visibilidad operativa y disponibilidad.',
    stack: ['MRTG', 'Nagios', 'Monitoreo'],
    href: '/proyectos/dashboard-noc',
  },
  {
    title: 'Portafolio M4',
    category: 'Web Dev',
    summary: 'Portafolio estático con arquitectura Astro, Tailwind v4 y componentes aislados con Preact.',
    stack: ['Astro', 'Tailwind v4', 'Preact'],
    href: '/proyectos/portafolio-m4',
  },
];

/**
 * Helper: asigna el ícono correcto a cada categoría
 */
function getCategoryIcon(category: Category) {
  switch (category) {
    case 'All':
      return Globe;
    case 'Ciberseguridad':
      return Shield;
    case 'Redes & IPv6':
      return Router;
    case 'Gestión de Redes':
      return Activity;
    case 'Web Dev':
      return FolderCode;
  }
}

export default function ProjectFilter() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  /**
   * useMemo evita recalcular el filtrado en cada re-render.
   * El array de dependencias [activeCategory] hace que solo se recalcule
   * cuando cambia la categoría activa.
   */
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="proyectos"
      aria-labelledby="projects-heading"
      class="border-t"
      style={{ borderColor: 'var(--color-bg-muted)' }}
    >
      <div class="container py-24">
        {/* Header de la sección */}
        <div class="max-w-3xl">
          <p
            class="mb-3 font-mono text-sm uppercase tracking-[0.12em]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Project Grid
          </p>

          <h2
            id="projects-heading"
            class="text-4xl md:text-6xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Proyectos filtrables sin recarga.
          </h2>

          <p
            class="mt-5 max-w-2xl text-base md:text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Una muestra de trabajo entre criptografía, redes, operación y desarrollo web estático.
          </p>
        </div>

        {/* Botones de filtro */}
        <div class="mt-8 flex flex-wrap gap-3" role="group" aria-label="Filtrar proyectos por categoría">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category);
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200"
                style={{
                  borderColor: isActive ? 'var(--color-accent)' : 'var(--color-bg-muted)',
                  background: isActive ? 'var(--color-accent-subtle)' : 'var(--color-bg)',
                  color: isActive ? 'var(--color-accent-text)' : 'var(--color-text-secondary)',
                }}
                aria-pressed={isActive}
                aria-label={`Filtrar por ${category}`}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        {/* Grid de proyectos filtrados */}
        <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filteredProjects.map((project) => (
            <article
              key={project.title}
              class="flex h-full flex-col rounded-[var(--radius-lg)] border p-5"
              style={{
                background: 'var(--color-bg-subtle)',
                borderColor: 'var(--color-bg-muted)',
              }}
            >
              {/* Badge de categoría */}
              <div class="mb-4 flex items-center justify-between gap-3">
                <span
                  class="inline-flex rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    background: 'var(--color-accent-subtle)',
                    color: 'var(--color-accent-text)',
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Título del proyecto */}
              <h3
                class="font-body text-xl font-medium"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {project.title}
              </h3>

              {/* Summary */}
              <p
                class="mt-3 text-sm leading-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {project.summary}
              </p>

              {/* Stack de tecnologías */}
              <div class="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    class="rounded-full px-3 py-1 text-xs"
                    style={{
                      background: 'var(--color-bg)',
                      color: 'var(--color-text-secondary)',
                      border: '1px solid var(--color-bg-muted)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* CTA al caso de estudio */}
              <div class="mt-6">
                <a
                  href={project.href ?? '#'}
                  class="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--color-accent)' }}
                  aria-label={`Ver caso de estudio de ${project.title}`}
                >
                  Ver caso de estudio
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 4.2 Qué hace bien esta isla

- ✅ Filtra completamente en cliente — no depende de fetch, CMS ni API
- ✅ Usa `lucide-preact` — bundle pequeño, tree-shakeable
- ✅ Mantiene coherencia con Islands Architecture — solo esta sección carga JS
- ✅ Cumple RF-06: "Filtrado client-side sin recarga"

---

## Tarea 5 — Integración en `index.astro`

### Por qué este paso es crítico

Tu `index.astro` actual aún tiene placeholders en `#sobre-mi`, `#servicios` y `#proyectos`. Este sprint consiste precisamente en sustituirlos. Si no se reemplazan, el visitante solo verá comentarios HTML.

### 5.1 Actualizar imports en `src/pages/index.astro`

Abre `src/pages/index.astro` y reemplaza el bloque de imports con esto:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/astro/Nav.astro';
import Footer from '../components/astro/Footer.astro';
import Hero from '../components/astro/Hero.astro';
import About from '../components/astro/About.astro';
import Services from '../components/astro/Services.astro';
import ProjectFilter from '../components/islands/ProjectFilter.tsx';
import WhatsAppButton from '../components/islands/WhatsAppButton.tsx';
---
```

### 5.2 Reemplazar los placeholders con componentes reales

Localiza los tres placeholders en `index.astro` y reemplázalos con este código:

```astro
<Layout
  title="Home"
  description="Gadiel Uicab · Ingeniero de Software especializado en soluciones web para PYMES en Mérida. Estudiante de Ingeniería de Software en UADY, becario TIDE Fellows."
>
  <Nav />

  <Hero />
  <About />
  <Services />
  <ProjectFilter client:load />

  <!-- Placeholder para Sprint 2-3 -->
  <section
    id="infraestructura"
    style="min-height: 200px; padding: var(--space-24) 0; border-top: 1px solid var(--color-bg-muted);"
  >
    <div class="container">
      <p style="color: var(--color-text-secondary); font-family: var(--font-mono); font-size: var(--text-sm);">
        // Sprint 2-3 → Sección Infraestructura
      </p>
    </div>
  </section>

  <!-- Placeholder para Sprint 4 -->
  <section
    id="contacto"
    style="min-height: 200px; padding: var(--space-24) 0; border-top: 1px solid var(--color-bg-muted);"
  >
    <div class="container">
      <p style="color: var(--color-text-secondary); font-family: var(--font-mono); font-size: var(--text-sm);">
        // Sprint 4 → Módulo de Contacto
      </p>
    </div>
  </section>

  <Footer />
  <WhatsAppButton client:load />
</Layout>
```

### 5.3 Nota crítica sobre `client:load`

El componente `<ProjectFilter client:load />` usa la directiva `client:load` porque el filtrado debe estar disponible inmediatamente cuando la página carga. Otras directivas disponibles:

- `client:visible` — hidrata cuando el componente entra en el viewport (mejor para componentes below-the-fold)
- `client:idle` — hidrata cuando el navegador está idle (mejor para widgets no críticos)
- `client:media` — hidrata solo en ciertos viewports

Para el filtro de proyectos, `client:load` es correcto porque está near-the-fold y es un feature principal de HU-04.

---

## Tarea 6 — Contenido mockeado en MDX

Aunque el filtro de este sprint arranca con datos internos del componente, conviene dejar desde ahora los frontmatters compatibles con el nuevo schema para cuando migres a `getCollection()` en Sprint 3.

### 6.1 Crear `src/content/projects/rsa-en-c.mdx`

```mdx
---
title: "RSA en C"
summary: "Implementación matemática de RSA en C usando GMP para enteros de precisión arbitraria."
category: "Ciberseguridad"
problem: "Los sistemas de cifrado comerciales son cajas negras. Para entender criptografía de clave pública, necesitas implementar el algoritmo desde cero."
solution: "Implementación de RSA en C puro usando la librería GMP (GNU Multiple Precision) para manejar enteros de tamaño arbitrario. Incluye generación de primas, exponenciación modular y cifrado/descifrado de mensajes."
result: "Un cifrador funcional que demuestra dominio de matemáticas discretas, programación de bajo nivel y manejo de memoria manual."
stack: ["C", "GMP", "Criptografía", "Makefile"]
githubUrl: "https://github.com/tu-usuario/rsa-en-c"
hasInteractiveComponent: true
publishedAt: 2026-04-18
featured: true
---

## Contexto del proyecto

Este proyecto nace de la necesidad de entender criptografía asimétrica más allá de las abstracciones de alto nivel...

(Aquí iría el contenido MDX extendido que se renderizará en la página individual del proyecto en Sprint 5)
```

### 6.2 Crear `src/content/projects/migracion-ipv6.mdx`

```mdx
---
title: "Migración IPv6"
summary: "Configuración de NDP y SLAAC en laboratorios VirtualBox para transición y validación de conectividad."
category: "Redes & IPv6"
problem: "El agotamiento de IPv4 es inevitable. Las empresas necesitan estrategias de transición que no detengan la operación."
solution: "Laboratorio de transición Dual Stack usando VirtualBox. Configuración de NDP (Neighbor Discovery Protocol), SLAAC (StateLess Address AutoConfiguration) y validación de conectividad entre redes IPv4 e IPv6."
result: "Un plan de transición replicable que reduce riesgo operativo y prepara la infraestructura para adopción gradual de IPv6."
stack: ["IPv6", "NDP", "SLAAC", "VirtualBox", "Linux"]
githubUrl: "https://github.com/tu-usuario/migracion-ipv6"
hasInteractiveComponent: true
publishedAt: 2026-04-18
featured: true
---

## Contexto del proyecto

La transición a IPv6 no es solo técnica — es estratégica...

(Contenido MDX extendido)
```

### 6.3 Crear `src/content/projects/dashboard-noc.mdx`

```mdx
---
title: "Dashboard NOC"
summary: "Implementación de monitoreo de red con MRTG y Nagios para visibilidad operativa y disponibilidad."
category: "Gestión de Redes"
problem: "Las incidencias de red se detectan cuando los usuarios ya están afectados. Se necesita visibilidad proactiva."
solution: "Dashboard de monitoreo con MRTG para tráfico, Nagios para disponibilidad de servicios y Wireshark para análisis profundo. Despliegue en Linux con alertas automáticas."
result: "Reducción de 40% en tiempo de detección de incidencias y base técnica para operación estilo NOC."
stack: ["MRTG", "Nagios", "Wireshark", "Linux", "Bash"]
githubUrl: "https://github.com/tu-usuario/dashboard-noc"
hasInteractiveComponent: false
publishedAt: 2026-04-18
featured: false
---

## Contexto del proyecto

Un NOC (Network Operations Center) requiere tres capacidades críticas...

(Contenido MDX extendido)
```

### 6.4 Crear `src/content/projects/portafolio-m4.mdx`

```mdx
---
title: "Portafolio M4"
summary: "Portafolio estático con arquitectura Astro, Tailwind v4 y componentes aislados con Preact."
category: "Web Dev"
problem: "Los portafolios genéricos no comunican criterio técnico ni profundidad de sistema."
solution: "Arquitectura Astro estática con Tailwind v4 CSS-first, Preact Islands para interactividad selectiva, y Content Layer local para proyectos. Desplegado sobre IaaS con Nginx + SSL."
result: "Un portafolio que es en sí mismo un caso de estudio de arquitectura web moderna y decisiones fundamentadas."
stack: ["Astro", "Tailwind v4", "Preact", "TypeScript", "MDX"]
githubUrl: "https://github.com/tu-usuario/portafolio-m4"
demoUrl: "https://tudominio.com"
hasInteractiveComponent: true
publishedAt: 2026-04-18
featured: true
---

## Contexto del proyecto

Este portafolio no es solo una carta de presentación — es una demostración técnica...

(Contenido MDX extendido)
```

### 6.5 Verificar que los frontmatters pasan el schema

```bash
npx astro check
# Resultado esperado: "No errors found"
# Si hay errores de validación del schema, corregir los frontmatters.
```

---

## Tarea 7 — Verificación del sprint

Ejecuta estos comandos en orden. Cada uno tiene un resultado esperado claro.

### 7.1 Verificación de TypeScript

```bash
npx astro check
# Resultado esperado: "No errors found"
# Si hay errores: son bloquantes. Corregir antes de continuar.
```

### 7.2 Verificación de build de producción

```bash
npm run build
# Debe completar sin errores.
# Ignorar los warnings informativos de "stylesheets".

# Inspeccionar el output:
ls -lh dist/
# Debe existir: index.html, _astro/ (con CSS y JS)

# Verificar el tamaño del bundle CSS:
ls -lh dist/_astro/*.css
# Debe ser < 20 KB (aumentó ligeramente vs Sprint 1 por las nuevas secciones)

# Verificar el bundle JS de ProjectFilter:
ls -lh dist/_astro/*.js
# Debe haber un bundle pequeño (< 10 KB) para ProjectFilter + lucide-preact
```

### 7.3 Verificación de desarrollo

```bash
npm run dev

# Verificar en el navegador:
# 1. http://localhost:4321 — la página carga sin errores de consola
# 2. DevTools > Console: sin errores rojos
# 3. Scroll a #servicios — los 4 servicios son visibles
# 4. Scroll a #sobre-mi — la narrativa y el sidebar de señales son visibles
# 5. Scroll a #proyectos — el grid y los filtros son visibles
# 6. Click en cada filtro — el grid se actualiza instantáneamente sin recarga
# 7. DevTools > Network: no hay requests de fetch ni API calls al filtrar
```

### 7.4 Verificación de navegación

```bash
# Con el servidor de desarrollo corriendo:
# 1. Click en "Servicios" en la nav → debe hacer scroll a #servicios
# 2. Click en "Sobre mí" en la nav → debe hacer scroll a #sobre-mi
# 3. Click en "Proyectos" en la nav → debe hacer scroll a #proyectos
# 4. En mobile (DevTools > Toggle Device Toolbar):
#    - Hamburger menu abre y muestra los nuevos links
#    - Al hacer click en un link, el menú se cierra
```

### 7.5 Verificación de accesibilidad

```bash
npm run preview

# Abrir http://localhost:4321 y ejecutar Lighthouse:
# DevTools → Lighthouse → Accessibility
# Score esperado: ≥ 95
#
# Errores comunes a verificar:
# - Los botones de filtro tienen aria-pressed correcto
# - Los iconos tienen aria-hidden="true"
# - Los H2 de sección tienen IDs correctos para las anclas
# - No hay saltos en la jerarquía de headings (H1 → H2 → H3)
```

---

## Checklist de cierre del Sprint 2

```
Content Layer
  [ ] Nuevo enum de categorías aplicado en src/content/config.ts
  [ ] Frontmatters de los 4 proyectos alineados con categorías reales
  [ ] npx astro check sin errores de schema

Componentes Astro
  [ ] Services.astro integrado y visible en /#servicios
  [ ] About.astro integrado y visible en /#sobre-mi
  [ ] Tokens de color consumidos desde global.css — no se redefinieron colores
  [ ] Los iconos de lucide-preact se renderizan correctamente

Isla Preact
  [ ] ProjectFilter.tsx filtra sin recargar página
  [ ] lucide-preact funcionando — iconos visibles en botones de filtro
  [ ] No hay dependencias de APIs externas
  [ ] Al cambiar de categoría, el grid se actualiza instantáneamente
  [ ] DevTools > Network: cero requests al filtrar (todo es client-side)

Navegación
  [ ] Los links a #servicios, #sobre-mi, #proyectos funcionan (smooth scroll)
  [ ] En mobile, el hamburger menu muestra los nuevos links
  [ ] Al hacer click en un link del menú mobile, el menú se cierra

Build
  [ ] npm run build sin errores
  [ ] Bundle CSS < 20 KB
  [ ] Bundle JS de ProjectFilter < 10 KB
  [ ] npm run preview sirve el sitio correctamente

Accesibilidad
  [ ] Lighthouse Accessibility ≥ 95
  [ ] Tab navigation funciona en todo el sitio
  [ ] Botones de filtro tienen aria-pressed correcto
  [ ] Iconos tienen aria-hidden="true"
  [ ] Sin saltos en jerarquía de headings

MDX mockeados
  [ ] 4 archivos .mdx creados en src/content/projects/
  [ ] Frontmatters válidos según el schema de Content Layer
  [ ] Las categorías coinciden con las del filtro (Ciberseguridad, Redes & IPv6, etc.)
```

---

## Resultado esperado del Sprint 2

Al cerrar este sprint, tu home deja de ser solo estructura y se convierte en una pieza creíble de portafolio profesional:

✅ El dueño de una PYME entiende **qué servicios ofreces y por qué le convienen** (Servicios)
✅ El visitante entiende **quién eres y cómo piensas** (Sobre mí)
✅ El tech lead ve **proyectos segmentados por dominio técnico** con filtrado instantáneo (Proyectos)
✅ Todo sigue corriendo sobre **Astro estático + Tailwind v4 + Preact Islands**, sin introducir tecnologías ajenas a tu marco

---

## Qué viene en el Sprint 3

El Sprint 3 cubre la sección **Infraestructura**: un caso de estudio del portafolio mismo como pieza técnica. Incluye arquitectura del proyecto, decisiones de diseño, stack completo y métricas de rendimiento.

También se completa la migración del filtro de proyectos desde datos mockeados a `getCollection('projects')` para leer del Content Layer real.

---

*Sprint 2 — Services, About & Project Filter*
*Referencia: Fase 1 v1.1 · Fase 2 v1.0 · Runbook Sprint 0 · Runbook Sprint 1*
*Autor del documento: Senior Frontend Architecture Session · Gadiel · UADY / TIDE Fellows*
