# Verificación

## Línea base obligatoria

Antes de considerar un cambio como listo, ejecutar:

```bash
npm test
npx astro check
npm run build
```

## Verificación recomendada para cambios visuales o de contenido

```bash
npm run dev
```

Revisar manualmente:

- la home
- el filtro de proyectos
- una página de detalle
- navegación por teclado básica

## Qué valida cada comando

- `npx astro check`
  Tipos, schema de contenido y validación de rutas Astro/MDX.
- `npm run build`
  Generación real del sitio estático y detección de errores de compilación.
- `npm run dev`
  Revisión manual del comportamiento en entorno local.
- `npm test`
  Verificación rápida de helpers y lógica cubierta por pruebas con Node.

## Evidencia mínima que conviene registrar en PR o entrega

- comandos ejecutados
- resultado de salida
- revisión manual realizada
- riesgos conocidos o huecos pendientes

Para Sprint 8, registrar también:

- breakpoints revisados
- páginas de proyecto revisadas
- resultado de interacción en RSA e IPv6
- resultado Lighthouse de home y una página de proyecto

## Evidencia Sprint 7

Fecha: 2026-04-21

- `npm test`: 5/5
- `npm run astro -- check`: 0 errores, 0 warnings, 0 hints
- `npm run build`: 6 páginas generadas
- Lighthouse home: `99 / 100 / 100 / 100`
- Lighthouse proyecto: `97 / 100 / 100 / 100`
- producción pendiente de publicar desde `main` después del commit de Sprint 7
