import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { projectCategories } from './lib/project-categories';
import { projectInteractiveDemos } from './lib/project-interactive-keys';

const projects = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string().min(3).max(80),
    summary: z.string().max(160),
    category: z.enum(projectCategories),
    slug: z.string().optional(),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
    stack: z.array(z.string()).min(1).max(10),
    githubUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    ogImage: z.string().startsWith('/').optional(),
    hasInteractiveComponent: z.boolean().default(false),
    interactiveDemo: z.enum(projectInteractiveDemos).optional(),
    navigationOrder: z.number().int().positive().optional(),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
export type { ProjectCategory } from './lib/project-categories';
export { projectCategories };
