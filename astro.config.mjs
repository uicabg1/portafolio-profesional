import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',          // RNF-19: HTML estático puro, sin runtime de Node en VPS
  site: 'https://tudominio.com', // Reemplazar con el dominio real — necesario para sitemap y canonical URLs

  integrations: [
    preact(),                // ADR-04: Islas interactivas (~3 KB runtime)
    mdx(),                   // FIX-02: Procesamiento de archivos .mdx en Content Collections
  ],

  vite: {
    plugins: [
      tailwindcss(),         // FIX-01: Plugin oficial de Tailwind v4 para Vite
    ],
  },
});