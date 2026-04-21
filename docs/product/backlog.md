# Backlog del proyecto

Este documento resume el estado funcional del portafolio con foco en trabajo pendiente y prioridades inmediatas.

## Estado actual

### Decisión vigente

- Estrategia comercial `web-first` con diferenciador técnico
- Formación LACNIC/TIDE documentada como capacidad en progreso con evidencia
- Infraestructura real ya desplegada en VPS propio; la automatización CI/CD inicial ya funciona y la operación mínima está documentada

### Completado

- Home principal reordenada con narrativa `web-first`
- Home principal con `Hero`, `Services`, `ProjectFilter`, `About`, `Infrastructure`, `Contact` y `Footer`
- Botón flotante de WhatsApp como isla Preact
- Content Collections con proyectos MDX reales
- Rutas estáticas de detalle en `/proyectos/[slug]`
- Sección de infraestructura con capa de networking y criterio operativo NOC
- Breadcrumb mejorado y navegación anterior/siguiente entre proyectos
- SEO técnico por proyecto con canonical, Open Graph y structured data
- Sección de contacto integrada con canales directos activos por WhatsApp y correo
- Formulario de contacto integrado con validación inline, honeypot y fallback a WhatsApp
- Endpoint real de Formspree configurado y envío validado end-to-end
- Jerarquía comercial de la home alineada a `#contacto` con oferta web-first y capa técnica como respaldo
- Dominio real `uicabgadiel.com` configurado para metadata absoluta
- Droplet Basic de DigitalOcean aprovisionado con `Ubuntu 24.04.4 LTS`
- Acceso SSH por llave con usuario operativo `deploy`
- Hardening base aplicado al acceso remoto
- `Nginx + UFW + Let's Encrypt` configurados en el VPS real
- Publicación inicial del sitio completada sobre `uicabgadiel.com`
- Acceso público validado por `HTTPS`, `IPv4` e `IPv6`
- Renovación SSL validada con `certbot renew --dry-run`
- Rollback básico y checklist post-deploy manual documentados
- Workflow inicial de GitHub Actions versionado en `.github/workflows/deploy.yml`
- Llave SSH dedicada de CI creada y registrada en el VPS
- Secrets de GitHub Actions configurados
- Primer despliegue automático exitoso desde GitHub Actions contra el VPS real
- Assets Open Graph versionados y validados por prueba automatizada para evitar despliegues incompletos
- Validación no destructiva de rollback desde backup generado por el workflow
- Documentación operativa curada para cierre de Sprint 6

### En progreso

- Documentación canónica del proyecto y separación de histórico
- Organización de la evidencia LACNIC/TIDE dentro de la documentación canónica
- QA final de release en Sprint 7

### Pendiente

- Versionado de configuración de servidor o plantillas asociadas
- Decidir si se realiza una prueba destructiva/controlada de restore real en producción
- Profundizar observabilidad con monitoreo externo si el proyecto lo requiere
- Rediseño visual mayor de UI en un sprint posterior al cierre técnico

## Próximas prioridades

1. Ejecutar Sprint 7: QA final, accesibilidad, responsive, performance y cierre de release.
2. Corregir los hints de Zod en `src/content.config.ts` si se decide limpiar deuda técnica menor.
3. Versionar configuración de servidor o plantillas asociadas.
4. Planear el sprint posterior de rediseño UI completo.

## Relación con requisitos

- Fuente de requisitos: [requisitos.md](requisitos.md)
- Sprint activo: [../sprints/sprint-7-qa-release-y-cierre.md](../sprints/sprint-7-qa-release-y-cierre.md)
- Sprint anterior cerrado: [../sprints/sprint-6-cicd-operacion-y-servicios-complementarios.md](../sprints/sprint-6-cicd-operacion-y-servicios-complementarios.md)
- El backlog debe mantenerse alineado con el estado del código, no con los runbooks históricos.
