import type { ProjectInteractiveDemo } from './project-interactive-keys';

export type ProjectInteractiveDefinition = {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
};

const projectInteractiveRegistry: Record<ProjectInteractiveDemo, ProjectInteractiveDefinition> = {
  'rsa-simulator': {
    eyebrow: 'Laboratorio interactivo',
    title: 'Simulador RSA',
    description:
      'Demostración operativa de generación de claves, cifrado y descifrado con enteros pequeños para visualizar el flujo matemático completo.',
    note:
      'Esta simulación usa números acotados para fines pedagógicos. El proyecto real en C se apoya en GMP para trabajar con enteros grandes.',
  },
  'ipv6-migration-map': {
    eyebrow: 'Mapa interactivo',
    title: 'Mapa de transición IPv6',
    description:
      'Recorrido por fases de una migración dual-stack con foco en segmentación, validación de servicios y criterio operativo de corte controlado.',
    note:
      'El objetivo es visualizar decisiones de operación y validación, no reemplazar la documentación técnica detallada del caso de estudio.',
  },
};

export function getProjectInteractiveDefinition(
  interactiveDemo?: ProjectInteractiveDemo
): ProjectInteractiveDefinition | null {
  if (!interactiveDemo) return null;
  return projectInteractiveRegistry[interactiveDemo];
}
