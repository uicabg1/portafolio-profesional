# Documentación del proyecto

Esta carpeta separa la documentación viva del sistema del archivo histórico de fases y sprints.

## Cómo navegar esta documentación

- Si vas a empezar en el repo, lee primero [../README.md](../README.md)
- Si necesitas entender alcance y objetivos, empieza por [product/requisitos.md](product/requisitos.md)
- Si necesitas entender qué parte de la formación técnica ya está respaldada por evidencia, revisa [product/formacion-tecnica-y-evidencia.md](product/formacion-tecnica-y-evidencia.md)
- Si necesitas ver el sprint activo o el siguiente sprint ejecutable, revisa [sprints/](sprints/)
- Si necesitas entender el sistema actual, sigue con [architecture/overview.md](architecture/overview.md)
- Si vas a modificar código, revisa [operations/local-development.md](operations/local-development.md) y [quality/verification.md](quality/verification.md)
- Si necesitas contexto histórico, consulta los sprints y documentos archivados localmente cuando estén disponibles.
- La evidencia académica pesada puede existir localmente en `docs/TIDE Fellows/`, pero no se versiona en Git porque contiene PDFs y archivos de referencia grandes.

## Estructura

```text
docs/
├── architecture/   # Diseño vigente del sistema y decisiones técnicas
├── operations/     # Desarrollo local, release, despliegue y operación
├── product/        # Requisitos, roadmap y backlog
├── quality/        # Verificación, accesibilidad y presupuestos técnicos
├── sprints/        # Sprint activo o siguiente sprint ejecutable
└── archive/        # Sprints y documentos supersedidos, si se versionan
```

## Reglas de mantenimiento

- Los documentos en `product/`, `architecture/`, `operations/` y `quality/` describen el estado vigente o el objetivo explícito del proyecto.
- Los documentos en `sprints/` describen trabajo activo o inmediatamente ejecutable; no sustituyen requisitos ni backlog.
- Los documentos en `archive/`, si existen, no deben editarse para reflejar el estado actual; se conservan para trazabilidad.
- Si una decisión técnica cambia, actualiza primero la documentación canónica y luego enlaza o archiva lo que quede obsoleto.
- Evita duplicar la misma verdad en más de un archivo. Si un documento depende de otro, enlázalo.
