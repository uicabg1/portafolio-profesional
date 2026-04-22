# Sprint 8 Refactor Visual UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la UI del portafolio como una experiencia editorial técnica con evidencia interactiva, manteniendo la oferta web-first, la arquitectura static-first y la calidad validada en Sprint 7.

**Architecture:** Astro sigue orquestando la home y las páginas estáticas. Los componentes `.astro` resuelven composición, copy y estilos scoped; las islas Preact se mantienen solo para interacción real: filtros, formulario, WhatsApp, RSA e IPv6. Los tokens transversales viven en `src/styles/global.css`, y las pruebas estáticas protegen contratos visuales mínimos antes de validar manualmente.

**Tech Stack:** Astro 6, Preact, TypeScript, Tailwind v4, CSS scoped, MDX content collections, Node test runner, Lighthouse/manual QA.

---

## File Structure

### Create

- `tests/sprint-8-visual-contract.test.mjs`
  Protege contratos mínimos del refactor visual: hero con identidad visible, proyectos como showcase, infraestructura como flujo, contacto como brief, páginas de proyecto editoriales y demos interactivas con superficie visual propia.

### Modify

- `src/styles/global.css`
  Tokens globales, ritmo vertical, superficies, acentos secundarios, utilidades transversales y motion base.

- `docs/architecture/design-system.md`
  Registro de cambios al sistema visual: tesis, tokens nuevos, reglas de composición y uso de motion.

- `src/components/astro/Hero.astro`
  Hero editorial con identidad visible, oferta web-first, CTA principal/secundario y visual técnica dominante.

- `src/components/astro/Services.astro`
  Servicios como bloques editoriales amplios, con oferta actual separada de capacidades complementarias.

- `src/components/astro/About.astro`
  Línea de evolución técnica para UADY, TIDE Fellows y LACNIC sin convertirlo en currículum plano.

- `src/components/islands/ProjectFilter.tsx`
  Showcase de proyectos con control editorial accesible, resultados más visibles y transiciones contenidas.

- `src/components/astro/Infrastructure.astro`
  Relato visual del sistema: static-first, build, CI/CD, VPS, Nginx, HTTPS e IPv6 como flujo operativo.

- `src/components/astro/Contact.astro`
  Cierre comercial más amplio, WhatsApp como canal primario y formulario como brief profesional.

- `src/components/islands/ContactForm.tsx`
  Ajustes visuales de campos, estados, errores y superficie de brief sin alterar la lógica validada.

- `src/pages/proyectos/[slug].astro`
  Header editorial por proyecto, narrativa más escaneable, layout de resultados y navegación menos compacta.

- `src/components/astro/ProjectInteractiveSection.astro`
  Contenedor más prominente para demos, con copy y canvas visualmente más fuertes.

- `src/islands/RSASimulator.tsx`
  Simulador RSA con controles más claros, resultados visuales y mejor jerarquía.

- `src/islands/IPv6MigrationMap.tsx`
  Mapa IPv6 con fases, nodos, checks y decisión operativa más visuales.

- `docs/sprints/sprint-8-refactor-visual-ui.md`
  Marcar avance, agregar evidencia de validación y enlazar este plan.

- `docs/quality/verification.md`
  Registrar comandos y revisión visual usados al cerrar Sprint 8.

- `docs/quality/performance-budget.md`
  Registrar resultados Lighthouse y cualquier decisión de assets/hidratación.

### Do Not Modify Unless Required

- `.github/workflows/deploy.yml`
  El rediseño no cambia el flujo CI/CD.

- `src/lib/contact-form.ts`
  La lógica de formulario ya tiene pruebas; solo tocar si una prueba falla por un bug real.

- `src/content/projects/*.mdx`
  Mantener contenido estable salvo ajustes mínimos de copy aprobados durante la revisión visual.

- `dist/` and `.astro/`
  Son salida generada/cache y no deben editarse.

---

## Task 0: Preflight, Branch Safety and Baseline

**Files:**
- Read: `docs/sprints/sprint-8-refactor-visual-ui.md`
- Read: `docs/superpowers/specs/2026-04-22-sprint-8-refactor-visual-ui-design.md`
- Read: `docs/quality/verification.md`

- [x] **Step 1: Check current worktree**

Run:

```bash
git status --short
```

Expected:

```text
 M docs/product/backlog.md
 M docs/sprints/README.md
?? AGENTS.md
?? CHANGELOG.md
?? CONTRIBUTING.md
?? SECURITY.md
?? docs/sprints/sprint-8-refactor-visual-ui.md
?? docs/superpowers/
```

If additional unrelated files appear, keep them untouched and note them in the task handoff before editing shared files.

- [x] **Step 2: Create or switch to a sprint branch**

Run:

```bash
git switch -c feat/sprint-8-visual-refactor
```

Expected if branch does not exist:

```text
Switched to a new branch 'feat/sprint-8-visual-refactor'
```

Expected if the branch already exists:

```text
fatal: a branch named 'feat/sprint-8-visual-refactor' already exists
```

If the branch already exists, run:

```bash
git switch feat/sprint-8-visual-refactor
```

- [x] **Step 3: Run baseline tests**

Run:

```bash
npm test
```

Expected:

```text
# pass 5
# fail 0
```

- [x] **Step 4: Run baseline Astro validation**

Run:

```bash
npm run astro -- check
```

Expected:

```text
Result (30 files):
- 0 errors
- 0 warnings
- 0 hints
```

- [x] **Step 5: Run baseline production build**

Run:

```bash
npm run build
```

Expected:

```text
completed in
```

The exact duration can vary. The command must exit with code `0`.

- [x] **Step 6: Commit documentation baseline if not already committed**

Run:

```bash
git add docs/product/backlog.md docs/sprints/README.md docs/sprints/sprint-8-refactor-visual-ui.md docs/superpowers/specs/2026-04-22-sprint-8-refactor-visual-ui-design.md docs/superpowers/plans/2026-04-22-sprint-8-refactor-visual-ui-implementation.md
git commit -m "docs: plan sprint 8 visual refactor"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

Do not add `AGENTS.md`, `CHANGELOG.md`, `CONTRIBUTING.md` or `SECURITY.md` unless the user explicitly decides they belong to this branch.

---

## Task 1: Add Sprint 8 Visual Contract Tests

**Files:**
- Create: `tests/sprint-8-visual-contract.test.mjs`
- Test: `tests/sprint-8-visual-contract.test.mjs`

- [x] **Step 1: Create the failing visual contract test**

Create `tests/sprint-8-visual-contract.test.mjs` with this exact content:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));

function readRepoFile(path) {
  return readFileSync(join(repoRoot, path), 'utf8');
}

test('Sprint 8 hero exposes identity, offer, CTAs and a technical visual surface', () => {
  const hero = readRepoFile('src/components/astro/Hero.astro');

  assert.match(hero, /Gadiel Uicab/);
  assert.match(hero, /hero-visual/);
  assert.match(hero, /hero-signal/);
  assert.match(hero, /#proyectos/);
  assert.match(hero, /wa\.me|#contacto/);
});

test('Sprint 8 projects section behaves as an evidence showcase', () => {
  const projects = readRepoFile('src/components/islands/ProjectFilter.tsx');

  assert.match(projects, /project-showcase/);
  assert.match(projects, /project-feature/);
  assert.match(projects, /project-result/);
  assert.match(projects, /aria-pressed/);
});

test('Sprint 8 infrastructure section presents an operational flow', () => {
  const infrastructure = readRepoFile('src/components/astro/Infrastructure.astro');

  assert.match(infrastructure, /infra-system-flow/);
  assert.match(infrastructure, /CI\/CD|GitHub Actions/);
  assert.match(infrastructure, /VPS/);
  assert.match(infrastructure, /IPv6/);
});

test('Sprint 8 contact section presents a professional brief surface', () => {
  const contact = readRepoFile('src/components/astro/Contact.astro');
  const contactForm = readRepoFile('src/components/islands/ContactForm.tsx');

  assert.match(contact, /contact-brief-surface/);
  assert.match(contact, /WhatsApp/);
  assert.match(contactForm, /brief-field|contact-field/);
  assert.match(contactForm, /aria-describedby/);
});

test('Sprint 8 project detail pages use editorial and interactive proof surfaces', () => {
  const projectPage = readRepoFile('src/pages/proyectos/[slug].astro');
  const interactiveSection = readRepoFile('src/components/astro/ProjectInteractiveSection.astro');

  assert.match(projectPage, /project-hero/);
  assert.match(projectPage, /project-outcome/);
  assert.match(projectPage, /project-story/);
  assert.match(interactiveSection, /interactive-proof/);
  assert.match(interactiveSection, /interactive-canvas/);
});

test('Sprint 8 interactive demos expose clearer visual states', () => {
  const rsa = readRepoFile('src/islands/RSASimulator.tsx');
  const ipv6 = readRepoFile('src/islands/IPv6MigrationMap.tsx');

  assert.match(rsa, /rsa-result-grid/);
  assert.match(rsa, /rsa-step/);
  assert.match(ipv6, /ipv6-system-map/);
  assert.match(ipv6, /ipv6-node-grid/);
});
```

- [x] **Step 2: Run the hero contract and verify it fails**

Run:

```bash
node --test --experimental-strip-types --test-name-pattern "hero" tests/sprint-8-visual-contract.test.mjs
```

Expected:

```text
not ok
```

The failure must mention a missing Sprint 8 marker such as `hero-visual` or `hero-signal`.

- [x] **Step 3: Commit the failing contract**

Run:

```bash
git add tests/sprint-8-visual-contract.test.mjs
git commit -m "test: add sprint 8 visual contracts"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

---

## Task 2: Refresh Global Visual System

**Files:**
- Modify: `src/styles/global.css`
- Modify: `docs/architecture/design-system.md`
- Test: `tests/sprint-8-visual-contract.test.mjs`

- [x] **Step 1: Update global tokens**

In `src/styles/global.css`, extend `@theme` with:

```css
  --space-20: 5rem;
  --space-32: 8rem;
  --space-36: 9rem;

  --color-surface:           #FFFFFF;
  --color-surface-strong:    #F0F7F8;
  --color-signal-cyan:       #0891B2;
  --color-signal-green:      #15803D;
  --color-signal-amber:      #B45309;
  --color-ink-soft:          #1F2937;
```

In `[data-theme="dark"]`, add:

```css
  --color-surface:           #111113;
  --color-surface-strong:    #132326;
  --color-signal-cyan:       #67E8F9;
  --color-signal-green:      #86EFAC;
  --color-signal-amber:      #FBBF24;
  --color-ink-soft:          #D4D4D8;
```

- [x] **Step 2: Add shared composition utilities**

Add these utilities after `.container` in `src/styles/global.css`:

```css
.section-kicker {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.editorial-section {
  padding-block: var(--space-24);
}

.editorial-title {
  max-width: 12ch;
  font-size: var(--text-4xl);
  line-height: 1.03;
  text-wrap: balance;
}

.motion-rise {
  opacity: 0;
  transform: translateY(var(--space-4));
  animation: motion-rise 560ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes motion-rise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Inside the existing `@media (prefers-reduced-motion: reduce)` block, add:

```css
  .motion-rise {
    opacity: 1;
    transform: none;
    animation: none;
  }
```

Inside `@media (min-width: 1024px)`, add:

```css
  .editorial-title {
    font-size: var(--text-6xl);
  }
```

- [x] **Step 3: Update design system documentation**

In `docs/architecture/design-system.md`, add a section named `## Sprint 8 visual direction` with:

```markdown
## Sprint 8 visual direction

El rediseño usa una dirección `portfolio editorial técnico + laboratorio interactivo`.

- `--color-signal-*` se reserva para estados técnicos, flujos, nodos y señales operativas.
- `.editorial-section` y `.editorial-title` dan ritmo amplio a secciones principales.
- `.section-kicker` unifica etiquetas editoriales sin repetir estilos scoped.
- `.motion-rise` permite motion de entrada reutilizable y respeta `prefers-reduced-motion`.
- Las tarjetas dejan de ser estructura principal; se usan solo para elementos repetidos, controles, formularios o demos.
```

- [x] **Step 4: Run verification**

Run:

```bash
npm run astro -- check
```

Expected:

```text
- 0 errors
- 0 warnings
- 0 hints
```

- [x] **Step 5: Commit**

Run:

```bash
git add src/styles/global.css docs/architecture/design-system.md
git commit -m "feat(ui): refresh sprint 8 visual system"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

---

## Task 3: Refactor Hero Into Editorial Technical First View

**Files:**
- Modify: `src/components/astro/Hero.astro`
- Test: `tests/sprint-8-visual-contract.test.mjs`

- [x] **Step 1: Update hero content model**

In `src/components/astro/Hero.astro`:

- keep `NAME = 'Gadiel Uicab'`
- render `{NAME}` visibly in the hero, not only inside URLs or labels
- keep the WhatsApp URL generation
- keep `/ #proyectos` as the secondary route, written in code as `href="/#proyectos"`
- add a technical visual wrapper with class `hero-visual`
- add at least three technical signal elements with class names containing `hero-signal`

- [x] **Step 2: Replace compact proof layout with a technical visual**

Implement the hero as:

- left or anchored text area: name, offer, short support copy, two CTAs
- right or background visual area: signal map / deploy path / network nodes
- visible stack signal: Astro, Preact Islands, MDX, VPS, IPv6
- no nested card pattern for the hero
- first viewport leaves a hint of the next section visible on desktop and mobile

Required class markers:

```text
hero-section
hero-inner
hero-identity
hero-title
hero-ctas
hero-visual
hero-signal
hero-signal-map
```

- [x] **Step 3: Run focused contract**

Run:

```bash
node --test --experimental-strip-types --test-name-pattern "hero" tests/sprint-8-visual-contract.test.mjs
```

Expected:

```text
# pass 1
# fail 0
```

- [x] **Step 4: Run Astro validation**

Run:

```bash
npm run astro -- check
```

Expected:

```text
- 0 errors
- 0 warnings
- 0 hints
```

- [x] **Step 5: Commit**

Run:

```bash
git add src/components/astro/Hero.astro tests/sprint-8-visual-contract.test.mjs
git commit -m "feat(ui): redesign hero as technical editorial entry"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

---

## Task 4: Redesign Services and About as Editorial Proof

**Files:**
- Modify: `src/components/astro/Services.astro`
- Modify: `src/components/astro/About.astro`
- Test: `npm run astro -- check`

- [x] **Step 1: Refactor services structure**

In `src/components/astro/Services.astro`:

- keep the three active services
- keep web-first as the strongest message
- use class `services-editorial`
- use class `service-proof-row` for each service
- use class `service-current-scope` for active deliverables
- use class `service-future-scope` for complementary infrastructure capability
- remove repeated card-like visual treatment where the section can work as an editorial row

- [x] **Step 2: Refactor about structure**

In `src/components/astro/About.astro`:

- keep UADY, TIDE Fellows, IPv6 básico and LACNIC en progreso
- present them as a progression using class `about-timeline`
- use class `about-timeline-item`
- keep the wording honest about training in progress
- connect the learning evidence to project decisions

- [x] **Step 3: Run Astro validation**

Run:

```bash
npm run astro -- check
```

Expected:

```text
- 0 errors
- 0 warnings
- 0 hints
```

- [x] **Step 4: Manual visual check**

Run:

```bash
npm run dev
```

Expected:

```text
Local
```

Open `http://localhost:4321/#servicios` and `http://localhost:4321/#sobre-mi`.

Acceptance:

- services do not read as a compact card list
- active offer and future/complementary capability are visually distinct
- about section reads as progression, not a dense evidence panel

- [x] **Step 5: Commit**

Run:

```bash
git add src/components/astro/Services.astro src/components/astro/About.astro
git commit -m "feat(ui): reshape services and profile evidence"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

Stop the dev server before moving to the next task.

---

## Task 5: Redesign Projects as an Evidence Showcase

**Files:**
- Modify: `src/components/islands/ProjectFilter.tsx`
- Test: `tests/sprint-8-visual-contract.test.mjs`

- [x] **Step 1: Refactor project section classes and structure**

In `src/components/islands/ProjectFilter.tsx`:

- add wrapper class `project-showcase`
- add a highlighted project surface with class `project-feature`
- keep category filtering with `aria-pressed`
- keep `resolveSlug(project)` links
- add class `project-result` to the visible result/outcome text
- keep stack badges secondary to result and summary

- [x] **Step 2: Preserve project filtering behavior**

Keep this behavior unchanged:

```ts
if (activeCategory === 'All') return projects;
return projects.filter((project) => project.data.category === activeCategory);
```

Keep category labels through `getCategoryLabel(category)`.

- [x] **Step 3: Improve category control visual feedback**

Implement:

- active category has border and background changes
- inactive category remains readable
- icon remains visible
- focus state is visible through existing global `:focus-visible`
- no category button becomes smaller than `48px` high

- [x] **Step 4: Run focused contract**

Run:

```bash
node --test --experimental-strip-types --test-name-pattern "projects" tests/sprint-8-visual-contract.test.mjs
```

Expected:

```text
# pass 1
# fail 0
```

- [x] **Step 5: Run full tests**

Run:

```bash
npm test
```

Expected:

```text
# fail 0
```

- [x] **Step 6: Commit**

Run:

```bash
git add src/components/islands/ProjectFilter.tsx tests/sprint-8-visual-contract.test.mjs
git commit -m "feat(ui): present projects as evidence showcase"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

---

## Task 6: Convert Infrastructure Into an Operational Flow

**Files:**
- Modify: `src/components/astro/Infrastructure.astro`
- Test: `tests/sprint-8-visual-contract.test.mjs`

- [x] **Step 1: Add operational flow model**

In `src/components/astro/Infrastructure.astro`, define an array named `systemFlow` with these exact titles:

```ts
const systemFlow = [
  {
    title: 'Astro Build',
    status: 'Static output',
    detail: 'Genera HTML, CSS y JS en build-time para una salida determinista.',
  },
  {
    title: 'GitHub Actions CI/CD',
    status: 'Deploy automatizado',
    detail: 'Compila y publica artefactos por SSH/rsync hacia el VPS.',
  },
  {
    title: 'VPS Linux',
    status: 'Servidor propio',
    detail: 'Opera el sitio en infraestructura controlada con usuario de deploy.',
  },
  {
    title: 'Nginx + HTTPS',
    status: 'Entrega segura',
    detail: 'Sirve el sitio estático con TLS y superficie reducida.',
  },
  {
    title: 'IPv4 / IPv6',
    status: 'Dual-stack validado',
    detail: 'Permite validar conectividad pública por ambos stacks.',
  },
];
```

- [x] **Step 2: Render the flow visually**

Render `systemFlow` with:

- wrapper class `infra-system-flow`
- item class `infra-system-node`
- status class `infra-system-status`
- connecting visual line or separator between nodes
- copy that presents infrastructure as evidence, not as the primary commercial offer

- [x] **Step 3: Reduce repeated compact blocks**

Keep these topics but remove duplicate-feeling sections where possible:

- Static-first philosophy
- Networking and IPv6
- Operational/NOC criteria
- Security and performance

Acceptance:

- the section can be scanned by following the system flow first
- cards are used only where repeated technical items need structure
- CI/CD, VPS and IPv6 are visible without reading every paragraph

- [x] **Step 4: Run focused contract**

Run:

```bash
node --test --experimental-strip-types --test-name-pattern "infrastructure" tests/sprint-8-visual-contract.test.mjs
```

Expected:

```text
# pass 1
# fail 0
```

- [x] **Step 5: Run Astro validation**

Run:

```bash
npm run astro -- check
```

Expected:

```text
- 0 errors
- 0 warnings
- 0 hints
```

- [x] **Step 6: Commit**

Run:

```bash
git add src/components/astro/Infrastructure.astro tests/sprint-8-visual-contract.test.mjs
git commit -m "feat(ui): turn infrastructure into operational flow"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

---

## Task 7: Redesign Contact as a Conversion Brief

**Files:**
- Modify: `src/components/astro/Contact.astro`
- Modify: `src/components/islands/ContactForm.tsx`
- Test: `tests/contact-form.test.mjs`
- Test: `tests/sprint-8-visual-contract.test.mjs`

- [x] **Step 1: Update contact section layout**

In `src/components/astro/Contact.astro`:

- add class `contact-brief-surface` to the form column wrapper
- keep WhatsApp as the first action
- keep email as secondary channel
- keep Formspree-driven form island unchanged at the integration boundary
- remove copy that makes infrastructure the closing focus

- [x] **Step 2: Update form visual classes**

In `src/components/islands/ContactForm.tsx`:

- keep `validateContactForm` and `createContactPayload` usage unchanged
- add class `brief-field` or `contact-field` to every visible field wrapper
- keep `aria-describedby` for fields with helper or error text
- keep honeypot behavior unchanged
- keep fallback to WhatsApp on submission failure

- [x] **Step 3: Run contact logic tests**

Run:

```bash
node --test --experimental-strip-types tests/contact-form.test.mjs
```

Expected:

```text
# fail 0
```

- [x] **Step 4: Run contact visual contract**

Run:

```bash
node --test --experimental-strip-types --test-name-pattern "contact" tests/sprint-8-visual-contract.test.mjs
```

Expected:

```text
# pass 1
# fail 0
```

- [x] **Step 5: Commit**

Run:

```bash
git add src/components/astro/Contact.astro src/components/islands/ContactForm.tsx tests/sprint-8-visual-contract.test.mjs
git commit -m "feat(ui): redesign contact as professional brief"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

---

## Task 8: Redesign Project Detail Pages and Interactive Proof Shell

**Files:**
- Modify: `src/pages/proyectos/[slug].astro`
- Modify: `src/components/astro/ProjectInteractiveSection.astro`
- Test: `tests/sprint-8-visual-contract.test.mjs`

- [x] **Step 1: Refactor project page markers**

In `src/pages/proyectos/[slug].astro`:

- add class `project-hero` to the header area
- add class `project-story` to the problem/solution narrative wrapper
- add class `project-outcome` to the result section
- keep breadcrumb structured data
- keep canonical, Open Graph and structured data props in `<Layout />`
- keep previous/next navigation

- [x] **Step 2: Improve project narrative layout**

Implement:

- title and category remain visible above fold
- result/outcome appears as a strong proof block
- stack is secondary
- MDX content remains constrained and readable
- external links remain available when `githubUrl` or `demoUrl` exists

- [x] **Step 3: Refactor interactive section**

In `src/components/astro/ProjectInteractiveSection.astro`:

- add wrapper class `interactive-proof`
- keep class `interactive-canvas`
- make the canvas wider than prose on desktop when space allows
- keep the note readable and secondary
- preserve the existing slot API

- [x] **Step 4: Run focused contract**

Run:

```bash
node --test --experimental-strip-types --test-name-pattern "project detail" tests/sprint-8-visual-contract.test.mjs
```

Expected:

```text
# pass 1
# fail 0
```

- [x] **Step 5: Run Astro validation**

Run:

```bash
npm run astro -- check
```

Expected:

```text
- 0 errors
- 0 warnings
- 0 hints
```

- [x] **Step 6: Commit**

Run:

```bash
git add 'src/pages/proyectos/[slug].astro' src/components/astro/ProjectInteractiveSection.astro tests/sprint-8-visual-contract.test.mjs
git commit -m "feat(ui): make project pages editorial proof cases"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

---

## Task 9: Upgrade RSA and IPv6 Interactive Demos

**Files:**
- Modify: `src/islands/RSASimulator.tsx`
- Modify: `src/islands/IPv6MigrationMap.tsx`
- Test: `tests/sprint-8-visual-contract.test.mjs`

- [x] **Step 1: Upgrade RSA visual hierarchy**

In `src/islands/RSASimulator.tsx`:

- add class `rsa-result-grid` around computed values
- add class `rsa-step` for key calculation steps
- keep presets and validation behavior unchanged
- keep error messages in Spanish
- ensure input labels remain visible and associated with fields

- [x] **Step 2: Upgrade IPv6 map hierarchy**

In `src/islands/IPv6MigrationMap.tsx`:

- add class `ipv6-system-map`
- keep class `ipv6-node-grid`
- keep phase buttons accessible as `button`
- keep selected phase state driven by `activePhaseId`
- make active phase visually distinct without relying only on color

- [x] **Step 3: Run focused contract**

Run:

```bash
node --test --experimental-strip-types --test-name-pattern "interactive demos" tests/sprint-8-visual-contract.test.mjs
```

Expected:

```text
# pass 1
# fail 0
```

- [x] **Step 4: Run full tests**

Run:

```bash
npm test
```

Expected:

```text
# fail 0
```

- [x] **Step 5: Commit**

Run:

```bash
git add src/islands/RSASimulator.tsx src/islands/IPv6MigrationMap.tsx tests/sprint-8-visual-contract.test.mjs
git commit -m "feat(ui): strengthen interactive proof demos"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

---

## Task 10: Full Responsive and Accessibility Pass

**Files:**
- Modify: files from Tasks 2-9 only when issues are found
- Modify: `docs/quality/accessibility.md`
- Modify: `docs/quality/verification.md`

- [ ] **Step 1: Start local dev server**

Run:

```bash
npm run dev
```

Expected:

```text
Local
```

Use the shown local URL, normally `http://localhost:4321/`.

- [ ] **Step 2: Review responsive breakpoints**

Manually review:

```text
/
/proyectos/portafolio-m4/
/proyectos/migracion-ipv6/
/proyectos/rsa-en-c/
```

At these widths:

```text
375px
390px
768px
1440px
```

Acceptance:

- no horizontal overflow
- no title clips or overlaps
- CTA text fits inside buttons
- project filters remain usable
- RSA and IPv6 demos remain readable
- contact form fields fit mobile width

- [ ] **Step 3: Review keyboard flow**

Manual acceptance:

- skip link appears on focus
- nav links are reachable
- project filters show focus and active state
- contact fields show focus
- submit button is reachable
- project navigation links are reachable

- [ ] **Step 4: Update accessibility documentation**

In `docs/quality/accessibility.md`, add a section named `## Sprint 8 visual refactor review` with:

```markdown
## Sprint 8 visual refactor review

Checks required before closing Sprint 8:

- keyboard navigation through nav, project filters, project links and contact form
- visible focus on buttons, links, filter controls and form fields
- contrast review for primary CTA, secondary CTA, filters, form errors and technical signal colors
- `prefers-reduced-motion` review for hero, section reveals and demo transitions
- mobile review at `375px` and `390px`
```

- [ ] **Step 5: Update verification documentation**

In `docs/quality/verification.md`, add under `## Evidencia mínima que conviene registrar en PR o entrega`:

```markdown
Para Sprint 8, registrar también:

- breakpoints revisados
- páginas de proyecto revisadas
- resultado de interacción en RSA e IPv6
- resultado Lighthouse de home y una página de proyecto
```

- [ ] **Step 6: Commit**

Run:

```bash
git add src/styles/global.css src/components/astro src/components/islands src/islands 'src/pages/proyectos/[slug].astro' docs/quality/accessibility.md docs/quality/verification.md
git commit -m "fix(ui): complete responsive and accessibility pass"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

Stop the dev server before moving to the next task.

---

## Task 11: Build, Performance and Sprint Closure Documentation

**Files:**
- Modify: `docs/sprints/sprint-8-refactor-visual-ui.md`
- Modify: `docs/quality/performance-budget.md`
- Modify: `docs/product/backlog.md`

- [ ] **Step 1: Run full test suite**

Run:

```bash
npm test
```

Expected:

```text
# fail 0
```

- [ ] **Step 2: Run Astro validation**

Run:

```bash
npm run astro -- check
```

Expected:

```text
- 0 errors
- 0 warnings
- 0 hints
```

- [ ] **Step 3: Run production build**

Run:

```bash
npm run build
```

Expected:

```text
completed in
```

The command must exit with code `0`.

- [ ] **Step 4: Run local preview**

Run:

```bash
npm run preview
```

Expected:

```text
Local
```

Review:

```text
/
/proyectos/portafolio-m4/
/proyectos/migracion-ipv6/
/proyectos/rsa-en-c/
```

- [ ] **Step 5: Run Lighthouse manually**

Run Lighthouse in browser DevTools for:

```text
http://localhost:4321/
http://localhost:4321/proyectos/portafolio-m4/
```

Acceptance:

- Accessibility: `100`
- Best Practices: `100`
- SEO: `100`
- Performance: `>= 95` for home
- Performance: `>= 90` for project page

- [ ] **Step 6: Update performance budget**

In `docs/quality/performance-budget.md`, add a section named `## Evidencia Sprint 8` with:

```markdown
## Evidencia Sprint 8

Fecha: 2026-04-22

- Lighthouse home: registrar Performance, Accessibility, Best Practices y SEO medidos en DevTools.
- Lighthouse proyecto `/proyectos/portafolio-m4/`: registrar Performance, Accessibility, Best Practices y SEO medidos en DevTools.
- JavaScript de cliente se mantiene limitado a islas justificadas: filtros, contacto, WhatsApp, RSA e IPv6.
- No se agregaron librerías pesadas de animación.
```

- [ ] **Step 7: Update Sprint 8 checklist**

In `docs/sprints/sprint-8-refactor-visual-ui.md`:

- mark completed checkboxes
- add `## Evidencia de cierre`
- include commands run and results
- include Lighthouse values
- include responsive pages and widths reviewed
- include residual risks if any

- [ ] **Step 8: Update backlog**

In `docs/product/backlog.md`:

- move Sprint 8 planning from `En progreso` to `Completado`
- move execution of rediseño visual out of `Pendiente`
- add any new visual follow-up under `Pendiente`

- [ ] **Step 9: Commit closure docs**

Run:

```bash
git add docs/sprints/sprint-8-refactor-visual-ui.md docs/quality/performance-budget.md docs/product/backlog.md
git commit -m "docs: close sprint 8 visual refactor evidence"
```

Expected:

```text
[feat/sprint-8-visual-refactor
```

---

## Task 12: Final Review Before PR or Merge

**Files:**
- Read: all modified files from this plan
- Test: `npm test`
- Test: `npm run astro -- check`
- Test: `npm run build`

- [ ] **Step 1: Inspect final changed files**

Run:

```bash
git status --short
```

Expected:

```text
```

If the working tree is not clean, inspect changes with:

```bash
git diff --stat
git diff --check
```

`git diff --check` must return no output.

- [ ] **Step 2: Run final tests**

Run:

```bash
npm test
```

Expected:

```text
# fail 0
```

- [ ] **Step 3: Run final Astro check**

Run:

```bash
npm run astro -- check
```

Expected:

```text
- 0 errors
- 0 warnings
- 0 hints
```

- [ ] **Step 4: Run final build**

Run:

```bash
npm run build
```

Expected:

```text
completed in
```

The command must exit with code `0`.

- [ ] **Step 5: Summarize final state**

Prepare final handoff with:

```markdown
## Summary

- Rediseñé la home como portfolio editorial técnico.
- Convertí proyectos, infraestructura y demos interactivas en evidencia visual más fuerte.
- Actualicé documentación de Sprint 8, verificación y performance.

## Verification

- `npm test`
- `npm run astro -- check`
- `npm run build`
- Lighthouse home: reportar score medido.
- Lighthouse proyecto: reportar score medido.

## Notes

- Archivos no relacionados preservados: `AGENTS.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`.
```
