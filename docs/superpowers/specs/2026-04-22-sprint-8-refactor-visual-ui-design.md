# Sprint 8 — Diseño de refactor visual UI

## Estado

Fecha de planeación: 2026-04-22

Estado: propuesta aprobada para documentar y planear antes de implementar.

Este documento define la dirección visual del Sprint 8. No reemplaza los documentos de arquitectura ni los runbooks operativos; funciona como especificación de experiencia para guiar el rediseño.

## Propósito

Transformar el portafolio post-release en una experiencia visual más memorable, amplia y comercial, donde las capacidades ya implementadas se entiendan por composición, interacción y evidencia, no solo por texto.

El problema actual no es funcional. El sitio ya comunica, valida y opera. La oportunidad está en que la interfaz se percibe demasiado lineal y compacta: muchas secciones usan texto, bordes, badges, listas y tarjetas de forma repetida. Sprint 8 debe romper esa monotonía sin perder claridad, rendimiento ni honestidad comercial.

## Tesis visual

Portfolio editorial técnico con escenas interactivas.

La interfaz debe sentirse como un dossier profesional de ingeniería aplicada: editorial, espaciosa, precisa, con momentos visuales que recuerden a un laboratorio técnico, un command center ligero y casos de estudio navegables.

## Principios de diseño

- Web-first sigue siendo la oferta principal.
- Infraestructura, IPv6, CI/CD, NOC y RSA se presentan como evidencia técnica y diferenciador.
- No se debe inflar el alcance comercial ni vender experiencia que no esté respaldada.
- Las demos interactivas deben tener más protagonismo que los badges de stack.
- Menos tarjetas repetidas; más secciones con composición propia.
- Más aire visual, jerarquía tipográfica y contraste entre secciones.
- Motion útil para guiar atención, no para decorar.
- Accesibilidad, responsive y performance siguen siendo criterios de producto, no tareas finales opcionales.

## Audiencias

### Cliente no técnico

Debe entender rápidamente:

- qué servicio puede contratar hoy
- por qué el sitio se ve profesional y confiable
- cómo contactar por WhatsApp o formulario

### Reclutador, mentor o perfil técnico

Debe poder detectar:

- criterio de arquitectura static-first
- uso razonado de Astro, MDX, Preact islands y Tailwind v4
- evidencia de VPS real, CI/CD, IPv6, operación y casos interactivos
- capacidad para explicar sistemas técnicos de forma visual

## Dirección elegida

### Opción seleccionada: editorial técnico + laboratorio interactivo

Esta opción combina:

- hero con identidad fuerte y promesa web-first
- secciones amplias con ritmo editorial
- proyectos presentados como evidencia, no como grilla compacta
- demos RSA e IPv6 elevadas a momentos centrales
- infraestructura como relato operativo visual, no como lista de conceptos

Es la mejor opción porque vende la mezcla real del proyecto: desarrollo web, criterio de infraestructura, redes y capacidad de explicación técnica.

### Opciones descartadas

#### SaaS genérico

Puede verse moderno, pero diluye la identidad del portafolio. El proyecto no necesita parecer una landing de herramienta B2B; necesita demostrar autoría, criterio y evidencia.

#### Dashboard NOC completo

Es atractivo para redes, pero sería demasiado estrecho para la oferta web-first. Se usará como lenguaje parcial en infraestructura y operación, no como estética total del sitio.

#### Minimalismo académico

Sería limpio, pero no resolvería el problema central de linealidad y poca presencia visual. El sitio necesita más energía comercial y más prueba visual.

## Plan de contenido

### Hero

Función: explicar en segundos quién es Gadiel Uicab, qué ofrece hoy y por qué existe una base técnica fuerte detrás.

Dirección:

- hacer el nombre y la oferta más memorables en el primer viewport
- integrar una visual técnica dominante, como mapa de señales, pipeline de deploy, red o escena de workspace técnico
- mantener CTA principal hacia WhatsApp/contacto y CTA secundario hacia casos de estudio
- dejar visible una pista de la siguiente sección en mobile y desktop

### Servicios

Función: convertir claridad comercial en acción.

Dirección:

- mantener servicios web-first como oferta activa
- reducir sensación de lista compacta
- usar filas amplias o bloques editoriales, no mosaico de tarjetas
- separar claramente oferta actual de capacidades complementarias

### Proyectos

Función: demostrar capacidades ya implementadas.

Dirección:

- destacar `Portafolio M4` y `RSA en C` como evidencia principal
- presentar `Migración IPv6` y `Dashboard NOC` como prueba de criterio técnico
- mejorar filtros para que parezcan control editorial, no una botonera aislada
- hacer visible el resultado de cada proyecto antes que la lista de tecnologías

### Sobre mí

Función: sostener confianza sin convertirse en currículum plano.

Dirección:

- transformar la evidencia UADY, TIDE Fellows y LACNIC en una línea de evolución
- mantener tono honesto sobre formación en progreso
- conectar aprendizaje con decisiones reales del proyecto

### Infraestructura

Función: convertir la operación real del portafolio en diferenciador.

Dirección:

- pasar de una lista larga a una historia visual de sistema
- representar static-first, build, CI/CD, VPS, Nginx, HTTPS e IPv6 como flujo
- usar señales operativas: checks, estados, rutas, logs sintéticos o timeline
- no saturar con tarjetas pequeñas

### Contacto

Función: cerrar conversión sin fricción.

Dirección:

- mantener WhatsApp como canal primario
- hacer que el formulario se sienta como brief profesional
- evitar que la sección final vuelva a sentirse como bloque compacto

### Páginas de proyecto

Función: convertir cada caso en evidencia navegable.

Dirección:

- header más editorial por proyecto
- problema, solución y resultado con mayor jerarquía visual
- demos interactivas con más espacio y presencia
- navegación entre proyectos más fluida y menos parecida a tarjetas de relleno

## Tesis de interacción

### Entrada del hero

Usar una secuencia breve de aparición para nombre, promesa, CTA y visual técnica. Debe sentirse intencional y rápida.

### Scroll narrativo

Usar cambios de ritmo entre secciones: secciones amplias, momentos sticky moderados o visuales que acompañen el scroll cuando aporten comprensión.

### Interacción de evidencia

Elevar las interacciones existentes:

- RSA debe sentirse como simulador verificable, con resultados claros y controles cómodos.
- IPv6 debe sentirse como mapa de migración por fases, con estados y decisión operativa visibles.
- Filtros de proyectos deben tener transición y feedback claro sin comprometer accesibilidad.

## Skills que el rediseño debe demostrar

- Astro SSG y arquitectura static-first
- TypeScript y estructura de datos en contenido
- Preact islands para interacción justificada
- MDX para casos de estudio
- Tailwind v4 y tokens de diseño
- VPS real, Nginx, HTTPS y CI/CD
- IPv6, redes y criterio NOC
- RSA, fundamentos matemáticos y simulación interactiva
- accesibilidad, performance y responsive

## Alcance del Sprint 8

Entra:

- rediseño visual completo de home
- ajuste del sistema visual base
- rediseño de showcase de proyectos
- rediseño de páginas de proyecto
- mejora visual de demos RSA e IPv6
- revisión de copy para mantener oferta web-first y evidencia técnica
- QA visual, responsive, accesibilidad y build

No entra:

- nuevas features comerciales grandes
- nueva infraestructura de producción
- cambios destructivos en contenido histórico
- reescritura completa de arquitectura
- librerías pesadas de animación si no aportan valor claro
- observabilidad externa 24/7

## Restricciones técnicas

- Mantener Astro como base static-first.
- Mantener islas Preact solo cuando la interacción aporte valor real.
- Mantener tokens en `src/styles/global.css` para decisiones transversales.
- Mantener estilos scoped cuando una sección tenga identidad propia.
- Evitar depender de un runtime de aplicación en producción.
- Preservar accesibilidad de navegación, foco visible y contraste.
- Evitar que la nueva estética degrade Lighthouse de forma significativa.

## Riesgos

- Sobrediseñar y perder claridad comercial.
- Convertir infraestructura en promesa comercial más grande que la evidencia.
- Introducir animaciones que afecten rendimiento o accesibilidad.
- Hacer que las demos se vean más bonitas pero menos comprensibles.
- Romper responsive en títulos grandes o layouts editoriales.

Mitigación:

- mantener criterios de aceptación por sección
- validar mobile temprano
- usar `prefers-reduced-motion`
- revisar copy contra la estrategia web-first
- ejecutar `npm run astro -- check` y `npm run build` antes de cerrar

## Criterios de aceptación

- La home ya no se percibe como una lista compacta de bloques.
- El primer viewport comunica nombre, oferta y diferenciador técnico con claridad.
- Las skills principales se entienden sin leer todos los párrafos.
- Los proyectos interactivos RSA e IPv6 tienen mayor protagonismo visual.
- La infraestructura real se entiende como evidencia operativa.
- Contacto sigue siendo claro y orientado a conversión.
- La oferta principal sigue siendo web-first.
- El sitio conserva navegación por teclado, foco visible y contraste suficiente.
- La versión final pasa `npm run astro -- check`.
- La versión final pasa `npm run build`.

