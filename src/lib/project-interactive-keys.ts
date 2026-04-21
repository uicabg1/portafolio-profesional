export const projectInteractiveDemos = [
  'rsa-simulator',
  'ipv6-migration-map',
] as const;

export type ProjectInteractiveDemo = (typeof projectInteractiveDemos)[number];
