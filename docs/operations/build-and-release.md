# Build y release

## Objetivo

Generar una salida estática verificable y consistente antes de publicar cambios.

## Checklist de release

1. Confirmar que el contenido y las rutas relevantes están actualizados.
2. Ejecutar:

```bash
npm test
npm run astro -- check
npm run build
```

3. Si hubo cambios visuales, ejecutar además:

```bash
npm run dev
```

4. Revisar manualmente:
- `/`
- una ruta en `/proyectos/[slug]`
- navegación interna y enlaces externos relevantes

## Artefacto esperado

- `dist/` con HTML, CSS y JS estático generado por Astro

## Estado actual del release

- El build está versionado y reproducible.
- La automatización formal de deploy a VPS ya está versionada en `.github/workflows/deploy.yml`.
- GitHub Actions ya ejecuta tests, Astro check, build, backup remoto, `rsync` y checks públicos.
- El deploy manual por `rsync` sigue existiendo solo como fallback operativo.

## Deploy automático

Runbook: [github-actions-deploy.md](github-actions-deploy.md)

El workflow ejecuta tests, validación Astro, build, respaldo remoto, `rsync` y checks post-deploy.

## Evidencia CI/CD

- primer deploy automático exitoso: `24744742751`
- deploy manual desde `workflow_dispatch` exitoso: `24744958314`
- commit desplegado: `9e8e2c7`
- fecha: 2026-04-21
