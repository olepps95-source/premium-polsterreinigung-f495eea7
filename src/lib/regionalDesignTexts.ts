// City-specific texts placed into the original page layouts of the regional pages.
// Layout/sections come from the original service pages; only these texts differ per city.
import type { CityKey } from './regionalPages';

export interface RegionalDesignText {
  hero: string;
  privat: string;
  gewerbe: string;
  einsatz: string;
  cta: string;
  extraFaq: { q: string; a: string };
}

export const cityKeyFromPath = (path: string): CityKey =>
  (path.endsWith('dresden') ? 'dresden' : path.endsWith('leipzig') ? 'leipzig' : 'chemnitz');

export const polsterTexts: Record<CityKey, { hero: string; services: string; area: string; about: string }> = {
  chemnitz: {
    hero: 'Sofareinigung und Polsterreinigung in Chemnitz – von unserem Firmensitz aus direkt zu Ihnen nach Hause. Inklusive kostenloser beschleunigter Express-Trocknung.',
    services: 'Ob Couch, Ecksofa, Sessel oder Matratze: Wir reinigen Ihre Polstermöbel in Chemnitz direkt vor Ort – vom Kaßberg bis nach Limbach-Oberfrohna, Frankenberg, Flöha, Burgstädt oder Glauchau.',
    area: 'Unser Firmensitz liegt in Chemnitz. Von hier aus reinigen wir Polstermöbel im gesamten Stadtgebiet und in umliegenden Orten wie Limbach-Oberfrohna, Frankenberg, Flöha, Burgstädt und Glauchau.',
    about: 'Als Chemnitzer Unternehmen reinigen wir Polstermöbel mit moderner Ausrüstung direkt bei Ihnen. Sie möchten Ihre Couch reinigen lassen oder Ihr Ecksofa auffrischen? Wir kommen zu Ihnen – ohne Möbeltransport.',
  },
  dresden: {
    hero: 'Sofareinigung und Polsterreinigung in Dresden – mobiler Vor-Ort-Service von Striesen bis Radebeul. Inklusive kostenloser beschleunigter Express-Trocknung.',
    services: 'Couch, Ecksofa, Sessel oder Matratze: Wir reinigen Ihre Polstermöbel direkt bei Ihnen in Dresden – etwa in Striesen, Blasewitz, der Neustadt oder Löbtau sowie in Radebeul, Freital und Pirna.',
    area: 'ReinWerk hat keine Niederlassung in Dresden, bietet aber einen mobilen Vor-Ort-Service in Dresden und Umgebung – von Pieschen und Blasewitz bis nach Radebeul, Freital, Coswig, Heidenau und Pirna.',
    about: 'Sie möchten Ihre Couch in Dresden reinigen lassen? Wir kommen mit professioneller Ausrüstung zu Ihnen und reinigen Sofas, Sessel und Matratzen direkt vor Ort – ohne Abholung und ohne Transport.',
  },
  leipzig: {
    hero: 'Sofareinigung und Polsterreinigung in Leipzig – mobiler Vor-Ort-Service von Gohlis bis Markkleeberg. Inklusive kostenloser beschleunigter Express-Trocknung.',
    services: 'Couch, Ecksofa, Sessel oder Matratze: Wir reinigen Ihre Polstermöbel direkt bei Ihnen in Leipzig – zum Beispiel in Plagwitz, Schleußig, Gohlis oder der Südvorstadt sowie in Markkleeberg und Taucha.',
    area: 'ReinWerk hat keine Niederlassung in Leipzig, bietet aber einen mobilen Vor-Ort-Service in Leipzig und Umgebung – von Reudnitz und Connewitz bis nach Markkleeberg, Taucha und Schkeuditz.',
    about: 'Sie möchten Ihre Couch in Leipzig reinigen lassen? Wir kommen mit professioneller Ausrüstung zu Ihnen und reinigen Sofas, Sessel und Matratzen direkt vor Ort – ohne Abholung und ohne Transport.',
  },
};

export const teppichTexts: Record<CityKey, RegionalDesignText> = {
  chemnitz: {
    hero: 'Teppichboden reinigen lassen in Chemnitz: Tiefenreinigung fest verlegter Teppichböden in Wohnungen, Büros und Praxen – direkt von unserem Firmensitz aus.',
    privat: 'Wohnungen, Häuser, Treppen und Flure in Chemnitz und Umgebung, etwa in Limbach-Oberfrohna, Frankenberg oder Flöha. Wir reinigen fest verlegten Teppichboden schonend direkt in Ihren Räumen.',
    gewerbe: 'Büro-Teppichbodenreinigung in Chemnitz: Wir reinigen Teppichböden in Büros, Praxen, Kanzleien und Verkaufsräumen. Termine stimmen wir passend zu Ihrem Betrieb ab.',
    einsatz: 'Von unserem Firmensitz in Chemnitz aus reinigen wir fest verlegte Teppichböden im Stadtgebiet sowie in Burgstädt, Frankenberg, Flöha, Limbach-Oberfrohna und Glauchau.',
    cta: 'Kostenlose Einschätzung für Teppichböden in Chemnitz – privat und gewerblich.',
    extraFaq: { q: 'Was kostet die Teppichbodenreinigung in Chemnitz?', a: 'Die Teppichbodenreinigung kostet ab 8 € pro m². Der endgültige Preis richtet sich nach Fläche, Verschmutzungsgrad und Aufwand und wird vorher fest vereinbart.' },
  },
  dresden: {
    hero: 'Teppichboden reinigen lassen in Dresden: mobile Tiefenreinigung fest verlegter Teppichböden in Wohnungen, Büros und Praxen – direkt bei Ihnen vor Ort.',
    privat: 'Wohnungen und Häuser in Dresden, etwa in Striesen, Blasewitz oder Pieschen, sowie in Radebeul, Freital und Coswig. Wir reinigen fest verlegten Teppichboden direkt in Ihren Räumen.',
    gewerbe: 'Teppichbodenreinigung für Gewerbe in Dresden: Büros, Praxen und Geschäftsräume, zum Beispiel in der Neustadt oder in Löbtau. Termine stimmen wir individuell mit Ihnen ab.',
    einsatz: 'ReinWerk hat keine Niederlassung in Dresden, reinigt aber mobil vor Ort in Dresden und Umgebung – darunter Radebeul, Freital, Coswig, Heidenau und Pirna.',
    cta: 'Kostenlose Einschätzung für Teppichböden in Dresden – privat und gewerblich.',
    extraFaq: { q: 'Was kostet die Teppichbodenreinigung in Dresden?', a: 'Die Teppichbodenreinigung kostet ab 8 € pro m². Der endgültige Preis richtet sich nach Fläche, Verschmutzungsgrad und Aufwand und wird vorher fest vereinbart.' },
  },
  leipzig: {
    hero: 'Teppichboden reinigen lassen in Leipzig: mobile Tiefenreinigung fest verlegter Teppichböden in Wohnungen, Büros und Praxen – direkt bei Ihnen vor Ort.',
    privat: 'Wohnungen und Häuser in Leipzig, etwa in Gohlis, Schleußig oder Reudnitz, sowie in Markkleeberg und Taucha. Wir reinigen fest verlegten Teppichboden direkt in Ihren Räumen.',
    gewerbe: 'Büro-Teppichbodenreinigung in Leipzig: Büros, Praxen und Geschäftsräume, zum Beispiel in Plagwitz oder der Südvorstadt. Termine stimmen wir individuell mit Ihnen ab.',
    einsatz: 'ReinWerk hat keine Niederlassung in Leipzig, reinigt aber mobil vor Ort in Leipzig und Umgebung – darunter Markkleeberg, Taucha, Markranstädt und Schkeuditz.',
    cta: 'Kostenlose Einschätzung für Teppichböden in Leipzig – privat und gewerblich.',
    extraFaq: { q: 'Was kostet die Teppichbodenreinigung in Leipzig?', a: 'Die Teppichbodenreinigung kostet ab 8 € pro m². Der endgültige Preis richtet sich nach Fläche, Verschmutzungsgrad und Aufwand und wird vorher fest vereinbart.' },
  },
};

export const gewerbeTexts: Record<CityKey, { hero: string; clients: string; cta: string; einsatz: string }> = {
  chemnitz: {
    hero: 'Reinigung für Unternehmen in Chemnitz: Polstermöbel, Bürostühle, Teppichböden, Matratzen & Hartböden — vor Ort, von unserem Firmensitz aus.',
    clients: 'Für Büros, Praxen, Hotels und Kitas in Chemnitz und Umgebung – etwa in Limbach-Oberfrohna, Frankenberg, Flöha, Burgstädt und Glauchau.',
    cta: 'Bereit für saubere Geschäftsräume in Chemnitz?',
    einsatz: 'Von unserem Unternehmenssitz in Chemnitz aus reinigen wir Polstermöbel, Bürostühle, Teppichböden und Matratzen für Unternehmen in der ganzen Stadt sowie in Limbach-Oberfrohna, Frankenberg, Flöha, Burgstädt und Glauchau.',
  },
  dresden: {
    hero: 'Reinigung für Unternehmen in Dresden: Polstermöbel, Bürostühle, Teppichböden, Matratzen & Hartböden — mobiler Vor-Ort-Service direkt bei Ihnen.',
    clients: 'Für Büros, Praxen, Hotels und Kitas in Dresden – von der Neustadt und Pieschen bis Radebeul, Freital und Pirna.',
    cta: 'Bereit für saubere Geschäftsräume in Dresden?',
    einsatz: 'Für Büros, Praxen, Hotels und Kitas in Dresden kommen wir direkt zu Ihnen – von der Neustadt, Striesen und Löbtau bis nach Radebeul, Freital, Coswig, Heidenau und Pirna.',
  },
  leipzig: {
    hero: 'Reinigung für Unternehmen in Leipzig: Polstermöbel, Bürostühle, Teppichböden, Matratzen & Hartböden — mobiler Vor-Ort-Service direkt bei Ihnen.',
    clients: 'Für Büros, Praxen, Hotels und Kitas in Leipzig – von Plagwitz und Gohlis bis Markkleeberg, Taucha und Schkeuditz.',
    cta: 'Bereit für saubere Geschäftsräume in Leipzig?',
    einsatz: 'Für Büros, Praxen, Hotels und Kitas in Leipzig kommen wir direkt zu Ihnen – von Plagwitz, Gohlis und Reudnitz bis nach Markkleeberg, Taucha und Schkeuditz.',
  },
};
