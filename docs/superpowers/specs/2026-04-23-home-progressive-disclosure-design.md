# Diseño — Home con disclosure progresivo

## Estado

Fecha de planeación: 2026-04-23

Estado: propuesta aprobada para documentar y planear antes de implementar.

Este documento define la dirección para reducir la densidad de texto en la home sin vaciarla de contexto útil.

## Propósito

La home actual comunica demasiado con párrafos corridos y repite varias veces la misma tesis: oferta web-first con evidencia técnica detrás.

El objetivo no es borrar la historia del proyecto. El objetivo es mostrar menos texto por defecto, mejorar escaneo visual y conservar la información importante mediante disclosure progresivo.

## Alcance

Entra:

- solo la home (`src/pages/index.astro` y sus componentes de secciones)
- reducción de texto visible por defecto
- reorganización del contenido existente en bloques resumidos y desplegables
- ajustes de jerarquía visual para que la página respire más

No entra:

- reescritura de páginas de proyecto
- eliminación masiva de contenido histórico
- cambio de arquitectura del sitio
- nuevas features comerciales fuera del problema de densidad de texto

## Tesis de contenido

Mostrar menos. Explicar mejor. Ocultar el resto hasta que el usuario lo pida.

La home debe funcionar como pitch visual claro:

- una promesa fuerte arriba
- una oferta fácil de escanear
- evidencia visible pero breve
- profundidad disponible bajo demanda

La regla editorial principal es:

- no eliminar texto útil si puede vivir en un bloque desplegable
- sí eliminar texto repetido, redundante o demasiado parecido entre secciones

## Dirección elegida

### Opción seleccionada

Pitch visual con disclosure progresivo.

La home mantiene su estructura general, pero cambia la forma de presentar contenido:

- titulares más cortos
- una sola línea de apoyo cuando haga falta
- chips para stack, credenciales o señales técnicas
- acordeones para alcance, contexto y evidencia
- cards de proyecto compactas con resumen desplegable

Esta dirección conserva honestidad técnica sin saturar el primer recorrido.

### Opciones descartadas

#### Recorte ligero sin interacción

Reducir solo párrafos repetidos ayudaría, pero no resolvería la sensación general de exceso de texto.

#### Home ultra minimal

Se vería limpia, pero podría quitar demasiado contexto para clientes o reclutadores que todavía necesitan entender por qué existe la capa técnica.

## Principios de diseño

- Web-first sigue siendo la oferta principal.
- La infraestructura se comunica como evidencia, no como producto principal.
- Lo visible por defecto debe poder leerse en barrido rápido.
- La profundidad debe estar disponible sin cambiar de página.
- Los patrones de disclosure deben repetirse con consistencia.
- El CTA principal nunca debe quedar escondido dentro de un desplegable.
- La home no debe sentirse como una sucesión de tarjetas con texto largo.

## Kit de herramientas aprobado

### 1. Acordeones accesibles

Uso recomendado:

- `Services.astro`
- `About.astro`
- `Infrastructure.astro`

Función:

- ocultar alcance, contexto y explicación extendida
- dejar visible solo el resumen operativo

Patrón preferido:

- `details/summary` cuando el contenido sea simple
- botón con `aria-expanded` solo si el diseño necesita comportamiento más controlado

### 2. Cards expandibles

Uso recomendado:

- `ProjectFilter.tsx`

Función:

- mantener cards de proyecto compactas
- mostrar por defecto categoría, título, resultado corto, stack y link
- abrir problema, solución y resultado extendido solo si el usuario quiere más contexto

### 3. Chips con ayuda breve

Uso recomendado:

- `Hero.astro`
- `About.astro`
- `Infrastructure.astro`

Función:

- reemplazar párrafos explicativos sobre stack, credenciales o términos técnicos
- condensar señales de confianza en piezas pequeñas y escaneables

Formato:

- chips simples cuando el término ya se entiende
- chips con microcopy o ayuda breve cuando el término necesita contexto

### 4. Tabs

Estado:

No son patrón base para esta iteración.

Solo se consideran si infraestructura sigue sintiéndose pesada después de resumir y colapsar contenido.

## Plan por sección

### Hero

Objetivo:

Explicar en segundos quién es Gadiel, qué ofrece hoy y por qué el sitio se percibe sólido.

Visible por defecto:

- nombre
- titular fuerte
- una línea de apoyo
- CTA principal
- CTA secundario
- chips técnicos o de confianza

Desplegable opcional:

- contexto personal más detallado
- explicación breve de la base técnica detrás de la oferta

Debe desaparecer:

- soporte redundante que repite la misma idea del titular y la descripción

### Servicios

Objetivo:

Presentar la oferta activa sin convertirla en bloques largos.

Visible por defecto:

- tres servicios
- una microdescripción por servicio
- una o dos señales de entrega

Desplegable por servicio:

- ideal para
- alcance actual
- entregables completos

Decisión:

La capacidad complementaria ya no necesita un párrafo amplio separado si puede vivir dentro de un disclosure claro.

### Proyectos

Objetivo:

Mostrar evidencia real sin que el listado se sienta pesado.

Visible por defecto:

- categoría
- título
- resultado corto
- stack
- enlace al caso

Desplegable por card:

- problema
- solución
- resultado extendido o resumen narrativo

Decisión:

La home debe invitar a entrar al caso, no intentar contar el caso completo dentro del card.

### Sobre mí

Objetivo:

Mantener confianza sin convertir la sección en biografía.

Visible por defecto:

- credenciales rápidas
- línea de posicionamiento corta

Desplegable:

- cómo cada credencial influye en decisiones de producto, estructura o infraestructura

Decisión:

La sección se debe leer primero como prueba de criterio, no como timeline largo.

### Infraestructura

Objetivo:

Conservar evidencia técnica sin volver a repetir la tesis completa del sitio.

Visible por defecto:

- pipeline corto del sistema
- señales compactas de static-first, deploy y dual-stack

Desplegable:

- evidencia operacional
- criterio NOC
- detalle de seguridad y performance

Decisión:

Infraestructura debe sentirse como prueba compacta. La explicación larga vive detrás de `Ver evidencia`.

### Contacto

Objetivo:

Cerrar conversión con la menor fricción posible.

Visible por defecto:

- titular directo
- una línea corta
- WhatsApp
- correo
- formulario

Decisión:

Contacto no necesita disclosure como patrón principal. Aquí conviene claridad inmediata.

## Comportamiento esperado

- Los desplegables inician cerrados.
- Cada bloque puede abrirse de manera independiente.
- No habrá acordeones anidados.
- El estado abierto debe ser legible con teclado y lector de pantalla.
- Las animaciones, si existen, deben ser cortas y opcionales bajo `prefers-reduced-motion`.

## Reglas editoriales

- Un solo mensaje principal por sección.
- Un solo párrafo visible por sección como máximo, salvo contacto.
- Los textos desplegables deben complementar, no repetir literal lo visible.
- Si un bloque desplegable no aporta información nueva, ese texto debe eliminarse.
- El resultado de proyecto debe tener prioridad sobre la explicación del stack.

## Riesgos

- Usar demasiados desplegables podría fragmentar la lectura.
- Si cada sección usa un patrón diferente, la home puede sentirse incoherente.
- Si se oculta demasiado contenido importante, la propuesta puede perder claridad comercial.

## Mitigaciones

- Repetir pocos patrones: acordeón, card expandible y chips.
- Mantener el CTA visible en todo momento.
- Dejar visibles los mensajes comerciales antes de cualquier detalle técnico.
- Eliminar solo el texto que siga siendo redundante después de resumir y colapsar.

## Validación prevista

- revisión visual desktop y mobile de densidad de texto
- navegación por teclado sobre disclosures
- `npm run astro -- check`
- `npm run build`

## Resultado esperado

La home debe sentirse más ligera, más profesional y más fácil de recorrer, sin sacrificar la información importante ni borrar la identidad técnica del portafolio.
