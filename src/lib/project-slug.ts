type ProjectSlugSource = {
  id: string;
  data: {
    slug?: string;
  };
};

export function resolveSlug(project: ProjectSlugSource): string {
  return project.data.slug ?? project.id;
}