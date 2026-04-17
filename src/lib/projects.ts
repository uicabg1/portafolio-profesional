// src/lib/projects.ts
// Funciones de acceso a la colección de proyectos.
// Centraliza la lógica de consulta para no repetirla en cada página.

import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * Devuelve todos los proyectos ordenados por fecha descendente (más reciente primero).
 */
export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

/**
 * Devuelve proyectos filtrados por categoría.
 * category === 'all' devuelve todos sin filtrar.
 */
export async function getProjectsByCategory(
  category: 'Software Architecture' | 'Cybersecurity' | 'Infrastructure' | 'all'
): Promise<Project[]> {
  const all = await getAllProjects();
  if (category === 'all') return all;
  return all.filter((p) => p.data.category === category);
}

/**
 * Devuelve los proyectos marcados como featured.
 * Máximo 2 (ver convención en config.ts).
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.data.featured).slice(0, 2);
}

/**
 * Devuelve un proyecto por su slug.
 * Lanza un error si no existe — se usa en [slug].astro para generar 404.
 */
export async function getProjectBySlug(slug: string): Promise<Project> {
  const all = await getAllProjects();
const project = all.find((p) => p.id === slug);
  if (!project) {
    throw new Error(`Proyecto con slug "${slug}" no encontrado en la colección.`);
  }
  return project;
}