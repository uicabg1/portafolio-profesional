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

- validación integral de requisitos no funcionales
- revisión cruzada de accesibilidad y responsive
- cierre del checklist técnico de release

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

- ejecutar `npm run astro -- check`
- ejecutar `npm run build`
- comprobar que no existan errores de contenido, rutas o compilación

### 1.2 Revisión manual esencial

- revisar home
- revisar filtro de proyectos
- revisar páginas de detalle
- revisar flujo completo de contacto

---

## 2. Calidad visual y accesibilidad

### 2.1 Responsive real

- verificar `375px`
- verificar `390px`
- verificar `768px`
- verificar desktop amplio

### 2.2 Accesibilidad

- navegación por teclado
- foco visible
- contraste suficiente
- labels y estados de error del contacto
- lectura razonable con lector de pantalla en flujos clave

---

## 3. Rendimiento y publicación

### 3.1 Revisión de performance

- medir Lighthouse para home y al menos una página de proyecto
- revisar peso de la home
- revisar que la hidratación siga siendo limitada a islas justificadas

### 3.2 Revisión post-release

- comprobar que la versión pública coincide con la versión local esperada
- validar serving por HTTPS
- validar serving por IPv6

---

## 4. Checklist de cierre

### 4.1 Documentación

- confirmar que `README.md` esté alineado
- confirmar que `docs/product/`, `docs/architecture/` y `docs/operations/` describen el estado real
- archivar lo que deje de ser sprint activo si corresponde

### 4.2 Riesgos conocidos

- listar huecos pendientes que no bloqueen release
- separar claramente “pendiente futuro” de “defecto actual”

---

## Criterios de aceptación del Sprint 7

- el sitio pasa validación técnica base sin errores
- el flujo comercial funciona en mobile y desktop
- la versión pública responde por HTTPS e IPv6
- existe documentación suficiente para operar, mantener y retomar el proyecto
- los riesgos restantes están explicitados y no ocultos

## Resultado esperado al cerrar el sprint

Al finalizar Sprint 7, el proyecto base debe quedar listo como primera versión técnicamente cerrada:

- comercialmente usable
- técnicamente verificable
- operable sobre infraestructura propia
- documentado con suficiente claridad para seguir evolucionando después
