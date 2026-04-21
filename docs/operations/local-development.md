# Desarrollo local

## Requisitos

- Node.js `>= 22.12.0`
- npm

## Instalación

```bash
npm install
```

## Comandos de trabajo

```bash
npm run dev
npm test
npx astro check
npm run build
npm run preview
```

## Variable de entorno útil

Para probar el envío real del formulario de contacto, crea `.env.local` en la raíz del proyecto y configura:

```bash
PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/tu-id-real
```

Después de guardar el archivo, reinicia `npm run dev`.

Si no existe esa variable, el formulario renderiza y valida, pero mostrará fallback a WhatsApp o correo al intentar enviar.

## Flujo recomendado

1. Levantar `npm run dev`.
2. Hacer cambios en componentes, contenido o estilos.
3. Ejecutar `npm test` si el cambio toca lógica del formulario o helpers verificados por Node.
4. Ejecutar `npx astro check`.
5. Ejecutar `npm run build`.
6. Revisar manualmente la home y al menos un detalle de proyecto si el cambio afecta UI o contenido.

## Archivos y carpetas relevantes

- `src/pages/index.astro`
- `src/pages/proyectos/[slug].astro`
- `src/content.config.ts`
- `src/content/projects/`
- `src/components/astro/`
- `src/components/islands/`
- `src/styles/global.css`

## Cosas que no deben editarse

- `dist/`
- `.astro/`

## Cuando agregas un proyecto nuevo

1. Crear el `.mdx` en `src/content/projects/`.
2. Completar frontmatter válido.
3. Verificar con `npx astro check`.
4. Confirmar la generación de la ruta con `npm run build`.
