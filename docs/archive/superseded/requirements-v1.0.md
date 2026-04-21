# Fase 1 — Ingeniería de Requisitos
## Portafolio Profesional · Gadiel · UADY / TIDE Fellows

> **Versión:** 1.0 | **Estado:** Draft para revisión | **Metodología:** Agile + IEEE 830

---

## 1. Análisis de Stakeholders

### 1.1 Stakeholder Primario — Dueño de PYME

> El cliente objetivo no compra código. Compra **confianza, resultados y tiempo recuperado**.

| Dimensión | Qué busca | Señal de alerta si no lo ve |
|---|---|---|
| **Credibilidad técnica** | Evidencia de proyectos reales y terminados, no tutoriales. Quiere ver que ya resolviste problemas similares al suyo. | Portafolio vacío o con proyectos de práctica genéricos ("todo app"). |
| **Comunicación clara** | Que le expliques el proyecto en su idioma (negocio, no código). No quiere escuchar sobre RSA ni IPv6; quiere saber qué problema le resuelves. | Jerga técnica excesiva sin traducción a valor de negocio. |
| **Precio justificado** | Que entienda por qué cuesta lo que cuesta. El portafolio debe transmitir seniority y precisión antes de mostrar un precio. | Sitio que se ve barato genera expectativas de precio bajo. |
| **Velocidad de respuesta** | Un formulario de contacto que funciona. Una propuesta en menos de 24 h. Señales de que no lo vas a ignorar. | Formulario roto, email que no responde, ningún canal alternativo. |
| **Riesgo percibido bajo** | Prueba social: clientes anteriores, testimonios, o en su ausencia, proyectos detallados que demuestren proceso, no solo resultado. | Sin ninguna prueba de trabajo real previo. |
| **Estética que inspira confianza** | El sitio *en sí mismo* es tu carta de presentación. Un diseño descuidado sugiere descuido en el trabajo contratado. | Diseño desactualizado, tipografía inconsistente, mobile roto. |

### 1.2 Stakeholder Secundario — Reclutador / Tech Lead (TIDE Fellows / Futuras oportunidades)

| Dimensión | Qué busca |
|---|---|
| **Profundidad técnica** | Proyectos complejos con explicación de decisiones de diseño (por qué RSA en C, por qué IPv6 análisis). |
| **Stack y versatilidad** | Evidencia de dominio bajo nivel (C/C++) + web. Demuestra que entiende la máquina, no solo frameworks. |
| **Escritura técnica** | Que puedas documentar lo que construyes. READMEs, diagramas, casos de uso. |
| **Proceso** | Código en GitHub con commits limpios, no solo el resultado final. |

---

## 2. Requisitos Funcionales (RF)

### 2.1 Módulo de Presentación Personal

| ID | Requisito | Prioridad | Criterio de éxito |
|---|---|---|---|
| RF-01 | El sitio debe mostrar una sección Hero con nombre, título profesional y una propuesta de valor en ≤ 20 palabras orientada a PYMES. | Alta | Visible above-the-fold en desktop y mobile sin scroll. |
| RF-02 | Debe existir una sección "Sobre mí" que comunique perfil académico (UADY, Ing. Software), beca TIDE Fellows y stack técnico con lenguaje orientado a beneficio del cliente. | Alta | Texto validado con al menos un dueño de PYME (test de comprensión). |
| RF-03 | El sitio debe incluir enlaces verificables a perfiles externos: GitHub, LinkedIn y correo de contacto. | Alta | Los 3 enlaces abren correctamente en nueva pestaña. |

### 2.2 Módulo de Proyectos

| ID | Requisito | Prioridad | Criterio de éxito |
|---|---|---|---|
| RF-04 | Debe existir una sección "Proyectos" con tarjetas individuales por proyecto, cada una con: título, descripción breve (≤ 60 palabras), stack tecnológico, enlace a GitHub y enlace a demo (si aplica). | Alta | Mínimo 4 proyectos publicados al lanzamiento. |
| RF-05 | Cada proyecto debe tener una vista de detalle (página o modal expandible) con: descripción extendida, capturas de pantalla o video, decisiones de diseño clave y métricas de resultado si existen. | Alta | El proyecto RSA en C y el análisis IPv6 deben tener vista detallada completa al lanzamiento. |
| RF-06 | La sección de proyectos debe soportar filtrado por categoría: "Web", "Sistemas / C/C++", "Redes", "Todos". | Media | El filtro responde en < 200 ms sin recarga de página. |
| RF-07 | El contenido de los proyectos debe cargarse de forma dinámica desde un archivo JSON o CMS headless local, sin requerir modificar HTML para agregar nuevos proyectos. | Alta | Agregar un proyecto nuevo requiere solo modificar el archivo de datos, no el código fuente. |

### 2.3 Módulo de Contacto

| ID | Requisito | Prioridad | Criterio de éxito |
|---|---|---|---|
| RF-08 | Debe existir un formulario de contacto con campos: nombre, empresa (opcional), correo electrónico, tipo de proyecto (dropdown) y mensaje. | Alta | El formulario envía correctamente y el usuario recibe confirmación visual inmediata. |
| RF-09 | El formulario debe enviar los datos al correo del desarrollador mediante un servicio de terceros (Formspree, EmailJS o equivalente). | Alta | El correo llega al destinatario en < 60 segundos. |
| RF-10 | Debe haber validación del lado del cliente con mensajes de error claros en español. | Media | Campos vacíos y formato de email inválido muestran error antes de enviar. |
| RF-11 | El formulario debe incluir protección anti-spam básica (honeypot field o reCAPTCHA invisible). | Media | Bots automáticos no generan envíos en 30 días de monitoreo. |

### 2.4 Módulo de Servicios

| ID | Requisito | Prioridad | Criterio de éxito |
|---|---|---|---|
| RF-12 | Debe existir una sección "Servicios" que liste los servicios ofrecidos a PYMES con descripción, beneficio y CTA de contacto. | Alta | Al menos 3 servicios definidos con lenguaje orientado a negocio. |

---

## 3. Requisitos No Funcionales (RNF)

### 3.1 Rendimiento — Core Web Vitals

| ID | Métrica | Objetivo | Herramienta de medición |
|---|---|---|---|
| RNF-01 | **LCP** (Largest Contentful Paint) | ≤ 2.5 s en conexión 4G | PageSpeed Insights / Lighthouse |
| RNF-02 | **INP** (Interaction to Next Paint) | ≤ 200 ms | Chrome DevTools / CrUX |
| RNF-03 | **CLS** (Cumulative Layout Shift) | ≤ 0.1 | PageSpeed Insights |
| RNF-04 | **FCP** (First Contentful Paint) | ≤ 1.8 s | Lighthouse |
| RNF-05 | **TTFB** (Time to First Byte) | ≤ 600 ms | WebPageTest |
| RNF-06 | Peso total de la página inicial | ≤ 300 KB (sin video) | Lighthouse Network |
| RNF-07 | Score Lighthouse Performance | ≥ 95 en desktop, ≥ 90 en mobile | Lighthouse CI |

### 3.2 Accesibilidad

| ID | Requisito | Estándar | Nivel |
|---|---|---|---|
| RNF-08 | Contraste de color texto/fondo debe cumplir la relación mínima requerida. | WCAG 2.1 §1.4.3 | AA |
| RNF-09 | Todos los elementos interactivos deben ser navegables por teclado con foco visible. | WCAG 2.1 §2.4.7 | AA |
| RNF-10 | Imágenes deben tener atributo `alt` descriptivo. Imágenes decorativas `alt=""`. | WCAG 2.1 §1.1.1 | A |
| RNF-11 | El sitio debe funcionar correctamente con lectores de pantalla (NVDA / VoiceOver). | WCAG 2.1 | AA |
| RNF-12 | Score de accesibilidad en Lighthouse | ≥ 95 | Lighthouse |

### 3.3 Seguridad

| ID | Requisito | Justificación |
|---|---|---|
| RNF-13 | El sitio debe servirse exclusivamente sobre HTTPS con certificado válido. | Confianza del usuario, SEO, requerimiento de navegadores modernos. |
| RNF-14 | Headers HTTP de seguridad obligatorios: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`. | Protección contra XSS, clickjacking e inyección de contenido. |
| RNF-15 | El formulario de contacto no debe exponer credenciales o API keys en el código cliente. | Prevención de abuso de servicios de email. |
| RNF-16 | Protección anti-spam en el formulario (honeypot o reCAPTCHA). | Evitar flood de mensajes falsos. |

### 3.4 Responsividad y Compatibilidad

| ID | Requisito | Detalles |
|---|---|---|
| RNF-17 | Diseño completamente responsivo con enfoque **mobile-first**. | Breakpoints mínimos: 375 px (mobile), 768 px (tablet), 1280 px (desktop). |
| RNF-18 | Compatibilidad con los últimas 2 versiones de: Chrome, Firefox, Safari, Edge. | Pruebas manuales + BrowserStack si se requiere. |
| RNF-19 | El sitio debe funcionar correctamente con JavaScript deshabilitado para el contenido estático (SSG/SSR preferido). | Accesibilidad básica garantizada. |

### 3.5 Mantenibilidad y Escalabilidad

| ID | Requisito | Detalles |
|---|---|---|
| RNF-20 | El contenido de proyectos debe ser editable sin tocar código (JSON / CMS headless). | Nuevos proyectos en < 5 minutos sin redeployar manualmente. |
| RNF-21 | El proyecto debe incluir documentación mínima: `README.md` con instrucciones de instalación y estructura del proyecto. | Debe permitir retomar el trabajo tras 3 meses de inactividad. |
| RNF-22 | El código debe seguir convenciones consistentes. | ESLint + Prettier configurados; 0 errores en CI. |
| RNF-23 | Deployment automatizado vía CI/CD (GitHub Actions → Vercel o Cloudflare Pages). | Push a `main` = producción en < 2 minutos. |

---

## 4. Historias de Usuario — Backlog Inicial

---

### HU-01 · Evaluación inmediata de credibilidad

> **Como** dueño de una PYME que encontró el portafolio por referencia o búsqueda,
> **quiero** entender en menos de 10 segundos quién es el desarrollador, qué hace y para quién trabaja,
> **para** decidir si vale la pena seguir explorando el sitio o contactarlo.

#### Criterios de Aceptación

- [ ] La sección Hero es visible sin hacer scroll en viewport de 375 px y 1280 px.
- [ ] El título profesional hace referencia explícita a servicios para empresas, no solo a tecnología.
- [ ] Existe un CTA principal ("Ver proyectos" o "Contáctame") visible en el Hero.
- [ ] El nombre y foto/avatar aparecen en el Hero.
- [ ] Test de los 5 segundos: un dueño de PYME sin contexto técnico puede explicar qué hace el desarrollador tras 5 s de ver la página.

---

### HU-02 · Evaluación de proyectos relevantes

> **Como** dueño de PYME interesado en contratar desarrollo web,
> **quiero** ver ejemplos concretos de proyectos anteriores con descripción del problema resuelto y resultados,
> **para** evaluar si el desarrollador tiene experiencia aplicable a mi negocio.

#### Criterios de Aceptación

- [ ] Cada tarjeta de proyecto muestra: título, descripción breve orientada a beneficio, stack y links a código/demo.
- [ ] Al hacer clic en un proyecto, se despliega una vista detallada con: contexto del problema, solución implementada, capturas o video, y tecnologías usadas con justificación.
- [ ] Los proyectos técnicos complejos (RSA, IPv6) incluyen una explicación en lenguaje llano del *por qué* son relevantes para un cliente no técnico.
- [ ] El filtro por categoría funciona sin recarga de página.
- [ ] Existe al menos un proyecto con demostración en vivo funcional.

---

### HU-03 · Contacto sin fricciones

> **Como** dueño de PYME que decidió que quiere cotizar un proyecto,
> **quiero** poder enviar un mensaje de forma rápida y sencilla desde el sitio,
> **para** recibir una respuesta del desarrollador sin tener que buscar su correo o ir a otra plataforma.

#### Criterios de Aceptación

- [ ] El formulario es accesible desde el menú de navegación y desde al menos un CTA en la sección de proyectos.
- [ ] El formulario tiene máximo 5 campos; ninguno es obligatorio excepto correo y mensaje.
- [ ] Tras enviar el formulario correctamente, el usuario ve un mensaje de confirmación en la misma página (sin redirigir).
- [ ] El desarrollador recibe el mensaje en su correo en < 60 segundos.
- [ ] Si hay un error de envío, el usuario ve un mensaje claro con alternativa (ej. correo directo como fallback).
- [ ] El formulario no puede enviarse con correo inválido o mensaje vacío; los errores se muestran inline.

---

### HU-04 · Validación de capacidad técnica avanzada

> **Como** tech lead o reclutador de TIDE Fellows revisando el portafolio,
> **quiero** ver proyectos con profundidad técnica real, decisiones de diseño justificadas y código accesible,
> **para** confirmar que el candidato domina sistemas de bajo nivel además del desarrollo web.

#### Criterios de Aceptación

- [ ] El proyecto del cifrador RSA en C incluye: descripción del algoritmo, fragmento de código representativo, enlace al repositorio con README detallado.
- [ ] El proyecto de análisis de redes IPv6 incluye: contexto del problema, metodología, hallazgos y enlace al repositorio.
- [ ] Los repositorios en GitHub están limpios, con commits descriptivos y README en inglés o español.
- [ ] El sitio incluye un enlace visible al perfil de GitHub en navegación o footer.
- [ ] El código del portafolio mismo (front-end) es de alta calidad: sin errores de consola, semántico y accesible.

---

### HU-05 · Experiencia fluida desde móvil

> **Como** dueño de PYME que accede al sitio desde su teléfono durante una reunión o en movimiento,
> **quiero** que el sitio sea completamente funcional, rápido y fácil de leer en mi celular,
> **para** no necesitar abrirlo en computadora para tomar la decisión de contactar al desarrollador.

#### Criterios de Aceptación

- [ ] El sitio es completamente funcional en viewports de 375 px y 390 px (iPhone SE y iPhone 14).
- [ ] El menú de navegación en mobile es usable con el pulgar (elementos táctiles ≥ 44 × 44 px).
- [ ] Las tarjetas de proyectos son legibles y navegables en pantalla de 375 px sin scroll horizontal.
- [ ] El formulario de contacto es completable desde teclado virtual sin campos ocultos por el teclado.
- [ ] LCP en mobile (conexión 4G simulada en DevTools) ≤ 2.5 s.
- [ ] El score de Lighthouse en mobile es ≥ 90 en Performance y ≥ 95 en Accessibility.

---

## 5. Restricciones Técnicas Confirmadas

| Categoría | Decisión | Justificación |
|---|---|---|
| **Estética** | Minimalista, inspiración Apple/macOS. Tipografía limpia, mucho espacio en blanco, paleta monocromática con un acento. | Transmite seniority y precisión. El diseño en sí es un argumento de venta. |
| **Mantenimiento** | Contenido de proyectos en JSON o CMS headless (ej. Contentlayer, Sanity, o Notion como backend). | Permite agregar proyectos sin tocar código. |
| **Escalabilidad** | Arquitectura basada en componentes. Next.js (SSG) o Astro recomendados. | SEO por defecto, performance excelente, fácil de extender. |
| **Proyectos a mostrar** | RSA en C y análisis IPv6 son los proyectos ancla de credibilidad técnica. | Demuestran comprensión de la máquina, no solo de frameworks. |
| **Idioma** | Español como idioma principal del sitio (mercado PYME local CDMX/MÉRIDA). | Con opción futura de toggle EN/ES para mercado internacional. |

---

## 6. Próximos Pasos — Fase 2

1. **Diseño de arquitectura de información** — sitemap, flujos de usuario, wireframes de baja fidelidad.
2. **Selección de stack técnico** — evaluación de Next.js vs Astro vs SvelteKit para cumplir RNF de performance.
3. **Design system** — definición de tokens de color, tipografía, espaciado y componentes base.
4. **Prototipo en Figma** — alta fidelidad de las 3 páginas core: Home, Detalle de Proyecto, Contacto.
5. **Estimación de esfuerzo** — breakdown de tareas en sprint de desarrollo.

---

*Documento generado como parte del proceso de ingeniería de software del portafolio profesional.*
*Autor: Gadiel · UADY Ingeniería de Software · TIDE Fellows 2024*
