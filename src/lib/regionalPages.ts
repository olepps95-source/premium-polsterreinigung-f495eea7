/**
 * Zentrale Konfiguration der regionalen Leistungsseiten (Leistung × Stadt).
 * Nur bestätigte Unternehmensdaten. Keine Niederlassungen außerhalb von Chemnitz.
 */

export type ServiceKey = 'polster' | 'fenster' | 'teppich' | 'gewerbe';
export type CityKey = 'chemnitz' | 'dresden' | 'leipzig';

export interface CityConfig {
  key: CityKey;
  name: string;
  surroundings: string[];
  /** Kurzer, sachlicher Regionsbezug ohne erfundene Referenzen. */
  regionNote: string;
}

export interface ServiceConfig {
  key: ServiceKey;
  name: string;
  slugBase: string;
  parentPath: string;
  parentLabel: string;
  serviceType: string;
  includes: string[];
  steps: { title: string; text: string }[];
  priceText: string;
  faqs: { q: string; a: string }[];
}

export const cities: Record<CityKey, CityConfig> = {
  chemnitz: {
    key: 'chemnitz',
    name: 'Chemnitz',
    surroundings: ['Limbach-Oberfrohna', 'Burgstädt', 'Frankenberg', 'Flöha', 'Hohenstein-Ernstthal', 'Glauchau', 'Zwickau'],
    regionNote:
      'Unser Unternehmenssitz liegt in Chemnitz. Von hier aus sind wir schnell im gesamten Stadtgebiet und im Umland unterwegs.',
  },
  dresden: {
    key: 'dresden',
    name: 'Dresden',
    surroundings: ['Freital', 'Radebeul', 'Coswig', 'Heidenau', 'Pirna', 'Radeberg', 'Meißen'],
    regionNote:
      'In Dresden und Umgebung arbeiten wir mobil direkt bei Ihnen vor Ort. Eine eigene Niederlassung in Dresden haben wir nicht – Termine planen wir von Chemnitz aus.',
  },
  leipzig: {
    key: 'leipzig',
    name: 'Leipzig',
    surroundings: ['Markkleeberg', 'Taucha', 'Markranstädt', 'Schkeuditz', 'Borsdorf', 'Delitzsch', 'Grimma'],
    regionNote:
      'In Leipzig und Umgebung kommen wir mit unserer Ausrüstung direkt zu Ihnen. Eine eigene Niederlassung in Leipzig haben wir nicht – Termine planen wir von Chemnitz aus.',
  },
};

const anfahrtFaq = (city: string) => ({
  q: `Kostet die Anfahrt nach ${city} extra?`,
  a: 'Die Anfahrt ist grundsätzlich kostenlos. Zusätzliche Fahrtkosten entstehen nur, wenn sie vor Auftragserteilung ausdrücklich mit Ihnen vereinbart wurden.',
});

export const services: Record<ServiceKey, ServiceConfig> = {
  polster: {
    key: 'polster',
    name: 'Polsterreinigung',
    slugBase: 'polsterreinigung',
    parentPath: '/polsterreinigung',
    parentLabel: 'Polsterreinigung in Sachsen',
    serviceType: 'Polsterreinigung',
    includes: [
      'Sofas, Ecksofas und Sessel aus Stoff',
      'Esszimmer- und Bürostühle',
      'Matratzen',
      'Vorbehandlung von Flecken und Gerüchen',
      'Sprühextraktion mit professionellen Geräten',
    ],
    steps: [
      { title: 'Foto senden', text: 'Schicken Sie uns per WhatsApp ein Foto Ihres Möbelstücks.' },
      { title: 'Festen Preis erhalten', text: 'Sie erhalten einen klaren Preis, bevor wir anfangen.' },
      { title: 'Reinigung vor Ort', text: 'Wir reinigen direkt bei Ihnen – ohne Transport der Möbel.' },
    ],
    priceText:
      'Für die Polsterreinigung gelten feste Preise pro Möbelstück. Die aktuelle Preisliste finden Sie direkt unten auf dieser Seite.',
    faqs: [
      { q: 'Wie lange braucht das Sofa zum Trocknen?', a: 'Je nach Stoff und Raumklima meist einige Stunden. Gutes Lüften verkürzt die Trocknungszeit.' },
      { q: 'Werden alle Flecken entfernt?', a: 'Viele Flecken lassen sich deutlich reduzieren oder entfernen. Bei alten oder eingetrockneten Flecken können wir kein vollständiges Ergebnis garantieren.' },
      { q: 'Muss ich die Möbel vorbereiten?', a: 'Bitte räumen Sie Kissen und Gegenstände vom Möbelstück. Alles Weitere übernehmen wir.' },
    ],
  },
  fenster: {
    key: 'fenster',
    name: 'Fensterreinigung',
    slugBase: 'fensterreinigung',
    parentPath: '/fensterreinigung',
    parentLabel: 'Fensterreinigung',
    serviceType: 'Fensterreinigung',
    includes: [
      'Glasflächen innen und außen',
      'Rahmen und Fensterbänke',
      'Wintergärten',
      'Schaufenster und Glasfronten',
      'Rollläden und Jalousien nach Absprache',
    ],
    steps: [
      { title: 'Fotos senden', text: 'Ein paar Fotos Ihrer Fenster per WhatsApp reichen uns aus.' },
      { title: 'Preis erhalten', text: 'Sie erhalten einen festen Preis für den vereinbarten Umfang.' },
      { title: 'Termin & Reinigung', text: 'Wir kommen zum vereinbarten Termin und reinigen streifenfrei.' },
    ],
    priceText:
      'Der Preis richtet sich nach Anzahl und Größe der Fenster, Erreichbarkeit und gewünschtem Umfang (z. B. mit Rahmen). Nach Ihren Fotos nennen wir Ihnen einen festen Preis.',
    faqs: [
      { q: 'Reinigen Sie auch die Rahmen?', a: 'Ja, Rahmen und Fensterbänke können auf Wunsch mitgereinigt werden.' },
      { q: 'Bieten Sie Fensterreinigung für Geschäfte an?', a: 'Ja, wir reinigen auch Schaufenster und Glasflächen von Büros und Ladengeschäften.' },
      { q: 'Muss ich zu Hause sein?', a: 'Für die Innenreinigung ja. Reine Außenreinigung ist nach Absprache möglich, wenn die Fenster zugänglich sind.' },
    ],
  },
  teppich: {
    key: 'teppich',
    name: 'Teppichbodenreinigung',
    slugBase: 'teppichbodenreinigung',
    parentPath: '/teppichbodenreinigung',
    parentLabel: 'Teppichbodenreinigung',
    serviceType: 'Teppichbodenreinigung',
    includes: [
      'Verlegte Teppichböden in Wohnungen und Häusern',
      'Teppichböden in Büros, Praxen und Kitas',
      'Treppen und Flure',
      'Fleckenvorbehandlung',
      'Tiefenreinigung im Sprühextraktionsverfahren',
    ],
    steps: [
      { title: 'Fläche mitteilen', text: 'Senden Sie uns Fotos und die ungefähre Fläche in m².' },
      { title: 'Preis erhalten', text: 'Sie erhalten einen festen Preis auf Basis von Fläche und Verschmutzung.' },
      { title: 'Reinigung vor Ort', text: 'Wir reinigen den Teppichboden direkt in Ihren Räumen.' },
    ],
    priceText:
      'Teppichbodenreinigung ab 8 € pro m². Der endgültige Preis richtet sich nach Fläche, Verschmutzungsgrad und Aufwand und wird vorher fest vereinbart.',
    faqs: [
      { q: 'Wann ist der Teppichboden wieder begehbar?', a: 'In der Regel nach einigen Stunden, abhängig von Belüftung und Raumtemperatur.' },
      { q: 'Reinigen Sie auch große Gewerbeflächen?', a: 'Ja, auch Büros, Praxen und Kitas. Termine außerhalb der Öffnungszeiten sind nach Absprache möglich.' },
      { q: 'Müssen Möbel ausgeräumt werden?', a: 'Kleine Gegenstände bitte entfernen. Größere Möbel besprechen wir vorab mit Ihnen.' },
    ],
  },
  gewerbe: {
    key: 'gewerbe',
    name: 'Gewerbereinigung',
    slugBase: 'gewerbereinigung',
    parentPath: '/gewerbe',
    parentLabel: 'Gewerbliche Reinigung',
    serviceType: 'Gewerbliche Reinigung',
    includes: [
      'Teppichböden in Büros und Praxen',
      'Bürostühle, Wartezimmer-Sofas und Lobby-Sessel',
      'Matratzen in Hotels, Pensionen und Kitas',
      'Hartböden wie Laminat, Fliesen und Vinyl',
      'Fenster und Glasflächen',
    ],
    steps: [
      { title: 'Anfrage senden', text: 'Beschreiben Sie Objekt, Flächen und gewünschte Leistungen.' },
      { title: 'Angebot erhalten', text: 'Sie erhalten ein klares Angebot mit festem Preis.' },
      { title: 'Reinigung nach Plan', text: 'Wir reinigen nach Absprache – auch außerhalb Ihrer Geschäftszeiten.' },
    ],
    priceText:
      'Gewerbliche Aufträge kalkulieren wir individuell nach Fläche, Möbelanzahl und Leistungsumfang. Sie erhalten vorab ein festes Angebot.',
    faqs: [
      { q: 'Können Sie außerhalb der Geschäftszeiten reinigen?', a: 'Ja, Termine am frühen Morgen, abends oder am Wochenende sind nach Absprache möglich.' },
      { q: 'Für welche Branchen arbeiten Sie?', a: 'Unter anderem für Büros, Arztpraxen, Hotels, Kitas und Pflegeeinrichtungen.' },
      { q: 'Bieten Sie regelmäßige Reinigungen an?', a: 'Wiederkehrende Termine können wir gerne individuell mit Ihnen vereinbaren.' },
    ],
  },
};

/** Individuelle Einleitung pro Leistung und Stadt. */
const intros: Record<ServiceKey, Record<CityKey, string>> = {
  polster: {
    chemnitz:
      'Ihr Sofa wirkt fleckig oder riecht nicht mehr frisch? Wir reinigen Polstermöbel in Chemnitz direkt in Ihrer Wohnung – vom Zweisitzer bis zum großen Ecksofa. Auch in Limbach-Oberfrohna, Flöha oder Hohenstein-Ernstthal sind wir für Sie im Einsatz.',
    dresden:
      'Für die Polsterreinigung in Dresden kommen wir mit professionellen Sprühextraktionsgeräten zu Ihnen nach Hause. Ob Sofa, Sessel oder Matratze – Sie müssen nichts transportieren. Auch Kundinnen und Kunden in Radebeul, Freital oder Pirna betreuen wir.',
    leipzig:
      'In Leipzig reinigen wir Polstermöbel und Matratzen schonend und gründlich vor Ort. Gerade bei Haustieren oder Kindern im Haushalt lohnt sich eine regelmäßige Tiefenreinigung. Auch in Markkleeberg, Taucha oder Schkeuditz sind wir unterwegs.',
  },
  fenster: {
    chemnitz:
      'Streifenfreie Fenster für Wohnung, Haus oder Geschäft in Chemnitz: Wir reinigen Glasflächen, Rahmen und Fensterbänke gründlich und sorgfältig. Auch für Wintergärten und Schaufenster in Burgstädt, Frankenberg oder Glauchau sind wir die richtigen Ansprechpartner.',
    dresden:
      'Ob hohe Altbaufenster, moderne Glasfronten oder ein Wintergarten – für die Fensterreinigung in Dresden kommen wir mit passender Ausrüstung zu Ihnen. Auch in Radebeul, Coswig oder Heidenau reinigen wir Ihre Fenster.',
    leipzig:
      'Saubere Fenster lassen mehr Licht in Ihre Räume. Wir übernehmen die Fensterreinigung in Leipzig für Privathaushalte, Büros und Ladengeschäfte. Auch in Markranstädt, Borsdorf oder Delitzsch sind wir für Sie da.',
  },
  teppich: {
    chemnitz:
      'Verlegter Teppichboden sammelt über die Zeit Staub, Flecken und Gerüche. Wir reinigen Teppichböden in Chemnitz tiefgehend im Sprühextraktionsverfahren – in Wohnungen ebenso wie in Büros und Praxen. Auch im Umland bis Zwickau sind wir im Einsatz.',
    dresden:
      'Für die Teppichbodenreinigung in Dresden kommen wir direkt in Ihre Räume. Ob Wohnzimmer, Treppenhaus oder Bürofläche: Wir entfernen Schmutz aus den tiefen Fasern. Auch in Meißen, Radeberg oder Freital reinigen wir Teppichböden.',
    leipzig:
      'Ob Mietwohnung vor der Übergabe, Büro oder Kita – wir reinigen Teppichböden in Leipzig gründlich und zu einem klar vereinbarten Preis pro m². Auch in Grimma, Taucha oder Markkleeberg sind wir für Sie unterwegs.',
  },
  gewerbe: {
    chemnitz:
      'Gepflegte Geschäftsräume hinterlassen bei Kunden und Mitarbeitenden einen guten Eindruck. Für Unternehmen in Chemnitz reinigen wir Teppichböden, Polstermöbel, Matratzen, Hartböden und Fenster – flexibel und ohne Ihren Betrieb zu unterbrechen.',
    dresden:
      'Für Büros, Praxen, Hotels und Kitas in Dresden bieten wir professionelle Reinigung von Teppichen, Polstern, Matratzen und Hartböden direkt vor Ort. Auch Betriebe in Radebeul, Pirna oder Heidenau betreuen wir.',
    leipzig:
      'Ob Büro, Arztpraxis oder Hotel: Wir übernehmen die gewerbliche Reinigung in Leipzig mit professionellen Geräten und klaren Angeboten. Auch Unternehmen in Schkeuditz, Markkleeberg oder Delitzsch sind wir gerne behilflich.',
  },
};

export interface RegionalPage {
  path: string;
  service: ServiceConfig;
  city: CityConfig;
  title: string;
  description: string;
  h1: string;
  intro: string;
  faqs: { q: string; a: string }[];
}

const SITE = 'https://reinwerk-service.de';

export const regionalPages: RegionalPage[] = (Object.keys(services) as ServiceKey[]).flatMap((sk) =>
  (Object.keys(cities) as CityKey[]).map((ck) => {
    const s = services[sk];
    const c = cities[ck];
    return {
      path: `/${s.slugBase}-${ck}`,
      service: s,
      city: c,
      title: `${s.name} ${c.name} | Vor Ort & zum Festpreis | ReinWerk`,
      description: `${s.name} in ${c.name} und Umgebung: professionell vor Ort, fester Preis vorab, kostenlose Anfahrt. Jetzt Foto per WhatsApp senden und Preis erhalten.`,
      h1: `${s.name} in ${c.name}`,
      intro: intros[sk][ck],
      faqs: [
        ...s.faqs,
        anfahrtFaq(c.name),
        {
          q: `In welchen Orten rund um ${c.name} sind Sie tätig?`,
          a: `Neben ${c.name} unter anderem in ${c.surroundings.join(', ')}. Weitere Orte in Sachsen sind nach Absprache möglich.`,
        },
      ],
    };
  }),
);

export const regionalPagesForService = (sk: ServiceKey) => regionalPages.filter((p) => p.service.key === sk);

export const absoluteUrl = (path: string) => `${SITE}${path}`;
