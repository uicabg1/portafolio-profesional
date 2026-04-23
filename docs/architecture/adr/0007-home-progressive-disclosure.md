# ADR 0007: Disclosure progresivo para reducir densidad de texto en la home

## Estado

Aprobado

## Contexto

La home comunica oferta, proyectos, credenciales e infraestructura, pero concentra demasiado texto visible y repite varias veces la misma tesis editorial.

El problema no es falta de contenido. El problema es densidad de lectura en el primer recorrido.

## Decisión

Reducir el texto visible por defecto en la home mediante disclosure progresivo.

La solución base combina:

- acordeones accesibles para alcance, contexto y evidencia
- cards expandibles para resúmenes de proyectos
- chips y microcopy para stack, credenciales y señales técnicas

La regla editorial asociada es:

- conservar la información importante siempre que pueda moverse a un bloque desplegable
- eliminar solo el contenido redundante o repetido

El alcance de esta decisión se limita a la home.

## Consecuencias

- La home gana escaneabilidad sin perder profundidad informativa.
- La oferta web-first queda más clara en el primer pantallazo.
- La implementación debe cuidar accesibilidad, foco y lectura por teclado.
- Infraestructura y credenciales seguirán presentes, pero bajo demanda.
