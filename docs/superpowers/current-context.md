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

- `Hero.astro` ya paso a un formato mas corto con titular compacto, chips visibles y disclosure `Ver contexto tecnico`.
- `Services.astro` ya cambio a resumen visible + `details/summary` por servicio con `Ver alcance`.
- La capacidad complementaria de servicios ya no usa un bloque largo fijo; ahora conserva detalle tecnico bajo demanda.
- `ProjectFilter.tsx` ya movio el resumen largo de las cards a `Ver resumen` y dejo visible primero el resultado.
- `About.astro` ya resume credenciales visibles y mueve el criterio extendido a `Ver criterio`, preservando el cambio local previo.
- `Infrastructure.astro` ya conserva el flujo visible y mueve la explicacion extendida a `Ver evidencia`.
- Se agrego una prueba contractual en `tests/sprint-8-visual-contract.test.mjs` para proteger este comportamiento summary-first.

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
- `npm test`: 18 pruebas pasan, 0 fallan
- `npm run astro -- check`: 0 errors, 0 warnings, 0 hints
- Servidor local de revision: `http://127.0.0.1:4321/`

## Nota de alcance

Se mantienen cambios previos no relacionados en documentos de sprint, archivos raiz y `src/components/astro/About.astro`. No se revirtieron ni se integraron dentro de esta iteracion.

## Siguiente tarea sugerida

Continuar con la Tarea 4 del plan: simplificar `Contact.astro`, verificar que no introduzca disclosures y cerrar la validacion final de la home.
