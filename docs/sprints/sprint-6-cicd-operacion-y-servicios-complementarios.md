# Sprint 6 — CI/CD, operación y habilitación técnica

## Propósito del sprint

Automatizar la publicación del sitio y convertir el servidor real en una infraestructura operable, no solo publicada.

Este sprint empieza cuando el sitio ya está accesible públicamente desde el VPS real.

## Estado de partida

Al inicio de Sprint 6 el proyecto ya debe tener:

- [x] Droplet real operativo
- [x] DNS real
- [x] HTTPS activo
- [x] acceso por IPv4 e IPv6 validado
- [x] publicación inicial manual funcionando
- [x] renovación SSL validada con `certbot renew --dry-run`
- [x] rollback básico manual documentado

Pendiente al inicio de Sprint 6:

- pipeline CI/CD versionado
- rollback integrado al flujo de publicación
- criterios operativos mínimos post-deploy
- alineación entre infraestructura real y oferta técnica complementaria

## Estado actual

Sprint 6 queda cerrado el 2026-04-21. La base manual del VPS ya fue validada en Sprint 5 y el workflow de GitHub Actions ya ejecuta despliegues exitosos contra el VPS real.

Completado hasta ahora:

- workflow `.github/workflows/deploy.yml` creado
- llave SSH dedicada para CI creada en `~/.ssh/github_actions_portafolio`
- llave pública de CI agregada al usuario `deploy` en el VPS
- runbook de configuración manual de GitHub Actions documentado
- fallback manual por `rsync` preservado
- validación local del workflow, build, SSH y prueba seca de `rsync` completada
- secrets configurados en GitHub Actions
- primer deploy automático exitoso desde GitHub Actions
- assets Open Graph versionados para evitar que `rsync --delete-after` los elimine del VPS
- verificación pública posterior al deploy validada en home, ruta de proyecto, `og/default.svg`, IPv4 e IPv6
- rollback validado de forma no destructiva inspeccionando el backup más reciente del workflow
- operación mínima enlazada con la narrativa NOC mediante runbook de observabilidad
- documentación curada para README, arquitectura, operaciones, backlog y sprints

Fuera del cierre de Sprint 6:

- restore real completo de producción, reservado para una ventana controlada si se requiere validación estricta
- observabilidad avanzada con stack externo, reservada para evolución posterior
- rediseño visual mayor, reservado para un sprint de UI dedicado

## Qué sí entra en Sprint 6

- workflow de build y deploy en GitHub Actions
- publicación automática por SSH/rsync
- verificación post-deploy mínima
- documentación operativa real
- preparación para comunicar la capa técnica complementaria

## Qué no entra en Sprint 6

- QA final integral de release
- rediseño visual mayor del sitio
- expansión a múltiples entornos
- observabilidad avanzada con stack externo complejo

---

## 1. Pipeline CI/CD real

### 1.1 Workflow versionado

- [x] crear workflow en `.github/workflows/`
- [x] compilar el sitio con `npm run build`
- [x] transferir artefactos estáticos al servidor
- [x] evitar recarga de Nginx porque el sitio es estático y `deploy` no requiere `sudo`

### 1.2 Secrets y seguridad operativa

- [x] configurar secrets necesarios en GitHub
- [x] evitar exposición de credenciales en repo
- [x] documentar responsabilidades mínimas de acceso

---

## 2. Publicación controlada y rollback

### 2.1 Estrategia de despliegue

- [x] definir ruta de publicación estable
- [x] documentar orden de deploy
- [x] minimizar riesgo de downtime durante publicación con `rsync --delay-updates --delete-after`

### 2.2 Rollback básico

- [x] definir cómo volver a la versión anterior
- [x] documentar pasos mínimos de recuperación
- [x] validar backup del workflow de forma no destructiva después de la primera ejecución real

---

## 3. Operación mínima del servicio

### 3.1 Verificación post-deploy

- [x] validar respuesta HTTP/HTTPS
- [x] validar assets principales
- [x] validar home y al menos una ruta de proyecto
- [x] validar conectividad por IPv6 después de publicar, con warning si el runner no soporta IPv6

### 3.2 Criterio operativo

- [x] dejar checklist simple de publicación
- [x] dejar checklist de diagnóstico inicial
- [x] enlazar esta operación con la narrativa NOC ya mostrada en el sitio

---

## 4. Documentación y alineación comercial

### 4.1 Actualización documental

- [x] actualizar `docs/operations/deployment-vps.md`
- [x] actualizar `docs/architecture/overview.md` si cambia el estado de infraestructura
- [x] actualizar `docs/product/backlog.md` con lo ya completado después del primer workflow exitoso

### 4.2 Servicios complementarios

- [x] definir si ya existe suficiente evidencia para comunicar despliegue técnico administrado
- [x] definir si ya existe suficiente evidencia para comunicar hosting propio en VPS
- [x] definir si ya existe suficiente evidencia para comunicar sitios web con setup técnico sólido
- [x] si se comunican, hacerlo como complemento y no como oferta principal

Decisión: existe evidencia suficiente para comunicar `despliegue técnico`, `setup VPS` y `hosting propio` como capacidades complementarias bajo alcance controlado. No deben desplazar la oferta principal `web-first` hasta que exista más operación acumulada.

---

## Criterios de aceptación del Sprint 6

- [x] el deploy deja de depender de publicación manual ad hoc
- [x] existe workflow versionado y ejecutable
- [x] existe rollback básico documentado
- [x] la operación post-deploy tiene checklist claro
- [x] la documentación ya refleja infraestructura real y automatizada con evidencia de primera ejecución

## Evidencia de primera ejecución automática

Fecha: 2026-04-21

- workflow: `Deploy portfolio to VPS`
- commit validado: `9e8e2c7`
- ejecución GitHub Actions: `24744742751`
- resultado: `success`
- verificación pública posterior: home, `/proyectos/portafolio-m4/`, `/og/default.svg`, IPv4 e IPv6 respondieron `200`
- verificación en VPS: `/var/www/portafolio/index.html` y `/var/www/portafolio/og/default.svg` existen
- rollback no destructivo: el backup `/home/deploy/portafolio-backups/portafolio-9e8e2c7-20260421T203308Z.tar.gz` se descomprimió en una carpeta temporal y contiene `index.html` y `og/default.svg`

Incidencia resuelta durante la primera validación:

- el paso `Verify deployed files on VPS` falló porque `public/og/` existía localmente pero no estaba versionado en Git
- GitHub Actions construyó sin esos assets y `rsync --delete-after` eliminó `og/default.svg` del VPS
- se corrigió versionando `public/og/`, agregando una prueba preventiva de assets y haciendo más explícito el error del workflow si falta un archivo publicado

## Cierre del sprint

Sprint 6 queda cerrado con CI/CD funcional, VPS operable, backups automáticos, checks post-deploy y documentación operativa suficiente para mantener el sitio. El siguiente paso natural es Sprint 7, enfocado en QA final, accesibilidad, rendimiento y cierre de release.

## Resultado esperado al cerrar el sprint

Al finalizar Sprint 6, el sitio ya no solo vive en un VPS real: también tiene un proceso reproducible para publicarse y mantenerse con control operativo básico.
