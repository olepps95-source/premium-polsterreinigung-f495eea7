import { Helmet } from 'react-helmet-async';

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ReinWerk",
  "description": "Professionelle Tiefenreinigung Ihrer Polstermöbel & Matratzen direkt vor Ort in Sachsen.",
  "url": "https://reinwerk-service.de",
  "telephone": "+491636986317",
  "email": "info@reinwerk-service.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Matthesstraße 48",
    "addressLocality": "Chemnitz",
    "postalCode": "09113",
    "addressCountry": "DE"
  },
  "areaServed": [
    { "@type": "City", "name": "Chemnitz" },
    { "@type": "City", "name": "Dresden" },
    { "@type": "City", "name": "Leipzig" },
    { "@type": "City", "name": "Zwickau" }
  ],
  "priceRange": "€€",
  "image": "https://reinwerk-service.de/og-image.png",
  "sameAs": [
    "https://www.instagram.com/reinwerk.clean"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  }
};

export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
