import { useMemo, useState } from 'preact/hooks';
import { Activity, ArrowUpRight, FolderCode, Globe, Router, Shield } from 'lucide-preact';
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
    <>
      <style>{`
        .project-showcase {
          border-top: 1px solid var(--color-bg-muted);
          background:
            radial-gradient(circle at 12% 12%, color-mix(in srgb, var(--color-signal-cyan) 12%, transparent), transparent 32%),
            linear-gradient(180deg, var(--color-bg-subtle) 0%, var(--color-bg) 100%);
        }

        .project-showcase-shell {
          display: grid;
          gap: var(--space-16);
        }

        .project-showcase-header {
          display: grid;
          gap: var(--space-6);
          max-width: 900px;
        }

        .project-showcase-copy {
          max-width: 64ch;
          font-size: var(--text-lg);
          line-height: 1.85;
          color: var(--color-text-secondary);
        }

        .project-showcase-actions,
        .project-category-controls {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
        }

        .project-showcase-action,
        .project-category-button,
        .project-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          min-height: 48px;
          text-decoration: none;
          transition: transform 160ms ease, border-color 160ms ease, background 160ms ease, color 160ms ease;
        }

        .project-showcase-action {
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-6);
          font-size: var(--text-sm);
          font-weight: 500;
        }

        .project-showcase-action--primary {
          background: var(--color-accent);
          color: var(--color-accent-contrast);
        }

        .project-showcase-action--secondary {
          border: 1px solid var(--color-bg-muted);
          background: var(--color-surface);
          color: var(--color-text-primary);
        }

        .project-showcase-action:hover,
        .project-category-button:hover,
        .project-link:hover {
          transform: translateY(-1px);
        }

        .project-category-controls {
          align-items: center;
        }

        .project-category-button {
          min-height: 48px;
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-full);
          background: var(--color-surface);
          color: var(--color-text-secondary);
          padding: var(--space-3) calc(var(--space-4) + var(--space-1));
          font: inherit;
          font-size: var(--text-sm);
          cursor: pointer;
        }

        .project-category-button[data-active="true"] {
          border-color: var(--color-accent);
          background: color-mix(in srgb, var(--color-accent-subtle) 72%, var(--color-surface));
          color: var(--color-accent-text);
          box-shadow: inset 0 -3px 0 var(--color-accent);
        }

        .project-grid {
          display: grid;
          gap: var(--space-8);
        }

        .project-item {
          display: grid;
          gap: var(--space-6);
          padding-block: var(--space-8);
          border-top: 1px solid var(--color-bg-muted);
        }

        .project-item-main,
        .project-item-detail {
          display: grid;
          gap: var(--space-5, calc(var(--space-4) + var(--space-1)));
        }

        .project-feature {
          position: relative;
          padding: var(--space-8);
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-lg);
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--color-surface) 92%, transparent), color-mix(in srgb, var(--color-surface-strong) 84%, transparent)),
            var(--color-surface);
          box-shadow: 0 28px 90px color-mix(in srgb, var(--color-text-primary) 10%, transparent);
        }

        .project-item-kicker {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          align-items: center;
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
        }

        .project-feature .project-item-kicker {
          color: var(--color-signal-cyan);
        }

        .project-item-title {
          max-width: 16ch;
          font-size: var(--text-2xl);
          line-height: 1.1;
        }

        .project-result {
          max-width: 60ch;
          padding-left: var(--space-4);
          border-left: 3px solid var(--color-signal-green);
          color: var(--color-ink-soft);
          font-size: var(--text-lg);
          line-height: 1.75;
        }

        .project-disclosure {
          display: grid;
          gap: var(--space-4);
        }

        .project-disclosure summary {
          cursor: pointer;
          width: fit-content;
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .project-disclosure summary::-webkit-details-marker {
          display: none;
        }

        .project-story-line {
          max-width: 60ch;
          line-height: 1.8;
          color: var(--color-text-secondary);
        }

        .project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          list-style: none;
        }

        .project-stack li {
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-full);
          background: color-mix(in srgb, var(--color-surface) 82%, transparent);
          color: var(--color-text-secondary);
          padding: var(--space-1) var(--space-3);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
        }

        .project-link {
          width: fit-content;
          color: var(--color-accent);
          font-size: var(--text-sm);
          font-weight: 500;
        }

        @media (min-width: 900px) {
          .project-item {
            grid-template-columns: minmax(0, 0.85fr) minmax(360px, 1.15fr);
            align-items: start;
          }

          .project-feature {
            grid-template-columns: minmax(0, 0.72fr) minmax(360px, 1.28fr);
          }

          .project-item-title {
            font-size: var(--text-4xl);
          }
        }
      `}</style>

      <section
        id="proyectos"
        aria-labelledby="projects-heading"
        class="project-showcase editorial-section"
      >
        <div class="container project-showcase-shell">
          <header class="project-showcase-header motion-rise">
            <p class="section-kicker">Casos de estudio</p>

            <h2 id="projects-heading" class="editorial-title">
              Evidencia navegable, no solo capturas bonitas.
            </h2>

            <p class="project-showcase-copy">
              <strong>Web Dev</strong> muestra la oferta principal. El resto funciona como prueba de criterio tecnico.
            </p>

            <div class="project-showcase-actions">
              <a href="/#contacto" class="project-showcase-action project-showcase-action--primary">
                Ir a contacto
              </a>
              <a href="/#servicios" class="project-showcase-action project-showcase-action--secondary">
                Ver oferta activa
              </a>
            </div>
          </header>

          <div class="project-category-controls" aria-label="Filtrar proyectos por categoria">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category);
              const isActive = activeCategory === category;

              return (
                <button
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  class="project-category-button"
                  data-active={isActive}
                  aria-pressed={isActive}
                >
                  <Icon size={16} />
                  <span>{getCategoryLabel(category)}</span>
                </button>
              );
            })}
          </div>

          <div class="project-grid">
            {filteredProjects.map((project, index) => {
              const slug = resolveSlug(project);
              const isFeature = index === 0;

              return (
                <article
                  key={slug}
                  class={`project-item${isFeature ? ' project-feature' : ''}`}
                >
                  <div class="project-item-main">
                    <p class="project-item-kicker">
                      <span>{project.data.category}</span>
                      {project.data.featured && <span>Destacado</span>}
                    </p>

                    <h3 class="project-item-title">{project.data.title}</h3>
                  </div>

                  <div class="project-item-detail">
                    <p class="project-result">
                      <strong>Resultado:</strong> {project.data.result}
                    </p>

                    <details class="project-disclosure">
                      <summary>Ver resumen</summary>
                      <p class="project-story-line">
                        <strong>Resumen:</strong> {project.data.summary}
                      </p>
                      <p class="project-story-line">
                        <strong>Problema:</strong> {project.data.problem}
                      </p>
                      <p class="project-story-line">
                        <strong>Solucion:</strong> {project.data.solution}
                      </p>
                      <p class="project-story-line">
                        <strong>Resultado:</strong> {project.data.result}
                      </p>
                    </details>

                    <ul class="project-stack" role="list" aria-label={`Stack usado en ${project.data.title}`}>
                      {(project.data.stack ?? []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <a href={`/proyectos/${slug}`} class="project-link">
                      Ver caso de estudio
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
