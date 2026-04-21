import { projectCategories, type ProjectCategory } from './project-categories';
import { resolveSlug } from './project-slug';

export { resolveSlug };
export { projectCategories };
export type { ProjectCategory };
export type Project = import('astro:content').CollectionEntry<'projects'>;