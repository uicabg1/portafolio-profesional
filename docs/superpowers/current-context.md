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

## Metodo de trabajo vigente

- Usar `docs/superpowers/contexto-minimo-documentado.md` como protocolo de continuidad.
- Leer primero este archivo antes de abrir specs, planes o sprints historicos.
- Para tareas sobre la home, abrir solo el componente objetivo y sus dependencias cercanas.
- No eliminar contenido util mientras pueda resolverse con disclosure progresivo.

## Decision registrada

- `docs/architecture/adr/0006-project-visual-section.md`: visuales editoriales aislados para casos de estudio.
- `docs/architecture/adr/0007-home-progressive-disclosure.md`: disclosure progresivo para reducir densidad de texto en la home.

## Archivos modificados por esta tarea

- `docs/superpowers/specs/2026-04-23-home-progressive-disclosure-design.md`
- `docs/architecture/adr/0007-home-progressive-disclosure.md`
- `docs/superpowers/current-context.md`

## Validacion ejecutada

- Revision manual del spec para consistencia interna, alcance y ausencia de placeholders.
- No se ejecutaron `npm test`, `npm run astro -- check` ni `npm run build` porque esta tarea solo agrega documentacion y no cambia codigo.

## Nota de alcance

Se mantienen cambios previos no relacionados en documentos de sprint, archivos raiz y `src/components/astro/About.astro`. No se revirtieron ni se integraron dentro de esta tarea documental.

## Siguiente tarea sugerida

Invocar `writing-plans` para convertir el spec aprobado en un plan de implementacion acotado a la home.
