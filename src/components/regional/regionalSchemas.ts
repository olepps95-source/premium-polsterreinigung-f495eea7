import { RegionalPage, absoluteUrl } from '@/lib/regionalPages';

/** Service + BreadcrumbList JSON-LD for regional pages (unchanged structure). */
export function regionalSchemas(page: RegionalPage) {
  const url = absoluteUrl(page.path);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: page.service.serviceType,
      name: page.h1,
      url,
      description: page.description,
      provider: { '@id': 'https://reinwerk-service.de/#organization' },
      areaServed: [
        { '@type': 'City', name: page.city.name },
        ...page.city.surroundings.map((name) => ({ '@type': 'City', name })),
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://reinwerk-service.de/' },
        { '@type': 'ListItem', position: 2, name: page.service.parentLabel, item: absoluteUrl(page.service.parentPath) },
        { '@type': 'ListItem', position: 3, name: page.h1, item: url },
      ],
    },
  ];
}
