import { resolveSlug, type Project } from './projects';

type StructuredDataNode = Record<string, unknown>;

export type ProjectSeo = {
  canonicalUrl: string;
  ogImage: string;
  ogType: 'article';
  structuredData: StructuredDataNode[];
};

const siteName = 'Gadiel Uicab | Ingeniero De Software';
const author = {
  '@type': 'Person',
  name: 'Gadiel Uicab',
};

function toAbsoluteUrl(path: string, site?: URL): string {
  return site ? new URL(path, site).toString() : path;
}

function buildCreativeWorkStructuredData(
  project: Project,
  canonicalUrl: string,
  ogImageUrl: string,
  site?: URL
): StructuredDataNode {
  const {
    title,
    summary,
    category,
    stack,
    problem,
    solution,
    publishedAt,
  } = project.data;

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    headline: title,
    description: summary,
    url: canonicalUrl,
    datePublished: publishedAt.toISOString(),
    inLanguage: 'es-MX',
    genre: category,
    keywords: stack,
    image: ogImageUrl,
    author,
    creator: author,
    mainEntityOfPage: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: toAbsoluteUrl('/', site),
    },
    abstract: solution,
    about: [category, problem],
  };
}

function buildSoftwareSourceCodeStructuredData(
  project: Project,
  canonicalUrl: string,
  ogImageUrl: string
): StructuredDataNode | null {
  const { title, summary, stack, githubUrl, publishedAt, category } = project.data;

  if (!githubUrl) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: title,
    description: summary,
    url: canonicalUrl,
    codeRepository: githubUrl,
    datePublished: publishedAt.toISOString(),
    keywords: stack,
    image: ogImageUrl,
    author,
    creator: author,
    applicationCategory: category,
  };
}

function buildBreadcrumbStructuredData(
  project: Project,
  canonicalUrl: string,
  site?: URL
): StructuredDataNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: toAbsoluteUrl('/', site),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Proyectos',
        item: toAbsoluteUrl('/#proyectos', site),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.data.title,
        item: canonicalUrl,
      },
    ],
  };
}

export function getProjectSeo(project: Project, site?: URL): ProjectSeo {
  const projectSlug = resolveSlug(project);
  const canonicalPath = `/proyectos/${projectSlug}`;
  const ogImagePath = project.data.ogImage ?? '/og/default.svg';
  const canonicalUrl = toAbsoluteUrl(canonicalPath, site);
  const ogImage = toAbsoluteUrl(ogImagePath, site);

  const creativeWork = buildCreativeWorkStructuredData(
    project,
    canonicalUrl,
    ogImage,
    site
  );
  const softwareSourceCode = buildSoftwareSourceCodeStructuredData(
    project,
    canonicalUrl,
    ogImage
  );
  const breadcrumb = buildBreadcrumbStructuredData(project, canonicalUrl, site);

  return {
    canonicalUrl,
    ogImage,
    ogType: 'article',
    structuredData: [creativeWork, breadcrumb, softwareSourceCode].filter(
      Boolean
    ) as StructuredDataNode[],
  };
}
