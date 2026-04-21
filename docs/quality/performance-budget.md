# Performance budget

## Principios

- Priorizar HTML estático.
- Mantener la hidratación limitada a islas justificadas.
- Evitar dependencias que conviertan la home en una aplicación client-heavy.

## Presupuesto orientativo

- `LCP` objetivo: `<= 2.5 s`
- `INP` objetivo: `<= 200 ms`
- `CLS` objetivo: `<= 0.1`
- JavaScript de cliente: solo el necesario para islas puntuales

## Evidencia reciente

Fecha: 2026-04-21

- Lighthouse home: Performance `99`, LCP `1.7 s`, TBT `0 ms`, CLS `0.001`
- Lighthouse `/proyectos/portafolio-m4/`: Performance `97` en rerun estable, LCP `2.5 s`, TBT `0 ms`, CLS `0.029`
- Accessibility, Best Practices y SEO quedaron en `100` para home y página de proyecto

## Riesgos frecuentes

- aumentar el número de islas sin necesidad real
- mover lógica de render al cliente
- incorporar librerías visuales pesadas
- introducir assets no optimizados en contenido o layout

## Qué revisar cuando hay regresión

- tamaño del bundle generado
- número de islas hidratadas
- cambios recientes en `global.css` y tipografías
- nuevos assets en `public/` o en contenido MDX
