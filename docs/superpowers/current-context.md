# Contexto activo

## Fecha

2026-04-23

## Resumen operativo

Las paginas de proyecto ya cuentan con una capa visual editorial reusable documentada en `ADR 0006`.

La nueva decision activa no cambia esa implementacion. Define la siguiente mejora del sitio: reducir la densidad de texto en la home sin eliminar informacion importante.

La direccion aprobada es una home con disclosure progresivo:

- menos texto visible por defecto
- misma estructura general de la portada
- profundidad conservada en bloques desplegables
- prioridad comercial para la oferta web-first

El kit de patrones aprobado para esta iteracion es:

- acordeones accesibles para servicios, sobre mi e infraestructura
- cards expandibles para el listado de proyectos
- chips y microcopy para stack, credenciales y senales tecnicas

Tabs quedan fuera como patron base. Solo se consideran si infraestructura sigue viendose pesada despues del primer recorte.

Avance implementado en esta iteracion:

- `Hero.astro` conserva disclosure `Ver contexto tecnico`, pero recupera mas contexto visible en la primera pantalla, incluyendo senal academica y credencial activa.
- `Services.astro` ya cambio a resumen visible + `details/summary` por servicio con `Ver alcance`.
- La capacidad complementaria de servicios ya no usa disclosure: toda la evidencia operacional queda visible en texto fijo para evitar superposicion visual.
- `ProjectFilter.tsx` ya movio el resumen largo de las cards a `Ver resumen` y dejo visible primero el resultado.
- `About.astro` ya resume credenciales visibles y mueve el criterio extendido a `Ver criterio`, preservando el cambio local previo.
- `Infrastructure.astro` ya conserva el flujo visible y mueve la explicacion extendida a `Ver evidencia`.
- `Contact.astro` sigue sin disclosures y ahora combina confianza comercial con claridad para cotizar desde la columna izquierda, sin tocar el formulario.
- `ContactForm.tsx` elimina la etiqueta visible `Fallback` y deja una nota minima de continuidad por WhatsApp o correo.
- Se agrego una prueba contractual en `tests/sprint-8-visual-contract.test.mjs` para proteger este comportamiento summary-first.

Estado actual:

- La home ya aplica disclosure progresivo en hero, servicios, proyectos, sobre mi e infraestructura.
- La primera pantalla ya no queda demasiado recortada: mantiene lectura breve, pero con mas contexto visible.
- La capacidad complementaria queda completamente visible, sin hide thing, para evitar cualquier superposicion.
- Contacto se mantiene directo, sin colapsables, con mejor contexto comercial y mejor orientacion para mandar un primer brief.
- La iteracion documental y de implementacion para la home queda actualizada tras el pase de feedback.

## Metodo de trabajo vigente

- Usar `docs/superpowers/contexto-minimo-documentado.md` como protocolo de continuidad.
- Leer primero este archivo antes de abrir specs, planes o sprints historicos.
- Para tareas sobre la home, abrir solo el componente objetivo y sus dependencias cercanas.
- No eliminar contenido util mientras pueda resolverse con disclosure progresivo.

## Decision registrada

- `docs/architecture/adr/0006-project-visual-section.md`: visuales editoriales aislados para casos de estudio.
- `docs/architecture/adr/0007-home-progressive-disclosure.md`: disclosure progresivo para reducir densidad de texto en la home.

## Archivos modificados por esta tarea

- `src/components/astro/Hero.astro`
- `src/components/astro/Services.astro`
- `src/components/islands/ProjectFilter.tsx`
- `src/components/astro/About.astro`
- `src/components/astro/Infrastructure.astro`
- `src/components/astro/Contact.astro`
- `tests/sprint-8-visual-contract.test.mjs`
- `docs/superpowers/specs/2026-04-23-home-progressive-disclosure-design.md`
- `docs/architecture/adr/0007-home-progressive-disclosure.md`
- `docs/superpowers/plans/2026-04-23-home-progressive-disclosure-implementation.md`
- `docs/superpowers/current-context.md`

## Validacion ejecutada

- Revision manual del spec para consistencia interna, alcance y ausencia de placeholders.
- `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="summary-first copy"`: PASS
- `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="expandable detail"`: PASS
- `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="compact visible proof"`: PASS
- `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs --test-name-pattern="remains direct"`: PASS
- `node --test --experimental-strip-types tests/sprint-8-visual-contract.test.mjs`: PASS
- `npm test`: 20 pruebas pasan, 0 fallan
- `npm run astro -- check`: 0 errors, 0 warnings, 0 hints
- `npm run build`: 6 paginas generadas correctamente
- Servidor local de revision: `http://127.0.0.1:4321/`

## Nota de alcance

Se mantienen cambios previos no relacionados en documentos de sprint, archivos raiz y `src/components/astro/About.astro`. No se revirtieron ni se integraron dentro de esta iteracion.

## Siguiente tarea sugerida

Hacer QA visual manual de la home en desktop y mobile, y decidir si la siguiente iteracion sera ajuste fino de spacing/copy o publicacion.
