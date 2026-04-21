# GitHub Actions deploy a VPS

## Estado

Workflow versionado en `.github/workflows/deploy.yml`, secrets configurados y primer despliegue automático exitoso contra el VPS real.

Primera ejecución exitosa:

- fecha: 2026-04-21
- commit: `9e8e2c7`
- ejecución: `24744742751`
- resultado: `success`
- URL de ejecución: `https://github.com/uicabg1/portafolio-profesional/actions/runs/24744742751`

Ejecución manual posterior:

- fecha: 2026-04-21
- commit: `9e8e2c7`
- ejecución: `24744958314`
- resultado: `success`
- URL de ejecución: `https://github.com/uicabg1/portafolio-profesional/actions/runs/24744958314`

## Validación local realizada

Fecha: 2026-04-21

- YAML del workflow parseado correctamente
- `npm test` ejecutado correctamente
- `npm run astro -- check` ejecutado sin errores
- `npm run build` ejecutado correctamente
- SSH con la llave dedicada `~/.ssh/github_actions_portafolio` validado contra el VPS
- `/var/www/portafolio` confirmado como escribible por `deploy`
- prueba seca de `rsync` con `--dry-run` terminada con exit code `0`
- checks públicos de home, ruta de proyecto, `og/default.svg`, IPv4 e IPv6 respondieron `200`

## Validación real desde GitHub Actions

Fecha: 2026-04-21

- `push` a `main` disparó el workflow automáticamente
- `npm ci`, `npm test`, `npm run astro -- check` y `npm run build` completaron correctamente
- el workflow creó respaldo remoto antes de publicar
- `rsync` publicó `dist/` en `/var/www/portafolio`
- el paso de verificación encontró `index.html` y `og/default.svg` en el VPS
- los checks públicos respondieron `200` para home, ruta de proyecto y `og/default.svg`
- la comprobación externa local posterior confirmó `200` por IPv4 e IPv6

## Qué hace el workflow

El workflow `Deploy portfolio to VPS` ejecuta:

1. checkout del repositorio
2. instalación de Node `22`
3. `npm ci`
4. `npm test`
5. `npm run astro -- check`
6. `npm run build`
7. respaldo del contenido actual del VPS en `~/portafolio-backups/`
8. publicación de `dist/` con `rsync`
9. verificación de archivos en el VPS
10. verificación pública de la home, una ruta de proyecto, `og/default.svg`, IPv4 e IPv6

El deploy corre automáticamente en `push` a `main` y también puede ejecutarse manualmente desde `workflow_dispatch`.

## Llave SSH de CI

Se creó una llave dedicada para GitHub Actions:

- llave privada local: `~/.ssh/github_actions_portafolio`
- llave pública local: `~/.ssh/github_actions_portafolio.pub`
- comentario de la llave: `github-actions-uicabgadiel.com`
- fingerprint: `SHA256:/sc2lFVt65EKPxssLIseobGtmnp6pRAE/T2SADR6bmg`

La llave pública ya fue registrada en `/home/deploy/.ssh/authorized_keys` del VPS.

La llave privada no debe versionarse, compartirse por chat ni pegarse en documentación. Solo debe ir en GitHub Actions como secret.

## Secrets requeridos en GitHub

Estos secrets ya quedaron configurados en el repositorio de GitHub. Si se recrea el repo o se rota la llave, deben existir con estos nombres exactos:

| Secret | Valor |
| --- | --- |
| `VPS_HOST` | `159.89.40.113` |
| `VPS_USER` | `deploy` |
| `VPS_TARGET_DIR` | `/var/www/portafolio` |
| `VPS_SSH_KEY` | contenido completo de `~/.ssh/github_actions_portafolio` |

## Configuración manual en GitHub

Esta sección queda como runbook de reconstrucción si se cambia de repositorio, se rota la llave o se replica el proyecto.

### 1. Crear o conectar repositorio remoto

Primero verificar si existe remoto:

```bash
cd /Users/gadieluicab/Documents/portafolio-profesional
git remote -v
```

Si no muestra nada, crear un repositorio en GitHub:

1. Entrar a GitHub.
2. Clic en `New repository`.
3. Nombre recomendado: `portafolio-profesional`.
4. No agregar README, `.gitignore` ni licencia desde GitHub si el repo local ya existe.
5. Crear el repo.

Después conectar el repo local. Elegir una sola opción.

Opción HTTPS:

```bash
git remote add origin https://github.com/TU_USUARIO/portafolio-profesional.git
git branch -M main
git push -u origin main
```

Opción SSH:

```bash
git remote add origin git@github.com:TU_USUARIO/portafolio-profesional.git
git branch -M main
git push -u origin main
```

### 2. Crear secrets

En GitHub:

1. Abrir el repositorio.
2. Ir a `Settings`.
3. Ir a `Secrets and variables`.
4. Entrar a `Actions`.
5. Clic en `New repository secret`.
6. Crear uno por uno los secrets requeridos.

Para copiar la llave privada del deploy a tu portapapeles:

```bash
pbcopy < ~/.ssh/github_actions_portafolio
```

Luego pegar ese contenido como valor del secret `VPS_SSH_KEY`.

No pegues esa llave en issues, chats, commits ni documentación.

### 3. Ejecutar primer workflow

En GitHub:

1. Abrir el repositorio.
2. Ir a `Actions`.
3. Seleccionar `Deploy portfolio to VPS`.
4. Clic en `Run workflow`.
5. Seleccionar branch `main`.
6. Clic en `Run workflow`.

También se ejecutará automáticamente cada vez que haya `push` a `main`.

## Verificación posterior

Después de un deploy exitoso, validar desde local:

```bash
curl -I https://uicabgadiel.com
curl -4 -I https://uicabgadiel.com
curl -6 -I https://uicabgadiel.com
curl -I https://uicabgadiel.com/proyectos/portafolio-m4/
curl -I https://uicabgadiel.com/og/default.svg
```

Resultado esperado:

- home responde `200`
- ruta de proyecto responde `200`
- `og/default.svg` responde `200`
- IPv4 responde
- IPv6 responde si la red local tiene soporte IPv6

## Rollback desde respaldo del workflow

El workflow crea respaldos en:

```text
/home/deploy/portafolio-backups/
```

Para listar respaldos:

```bash
ssh deploy@159.89.40.113
ls -1t ~/portafolio-backups/portafolio-*.tar.gz
```

Para restaurar uno:

```bash
BACKUP=~/portafolio-backups/NOMBRE_DEL_BACKUP.tar.gz
find /var/www/portafolio -mindepth 1 -maxdepth 1 -exec rm -rf {} +
tar -xzf "$BACKUP" -C /var/www/portafolio
curl -I https://uicabgadiel.com
```

Reemplazar `NOMBRE_DEL_BACKUP.tar.gz` por el archivo real listado en el paso anterior.

Validación no destructiva realizada el 2026-04-21:

- backup validado: `/home/deploy/portafolio-backups/portafolio-9e8e2c7-20260421T203308Z.tar.gz`
- método: descompresión en carpeta temporal
- resultado: el backup contiene `index.html` y `og/default.svg`
- producción no fue restaurada ni modificada durante esta validación

## Diagnóstico rápido

### `Permission denied (publickey)`

Revisar:

- el secret `VPS_SSH_KEY` contiene la llave privada completa
- la llave pública `~/.ssh/github_actions_portafolio.pub` está en `/home/deploy/.ssh/authorized_keys`
- el secret `VPS_USER` vale `deploy`

### `rsync: Permission denied`

Validar en el VPS:

```bash
ls -ld /var/www/portafolio
```

Debe mostrar que `deploy` tiene permisos de escritura. Estado esperado:

```text
deploy www-data
```

### IPv6 falla solo en GitHub Actions

El workflow deja el check IPv6 como warning porque algunos runners pueden no tener salida IPv6 real. Si ocurre, validar manualmente:

```bash
curl -6 -I https://uicabgadiel.com
```

### `Verify deployed files on VPS` falla por archivo faltante

Si el error menciona un archivo como `/var/www/portafolio/og/default.svg`, revisar que el asset exista dentro de `public/` y que esté versionado en Git:

```bash
git ls-files --error-unmatch public/og/default.svg
npm test
npm run build
test -f dist/og/default.svg
```

La causa observada el 2026-04-21 fue que `public/og/` existía localmente pero no estaba trackeado. GitHub Actions no lo incluyó en el build y `rsync --delete-after` eliminó la versión previa del VPS. Quedó corregido en el commit `9e8e2c7`.
