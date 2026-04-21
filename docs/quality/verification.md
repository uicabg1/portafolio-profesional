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
