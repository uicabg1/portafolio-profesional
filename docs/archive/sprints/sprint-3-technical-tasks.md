# Sprint 3 — Infraestructura, Content Integration & Project Detail Refinement

## 1. Integración real del Content Layer en el Frontend

### 1.1 Reemplazo de datos mockeados en `ProjectFilter`

- Eliminar array `projects` hardcodeado en `ProjectFilter.tsx`
- Consumir datos reales desde `getCollection('projects')` vía `src/lib/projects.ts`
- Adaptar tipado al schema actual (`ProjectCategory`)
- Resolver inconsistencia `slug` vs `id` usando `resolveSlug()`
- Mapear datos a estructura UI existente (title, summary, stack, href)

### 1.2 Normalización de categorías entre UI y Content Layer

- Alinear categorías del filtro con:
  - `Web Dev`
  - `Ciberseguridad`
  - `Redes & IPv6`
  - `Gestión de Redes`
- Eliminar enums duplicados en frontend
- Centralizar categorías desde `content.config.ts`

### 1.3 Sincronización de rutas dinámicas

- Validar que `href` del filtro coincida con `/proyectos/[slug]`
- Asegurar consistencia con `getStaticPaths()`
- Manejar fallback/errores si slug no existe

---

## 2. Refinamiento de la página dinámica `[slug].astro`

### 2.1 Mejora de estructura del caso de estudio

- Validar orden semántico:
  - Problema
  - Solución
  - Contenido MDX
  - Resultado
- Ajustar jerarquía visual (H1, H2, spacing)

### 2.2 Render condicional de componentes interactivos

- Detectar `hasInteractiveComponent`
- Estandarizar inyección MDX + Islands
- Crear patrón reusable para:
  - RSA Simulator
  - IPv6 Map

### 2.3 Mejora UX del header del proyecto

- Añadir:
  - Fecha formateada (`publishedAt`)
  - Badge "Featured"
  - Mejora visual de stack

---

## 3. Sección Infraestructura (Core del Sprint 3)

> Esta es la pieza central del sprint (placeholder actual en home)

### 3.1 Creación de `Infrastructure.astro`

- Nueva sección en `src/components/astro/`
- Sustituir placeholder en `index.astro`
- Estructura con bloques:
  1. Filosofía técnica (static-first, no backend runtime)
  2. Arquitectura del sistema
  3. Stack real desplegado
  4. Seguridad
  5. Performance

### 3.2 Visualización de arquitectura (alto nivel)

- Representación de:
  - Astro static build
  - Vite + Tailwind v4 pipeline
  - Deploy VPS
  - CDN / Nginx
- Puede ser:
  - Diagrama estático
  - O componente visual simple

### 3.3 Sección de Networking (alineado a perfil real)

- Integrar contenido técnico basado en:
  - IPv6:
    - Direccionamiento
    - NDP
    - SLAAC
  - Conceptos NOC:
    - Monitoreo
    - Observabilidad
- Objetivo: Convertir teoría en **capacidad demostrable dentro del portafolio**

### 3.4 Sección de prácticas operativas (NOC mindset)

- Monitoreo
- Logs
- Alertas
- Diagnóstico
- Basado en buenas prácticas de operación de red

---

## 4. Migración del filtro a datos reales (UI + lógica)

### 4.1 Hidratación híbrida (SSR + client filter)

- Cargar proyectos desde Astro (SSR)
- Pasarlos como props a la isla
- Mantener filtrado en cliente

### 4.2 Optimización de render

- Evitar re-renders innecesarios
- Memoización correcta (`useMemo` ya implementado)

---

## 5. Sistema de navegación entre proyectos

### 5.1 Navegación interna

- Añadir:
  - "Proyecto anterior / siguiente"
- Basado en orden por `publishedAt`

### 5.2 CTA mejorados

- Botón "Volver a proyectos"
- Mejorar breadcrumbs existentes

---

## 6. SEO técnico por proyecto

### 6.1 Metadatos dinámicos

- `og:title`, `og:description`, `og:image`
- Canonical dinámico por slug

### 6.2 Structured data (opcional pero recomendado)

- JSON-LD tipo:
  - `CreativeWork`
  - `SoftwareSourceCode`

---

## 7. Optimización de performance (alineado a RNF)

### 7.1 Validación de build estático

- Confirmar:
  - `output: 'static'`
- No runtime Node

### 7.2 Reducción de JS en cliente

- Verificar islands:
  - Solo `ProjectFilter`
  - WhatsApp
- Nada más hidratado

---

## 8. Consistencia del Design System

### 8.1 Validación de tokens en nuevas secciones

- Uso correcto de:
  - `--color-accent`
  - `--color-bg-subtle`
  - spacing scale

### 8.2 Ajuste tipográfico en Infraestructura

- Diferenciar:
  - UI (Geist)
  - Contenido técnico (Mono)

---

## 9. Preparación para Sprint 4

### 9.1 Hooks para contacto

- CTAs en:
  - Servicios
  - Infraestructura
  - Proyectos

### 9.2 Puntos de integración

- Preparar anclas:
  - `#contacto`
- Sin implementar lógica aún

---

# Resumen estratégico del Sprint 3

Este sprint hace tres cosas críticas:

1. **Elimina mocks → conecta el sistema real (Content Layer)**
2. **Introduce profundidad técnica real (Infraestructura + Networking)**
3. **Convierte el portafolio en evidencia técnica, no solo UI**

---