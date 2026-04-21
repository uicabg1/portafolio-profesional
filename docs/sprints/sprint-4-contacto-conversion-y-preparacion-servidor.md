# Sprint 4 — Contacto, conversión y preparación para servidor

## Propósito del sprint

Cerrar la capa comercial y operativa mínima del portafolio antes de adquirir el servidor real.

Este sprint no trata de "hacerlo más grande", sino de dejarlo listo para:

1. captar contacto de forma confiable
2. comunicar mejor la oferta web-first
3. entregar una base clara para la fase post-Sprint 4 del VPS real

## Estado de partida

Al inicio de Sprint 4 el proyecto ya tiene:

- home `web-first` integrada
- proyectos reales con rutas dinámicas
- navegación entre proyectos
- SEO técnico por proyecto
- infraestructura y criterio NOC documentados
- sección de contacto integrada con WhatsApp, correo y formulario con validación inline
- jerarquía comercial alineada entre `Hero`, `Services`, `Projects`, `Infrastructure` y `Nav`
- envío de formulario validado end-to-end con Formspree y confirmación visual en la misma página

Pendiente actual dentro de Sprint 4:

- checklist operativo para adquirir el servidor al terminar el sprint
- preparación documental y técnica para la transición a Sprint 5

## Qué sí entra en Sprint 4

- cierre funcional del módulo de contacto
- mejora del flujo de conversión hacia contacto
- verificación móvil y de accesibilidad del flujo comercial
- preparación documental y técnica para adquirir el VPS después del sprint

## Qué no entra en Sprint 4

- compra del Droplet
- configuración real de Nginx, SSL o firewall en un VPS ya contratado
- activación comercial de hosting propio o despliegue administrado
- workflow real de despliegue a infraestructura en producción

Esas tareas quedan explícitamente para la fase post-Sprint 4.

---

## 1. Cierre del módulo de contacto

### 1.1 Integración del formulario real

- elegir servicio externo para envío de formularios
- recomendación inicial: Formspree por simplicidad de integración
- conectar el formulario a correo real mediante `PUBLIC_CONTACT_FORM_ENDPOINT` sin exponer secretos en cliente
- mantener WhatsApp como canal primario y formulario como canal complementario

### 1.2 Campos y experiencia de envío

- implementar campos alineados con `RF-08`:
  - nombre
  - empresa opcional
  - correo
  - tipo de proyecto
  - mensaje
- mostrar confirmación de envío en la misma página
- mostrar error claro con fallback a WhatsApp si falla el envío

### 1.3 Validación y accesibilidad

- validación inline para correo inválido y mensaje vacío
- labels y estados de error accesibles
- foco visible y navegación por teclado
- revisión de experiencia en mobile con teclado virtual

### 1.4 Protección anti-spam

- añadir honeypot o mecanismo equivalente de baja fricción
- confirmar que el flujo no degrade la experiencia del usuario real
- documentar la decisión técnica elegida

---

## 2. Conversión y consistencia comercial

### 2.1 Auditoría de CTAs

- revisar que `Hero`, `Services`, `Projects`, `Infrastructure` y `Nav` apunten correctamente a `#contacto`
- mantener una jerarquía clara:
  - CTA primario: WhatsApp o contacto
  - CTA secundario: ver proyectos
- eliminar cualquier CTA que suene a servicio aún no habilitado

### 2.2 Coherencia de oferta

- validar que la home siga vendiendo primero:
  - sitios web para negocio
  - landing pages
  - portafolios profesionales
- mantener infraestructura y redes como respaldo técnico
- evitar lenguaje que sugiera operación profesional de VPS ya ejecutada si aún no existe

### 2.3 Revisión de confianza

- revisar tono de copy para cliente no técnico
- verificar que el portafolio no se lea como “demo técnica primero”
- asegurar que el usuario entienda en segundos:
  - qué ofreces hoy
  - cómo contactarte
  - por qué confiar en tu criterio técnico

---

## 3. Validación funcional del flujo comercial

### 3.1 Revisión en desktop y mobile

- comprobar navegación hasta `#contacto`
- comprobar coexistencia de formulario y WhatsApp en desktop
- comprobar botón flotante y CTA visibles en mobile
- revisar legibilidad y tap targets en `375px` y `390px`

### 3.2 Verificación técnica base

- ejecutar `npm run astro -- check`
- ejecutar `npm run build`
- revisar la home y al menos una página de proyecto en `npm run dev`
- confirmar que no reaparezcan placeholders en contacto

### 3.3 Verificación de requisitos de contacto

- `RF-08`
- `RF-09`
- `RF-10`
- `RF-11`
- `RF-12`
- `RNF-15`
- `RNF-16`

### Resultado de la validación actual

- navegación a `#contacto` confirmada desde `Nav`, `Services`, `Projects`, `Infrastructure` y `Footer`
- coexistencia de WhatsApp, correo y formulario confirmada en la home servida localmente
- botón flotante de WhatsApp presente en el HTML y con área táctil definida para mobile
- home y detalle de proyecto revisados en entorno local sin reaparición de placeholders de contacto
- requisitos `RF-08` a `RF-12`, `RNF-15` y `RNF-16` cubiertos por implementación vigente y validación local

---

## 4. Preparación para la fase post-Sprint 4

### 4.1 Checklist para adquisición del servidor

- confirmar que el crédito de GitHub for Students está disponible y listo para aplicarse en DigitalOcean
- mantener como proveedor objetivo a `DigitalOcean`
- mantener como plan objetivo el `Droplet Basic` más económico disponible al momento de compra
- confirmar dominio real antes de entrar a DNS, HTTPS y metadata absoluta

Estado actual del checklist:

- [x] proveedor objetivo documentado: `DigitalOcean`
- [x] plan objetivo documentado: `Droplet Basic` más económico
- [x] estrategia de costo definida: crédito de GitHub for Students durante 12 meses
- [x] dominio real confirmado para reemplazar `https://uicabgadiel.com`

### 4.2 Checklist técnico previo al VPS

- reutilizar llave SSH local existente `ed25519` y registrar solo la llave pública al crear el Droplet
- mantener `Ubuntu LTS` como sistema operativo base recomendado
- definir usuario no-root para operación y deploy inicial; recomendación: `deploy`
- mantener `UFW` como firewall inicial con puertos `22`, `80` y `443`, incluyendo tráfico IPv6
- mantener `Nginx + Let's Encrypt` como estrategia base de serving y HTTPS
- dejar definidos los criterios de validación dual-stack:
  - `ping` / `ping6` o equivalentes
  - `curl -4` y `curl -6`
  - verificación de DNS `A` y `AAAA`
  - validación de serving público desde navegador

Estado actual del checklist técnico:

- [x] llave SSH local detectada en `~/.ssh/id_ed25519`
- [x] decisión operativa vigente: `Ubuntu LTS + Nginx + UFW + Let's Encrypt`
- [ ] llave pública cargada en DigitalOcean
- [ ] dominio real confirmado
- [ ] región final del Droplet elegida
- [ ] workflow CI/CD versionado en `.github/workflows/` para etapas posteriores

### 4.3 Handoff explícito al siguiente bloque

Al cerrar Sprint 4, el proyecto debe quedar listo para iniciar esta secuencia:

1. adquirir el Droplet Basic
2. configurar acceso SSH y hardening base
3. configurar Nginx y HTTPS
4. validar IPv6 dual-stack
5. reemplazar dominio placeholder
6. documentar el despliegue real como evidencia técnica

Definition of Ready para iniciar Sprint 5:

- el sitio ya capta contacto y comunica oferta web-first sin dependencias pendientes de UI
- el proveedor y tipo de servidor ya no están en discusión
- existe una llave SSH local reutilizable
- el dominio real está decidido o, como mínimo, identificado como único bloqueo previo a DNS y HTTPS
- el equipo sabe que la automatización CI/CD no bloquea la compra del servidor, pero sí queda pendiente para fases posteriores

---

## Criterios de aceptación del Sprint 4

- la sección de contacto deja de ser solo visual y funciona con envío real
- WhatsApp y formulario conviven sin competir ni duplicarse
- el flujo de contacto funciona en desktop y mobile
- la home mantiene una jerarquía clara de CTA: contacto primero, casos de estudio como apoyo y la capa técnica como respaldo
- la oferta sigue siendo web-first, sin inflar servicios aún no habilitados
- queda documentado el paso exacto de cierre de Sprint 4 hacia adquisición del VPS

## Resultado esperado al cerrar el sprint

Al finalizar Sprint 4, el portafolio debe estar listo para operar como activo comercial básico y para abrir la fase de infraestructura real.

Eso significa:

- ya puede captar leads con contacto funcional
- ya comunica con claridad qué se vende hoy
- ya tiene una transición documentada hacia servidor propio
- todavía no vende hosting propio ni despliegue administrado como oferta activa
