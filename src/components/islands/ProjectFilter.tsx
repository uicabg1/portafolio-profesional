import { useMemo, useState } from 'preact/hooks';
import { FolderCode, Shield, Router, Activity, Globe } from 'lucide-preact';
import {
  resolveSlug,
  projectCategories,
  type Project,
  type ProjectCategory,
} from '../../lib/projects';

type Props = {
  projects: Project[];
};

const categories = ['All', ...projectCategories] as const satisfies readonly (
  | 'All'
  | ProjectCategory
)[];
type Category = (typeof categories)[number];

function getCategoryLabel(category: Category) {
  return category === 'All' ? 'Todos' : category;
}

function getCategoryIcon(category: Category) {
  switch (category) {
    case 'All':
      return Globe;
    case 'Ciberseguridad':
      return Shield;
    case 'Redes & IPv6':
      return Router;
    case 'Gestión de Redes':
      return Activity;
    case 'Web Dev':
      return FolderCode;
    default:
      return FolderCode;
  }
}

export default function ProjectFilter({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((project) => project.data.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <section
      id="proyectos"
      aria-labelledby="projects-heading"
      class="border-t"
      style={{ borderColor: 'var(--color-bg-muted)' }}
    >
      <div class="container py-32 md:py-36">
        <div class="max-w-3xl">
          <p
            class="mb-3 font-mono text-sm uppercase tracking-[0.12em]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Casos de estudio
          </p>

          <h2
            id="projects-heading"
            class="text-4xl md:text-6xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Casos de estudio para ver lo que ya puedo construir hoy y la base tecnica que lo respalda.
          </h2>

          <p
            class="mt-5 max-w-2xl text-base md:text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Empieza por <strong style={{ color: 'var(--color-text-primary)' }}>Web Dev</strong> si quieres ver la
            oferta principal. Las demas categorias muestran el criterio tecnico que acompaña ese trabajo sin
            desplazar la oferta web-first.
          </p>

          <div class="mt-6 flex flex-wrap gap-4">
            <a
              href="/#contacto"
              class="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-transform duration-150 hover:-translate-y-px"
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-accent-contrast)',
              }}
            >
              Ir a contacto
            </a>
            <a
              href="/#servicios"
              class="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border px-6 py-3 text-sm font-medium transition-colors duration-150"
              style={{
                borderColor: 'var(--color-bg-muted)',
                color: 'var(--color-text-primary)',
                background: 'var(--color-bg)',
              }}
            >
              Ver oferta activa
            </a>
          </div>
        </div>

        <div class="mt-12 flex flex-wrap gap-5">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category);
            const isActive = activeCategory === category;

            return (
              <button
                type="button"
                onClick={() => setActiveCategory(category)}
                class="inline-flex min-h-12 min-w-12 items-center gap-2 rounded-full border px-6 py-3 text-sm transition-colors duration-200"
                style={{
                  borderColor: isActive ? 'var(--color-accent)' : 'var(--color-bg-muted)',
                  background: isActive ? 'var(--color-accent-subtle)' : 'var(--color-bg)',
                  color: isActive ? 'var(--color-accent-text)' : 'var(--color-text-secondary)',
                }}
                aria-pressed={isActive}
              >
                <Icon size={16} />
                <span>{getCategoryLabel(category)}</span>
              </button>
            );
          })}
        </div>

        <div class="mt-14 grid gap-8 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={resolveSlug(project)}
              class="flex h-full flex-col rounded-[var(--radius-lg)] border p-6"
              style={{
                background: 'var(--color-bg-subtle)',
                borderColor: 'var(--color-bg-muted)',
              }}
            >
              <div class="mb-5 flex items-center justify-between gap-3">
                <span
                  class="inline-flex rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    background: 'var(--color-accent-subtle)',
                    color: 'var(--color-accent-text)',
                  }}
                >
                  {project.data.category}
                </span>

                {project.data.featured && (
                  <span
                    class="inline-flex rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      background: 'var(--color-bg)',
                      color: 'var(--color-text-secondary)',
                      border: '1px solid var(--color-bg-muted)',
                    }}
                  >
                    Destacado
                  </span>
                )}
              </div>

              <h3
                class="text-xl font-medium"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {project.data.title}
              </h3>

              <p
                class="mt-3 text-sm leading-6"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {project.data.summary}
              </p>

              <p
                class="mt-5 rounded-[var(--radius-md)] border px-4 py-4 text-sm leading-6"
                style={{
                  borderColor: 'var(--color-bg-muted)',
                  color: 'var(--color-text-secondary)',
                  background: 'var(--color-bg)',
                }}
              >
                <strong style={{ color: 'var(--color-text-primary)' }}>Resultado:</strong>{' '}
                {project.data.result}
              </p>

              <div class="mt-5 flex flex-wrap gap-2">
                {(project.data.stack ?? []).map((item) => (
                  <span
                    key={item}
                    class="rounded-full px-3 py-1 text-xs"
                    style={{
                      background: 'var(--color-bg)',
                      color: 'var(--color-text-secondary)',
                      border: '1px solid var(--color-bg-muted)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div class="mt-6">
                <a
                  href={`/proyectos/${resolveSlug(project)}`}
                  class="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Ver caso de estudio
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
