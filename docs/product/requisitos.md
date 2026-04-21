# Fase 1 — Ingeniería de Requisitos
## Portafolio Profesional · Gadiel · UADY / TIDE Fellows

> **Versión:** 1.2 | **Estado:** Aprobado para Fase de Diseño | **Metodología:** Agile + IEEE 830
>
> **Estado documental:** fuente canónica de requisitos del proyecto. La versión anterior quedó archivada en `docs/archive/superseded/requirements-v1.0.md`.

---

## 1. Análisis de Stakeholders

### 1.1 Stakeholder Primario — Dueño de PYME

> El cliente objetivo no compra código. Compra **confianza, resultados y tiempo recuperado**.

| Dimensión | Qué busca | Señal de alerta si no lo ve |
|---|---|---|
| **Credibilidad técnica** | Evidencia de proyectos reales y terminados, no tutoriales. Quiere ver que ya resolviste problemas similares al suyo. | Portafolio vacío o con proyectos de práctica genéricos ("todo app"). |
| **Comunicación clara** | Que le expliques el proyecto en su idioma (negocio, no código). No quiere escuchar sobre RSA ni IPv6; quiere saber qué problema le resuelves. | Jerga técnica excesiva sin traducción a valor de negocio. |
| **Precio justificado** | Que entienda por qué cuesta lo que cuesta. El portafolio debe transmitir seniority y precisión antes de mostrar un precio. | Sitio que se ve barato genera expectativas de precio bajo. |
| **Velocidad de respuesta** | Contacto inmediato por el canal que ya usa: WhatsApp. Una propuesta en menos de 24 h. Señales de que no lo vas a ignorar. | Solo formulario de correo. En Mérida y el sureste, WhatsApp es el canal de negocio por defecto. |
| **Riesgo percibido bajo** | Prueba social: clientes anteriores, testimonios, o en su ausencia, proyectos detallados que demuestren proceso, no solo resultado. | Sin ninguna prueba de trabajo real previo. |
| **Estética que inspira confianza** | El sitio *en sí mismo* es tu carta de presentación. Un diseño descuidado sugiere descuido en el trabajo contratado. | Diseño desactualizado, tipografía inconsistente, mobile roto. |

### 1.2 Stakeholder Secundario — Reclutador / Tech Lead (TIDE Fellows / Futuras oportunidades)

| Dimensión | Qué busca |
|---|---|
| **Profundidad técnica** | Proyectos complejos con explicación de decisiones de diseño (por qué RSA en C, por qué IPv6 análisis). |
| **Stack y versatilidad** | Evidencia de dominio bajo nivel (C/C++) + web. Demuestra que entiende la máquina, no solo frameworks. |
| **Escritura técnica** | Que puedas documentar lo que construyes. READMEs, diagramas, casos de uso. |
| **Infraestructura real** | Gestión de servidores, SSL, configuración de red IPv6 desde cero. Diferencia a un ingeniero de un consumidor de plataformas. |
| **Proceso** | Código en GitHub con commits limpios, no solo el resultado final. |

---

### 1.3 Posicionamiento comercial vigente

El portafolio sigue una estrategia **web-first con diferenciador técnico**.

- La oferta principal actual son servicios web vendibles hoy: sitios para negocio, landing pages, portafolios profesionales y despliegues web sencillos.
- La formación LACNIC/TIDE se refleja como **capacidad en progreso con evidencia**, no como especialización cerrada ni como promesa comercial sobredimensionada.
- La infraestructura propia del portafolio se conserva como demostración de criterio técnico y respaldo de confianza.
- Los servicios complementarios de servidor solo deben venderse cuando exista infraestructura real documentada:
  - despliegue técnico administrado
  - hosting propio en VPS
  - sitios web con setup técnico sólido
- El desbloqueo esperado de esa capa ocurre después del Sprint 4, cuando exista un VPS real con IPv6, SSL y despliegue documentado.

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
| RF-07 | El contenido de los proyectos debe gestionarse mediante archivos locales en formato Markdown, MDX o JSON. No se admiten dependencias de APIs de CMS de terceros. | Alta | Agregar un proyecto nuevo requiere únicamente crear o editar un archivo local y ejecutar el build. Sin llamadas externas en tiempo de ejecución. |

### 2.3 Módulo de Contacto

| ID | Requisito | Prioridad | Criterio de éxito |
|---|---|---|---|
| RF-08 | Debe existir un formulario de contacto con campos: nombre, empresa (opcional), correo electrónico, tipo de proyecto (dropdown) y mensaje. | Alta | El formulario envía correctamente y el usuario recibe confirmación visual inmediata. |
| RF-09 | El formulario debe enviar los datos al correo del desarrollador mediante un servicio de terceros (Formspree, EmailJS o equivalente). | Alta | El correo llega al destinatario en < 60 segundos. |
| RF-10 | Debe haber validación del lado del cliente con mensajes de error claros en español. | Media | Campos vacíos y formato de email inválido muestran error antes de enviar. |
| RF-11 | El formulario debe incluir protección anti-spam básica (honeypot field o reCAPTCHA invisible). | Media | Bots automáticos no generan envíos en 30 días de monitoreo. |
| RF-12 | Debe existir un botón de contacto directo vía WhatsApp de alta visibilidad, independiente del formulario. Al presionarlo, debe abrir WhatsApp (web o app) con un mensaje predefinido que incluya contexto del portafolio (ej. "Hola, vi tu portafolio y me interesa cotizar un proyecto"). | Alta | El botón es visible sin hacer scroll en mobile. El enlace construye el mensaje correctamente con `wa.me` y encoding de URL. Funciona en iOS y Android. |

### 2.4 Módulo de Servicios

| ID | Requisito | Prioridad | Criterio de éxito |
|---|---|---|---|
| RF-13 | Debe existir una sección "Servicios" que liste los servicios ofrecidos a PYMES con descripción, beneficio y CTA de contacto. La oferta principal vigente debe ser web-first. | Alta | Al menos 3 servicios definidos con lenguaje orientado a negocio, priorizando sitios web, landing pages o portafolios profesionales. |
| RF-14 | El sitio puede comunicar servicios técnicos complementarios de servidor o despliegue solo cuando estén respaldados por infraestructura real del propio portafolio. | Media | Ningún servicio de hosting propio, despliegue administrado o setup técnico sólido se presenta como oferta activa sin VPS real documentado. |

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
| RNF-13 | El sitio debe servirse exclusivamente sobre HTTPS con certificado SSL/TLS gestionado manualmente mediante Let's Encrypt en el VPS. El proceso de emisión, renovación y verificación debe estar documentado como parte del caso de estudio de infraestructura. | Confianza del usuario, SEO, y demostración de competencia en administración de servidores. |
| RNF-14 | Headers HTTP de seguridad obligatorios: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`. Configurados directamente en Nginx o Caddy, no delegados a una plataforma. | Protección contra XSS, clickjacking e inyección de contenido. Demuestra dominio de configuración de servidor. |
| RNF-15 | El formulario de contacto no debe exponer credenciales o API keys en el código cliente. | Prevención de abuso de servicios de email. |
| RNF-16 | Protección anti-spam en el formulario (honeypot o reCAPTCHA). | Evitar flood de mensajes falsos. |

### 3.4 Responsividad y Compatibilidad

| ID | Requisito | Detalles |
|---|---|---|
| RNF-17 | Diseño completamente responsivo con enfoque **mobile-first**. | Breakpoints mínimos: 375 px (mobile), 768 px (tablet), 1280 px (desktop). |
| RNF-18 | Compatibilidad con las últimas 2 versiones de: Chrome, Firefox, Safari, Edge. | Pruebas manuales + BrowserStack si se requiere. |
| RNF-19 | El sitio debe funcionar correctamente con JavaScript deshabilitado para el contenido estático (SSG/SSR preferido). | Accesibilidad básica garantizada. |

### 3.5 Mantenibilidad

| ID | Requisito | Detalles |
|---|---|---|
| RNF-20 | El contenido de proyectos debe gestionarse exclusivamente con archivos locales (Markdown, MDX o JSON) procesados en tiempo de build. Sin dependencias de CMS, bases de datos externas ni APIs de terceros para la carga de contenido. | Latencia mínima (contenido estático puro), sin puntos de falla externos, sin costos adicionales. Adecuado para el volumen inicial de ≤ 20 proyectos. |
| RNF-21 | El proyecto debe incluir documentación mínima: `README.md` con instrucciones de instalación, estructura del proyecto y procedimiento de despliegue en VPS. | Debe permitir retomar el trabajo tras 3 meses de inactividad sin consultar fuentes externas. |
| RNF-22 | El código debe seguir convenciones consistentes. | ESLint + Prettier configurados; 0 errores en CI. |

### 3.6 Infraestructura — Caso de Estudio

> Este módulo convierte la infraestructura del portafolio en un proyecto demostrable de competencias en redes y administración de servidores.

| ID | Requisito | Detalles |
|---|---|---|
| RNF-23 | El portafolio debe estar alojado en un **VPS gestionado manualmente** (DigitalOcean, Hetzner, Contabo o equivalente). Quedan excluidas plataformas PaaS con despliegue cero-configuración como Vercel, Netlify o Cloudflare Pages. | El proceso de aprovisionamiento desde una imagen base de Linux es en sí mismo una demostración de competencia técnica. La primera implementación prevista usará el plan más económico de DigitalOcean, aprovechando el crédito de GitHub for Students durante 12 meses. |
| RNF-24 | El servidor debe configurarse desde cero con: instalación y hardening de Nginx o Caddy, firewall (UFW o nftables), usuario no-root con acceso SSH por llave, y deshabilitación de acceso root remoto. | Cada decisión de configuración debe documentarse en el caso de estudio de infraestructura dentro del portafolio. |
| RNF-25 | El servidor debe tener conectividad **IPv6 completamente funcional** y configurada manualmente: asignación de dirección IPv6, reglas de firewall para tráfico IPv6, y verificación de acceso dual-stack (IPv4 + IPv6). La configuración IPv6 debe ser uno de los proyectos de red documentados en el portafolio. | Refuerza directamente el proyecto de análisis de redes IPv6 como caso de estudio con infraestructura real, no solo teórica. |
| RNF-26 | Los certificados SSL/TLS deben emitirse y renovarse mediante **Let's Encrypt + Certbot** operados manualmente. El flujo completo (emisión, configuración en Nginx/Caddy, renovación automática con cron o systemd timer) debe estar documentado. | Distingue entre un desarrollador que delega la seguridad a una plataforma y uno que la administra. |
| RNF-27 | El proceso de despliegue debe realizarse mediante un **pipeline CI/CD propio** (GitHub Actions) que ejecute el build y transfiera los artefactos al VPS vía SSH/rsync. No se admiten integraciones automáticas propietarias de plataformas PaaS. | Push a `main` activa el pipeline; el deploy completo debe finalizar en < 3 minutos. Demuestra dominio de automatización de infraestructura sin depender de abstracciones. |

---

## 4. Historias de Usuario — Backlog v1.1

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
- [ ] Los proyectos de bajo nivel (RSA en C, análisis IPv6) incluyen **obligatoriamente un componente visual** — diagrama interactivo, infografía animada o analogía visual — que traduzca la lógica técnica a valor de negocio comprensible para un cliente no técnico. Ejemplos aceptables: diagrama animado del flujo de cifrado comparado con "un candado que nadie más puede abrir", o mapa visual de la red IPv6 con indicadores de rendimiento expresados en términos de velocidad y confiabilidad para el negocio. Queda excluida cualquier descripción únicamente textual de la implementación técnica.
- [ ] El filtro por categoría funciona sin recarga de página.
- [ ] Existe al menos un proyecto con demostración en vivo funcional.

---

### HU-03 · Contacto sin fricciones — Canal WhatsApp

> **Como** dueño de PYME en Mérida que encontró el portafolio y quiere iniciar una conversación rápida,
> **quiero** poder contactar al desarrollador por WhatsApp con un solo toque,
> **para** cerrar una cotización inicial en el mismo canal que uso para mis negocios del día a día, sin necesidad de redactar un correo formal.

#### Criterios de Aceptación

- [ ] Existe un botón de WhatsApp visible en la sección de contacto y flotante en mobile, sin necesidad de hacer scroll.
- [ ] Al presionar el botón, se abre WhatsApp (app o web) con un mensaje predefinido en español que identifica el origen del contacto: "Hola [nombre], vi tu portafolio en [url] y me interesa platicar sobre un proyecto para mi empresa."
- [ ] El enlace usa el esquema `https://wa.me/[número]?text=[mensaje_encoded]` con encoding de URL correcto.
- [ ] El botón funciona correctamente en iOS (Safari), Android (Chrome) y desktop (WhatsApp Web).
- [ ] El número de teléfono incluye código de país (+52 para México).
- [ ] En desktop, el botón de WhatsApp coexiste con el formulario de correo sin reemplazarlo; ambos canales son visibles.

---

### HU-04 · Contacto por formulario

> **Como** dueño de PYME que decidió que quiere cotizar un proyecto y prefiere dejar sus datos por escrito,
> **quiero** poder enviar un mensaje de forma rápida y sencilla desde el sitio,
> **para** recibir una respuesta del desarrollador sin tener que buscar su correo o ir a otra plataforma.

#### Criterios de Aceptación

- [ ] El formulario es accesible desde el menú de navegación y desde al menos un CTA en la sección de proyectos.
- [ ] El formulario tiene máximo 5 campos; ninguno es obligatorio excepto correo y mensaje.
- [ ] Tras enviar el formulario correctamente, el usuario ve un mensaje de confirmación en la misma página (sin redirigir).
- [ ] El desarrollador recibe el mensaje en su correo en < 60 segundos.
- [ ] Si hay un error de envío, el usuario ve un mensaje claro con alternativa (número de WhatsApp como fallback explícito).
- [ ] El formulario no puede enviarse con correo inválido o mensaje vacío; los errores se muestran inline.

---

### HU-05 · Validación de capacidad técnica e infraestructura

> **Como** tech lead o reclutador de TIDE Fellows revisando el portafolio,
> **quiero** ver proyectos con profundidad técnica real, decisiones de diseño justificadas, código accesible e infraestructura gestionada manualmente,
> **para** confirmar que el candidato domina sistemas de bajo nivel, redes y administración de servidores, además del desarrollo web.

#### Criterios de Aceptación

- [ ] El proyecto del cifrador RSA en C incluye: descripción del algoritmo, fragmento de código representativo, diagrama visual del flujo criptográfico y enlace al repositorio con README detallado.
- [ ] El proyecto de análisis de redes IPv6 incluye: contexto del problema, metodología, hallazgos, visualización de datos de red y enlace al repositorio.
- [ ] El portafolio incluye una sección o página de "Infraestructura" que documenta: el VPS utilizado, la configuración de Nginx/Caddy, la gestión de certificados SSL con Let's Encrypt, la configuración IPv6 dual-stack y el pipeline CI/CD con GitHub Actions.
- [ ] El sitio es accesible por IPv6 (verificable con `curl -6 https://[dominio]` o herramientas como ipv6-test.com).
- [ ] Los repositorios en GitHub están limpios, con commits descriptivos y README en inglés o español.
- [ ] El sitio incluye un enlace visible al perfil de GitHub en navegación o footer.
- [ ] El código del portafolio mismo (front-end) es de alta calidad: sin errores de consola, semántico y accesible.

---

### HU-06 · Experiencia fluida desde móvil

> **Como** dueño de PYME que accede al sitio desde su teléfono durante una reunión o en movimiento,
> **quiero** que el sitio sea completamente funcional, rápido y fácil de leer en mi celular,
> **para** no necesitar abrirlo en computadora para tomar la decisión de contactar al desarrollador.

#### Criterios de Aceptación

- [ ] El sitio es completamente funcional en viewports de 375 px y 390 px (iPhone SE y iPhone 14).
- [ ] El botón de WhatsApp es visible y operable sin scroll en mobile; su área táctil es ≥ 44 × 44 px.
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
| **Oferta principal vigente** | Servicios web para negocio: sitios, landing pages, portafolios profesionales y despliegues web sencillos. | Es la oferta más honesta, vendible y sostenible para la etapa actual del proyecto. |
| **Oferta técnica complementaria** | Hosting propio en VPS, despliegue técnico administrado y sitios con setup técnico sólido solo se activan después del Sprint 4 con infraestructura real documentada. | Evita sobrerrepresentar capacidades aún no ejecutadas en producción y alinea venta con evidencia. |
| **Gestión de contenido** | Archivos locales únicamente: Markdown, MDX o JSON procesados en build. Sin CMS ni APIs externas para contenido. | Latencia cero en tiempo de ejecución, sin puntos de falla externos, sin costos adicionales de terceros. |
| **Infraestructura** | VPS gestionado manualmente con Nginx/Caddy, SSL por Let's Encrypt, IPv6 dual-stack y CI/CD por GitHub Actions vía SSH. | La infraestructura es un proyecto demostrable, no una caja negra delegada a una plataforma. |
| **Formación técnica** | LACNIC/TIDE se comunica como capacidad en progreso con evidencia y aplicación práctica gradual al servidor del portafolio. | Mantiene credibilidad documental y permite mostrar avance real sin inflar la oferta comercial. |
| **Escalabilidad** | Arquitectura basada en componentes. Next.js (SSG) o Astro recomendados. | SEO por defecto, performance excelente, output estático compatible con servidor propio. |
| **Proyectos ancla** | RSA en C y análisis IPv6 son los proyectos de credibilidad técnica. Cada uno requiere componente visual obligatorio. | Demuestran comprensión de la máquina. El componente visual los hace vendibles ante un cliente no técnico. |
| **Canal de contacto primario** | WhatsApp como canal de alta conversión para mercado PYME en Mérida y sureste de México. | El correo electrónico permanece como canal secundario, nunca como único canal. |
| **Idioma** | Español como idioma principal del sitio (mercado PYME local Mérida / sureste). | Con opción futura de toggle EN/ES para mercado internacional. |

---

## 6. Registro de Cambios — v1.0 → v1.1

| ID cambio | Elemento modificado | Tipo | Descripción |
|---|---|---|---|
| C-01 | RF-12 (nuevo) | Adición | Canal de contacto WhatsApp con mensaje predefinido como requisito funcional de alta prioridad. |
| C-02 | RF-08 actualizado | Ajuste | Contexto de contacto enriquecido para reflejar dual-canal (formulario + WhatsApp). |
| C-03 | RNF-20 | Reemplazo | Eliminada la referencia a CMS headless. Requisito reescrito para exigir archivos locales estáticos exclusivamente. |
| C-04 | RNF-23 | Reemplazo completo | Eliminado el despliegue en Vercel/Netlify. Sustituido por módulo completo de infraestructura en VPS (RNF-23 a RNF-27). |
| C-05 | HU-02 CA #3 | Actualización | Criterio de aceptación de proyectos técnicos reescrito: componente visual obligatorio (diagrama interactivo o infografía) con estándar de aceptación medible. |
| C-06 | HU-03 | Nueva historia | Historia de usuario específica para el canal WhatsApp, separada de la historia de formulario. |
| C-07 | HU-04 | Renumeración | Antigua HU-03 (formulario) renumerada a HU-04; criterio de fallback actualizado a WhatsApp. |
| C-08 | HU-05 | Actualización | Criterios de aceptación expandidos para incluir verificación de infraestructura VPS, IPv6 y documentación del pipeline CI/CD. |
| C-09 | HU-06 | Renumeración | Antigua HU-05 (mobile) renumerada a HU-06; criterio de WhatsApp en mobile añadido. |
| C-10 | 1.3 Posicionamiento comercial vigente | Adición | Se fija estrategia web-first con diferenciador técnico y desbloqueo post-Sprint 4 para servicios de servidor. |
| C-11 | RF-13 / RF-14 | Ajuste | La oferta comercial actual se restringe a servicios web; la capa de VPS se activa solo con evidencia real. |
| C-12 | RNF-23 | Ajuste | Se documenta DigitalOcean Basic como entorno previsto para la primera implementación real usando GitHub for Students. |

---

*Documento generado como parte del proceso de ingeniería de software del portafolio profesional.*
*Autor: Gadiel · UADY Facultad De Matemáticas Ingeniería de Software*
*Revisado y actualizado: v1.1 — Alineación con mercado PYME sureste México + arquitectura de infraestructura propia.*
