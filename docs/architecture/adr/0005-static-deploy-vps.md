# ADR 0005: Despliegue estático orientado a VPS

## Estado

Objetivo vigente, implementación parcial

## Contexto

El portafolio quiere demostrar control técnico sobre build, publicación e infraestructura, no solo consumo de plataformas PaaS.

## Decisión

Orientar el despliegue a artefactos estáticos servidos por un VPS con servidor web dedicado.

## Consecuencias

- La salida del proyecto sigue siendo estática y compatible con Nginx u otro servidor similar.
- La documentación de infraestructura y operación tiene sentido como parte del caso de estudio.
- El repositorio aún necesita versionar el workflow de automatización antes de considerar esta decisión completamente implementada.
