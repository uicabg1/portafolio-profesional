import { getCollection, type CollectionEntry } from 'astro:content';
import { resolveSlug, type ProjectCategory } from './projects';

export type Project = CollectionEntry<'projects'>;

/**
 * Valida que los slugs y órdenes de navegación explícitos no se repitan.
 */
function validateProjectCollection(projects: Project[]): void {
  const slugs = new Set<string>();
  const navigationOrders = new Set<number>();

  projects.forEach((project) => {
    const slug = resolveSlug(project);
    if (slugs.has(slug)) {
      throw new Error(`Slug duplicado detectado: ${slug}`);
    }
    slugs.add(slug);

    const { navigationOrder } = project.data;
    if (navigationOrder === undefined) {
      return;
    }

    if (navigationOrders.has(navigationOrder)) {
      throw new Error(
        `navigationOrder duplicado detectado: ${navigationOrder} en "${slug}".`
      );
    }

    navigationOrders.add(navigationOrder);
  });
}

function compareProjectsByDateAndSlug(a: Project, b: Project): number {
  const dateDifference =
    b.data.publishedAt.getTime() - a.data.publishedAt.getTime();

  if (dateDifference !== 0) {
    return dateDifference;
  }

  return resolveSlug(a).localeCompare(resolveSlug(b), 'es');
}

function compareProjectsForNavigation(a: Project, b: Project): number {
  const orderA = a.data.navigationOrder ?? Number.POSITIVE_INFINITY;
  const orderB = b.data.navigationOrder ?? Number.POSITIVE_INFINITY;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return compareProjectsByDateAndSlug(a, b);
}

/**
 * Devuelve todos los proyectos ordenados por fecha descendente (más reciente primero).
 */
export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');

  validateProjectCollection(projects);

  return projects.sort(compareProjectsByDateAndSlug);
}

/**
 * Devuelve la secuencia canónica usada en breadcrumbs y navegación anterior/siguiente.
 * Si no existe navigationOrder explícito, usa fecha descendente y slug como fallback estable.
 */
export async function getProjectsForNavigation(): Promise<Project[]> {
  const projects = await getCollection('projects');

  validateProjectCollection(projects);

  return projects.sort(compareProjectsForNavigation);
}

/**
 * Devuelve proyectos filtrados por categoría.
 * category === 'all' devuelve todos sin filtrar.
 */
export async function getProjectsByCategory(
  category: ProjectCategory | 'all'
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
  const project = all.find((p) => resolveSlug(p) === slug);
  if (!project) {
    throw new Error(`Proyecto con slug "${slug}" no encontrado en la colección.`);
  }
  return project;
}
