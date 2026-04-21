import { useState } from 'preact/hooks';

type MigrationPhase = {
  id: string;
  label: string;
  title: string;
  summary: string;
  decision: string;
  checks: string[];
  nodes: Array<{
    name: string;
    status: string;
    detail: string;
  }>;
};

const phases: MigrationPhase[] = [
  {
    id: 'assessment',
    label: 'Fase 1',
    title: 'Assessment y línea base',
    summary:
      'Se inventarían servicios, segmentos y equipos para determinar dependencias IPv4, capacidad dual-stack y riesgo operativo.',
    decision: 'Nada se migra todavía; primero se delimita qué puede convivir con IPv6 sin introducir pérdida de visibilidad.',
    checks: [
      'Inventario de enlaces, VLANs y servicios expuestos.',
      'Validación de compatibilidad en DNS, firewall y monitoreo.',
      'Identificación de segmentos críticos con ventana de cambio controlada.',
    ],
    nodes: [
      {
        name: 'Borde / Router',
        status: 'Solo IPv4',
        detail: 'Se verifica soporte de prefijos, ACLs y vecinos antes de habilitar dual-stack.',
      },
      {
        name: 'DNS y publicación',
        status: 'Sin AAAA en producción',
        detail: 'Las zonas siguen estables mientras se preparan registros y pruebas internas.',
      },
      {
        name: 'VLANs cliente',
        status: 'Inventario completo',
        detail: 'Se define qué segmentos entran primero al piloto y qué activos quedan fuera.',
      },
      {
        name: 'Monitoreo',
        status: 'Línea base',
        detail: 'Se registran latencia, alcance y comportamiento previo a cualquier cambio.',
      },
    ],
  },
  {
    id: 'pilot',
    label: 'Fase 2',
    title: 'Piloto dual-stack',
    summary:
      'Se habilita IPv6 en segmentos acotados para validar direccionamiento, rutas y observabilidad sin retirar IPv4.',
    decision: 'El objetivo es reducir riesgo: IPv4 sigue operativo mientras se confirma comportamiento real de servicios.',
    checks: [
      'Asignación de prefijos y pruebas de SLAAC o DHCPv6 según el segmento.',
      'Validación de NDP, reachability y rutas de salida.',
      'Correlación de logs para comparar tráfico IPv4 e IPv6 durante el piloto.',
    ],
    nodes: [
      {
        name: 'Borde / Router',
        status: 'Dual-stack parcial',
        detail: 'Ya publica prefijos y mantiene rutas coexistentes con IPv4.',
      },
      {
        name: 'DNS y publicación',
        status: 'AAAA controlado',
        detail: 'Los registros se habilitan por servicio y se verifican desde resolvers externos.',
      },
      {
        name: 'VLANs cliente',
        status: 'Piloto activo',
        detail: 'Solo segmentos seleccionados reciben conectividad IPv6 para validación.',
      },
      {
        name: 'Monitoreo',
        status: 'Comparativo',
        detail: 'Se contrastan latencia, pérdida y disponibilidad entre ambos stacks.',
      },
    ],
  },
  {
    id: 'validation',
    label: 'Fase 3',
    title: 'Validación de servicios',
    summary:
      'Se comprueba que aplicaciones, DNS, seguridad perimetral y observabilidad sostengan operación estable sobre IPv6.',
    decision: 'El criterio de avance depende de evidencia operativa: si hay ruido o degradación, el cambio no avanza.',
    checks: [
      'Pruebas de resolución y acceso desde clientes internos y externos.',
      'Verificación de reglas de firewall y telemetría por servicio.',
      'Ensayo de diagnóstico para confirmar trazabilidad ante incidentes.',
    ],
    nodes: [
      {
        name: 'Borde / Router',
        status: 'Rutas verificadas',
        detail: 'Se validan prefijos, reachability y rutas simétricas para servicios críticos.',
      },
      {
        name: 'DNS y publicación',
        status: 'Resolución estable',
        detail: 'AAAA y registros asociados responden sin degradar la publicación existente.',
      },
      {
        name: 'VLANs cliente',
        status: 'Cobertura ampliada',
        detail: 'Más segmentos entran al plan solo después de pasar verificación funcional.',
      },
      {
        name: 'Monitoreo',
        status: 'Alertas operativas',
        detail: 'Los paneles ya detectan incidentes reales y separan ruido de eventos relevantes.',
      },
    ],
  },
  {
    id: 'cutover',
    label: 'Fase 4',
    title: 'Corte controlado y operación',
    summary:
      'Con la coexistencia validada, la operación prioriza IPv6 en servicios definidos y mantiene rollback disponible.',
    decision: 'El cambio entra en producción con criterios de observabilidad, diagnóstico y recuperación ya probados.',
    checks: [
      'Ventana de cambio con rollback documentado.',
      'Monitoreo intensivo post-cambio sobre rutas, DNS y servicios publicados.',
      'Cierre con evidencia de estabilidad, no solo con conectividad puntual.',
    ],
    nodes: [
      {
        name: 'Borde / Router',
        status: 'Producción controlada',
        detail: 'La política de ruteo ya considera el nuevo estado operativo y conserva rollback.',
      },
      {
        name: 'DNS y publicación',
        status: 'Servicio expuesto',
        detail: 'La publicación queda alineada con el estado real de cada servicio en producción.',
      },
      {
        name: 'VLANs cliente',
        status: 'Adopción operativa',
        detail: 'Los segmentos activos quedan documentados y listos para soporte de primer nivel.',
      },
      {
        name: 'Monitoreo',
        status: 'Seguimiento continuo',
        detail: 'La observabilidad posterior al cambio confirma que no hubo regresión silenciosa.',
      },
    ],
  },
];

export default function IPv6MigrationMap() {
  const [activePhaseId, setActivePhaseId] = useState(phases[1].id);
  const activePhase =
    phases.find((phase) => phase.id === activePhaseId) ?? phases[1];

  return (
    <>
      <style>{`
        .ipv6-shell {
          display: grid;
          gap: 1.5rem;
        }

        .ipv6-phases {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 0.75rem;
        }

        .ipv6-phase-button {
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-md);
          background: var(--color-bg);
          color: var(--color-text-secondary);
          padding: 0.9rem 1rem;
          text-align: left;
          cursor: pointer;
          transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .ipv6-phase-button:hover {
          transform: translateY(-1px);
          border-color: var(--color-accent);
        }

        .ipv6-phase-button[data-active="true"] {
          background: var(--color-accent-subtle);
          border-color: var(--color-accent);
          color: var(--color-accent-text);
        }

        .ipv6-phase-label {
          display: block;
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.35rem;
        }

        .ipv6-phase-title {
          display: block;
          font-size: var(--text-sm);
          line-height: 1.5;
        }

        .ipv6-summary {
          display: grid;
          gap: 1rem;
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-md);
          background: var(--color-bg);
          padding: 1.25rem;
        }

        .ipv6-summary h3,
        .ipv6-nodes h3,
        .ipv6-checks h3 {
          margin: 0;
          font-size: var(--text-base);
          font-family: var(--font-mono);
          color: var(--color-text-primary);
        }

        .ipv6-summary p,
        .ipv6-node p,
        .ipv6-checks li {
          margin: 0;
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        .ipv6-decision {
          padding: 1rem;
          border-radius: var(--radius-md);
          background: var(--color-bg-subtle);
          border: 1px solid var(--color-bg-muted);
        }

        .ipv6-grid {
          display: grid;
          gap: 1rem;
        }

        .ipv6-nodes {
          display: grid;
          gap: 1rem;
        }

        .ipv6-node-grid {
          display: grid;
          gap: 1rem;
        }

        .ipv6-node {
          display: grid;
          gap: 0.65rem;
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-md);
          background: var(--color-bg);
          padding: 1rem;
        }

        .ipv6-node-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .ipv6-node-head strong {
          color: var(--color-text-primary);
          font-size: var(--text-sm);
        }

        .ipv6-status {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-full);
          padding: 0.25rem 0.65rem;
          background: var(--color-accent-subtle);
          color: var(--color-accent-text);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          white-space: nowrap;
        }

        .ipv6-checks {
          display: grid;
          gap: 0.9rem;
          border: 1px solid var(--color-bg-muted);
          border-radius: var(--radius-md);
          background: var(--color-bg);
          padding: 1.25rem;
        }

        .ipv6-checks ul {
          display: grid;
          gap: 0.75rem;
          margin: 0;
          padding-left: 1.2rem;
        }

        @media (min-width: 768px) {
          .ipv6-grid {
            grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          }

          .ipv6-node-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>

      <div class="ipv6-shell">
        <div class="ipv6-phases" role="tablist" aria-label="Fases de migración IPv6">
          {phases.map((phase) => (
            <button
              key={phase.id}
              type="button"
              class="ipv6-phase-button"
              data-active={phase.id === activePhase.id}
              aria-pressed={phase.id === activePhase.id}
              onClick={() => setActivePhaseId(phase.id)}
            >
              <span class="ipv6-phase-label">{phase.label}</span>
              <span class="ipv6-phase-title">{phase.title}</span>
            </button>
          ))}
        </div>

        <div class="ipv6-grid">
          <section class="ipv6-summary" aria-labelledby="ipv6-summary-title">
            <h3 id="ipv6-summary-title">{activePhase.title}</h3>
            <p>{activePhase.summary}</p>
            <div class="ipv6-decision">
              <p>{activePhase.decision}</p>
            </div>
          </section>

          <section class="ipv6-checks" aria-labelledby="ipv6-checks-title">
            <h3 id="ipv6-checks-title">Validaciones operativas</h3>
            <ul>
              {activePhase.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </section>
        </div>

        <section class="ipv6-nodes" aria-labelledby="ipv6-nodes-title">
          <h3 id="ipv6-nodes-title">Estado por dominio técnico</h3>
          <div class="ipv6-node-grid">
            {activePhase.nodes.map((node) => (
              <article key={node.name} class="ipv6-node">
                <div class="ipv6-node-head">
                  <strong>{node.name}</strong>
                  <span class="ipv6-status">{node.status}</span>
                </div>
                <p>{node.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
