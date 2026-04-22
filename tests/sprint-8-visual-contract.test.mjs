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
