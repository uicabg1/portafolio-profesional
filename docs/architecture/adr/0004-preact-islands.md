# ADR 0004: Preact Islands para interacción selectiva

## Estado

Aprobado

## Contexto

El sitio necesita un pequeño número de interacciones en cliente sin convertir toda la aplicación en SPA.

## Decisión

Usar Preact Islands solo en los puntos donde la interacción lo justifica.

## Consecuencias

- `ProjectFilter.tsx` filtra sin recarga, pero el contenido inicial sigue llegando desde SSR.
- `WhatsAppButton.tsx` se hidrata inmediatamente por necesidad de disponibilidad visual.
- Se reduce el costo de JavaScript frente a una solución completamente client-side.
