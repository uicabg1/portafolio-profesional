# Observabilidad y criterio NOC

## Propósito

Definir cómo se debería operar el portafolio como un sistema observable y diagnosticable, no solo como un conjunto de archivos publicados.

## Señales operativas mínimas

### Monitoreo

- disponibilidad HTTP/HTTPS
- latencia de respuesta
- vencimiento de certificados
- estado del servidor web
- resultado del último despliegue

### Logs y telemetría

- logs de acceso del servidor web
- logs de error del servidor web
- eventos de despliegue
- validaciones de conectividad y resolución DNS

### Alertas

- caída total del sitio
- certificado próximo a vencer
- incremento sostenido de errores 4xx/5xx
- regresión visible después de deploy

### Diagnóstico

- verificar conectividad y resolución DNS
- validar entrega de artefactos estáticos
- inspeccionar logs de servidor
- confirmar headers y TLS
- comparar el artefacto esperado con lo publicado

## Relación con el sitio

La sección `Infrastructure.astro` ya expresa este criterio como narrativa técnica. Este documento lo convierte en referencia operativa del despliegue real en VPS.

## Estado actual

- Existe criterio operativo documentado en el frontend.
- Existe despliegue real en VPS con dominio, HTTPS, IPv4 e IPv6.
- GitHub Actions registra el resultado del último despliegue.
- El workflow valida home, una ruta de proyecto, `og/default.svg`, IPv4 e IPv6.
- El VPS conserva backups automáticos en `/home/deploy/portafolio-backups/`.
- No existe aún stack externo de monitoreo, alertas o dashboards versionado en el repositorio.

## Rutina mínima actual

Después de cada cambio en `main`, revisar:

```bash
curl -I https://uicabgadiel.com
curl -4 -I https://uicabgadiel.com
curl -6 -I https://uicabgadiel.com
curl -I https://uicabgadiel.com/proyectos/portafolio-m4/
curl -I https://uicabgadiel.com/og/default.svg
```

En el VPS, para diagnóstico inicial:

```bash
systemctl is-active nginx
systemctl is-active certbot.timer
ls -1t ~/portafolio-backups/portafolio-*.tar.gz | head
```

## Límite explícito

Se puede afirmar operación mínima reproducible y verificaciones post-deploy. No se debe afirmar monitoreo continuo 24/7, alertas automáticas externas o dashboard NOC real hasta que esas piezas existan.
