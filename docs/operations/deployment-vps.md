# Despliegue a VPS

## Estado

Entorno real aprovisionado, publicación inicial completada, renovación SSL validada y despliegue automático desde GitHub Actions funcionando contra el VPS real.

## Decisión operativa vigente

La primera implementación real se ejecutó en un **Droplet Basic de DigitalOcean**, usando el crédito de **GitHub for Students** disponible por 12 meses.

Esta decisión busca:

- minimizar costo mientras se valida el caso de estudio real
- habilitar documentación verificable de servidor, IPv6 y despliegue
- desbloquear servicios complementarios de hosting propio y despliegue técnico solo después de tener evidencia real

## Checklist precompra al cierre de Sprint 4

- [x] `astro build` genera salida estática lista para publicar
- [x] la capa comercial del sitio ya está cerrada y operativa
- [x] proveedor objetivo definido: `DigitalOcean`
- [x] plan objetivo definido: `Droplet Basic` más económico
- [x] existe una llave SSH local `ed25519` reutilizable en la máquina de trabajo
- [x] dominio real confirmado para DNS, HTTPS y metadata absoluta: `uicabgadiel.com`
- [x] llave pública agregada a la cuenta de DigitalOcean
- [x] región final elegida para el Droplet: `NYC3`

Notas operativas:

- la compra del Droplet no depende todavía de GitHub Actions ni de automatización dentro del repo
- el dominio sí bloquea la parte de DNS, HTTPS y reemplazo de `site` en `astro.config.mjs`
- la llave privada no debe salir de la máquina local; solo se registra la llave pública en el proveedor

## Estado actual del entorno real

- proveedor: `DigitalOcean`
- región: `NYC3`
- plan inicial: `Droplet Basic`
- hostname inicial: `ubuntu-s-1vcpu-1gb-nyc3`
- sistema operativo real: `Ubuntu 24.04.4 LTS`
- dominio publicado: `uicabgadiel.com`
- dominio alterno publicado: `www.uicabgadiel.com`
- IP pública IPv4: `159.89.40.113`
- IP pública IPv6: `2604:a880:800:14:0:2:d90d:c000`
- usuario operativo: `deploy`
- ruta de publicación estática: `/var/www/portafolio`
- servidor web: `Nginx`
- firewall base: `UFW`
- HTTPS: `Let's Encrypt + Certbot`
- capa DNS/proxy: `Cloudflare`

## Configuración aplicada

### Acceso administrativo y hardening

- se reutilizó la llave local `ed25519` para acceso al servidor
- se creó el usuario no-root `deploy` con privilegios `sudo`
- se copió `authorized_keys` al usuario operativo
- se deshabilitó `PermitRootLogin`
- se deshabilitó autenticación por contraseña
- se mantuvo autenticación por llave pública

### Firewall y red

- `UFW` quedó habilitado con reglas para `OpenSSH`, `80/tcp` y `443/tcp`
- se confirmó soporte IPv6 en `UFW`
- el dominio publica registros `A`, `AAAA` y `CNAME` mediante Cloudflare

### Serving y publicación

- `Nginx` sirve el sitio estático desde `/var/www/portafolio`
- la configuración inicial escucha en `80` y `[::]:80`
- la publicación principal se realiza desde GitHub Actions con SSH y `rsync`
- la publicación manual por `rsync` desde la máquina local se conserva como fallback
- `astro.config.mjs` ya usa `https://uicabgadiel.com` como `site`

### HTTPS

- el sitio responde públicamente por `HTTPS`
- Cloudflare quedó delante del origen y el dominio resuelve correctamente
- el origen se emite mediante `Certbot` integrado con `Nginx`

## Flujo de publicación manual de fallback

```text
Mac local -> astro build -> rsync -> VPS -> Nginx -> Cloudflare -> sitio público
```

Comando de publicación manual vigente:

```bash
rsync -avz --delete dist/ deploy@159.89.40.113:/var/www/portafolio/
```

## Flujo de publicación automatizado

```text
GitHub -> GitHub Actions -> npm ci/test/check/build -> backup remoto -> rsync -> VPS -> checks públicos
```

Workflow versionado:

```text
.github/workflows/deploy.yml
```

Runbook de configuración:

```text
docs/operations/github-actions-deploy.md
```

Estado:

- [x] workflow versionado
- [x] llave SSH dedicada creada para CI
- [x] llave pública de CI registrada en el VPS
- [x] secrets configurados en GitHub
- [x] primera ejecución exitosa desde GitHub Actions

## Validación realizada

- `nginx -t` devolvió configuración válida antes de recargar el servicio
- `astro build` generó correctamente la salida estática con dominio real configurado
- `curl -I https://uicabgadiel.com` respondió `200`
- `curl -4 -I https://uicabgadiel.com` respondió `200`
- `curl -6 -I https://uicabgadiel.com` respondió `200`

### Validación posterior al encendido del Droplet

Fecha: 2026-04-21

- SSH con usuario `deploy` respondió correctamente
- hostname verificado: `ubuntu-s-1vcpu-1gb-nyc3`
- `nginx` aparece `active` y `enabled`
- `certbot.timer` aparece `active` y `enabled`
- `/var/www/portafolio/index.html` existe en el servidor
- `/var/www/portafolio/og/default.svg` existe en el servidor
- `curl -4 https://uicabgadiel.com` respondió `200`
- `curl -6 https://uicabgadiel.com` respondió `200`
- `curl https://uicabgadiel.com/proyectos/portafolio-m4/` respondió `200`
- `curl https://uicabgadiel.com/og/default.svg` respondió `200` con `image/svg+xml`

### Validación del primer deploy automático

Fecha: 2026-04-21

- GitHub Actions ejecutó `Deploy portfolio to VPS` con resultado `success`
- commit desplegado: `9e8e2c7`
- ejecución: `24744742751`
- `/var/www/portafolio/index.html` existe en el servidor después del deploy automático
- `/var/www/portafolio/og/default.svg` existe en el servidor después del deploy automático
- `curl -I https://uicabgadiel.com` respondió `200`
- `curl -4 -I https://uicabgadiel.com` respondió `200`
- `curl -6 -I https://uicabgadiel.com` respondió `200`
- `curl -I https://uicabgadiel.com/proyectos/portafolio-m4/` respondió `200`
- `curl -I https://uicabgadiel.com/og/default.svg` respondió `200` con `image/svg+xml`

### Evidencia final de cierre de Sprint 5

Fecha: 2026-04-21

- `sudo nginx -t` confirmó `syntax is ok` y `test is successful`
- `sudo ufw status verbose` confirmó `Status: active`
- `UFW` mantiene `deny incoming`, `allow outgoing` y reglas para `OpenSSH`, `80/tcp` y `443/tcp`
- `UFW` incluye reglas equivalentes para IPv6: `OpenSSH (v6)`, `80/tcp (v6)` y `443/tcp (v6)`
- `sudo systemctl status certbot.timer --no-pager` confirmó `certbot.timer` activo y habilitado
- `sudo certbot renew --dry-run` simuló correctamente la renovación de `uicabgadiel.com` y `www.uicabgadiel.com`
- Certbot reportó: `Congratulations, all simulated renewals succeeded`
- Certificado validado: `/etc/letsencrypt/live/uicabgadiel.com/fullchain.pem`

## Handoff ejecutado desde Sprint 4 hacia Sprint 5

La transición ya dejó de ser teórica. Estas acciones quedaron completadas:

1. contratar el Droplet Basic
2. registrar inventario real de IP, hostname y sistema operativo
3. cargar la llave pública SSH
4. crear usuario no-root y endurecer acceso
5. apuntar dominio real y emitir HTTPS
6. validar serving dual-stack
7. reemplazar `https://tudominio.com` en `astro.config.mjs`

## Qué sí está listo en el proyecto

- `astro build` produce salida estática
- La arquitectura evita runtime de backend de aplicación
- La sección de infraestructura del sitio ya comunica el enfoque static-first y el criterio operativo
- La documentación ya contempla IPv6 como parte del caso de estudio técnico
- La oferta comercial ya separa servicios web actuales de servicios de servidor aún no habilitados
- el entorno real ya sirve el dominio público desde un VPS propio
- la metadata absoluta ya usa el dominio real

## Qué queda para fases posteriores

- Versionado de configuración de servidor o, al menos, de sus plantillas
- observabilidad y post-deploy más profunda para fases posteriores
- restore real completo de un backup, solo si se programa una ventana controlada

El deploy manual por `rsync` se mantiene como fallback operativo, pero el flujo principal ya es GitHub Actions.

## Fases previstas

### 1. Cierre de Sprint 4

- módulo de contacto terminado
- narrativa comercial web-first cerrada
- home lista para convertirse en activo comercial real

### 2. Adquisición del VPS

- [x] Droplet Basic contratado en DigitalOcean
- [x] metadatos reales del entorno registrados
- [x] proveedor enlazado a esta documentación

### 3. Configuración inicial del servidor

- [x] crear usuario no-root
- [x] configurar acceso SSH por llave
- [x] endurecer acceso remoto
- [x] habilitar firewall
- [x] instalar y validar Nginx

### 4. Configuración de red e IPv6

- [x] validar direccionamiento asignado por el proveedor
- [x] configurar reglas de firewall para IPv6
- [x] publicar registros DNS `A` y `AAAA`
- [x] comprobar acceso dual-stack

### 5. HTTPS y publicación

- [x] emitir certificados con Let's Encrypt
- [x] documentar renovación con evidencia de `certbot renew --dry-run`
- [x] desplegar salida estática de forma manual por `rsync`
- [x] documentar rollback básico y verificación post-deploy manual

## Comandos de cierre validados

La evidencia final se obtuvo desde una sesión SSH interactiva:

```bash
ssh deploy@159.89.40.113
```

Dentro del VPS:

```bash
sudo nginx -t
sudo ufw status verbose
sudo systemctl status certbot.timer --no-pager
sudo certbot renew --dry-run
```

Resultado observado:

- `nginx -t` reportó sintaxis correcta y test exitoso
- `ufw status verbose` mostró `OpenSSH`, `80/tcp` y `443/tcp`, incluyendo reglas `(v6)`
- `certbot.timer` apareció activo y habilitado
- `certbot renew --dry-run` confirmó que todas las renovaciones simuladas fueron exitosas

## Rollback básico manual

Antes de publicar una versión manual nueva, crear respaldo del sitio actual:

```bash
sudo mkdir -p /var/backups/portafolio
sudo tar -czf /var/backups/portafolio/portafolio-$(date +%Y%m%d-%H%M%S).tar.gz -C /var/www portafolio
```

Si una publicación falla, restaurar el respaldo:

```bash
sudo rm -rf /var/www/portafolio
sudo tar -xzf /var/backups/portafolio/NOMBRE_DEL_BACKUP.tar.gz -C /var/www
sudo chown -R deploy:www-data /var/www/portafolio
sudo chmod -R 755 /var/www/portafolio
sudo nginx -t
sudo systemctl reload nginx
```

Checklist post-deploy manual:

```bash
curl -I https://uicabgadiel.com
curl -4 -I https://uicabgadiel.com
curl -6 -I https://uicabgadiel.com
curl -I https://uicabgadiel.com/og/default.svg
```

## Servicios desbloqueados después de la implementación

Como el entorno ya existe y quedó documentado con evidencia real, el portafolio puede comunicar como complemento controlado:

- despliegue técnico administrado
- hosting propio en VPS
- sitios web con setup técnico sólido

Estos puntos no deben desplazar la oferta principal `web-first`; funcionan como diferenciador técnico y servicio complementario para casos donde el cliente lo necesite.

## Estado documental actual

Este archivo ya no describe un objetivo hipotético. Ahora funciona como runbook inicial del despliegue real y deja pendientes solo mejoras de operación avanzada.
