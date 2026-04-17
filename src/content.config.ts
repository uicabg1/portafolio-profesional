import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod'; // La nueva ubicación oficial de Zod en Astro

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    category: z.enum(['Software Architecture', 'Cybersecurity', 'Infrastructure']),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
    stack: z.array(z.string()),
    githubUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    hasInteractiveComponent: z.boolean().default(false),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };