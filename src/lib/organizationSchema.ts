/**
 * Zentrale, wiedervermbare Schema-Konfiguration für die ReinWerk-Unternehmensidentität.
 *
 * Enthält ausschließlich bestätigte Daten. Keine erfundenen Werte.
 *
 * WICHTIG:
 * - Dresden, Leipzig und Zwickau sind ausschließlich als areaServed definiert,
 *   niemals als Adresse oder Niederlassung.
 * - Kein openingHours, kein sameAs, kein logo, kein priceRange.
 *
 * Diese Konfiguration ist noch auf keiner Seite eingebunden.
 * Sie kann von einzelnen Seiten referenziert bzw. wiederverwendet werden,
 * ohne bestehende Schemas zu verändern.
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'CleaningService'],
  '@id': 'https://reinwerk-service.de/#organization',
  name: 'ReinWerk',
  url: 'https://reinwerk-service.de/',
  telephone: '+491632373108',
  email: 'info@reinwerk-service.de',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Matthesstraße 48',
    addressLocality: 'Chemnitz',
    postalCode: '09113',
    addressCountry: 'DE',
  },
  image: 'https://reinwerk-service.de/og-image.png',
  areaServed: [
    { '@type': 'State', name: 'Sachsen' },
    { '@type': 'City', name: 'Chemnitz' },
    { '@type': 'City', name: 'Dresden' },
    { '@type': 'City', name: 'Leipzig' },
    { '@type': 'City', name: 'Zwickau' },
  ],
};
