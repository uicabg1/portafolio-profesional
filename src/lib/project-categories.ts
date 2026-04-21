export const projectCategories = [
  'Web Dev',
  'Ciberseguridad',
  'Redes & IPv6',
  'Gestión de Redes',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];