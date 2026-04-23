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

test('Home hero and services use summary-first copy with progressive disclosure', () => {
  const hero = readRepoFile('src/components/astro/Hero.astro');
  const services = readRepoFile('src/components/astro/Services.astro');

  assert.match(hero, /hero-trust-chips/);
  assert.match(hero, /Ver contexto tecnico/);
  assert.match(hero, /UADY|TIDE Fellow 2026/);

  assert.match(services, /service-disclosure/);
  assert.match(services, /<details/);
  assert.match(services, /Ver alcance/);
  assert.match(services, /Operacion real como evidencia tecnica para proyectos web\./);
  assert.doesNotMatch(services, /Ver evidencia operacional/);
  assert.doesNotMatch(services, /La base tecnica aparece como evidencia de criterio para decidir mejor/);
  assert.doesNotMatch(services, /La capa operativa refuerza confianza tecnica, pero la oferta activa sigue siendo web-first\./);
});

test('Sprint 8 projects section behaves as an evidence showcase', () => {
  const projects = readRepoFile('src/components/islands/ProjectFilter.tsx');

  assert.match(projects, /project-showcase/);
  assert.match(projects, /project-feature/);
  assert.match(projects, /project-result/);
  assert.match(projects, /aria-pressed/);
});

test('Projects section keeps compact cards and exposes expandable detail', () => {
  const projects = readRepoFile('src/components/islands/ProjectFilter.tsx');

  assert.match(projects, /project-disclosure/);
  assert.match(projects, /Ver resumen/);
  assert.match(projects, /problem|solution|result/);
});

test('Sprint 8 infrastructure section presents an operational flow', () => {
  const infrastructure = readRepoFile('src/components/astro/Infrastructure.astro');

  assert.match(infrastructure, /infra-system-flow/);
  assert.match(infrastructure, /CI\/CD|GitHub Actions/);
  assert.match(infrastructure, /VPS/);
  assert.match(infrastructure, /IPv6/);
});

test('About and infrastructure use compact visible proof with disclosures', () => {
  const about = readRepoFile('src/components/astro/About.astro');
  const infrastructure = readRepoFile('src/components/astro/Infrastructure.astro');

  assert.match(about, /about-credential-chips|about-disclosure/);
  assert.match(infrastructure, /infra-disclosure/);
  assert.match(infrastructure, /Ver evidencia/);
});

test('Sprint 8 contact section presents a professional brief surface', () => {
  const contact = readRepoFile('src/components/astro/Contact.astro');
  const contactForm = readRepoFile('src/components/islands/ContactForm.tsx');

  assert.match(contact, /contact-brief-surface/);
  assert.match(contact, /WhatsApp/);
  assert.match(contactForm, /brief-field|contact-field/);
  assert.match(contactForm, /aria-describedby/);
  assert.doesNotMatch(contactForm, /Fallback/);
});

test('Contact remains direct and avoids extra disclosure patterns', () => {
  const contact = readRepoFile('src/components/astro/Contact.astro');

  assert.match(contact, /contact-action--primary/);
  assert.doesNotMatch(contact, /<details/);
  assert.match(contact, /Hablemos de tu sitio\./);
  assert.match(contact, /sitios para negocio, landing pages y portafolios profesionales/);
  assert.match(contact, /necesitan verse[\s\S]*mejor/);
  assert.match(contact, /explicar su oferta con claridad y convertir interes en conversaciones reales/);
  assert.match(contact, /idea, una referencia o un objetivo concreto/);
  assert.match(contact, /proponerte un alcance mas claro/);
  assert.match(contact, /orientarte[\s\S]*mejor sobre tiempos y siguiente paso/);
  assert.doesNotMatch(contact, /antes de hablar de infraestructura/);
});

test('Sprint 8 project detail pages use editorial and interactive proof surfaces', () => {
  const projectPage = readRepoFile('src/pages/proyectos/[slug].astro');
  const interactiveSection = readRepoFile('src/components/astro/ProjectInteractiveSection.astro');
  const visualSection = readRepoFile('src/components/astro/ProjectVisualSection.astro');

  assert.match(projectPage, /project-hero/);
  assert.match(projectPage, /ProjectVisualSection/);
  assert.match(projectPage, /project-outcome/);
  assert.match(projectPage, /project-story/);
  assert.match(visualSection, /project-visual-section/);
  assert.match(visualSection, /ogImage/);
  assert.match(visualSection, /projectSlug === 'rsa-en-c'/);
  assert.match(visualSection, /projectSlug === 'migracion-ipv6'/);
  assert.match(visualSection, /projectSlug === 'dashboard-noc'/);
  assert.match(visualSection, /projectSlug === 'portafolio-m4'/);
  assert.match(interactiveSection, /interactive-proof/);
  assert.match(interactiveSection, /interactive-canvas/);
});

test('Project visual section uses specific labels instead of a generic evidence title', () => {
  const visualSection = readRepoFile('src/components/astro/ProjectVisualSection.astro');

  assert.doesNotMatch(visualSection, /Evidencia tecnica/);
  assert.match(visualSection, /Laboratorio visual/);
  assert.match(visualSection, /Prueba criptografica/);
  assert.match(visualSection, /Mapa operativo/);
  assert.match(visualSection, /Transicion IPv6 controlada/);
  assert.match(visualSection, /Cockpit operativo/);
  assert.match(visualSection, /Supervision NOC/);
  assert.match(visualSection, /Blueprint de conversion/);
  assert.match(visualSection, /Arquitectura del sitio/);
});

test('Project detail MDX headings keep the same typography as narrative section headings', () => {
  const projectPage = readRepoFile('src/pages/proyectos/[slug].astro');

  assert.match(projectPage, /\.narrative-title\s*{[^}]*font-family:\s*var\(--font-body\)/s);
  assert.match(projectPage, /\.prose\s+:global\(:is\(h2,\s*h3,\s*h4\)\)\s*{[^}]*font-family:\s*var\(--font-body\)/s);
  assert.match(projectPage, /\.prose\s+:global\(:is\(h2,\s*h3,\s*h4\)\)\s*{[^}]*font-weight:\s*500/s);
});

test('Sprint 8 interactive demos expose clearer visual states', () => {
  const rsa = readRepoFile('src/islands/RSASimulator.tsx');
  const ipv6 = readRepoFile('src/islands/IPv6MigrationMap.tsx');

  assert.match(rsa, /rsa-result-grid/);
  assert.match(rsa, /rsa-step/);
  assert.match(ipv6, /ipv6-system-map/);
  assert.match(ipv6, /ipv6-node-grid/);
});

test('IPv6 project visual reads as a premium operational migration sheet', () => {
  const ipv6Visual = readRepoFile('src/components/astro/project-visuals/IPv6ProjectVisual.astro');

  assert.match(ipv6Visual, /ipv6-visual__route-map/);
  assert.match(ipv6Visual, /ipv6-visual__stack-state/);
  assert.match(ipv6Visual, /IPv4/);
  assert.match(ipv6Visual, /Dual-stack/);
  assert.match(ipv6Visual, /IPv6 operativo/);
  assert.match(ipv6Visual, /Rollback/);
  assert.match(ipv6Visual, /Telemetria/);
  assert.match(ipv6Visual, /NDP/);
  assert.match(ipv6Visual, /SLAAC/);
});

test('Dashboard NOC project visual reads as an operations cockpit', () => {
  const nocVisual = readRepoFile('src/components/astro/project-visuals/NocProjectVisual.astro');

  assert.match(nocVisual, /noc-visual__kpi-grid/);
  assert.match(nocVisual, /Disponibilidad/);
  assert.match(nocVisual, /Alertas criticas/);
  assert.match(nocVisual, /Servicios criticos/);
  assert.match(nocVisual, /Capacidad/);
  assert.match(nocVisual, /Incidente/);
});

test('Portfolio M4 project visual reads as a conversion blueprint', () => {
  const portfolioVisual = readRepoFile('src/components/astro/project-visuals/PortfolioProjectVisual.astro');

  assert.match(portfolioVisual, /portfolio-visual__site-map/);
  assert.match(portfolioVisual, /Hero/);
  assert.match(portfolioVisual, /Servicios/);
  assert.match(portfolioVisual, /Proyectos/);
  assert.match(portfolioVisual, /Contacto/);
  assert.match(portfolioVisual, /Astro/);
  assert.match(portfolioVisual, /CTA/);
});
