# Sprint 5 — VPS real, IPv6 y publicación inicial

## Propósito del sprint

Convertir la infraestructura planeada en infraestructura real.

Este sprint inicia cuando Sprint 4 ya dejó listo el portafolio como activo comercial básico y cuando ya existe decisión confirmada de proveedor, dominio y entorno objetivo.

## Estado de partida

Al inicio de Sprint 5 el proyecto ya debe tener:

- módulo de contacto funcional
- narrativa comercial web-first cerrada
- backlog y documentación canónica alineados
- decisión operativa vigente: DigitalOcean Basic con crédito de GitHub for Students
- salida estática estable por `astro build`
- llave SSH local reutilizable ya identificada en la máquina de trabajo

Pendiente al inicio de Sprint 5:

- adquirir el VPS real
- configurar acceso administrativo y hardening base
- publicar el dominio real
- habilitar HTTPS
- validar IPv6 dual-stack
- registrar la llave pública en DigitalOcean al momento del aprovisionamiento

## Estado actual de ejecución

Sprint 5 quedó cerrado sobre el entorno real.

Completado hasta ahora:

- Droplet Basic aprovisionado en `DigitalOcean`
- región `NYC3` confirmada
- dominio `uicabgadiel.com` y `www.uicabgadiel.com` publicados
- usuario operativo `deploy` habilitado con acceso por llave
- acceso root remoto deshabilitado y autenticación por contraseña retirada
- `UFW` habilitado con puertos `22`, `80` y `443`, incluyendo tráfico IPv6
- `Nginx` configurado para servir el sitio estático desde `/var/www/portafolio`
- publicación manual inicial completada con `rsync`
- `HTTPS` activo mediante `Let's Encrypt + Certbot`
- validación pública completada con `curl -4` y `curl -6`
- dominio real aplicado en `astro.config.mjs`
- `og:image` validado públicamente con `https://uicabgadiel.com/og/default.svg`
- renovación SSL validada con `sudo certbot renew --dry-run`

Cierre formal registrado:

- ninguno dentro del alcance de Sprint 5
- el siguiente trabajo corresponde a Sprint 6: CI/CD, operación post-deploy y automatización

## Qué sí entra en Sprint 5

- adquisición del Droplet Basic
- configuración inicial del servidor
- DNS real con registros A y AAAA
- Nginx y HTTPS
- validación inicial de publicación del sitio
- documentación real del entorno

## Qué no entra en Sprint 5

- pipeline CI/CD completo versionado en GitHub Actions
- observabilidad operativa más profunda
- activación comercial formal de hosting propio
- QA final integral tipo release

Esas tareas quedan para Sprint 6 y Sprint 7.

---

## 1. Aprovisionamiento del entorno real

### 1.1 Adquisición del Droplet

- [x] contratar el plan Basic más económico disponible
- [x] registrar región, imagen base y tamaño contratados
- [x] confirmar que el crédito de GitHub for Students quedó aplicado
- [x] confirmar que el dominio real ya está definido antes de entrar a DNS y HTTPS

### 1.2 Inventario inicial

- [x] documentar IP pública IPv4: `159.89.40.113`
- [x] documentar dirección IPv6 asignada: `2604:a880:800:14:0:2:d90d:c000`
- [x] documentar hostname inicial del servidor: `ubuntu-s-1vcpu-1gb-nyc3`
- [x] documentar sistema operativo real usado: `Ubuntu 24.04.4 LTS`

---

## 2. Acceso administrativo y hardening base

### 2.1 Acceso SSH

- [x] generar o reutilizar llave SSH segura
- [x] configurar acceso por llave
- [x] crear usuario no-root
- [x] deshabilitar acceso root remoto

### 2.2 Seguridad mínima del servidor

- [x] habilitar firewall
- [x] abrir solo puertos requeridos
- [x] revisar estado del acceso remoto después del endurecimiento
- [x] documentar comandos y validaciones aplicadas

---

## 3. Servidor web y publicación inicial

### 3.1 Configuración de Nginx

- [x] instalar Nginx
- [x] validar serving básico del host
- [x] preparar configuración del sitio estático
- [x] documentar ruta de artefactos publicados

### 3.2 Publicación del sitio

- [x] transferir manualmente el build estático al servidor
- [x] validar que la home responda desde el dominio o IP pública
- [x] comprobar integridad básica de assets y rutas

---

## 4. DNS, HTTPS e IPv6

### 4.1 DNS real

- [x] apuntar registros `A` y `AAAA` al servidor
- [x] validar resolución pública
- [x] documentar propagación y resolución pública en la documentación operativa

### 4.2 HTTPS

- [x] emitir certificados con Let's Encrypt
- [x] configurar renovación con evidencia explícita en documentación
- [x] validar serving por HTTPS sin errores

### 4.3 IPv6 dual-stack

- [x] validar acceso real por IPv4
- [x] validar acceso real por IPv6
- [x] comprobar que firewall y Nginx no rompan el tráfico IPv6
- [x] registrar evidencia mínima con comandos reales

---

## 5. Ajustes del proyecto tras publicación real

### 5.1 Dominio y metadata

- [x] reemplazar dominio placeholder en `astro.config.mjs`
- [x] validar `canonical`, `og:url` y metadata absoluta
- [x] revisar que `og:image` siga resolviendo correctamente de forma explícita

### 5.2 Documentación operativa real

- [x] actualizar `docs/operations/deployment-vps.md` con datos reales
- [x] enlazar proveedor, plan y entorno exactos
- [x] registrar diferencias entre lo planeado y lo ejecutado
- [x] documentar rollback básico y checklist post-deploy manual

---

## Criterios de aceptación del Sprint 5

- [x] el Droplet real existe y está documentado
- [x] el acceso administrativo usa usuario no-root y llave SSH
- [x] el sitio responde públicamente desde dominio real
- [x] HTTPS está activo y funcional
- [x] el sitio es accesible por IPv4 e IPv6
- [x] la documentación ya no describe solo un objetivo: describe el entorno real inicial
- [x] la renovación SSL quedó validada mediante dry-run

## Resultado esperado al cerrar el sprint

Al finalizar Sprint 5, el portafolio ya existe en un servidor propio real y verificable.

Eso significa:

- el despliegue dejó de ser teórico
- la parte de IPv6 pasa a tener evidencia práctica en producción
- ya existe la base para automatizar publicación y operación en Sprint 6

## Posición actual

Sprint 5 queda cerrado. El siguiente bloque natural es Sprint 6, centrado en `GitHub Actions`, operación post-deploy y formalización del flujo de publicación.
