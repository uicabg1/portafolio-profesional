# Sprint 7 — QA, release y cierre técnico

## Propósito del sprint

Cerrar el proyecto base con validación final de calidad, rendimiento y confiabilidad antes de considerar la primera versión como release sólida.

## Estado de partida

Al inicio de Sprint 7 el proyecto ya debe tener:

- [x] home comercial estable
- [x] contacto funcional
- [x] VPS real publicado
- [x] CI/CD operativo
- [x] documentación técnica y operativa actualizada

Pendiente al inicio de Sprint 7:

- [x] validación integral de requisitos no funcionales
- [x] revisión cruzada de accesibilidad y responsive
- [x] cierre del checklist técnico de release

## Estado actual

Sprint 7 queda cerrado el 2026-04-21. La versión base del portafolio está validada como release técnico inicial, con CI/CD activo, VPS real, documentación operativa y QA final ejecutado.

## Qué sí entra en Sprint 7

- verificación final de rendimiento
- verificación de accesibilidad
- revisión cross-browser
- validación IPv6 final
- checklist de release
- cierre documental de riesgos conocidos

## Qué no entra en Sprint 7

- nuevas features grandes
- rediseño mayor de experiencia visual
- expansión funcional del producto

---

## 1. Verificación técnica final

### 1.1 Build y validación base

- [x] ejecutar `npm test`
- [x] ejecutar `npm run astro -- check`
- [x] ejecutar `npm run build`
- [x] comprobar que no existan errores de contenido, rutas o compilación

### 1.2 Revisión manual esencial

- [x] revisar home
- [x] revisar filtro de proyectos
- [x] revisar páginas de detalle
- [x] revisar flujo completo de contacto

---

## 2. Calidad visual y accesibilidad

### 2.1 Responsive real

- [x] verificar `375px`
- [x] verificar `390px`
- [x] verificar `768px`
- [x] verificar desktop amplio

### 2.2 Accesibilidad

- [x] navegación por teclado
- [x] foco visible
- [x] contraste suficiente
- [x] labels y estados de error del contacto
- [x] lectura razonable con lector de pantalla en flujos clave

---

## 3. Rendimiento y publicación

### 3.1 Revisión de performance

- [x] medir Lighthouse para home y al menos una página de proyecto
- [x] revisar peso de la home
- [x] revisar que la hidratación siga siendo limitada a islas justificadas

### 3.2 Revisión post-release

- [x] comprobar que la versión pública coincide con la versión local esperada
- [x] validar serving por HTTPS
- [x] validar serving por IPv6

---

## 4. Checklist de cierre

### 4.1 Documentación

- [x] confirmar que `README.md` esté alineado
- [x] confirmar que `docs/product/`, `docs/architecture/` y `docs/operations/` describen el estado real
- [x] archivar lo que deje de ser sprint activo si corresponde

### 4.2 Riesgos conocidos

- [x] listar huecos pendientes que no bloqueen release
- [x] separar claramente “pendiente futuro” de “defecto actual”

---

## Criterios de aceptación del Sprint 7

- [x] el sitio pasa validación técnica base sin errores
- [x] el flujo comercial funciona en mobile y desktop
- [x] la versión pública responde por HTTPS e IPv6
- [x] existe documentación suficiente para operar, mantener y retomar el proyecto
- [x] los riesgos restantes están explicitados y no ocultos

## Evidencia de cierre

Fecha: 2026-04-21

Validación técnica:

- `npm test`: 5 pruebas ejecutadas, 5 aprobadas
- `npm run astro -- check`: 0 errores, 0 warnings, 0 hints
- `npm run build`: 6 páginas generadas correctamente
- rutas locales verificadas: `/`, `/404.html`, `/proyectos/portafolio-m4/`, `/proyectos/dashboard-noc/`, `/proyectos/migracion-ipv6/`, `/proyectos/rsa-en-c/`, `/og/default.svg`

Lighthouse local sobre preview:

- home: Performance `99`, Accessibility `100`, Best Practices `100`, SEO `100`
- proyecto `/proyectos/portafolio-m4/`: Performance `97` en rerun estable, Accessibility `100`, Best Practices `100`, SEO `100`
- LCP observado: home `1.7 s`, proyecto `2.5 s`
- TBT observado: `0 ms`

Responsive y cross-browser:

- capturas revisadas en `375px`, `390px`, `768px` y desktop amplio
- revisión con Chromium/Chrome, WebKit y Firefox mediante Playwright
- se corrigió overflow móvil del hero y escala del título de proyectos

Accesibilidad corregida durante el sprint:

- contraste de botones de acento en modo oscuro
- nombres accesibles de CTA que no coincidían con el texto visible
- separación táctil de filtros de proyecto
- contraste de navegación vacía en páginas de proyecto
- placeholders de `githubUrl` eliminados de proyectos sin repositorio público real

Publicación:

- GitHub Actions ya validaba deploy a VPS desde Sprint 6
- Sprint 7 prepara el release candidate para ser publicado desde `main`

## Resultado esperado al cerrar el sprint

Al finalizar Sprint 7, el proyecto base queda listo como primera versión técnicamente cerrada:

- comercialmente usable
- técnicamente verificable
- operable sobre infraestructura propia
- documentado con suficiente claridad para seguir evolucionando después

## Riesgos y pendientes no bloqueantes

- No existe aún monitoreo externo 24/7 ni alertas fuera de GitHub Actions.
- No se versionaron plantillas completas de Nginx/UFW; el runbook operativo cubre el estado real.
- El restore destructivo real de producción sigue reservado para una ventana controlada.
- El rediseño visual mayor queda fuera del release base y debe planearse como un sprint posterior.
