# Home Progressive Disclosure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reducir la densidad de texto visible en la home del portafolio usando disclosure progresivo sin eliminar informacion importante ni romper la oferta web-first.

**Architecture:** La implementacion se concentra en los componentes existentes de la home y mantiene la estructura actual de la portada. La estrategia combina copy resumido, chips de confianza y disclosures nativos con `details/summary` para servicios, proyectos, sobre mi e infraestructura, dejando contacto como cierre directo.

**Tech Stack:** Astro 6, Preact, TypeScript, CSS scoped en componentes Astro, Node test runner

---

## File Map

- Modify: `tests/sprint-8-visual-contract.test.mjs`
  - Extender el contrato visual de la home para asegurar resumen visible, chips y disclosures.
- Modify: `src/components/astro/Hero.astro`
  - Compactar hero, agregar chips de confianza y disclosure opcional de contexto tecnico.
- Modify: `src/components/astro/Services.astro`
  - Convertir servicios en filas escaneables con disclosures por servicio y disclosure para capacidad complementaria.
- Modify: `src/components/islands/ProjectFilter.tsx`
  - Mantener cards compactas y abrir problema/solucion/resultado extendido bajo demanda.
- Modify: `src/components/astro/About.astro`
  - Resumir la seccion a credenciales visibles y disclosures por criterio.
- Modify: `src/components/astro/Infrastructure.astro`
  - Mantener pipeline corto visible y pasar evidencia ampliada a disclosures.
- Modify: `src/components/astro/Contact.astro`
  - Reducir copy visible y reforzar cierre directo sin disclosure.
- Modify: `docs/superpowers/current-context.md`
  - Registrar avance, archivos modificados y validacion ejecutada al terminar.

### Task 1: Hero + Servicios compactos con disclosure

**Files:**
- Modify: `tests/sprint-8-visual-contract.test.mjs`
- Modify: `src/components/astro/Hero.astro`
- Modify: `src/components/astro/Services.astro`

- [ ] **Step 1: Write the failing test**

```js
test('Home hero and services use summary-first copy with progressive disclosure', () => {
  const hero = readRepoFile('src/components/astro/Hero.astro');
  const services = readRepoFile('src/components/astro/Services.astro');

  assert.match(hero, /hero-trust-chips/);
  assert.match(hero, /Ver contexto tecnico/);
  assert.doesNotMatch(hero, /La capa de infraestructura, redes y operacion no desplaza/);

  assert.match(services, /service-disclosure/);
  assert.match(services, /<details/);
  assert.match(services, /Ver alcance/);
  assert.doesNotMatch(services, /La base tecnica aparece como evidencia de criterio para decidir mejor/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="summary-first copy"`

Expected: FAIL because `hero-trust-chips`, `Ver contexto tecnico` and `service-disclosure` do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```astro
---
const TRUST_CHIPS = ['Astro', 'MDX', 'VPS', 'IPv6'];
---

<ul class="hero-trust-chips" role="list">
  {TRUST_CHIPS.map((item) => <li>{item}</li>)}
</ul>

<details class="hero-context-disclosure">
  <summary>Ver contexto tecnico</summary>
  <p>UADY, TIDE Fellows 2026 y despliegue real como evidencia.</p>
</details>
```

```astro
<details class="service-disclosure">
  <summary>Ver alcance</summary>
  <p>{idealFor}</p>
  <ul role="list">
    {deliverables.map((item) => <li>{item}</li>)}
  </ul>
</details>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="summary-first copy"`

Expected: PASS

- [ ] **Step 5: Run local regression checks for touched files**

Run: `npm run astro -- check`

Expected: `0 errors`

- [ ] **Step 6: Commit**

```bash
git add tests/sprint-8-visual-contract.test.mjs src/components/astro/Hero.astro src/components/astro/Services.astro
git commit -m "feat(home): add summary-first hero and services"
```

### Task 2: Proyectos con cards expandibles

**Files:**
- Modify: `tests/sprint-8-visual-contract.test.mjs`
- Modify: `src/components/islands/ProjectFilter.tsx`

- [ ] **Step 1: Write the failing test**

```js
test('Projects section keeps compact cards and exposes expandable detail', () => {
  const projects = readRepoFile('src/components/islands/ProjectFilter.tsx');

  assert.match(projects, /project-disclosure/);
  assert.match(projects, /Ver resumen/);
  assert.match(projects, /problem|solution|result/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="expandable detail"`

Expected: FAIL because the disclosure affordance does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```tsx
<details class="project-disclosure">
  <summary>Ver resumen</summary>
  <p class="project-story-line"><strong>Problema:</strong> {project.data.problem}</p>
  <p class="project-story-line"><strong>Solucion:</strong> {project.data.solution}</p>
  <p class="project-story-line"><strong>Resultado:</strong> {project.data.result}</p>
</details>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="expandable detail"`

Expected: PASS

- [ ] **Step 5: Run local regression checks for touched files**

Run: `npm test`

Expected: all tests pass

- [ ] **Step 6: Commit**

```bash
git add tests/sprint-8-visual-contract.test.mjs src/components/islands/ProjectFilter.tsx
git commit -m "feat(home): make project cards expandable"
```

### Task 3: Sobre mi + Infraestructura con evidencia bajo demanda

**Files:**
- Modify: `tests/sprint-8-visual-contract.test.mjs`
- Modify: `src/components/astro/About.astro`
- Modify: `src/components/astro/Infrastructure.astro`

- [ ] **Step 1: Write the failing test**

```js
test('About and infrastructure use compact visible proof with disclosures', () => {
  const about = readRepoFile('src/components/astro/About.astro');
  const infrastructure = readRepoFile('src/components/astro/Infrastructure.astro');

  assert.match(about, /about-credential-chips|about-disclosure/);
  assert.match(infrastructure, /infra-disclosure/);
  assert.match(infrastructure, /Ver evidencia/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="compact visible proof"`

Expected: FAIL because the disclosure classes do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```astro
<details class="about-disclosure">
  <summary>Ver criterio</summary>
  <p class="about-decision">{decision}</p>
</details>
```

```astro
<details class="infra-disclosure">
  <summary>Ver evidencia</summary>
  <p>{track.detail}</p>
</details>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="compact visible proof"`

Expected: PASS

- [ ] **Step 5: Run local regression checks for touched files**

Run: `npm run astro -- check`

Expected: `0 errors`

- [ ] **Step 6: Commit**

```bash
git add tests/sprint-8-visual-contract.test.mjs src/components/astro/About.astro src/components/astro/Infrastructure.astro
git commit -m "feat(home): collapse about and infrastructure detail"
```

### Task 4: Contacto, validacion final y contexto activo

**Files:**
- Modify: `tests/sprint-8-visual-contract.test.mjs`
- Modify: `src/components/astro/Contact.astro`
- Modify: `docs/superpowers/current-context.md`

- [ ] **Step 1: Write the failing test**

```js
test('Contact remains direct and avoids extra disclosure patterns', () => {
  const contact = readRepoFile('src/components/astro/Contact.astro');

  assert.match(contact, /contact-action--primary/);
  assert.doesNotMatch(contact, /<details/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="remains direct"`

Expected: FAIL if contact still carries verbose copy or new disclosure slips in.

- [ ] **Step 3: Write minimal implementation**

```astro
<h2 id="contact-heading" class="contact-title">Hablemos de tu sitio.</h2>
<p class="contact-description">WhatsApp sigue siendo la via mas rapida para cotizar.</p>
```

```md
## Archivos modificados por esta tarea

- `src/components/astro/Hero.astro`
- `src/components/astro/Services.astro`
- `src/components/islands/ProjectFilter.tsx`
- `src/components/astro/About.astro`
- `src/components/astro/Infrastructure.astro`
- `src/components/astro/Contact.astro`
- `tests/sprint-8-visual-contract.test.mjs`
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="remains direct"`

Expected: PASS

- [ ] **Step 5: Run final verification**

Run: `npm test && npm run astro -- check && npm run build`

Expected: all tests pass, Astro check clean, build generated successfully

- [ ] **Step 6: Commit**

```bash
git add tests/sprint-8-visual-contract.test.mjs src/components/astro/Contact.astro docs/superpowers/current-context.md
git commit -m "feat(home): finish progressive disclosure refactor"
```

## Self-Review

- Spec coverage: hero, servicios, proyectos, sobre mi, infraestructura y contacto quedan cubiertos por tareas separadas.
- Placeholder scan: no quedan TODO ni referencias vagas.
- Consistencia: el patron base se mantiene en disclosures, cards expandibles y chips; tabs quedan fuera del plan base.
