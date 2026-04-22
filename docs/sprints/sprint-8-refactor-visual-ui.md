# Sprint 8 — Refactor visual UI y evidencia interactiva

## Propósito del sprint

Rediseñar la experiencia visual del portafolio post-release para que deje de sentirse lineal y compacta, y pase a comunicar con más fuerza la mezcla real del proyecto: desarrollo web, evidencia técnica, infraestructura propia, redes, CI/CD y demos interactivas.

Sprint 8 no busca agregar más contenido por volumen. Busca que lo ya construido se vea más memorable, más comercial y más fácil de entender.

## Estado de partida

Al inicio de Sprint 8 el proyecto ya tiene:

- home comercial estable
- contacto funcional por WhatsApp, correo y formulario
- proyectos MDX con rutas estáticas
- demos interactivas para RSA e IPv6
- VPS real publicado con HTTPS, IPv4 e IPv6
- CI/CD operativo con GitHub Actions
- documentación técnica y operativa actualizada
- QA final de Sprint 7 ejecutado

Dolor principal al inicio del sprint:

- la UI se percibe demasiado lineal, compacta y basada en bloques similares
- las skills existen, pero algunas se entienden más por lectura que por impacto visual
- las demos interactivas no tienen todavía el protagonismo que merecen como evidencia

## Documento de diseño

La dirección aprobada vive en:

- [../superpowers/specs/2026-04-22-sprint-8-refactor-visual-ui-design.md](../superpowers/specs/2026-04-22-sprint-8-refactor-visual-ui-design.md)

## Plan de implementación

El plan ejecutable por tareas vive en:

- [../superpowers/plans/2026-04-22-sprint-8-refactor-visual-ui-implementation.md](../superpowers/plans/2026-04-22-sprint-8-refactor-visual-ui-implementation.md)

## Avance de implementación

- [x] Task 0: rama `feat/sprint-8-visual-refactor`, baseline técnico y commit documental creados.
- [x] Task 1: contratos visuales de Sprint 8 agregados como baseline TDD.
- [x] Task 2: tokens, utilidades editoriales y documentación de sistema visual actualizados.
- [x] Task 3: hero rediseñado como entrada editorial técnica, con identidad visible y mapa de señales.
- [x] Task 4: servicios y sobre mí convertidos en prueba editorial y progresión formativa.
- [x] Task 5: proyectos rediseñados como showcase de evidencia con filtros accesibles.
- [x] Task 6: infraestructura convertida en flujo operacional `Astro Build -> CI/CD -> VPS -> Nginx -> IPv4 / IPv6`.
- [x] Task 7: contacto rediseñado como brief profesional con WhatsApp como canal primario.
- [x] Task 8: páginas de proyecto y shell interactivo convertidos en casos editoriales de prueba.
- [x] Task 9: demos RSA e IPv6 reforzadas con jerarquía visual y estados activos.
- [x] Task 10: pase responsive/accesibilidad documentado.
- [x] Task 11: build, performance y cierre documental ejecutados.

Nota: la Task 3 se ejecutó antes de la Task 2 por solicitud directa. El cierre dejó ambas tareas resueltas y documentadas.

Resumen de dirección:

- estilo principal: portfolio editorial técnico
- capa secundaria: laboratorio interactivo
- lenguaje parcial: command center / NOC light para infraestructura y operación
- objetivo comercial: mantener oferta web-first con diferenciador técnico visible

## Qué sí entra en Sprint 8

- refactor visual completo de la home
- revisión del sistema visual base
- rediseño de hero, servicios, proyectos, sobre mí, infraestructura y contacto
- rediseño visual de páginas de proyecto
- mejora de presencia visual de las islas RSA e IPv6
- ajuste de copy para comunicar skills con más claridad
- motion intencional y accesible
- validación responsive, accesibilidad, rendimiento y build

## Qué no entra en Sprint 8

- nuevas ofertas comerciales grandes
- nueva infraestructura de producción
- observabilidad externa 24/7
- reescritura completa de arquitectura
- migrar fuera de Astro, Preact Islands o Tailwind v4
- agregar librerías pesadas de UI si el sistema actual lo puede resolver
- convertir el sitio en dashboard técnico puro

---

## 1. Dirección visual y sistema base

### 1.1 Auditoría visual inicial

- [x] revisar home completa en mobile, tablet y desktop amplio
- [x] identificar patrones repetidos de cards, bordes, badges y listas
- [x] separar problemas visuales reales de preferencias superficiales
- [x] registrar evidencia de cierre para comparación posterior

### 1.2 Tokens y lenguaje visual

- [x] revisar `src/styles/global.css`
- [x] ajustar escala de espacios si el layout necesita más aire
- [x] revisar paleta para evitar una UI dominada por un solo azul
- [x] mantener tipografías actuales si siguen aportando identidad
- [x] definir estilos reutilizables solo cuando apliquen a más de una vista

### 1.3 Reglas de composición

- [x] reducir dependencia de tarjetas como estructura principal
- [x] usar secciones amplias con una idea dominante por bloque
- [x] dar más contraste entre secciones editoriales, técnicas e interactivas
- [x] preservar lectura rápida en mobile

---

## 2. Home como experiencia editorial técnica

### 2.1 Hero

- [x] hacer más visible la identidad `Gadiel Uicab`
- [x] mantener una propuesta web-first clara
- [x] integrar una visual técnica dominante
- [x] conservar CTA principal hacia contacto o WhatsApp
- [x] conservar CTA secundario hacia casos de estudio
- [x] dejar una pista visible de la siguiente sección en el primer viewport

### 2.2 Servicios

- [x] mantener servicios web-first como oferta activa
- [x] separar oferta actual de capacidades complementarias
- [x] hacer que cada servicio tenga más presencia y menos apariencia de lista
- [x] evitar copy que prometa más operación de la ya respaldada

### 2.3 Proyectos

- [x] rediseñar el listado como showcase de evidencia
- [x] destacar proyectos con demo interactiva
- [x] mejorar filtros como control editorial accesible
- [x] priorizar resultado y aprendizaje sobre stack
- [x] mantener rutas existentes de proyecto

### 2.4 Sobre mí

- [x] convertir UADY, TIDE Fellows y LACNIC en línea de evolución técnica
- [x] mantener honestidad sobre formación en progreso
- [x] conectar aprendizaje con decisiones reales del portafolio

### 2.5 Infraestructura

- [x] convertir la sección en relato visual del sistema
- [x] representar static-first, build, CI/CD, VPS, Nginx, HTTPS e IPv6 como flujo
- [x] usar estados, checks o timeline en lugar de solo bloques de texto
- [x] preservar precisión técnica y evitar sobreventa comercial

### 2.6 Contacto

- [x] reforzar WhatsApp como canal primario
- [x] presentar el formulario como brief profesional
- [x] mantener fallback y claridad de errores
- [x] cerrar con conversión clara, no con más explicación técnica

---

## 3. Páginas de proyecto

### 3.1 Header editorial por proyecto

- [x] dar más jerarquía visual a título, categoría, resultado y fecha
- [x] reducir dependencia de badges como primer impacto
- [x] mantener breadcrumb y navegación accesibles

### 3.2 Narrativa del caso

- [x] hacer más escaneables problema, solución y resultado
- [x] dar ritmo visual al contenido MDX
- [x] mantener structured data y SEO técnico por proyecto

### 3.3 Demos interactivas

- [x] ampliar presencia visual del simulador RSA
- [x] ampliar presencia visual del mapa de migración IPv6
- [x] mejorar estados activos, controles y lectura de resultados
- [x] verificar que las islas sigan justificadas y no aumenten JS innecesario

---

## 4. Motion y respuesta visual

### 4.1 Motion base

- [x] definir entrada breve para hero
- [x] definir reveals por sección con retrasos discretos
- [x] definir transiciones para filtros y demos
- [x] respetar `prefers-reduced-motion`

### 4.2 Interacciones

- [x] mejorar hover/focus de CTAs sin depender solo de color
- [x] hacer más claro el estado activo en filtros
- [x] mejorar feedback visual en inputs y controles interactivos

---

## 5. Validación

### 5.1 Verificación técnica

- [x] ejecutar `npm run astro -- check`
- [x] ejecutar `npm run build`
- [x] revisar que no existan errores de rutas, MDX o contenido

### 5.2 QA visual

- [x] revisar home en `375px`
- [x] revisar home en `390px`
- [x] revisar home en `768px`
- [x] revisar home en desktop amplio
- [x] revisar al menos una página de proyecto con demo interactiva
- [x] revisar una página de proyecto sin demo interactiva

### 5.3 Accesibilidad

- [x] verificar navegación por teclado
- [x] verificar foco visible
- [x] verificar contraste de CTAs, filtros e inputs
- [x] verificar estados de error del formulario
- [x] verificar que motion no bloquee lectura ni operación

### 5.4 Performance

- [x] revisar que el rediseño no convierta la home en una página pesada
- [x] evitar assets visuales innecesarios
- [x] mantener hidratación limitada a islas justificadas
- [x] medir Lighthouse local para home y una página de proyecto

---

## Criterios de aceptación del Sprint 8

- [x] la home ya no se percibe como una lista compacta de bloques
- [x] el primer viewport comunica identidad, oferta y diferenciador técnico
- [x] las skills principales se entienden por composición y evidencia visual
- [x] RSA e IPv6 tienen mayor protagonismo como demos interactivas
- [x] infraestructura real se entiende como prueba operativa
- [x] contacto sigue claro, rápido y web-first
- [x] responsive se mantiene sólido en mobile, tablet y desktop
- [x] accesibilidad no retrocede respecto al Sprint 7
- [x] `npm run astro -- check` pasa sin errores
- [x] `npm run build` pasa sin errores

## Resultado esperado al cerrar el sprint

Al finalizar Sprint 8, el portafolio debe sentirse como una versión visualmente más madura del release base:

- más memorable en el primer vistazo
- más amplio y menos compacto
- más convincente para clientes
- más demostrativo para perfiles técnicos
- igual de claro en oferta, contacto, accesibilidad y operación

## Evidencia de cierre

Fecha: 2026-04-22

Comandos ejecutados:

- `npm test`: `11/11` tests passing, `0` failures.
- `npm run astro -- check`: `0` errors, `0` warnings, `0` hints.
- `npm run build`: `6` pages built, exit code `0`.
- `npm run preview -- --host 127.0.0.1`: servidor local levantado en `http://127.0.0.1:4321/`.
- Route smoke en preview: `200` para `/`, `/proyectos/portafolio-m4/`, `/proyectos/migracion-ipv6/` y `/proyectos/rsa-en-c/`.
- Chrome headless render smoke: `16` screenshots temporales generados para 4 rutas x 4 widths.
- Lighthouse CLI home: Performance `100`, Accessibility `100`, Best Practices `100`, SEO `100`.
- Lighthouse CLI `/proyectos/portafolio-m4/`: Performance `100`, Accessibility `100`, Best Practices `100`, SEO `100`.

Responsive revisado:

- widths: `375px`, `390px`, `768px`, `1440px`
- rutas: `/`, `/proyectos/portafolio-m4/`, `/proyectos/migracion-ipv6/`, `/proyectos/rsa-en-c/`

Interacciones revisadas:

- filtros de proyectos mantienen `aria-pressed` y altura mínima táctil.
- formulario mantiene validación inline, `aria-describedby`, honeypot y fallback a WhatsApp.
- RSA mantiene presets, validaciones y pasos de cálculo con `rsa-step`.
- IPv6 mantiene estado por `activePhaseId`, botones accesibles y estado activo distinguible por texto/forma.

Riesgos residuales:

- Las fuentes siguen dependiendo de Google Fonts; se redujo el bloqueo cargándolas de forma no bloqueante y eliminando el `@import` duplicado.
- El smoke responsive con Chrome headless valida renderizado de rutas, pero no sustituye una revisión humana visual final antes de publicar screenshots en PR.

## Riesgos y controles

- Riesgo: que el rediseño se vuelva demasiado técnico para clientes.
  Control: mantener `web-first` como eje de hero, servicios y contacto.

- Riesgo: que las animaciones afecten rendimiento o accesibilidad.
  Control: motion discreto, `prefers-reduced-motion` y medición Lighthouse.

- Riesgo: que la infraestructura parezca oferta principal.
  Control: presentarla como diferenciador y capacidad complementaria.

- Riesgo: que el layout editorial falle en mobile.
  Control: validar mobile desde la primera mitad del sprint.
