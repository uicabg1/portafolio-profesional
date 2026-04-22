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

- [ ] revisar home completa en mobile, tablet y desktop amplio
- [ ] identificar patrones repetidos de cards, bordes, badges y listas
- [ ] separar problemas visuales reales de preferencias superficiales
- [ ] registrar capturas antes del rediseño para comparación

### 1.2 Tokens y lenguaje visual

- [ ] revisar `src/styles/global.css`
- [ ] ajustar escala de espacios si el layout necesita más aire
- [ ] revisar paleta para evitar una UI dominada por un solo azul
- [ ] mantener tipografías actuales si siguen aportando identidad
- [ ] definir estilos reutilizables solo cuando apliquen a más de una vista

### 1.3 Reglas de composición

- [ ] reducir dependencia de tarjetas como estructura principal
- [ ] usar secciones amplias con una idea dominante por bloque
- [ ] dar más contraste entre secciones editoriales, técnicas e interactivas
- [ ] preservar lectura rápida en mobile

---

## 2. Home como experiencia editorial técnica

### 2.1 Hero

- [ ] hacer más visible la identidad `Gadiel Uicab`
- [ ] mantener una propuesta web-first clara
- [ ] integrar una visual técnica dominante
- [ ] conservar CTA principal hacia contacto o WhatsApp
- [ ] conservar CTA secundario hacia casos de estudio
- [ ] dejar una pista visible de la siguiente sección en el primer viewport

### 2.2 Servicios

- [ ] mantener servicios web-first como oferta activa
- [ ] separar oferta actual de capacidades complementarias
- [ ] hacer que cada servicio tenga más presencia y menos apariencia de lista
- [ ] evitar copy que prometa más operación de la ya respaldada

### 2.3 Proyectos

- [ ] rediseñar el listado como showcase de evidencia
- [ ] destacar proyectos con demo interactiva
- [ ] mejorar filtros como control editorial accesible
- [ ] priorizar resultado y aprendizaje sobre stack
- [ ] mantener rutas existentes de proyecto

### 2.4 Sobre mí

- [ ] convertir UADY, TIDE Fellows y LACNIC en línea de evolución técnica
- [ ] mantener honestidad sobre formación en progreso
- [ ] conectar aprendizaje con decisiones reales del portafolio

### 2.5 Infraestructura

- [ ] convertir la sección en relato visual del sistema
- [ ] representar static-first, build, CI/CD, VPS, Nginx, HTTPS e IPv6 como flujo
- [ ] usar estados, checks o timeline en lugar de solo bloques de texto
- [ ] preservar precisión técnica y evitar sobreventa comercial

### 2.6 Contacto

- [ ] reforzar WhatsApp como canal primario
- [ ] presentar el formulario como brief profesional
- [ ] mantener fallback y claridad de errores
- [ ] cerrar con conversión clara, no con más explicación técnica

---

## 3. Páginas de proyecto

### 3.1 Header editorial por proyecto

- [ ] dar más jerarquía visual a título, categoría, resultado y fecha
- [ ] reducir dependencia de badges como primer impacto
- [ ] mantener breadcrumb y navegación accesibles

### 3.2 Narrativa del caso

- [ ] hacer más escaneables problema, solución y resultado
- [ ] dar ritmo visual al contenido MDX
- [ ] mantener structured data y SEO técnico por proyecto

### 3.3 Demos interactivas

- [ ] ampliar presencia visual del simulador RSA
- [ ] ampliar presencia visual del mapa de migración IPv6
- [ ] mejorar estados activos, controles y lectura de resultados
- [ ] verificar que las islas sigan justificadas y no aumenten JS innecesario

---

## 4. Motion y respuesta visual

### 4.1 Motion base

- [ ] definir entrada breve para hero
- [ ] definir reveals por sección con retrasos discretos
- [ ] definir transiciones para filtros y demos
- [ ] respetar `prefers-reduced-motion`

### 4.2 Interacciones

- [ ] mejorar hover/focus de CTAs sin depender solo de color
- [ ] hacer más claro el estado activo en filtros
- [ ] mejorar feedback visual en inputs y controles interactivos

---

## 5. Validación

### 5.1 Verificación técnica

- [ ] ejecutar `npm run astro -- check`
- [ ] ejecutar `npm run build`
- [ ] revisar que no existan errores de rutas, MDX o contenido

### 5.2 QA visual

- [ ] revisar home en `375px`
- [ ] revisar home en `390px`
- [ ] revisar home en `768px`
- [ ] revisar home en desktop amplio
- [ ] revisar al menos una página de proyecto con demo interactiva
- [ ] revisar una página de proyecto sin demo interactiva

### 5.3 Accesibilidad

- [ ] verificar navegación por teclado
- [ ] verificar foco visible
- [ ] verificar contraste de CTAs, filtros e inputs
- [ ] verificar estados de error del formulario
- [ ] verificar que motion no bloquee lectura ni operación

### 5.4 Performance

- [ ] revisar que el rediseño no convierta la home en una página pesada
- [ ] evitar assets visuales innecesarios
- [ ] mantener hidratación limitada a islas justificadas
- [ ] medir Lighthouse local para home y una página de proyecto

---

## Criterios de aceptación del Sprint 8

- [ ] la home ya no se percibe como una lista compacta de bloques
- [ ] el primer viewport comunica identidad, oferta y diferenciador técnico
- [ ] las skills principales se entienden por composición y evidencia visual
- [ ] RSA e IPv6 tienen mayor protagonismo como demos interactivas
- [ ] infraestructura real se entiende como prueba operativa
- [ ] contacto sigue claro, rápido y web-first
- [ ] responsive se mantiene sólido en mobile, tablet y desktop
- [ ] accesibilidad no retrocede respecto al Sprint 7
- [ ] `npm run astro -- check` pasa sin errores
- [ ] `npm run build` pasa sin errores

## Resultado esperado al cerrar el sprint

Al finalizar Sprint 8, el portafolio debe sentirse como una versión visualmente más madura del release base:

- más memorable en el primer vistazo
- más amplio y menos compacto
- más convincente para clientes
- más demostrativo para perfiles técnicos
- igual de claro en oferta, contacto, accesibilidad y operación

## Riesgos y controles

- Riesgo: que el rediseño se vuelva demasiado técnico para clientes.
  Control: mantener `web-first` como eje de hero, servicios y contacto.

- Riesgo: que las animaciones afecten rendimiento o accesibilidad.
  Control: motion discreto, `prefers-reduced-motion` y medición Lighthouse.

- Riesgo: que la infraestructura parezca oferta principal.
  Control: presentarla como diferenciador y capacidad complementaria.

- Riesgo: que el layout editorial falle en mobile.
  Control: validar mobile desde la primera mitad del sprint.
