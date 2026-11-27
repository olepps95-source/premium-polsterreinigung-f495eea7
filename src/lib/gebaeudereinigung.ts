// Draft content for the Gebäudereinigung landing page (development only).
// planned URLs prepare future subpages; none exist yet.
import wohnung from "@/assets/gebaeudereinigung/wohnung.webp.asset.json";
import buero from "@/assets/gebaeudereinigung/buero.webp.asset.json";
import kueche from "@/assets/gebaeudereinigung/kueche.webp.asset.json";
import unterhalt from "@/assets/gebaeudereinigung/unterhalt.webp.asset.json";
import bad from "@/assets/gebaeudereinigung/bad.webp.asset.json";
import umzug from "@/assets/gebaeudereinigung/umzug.webp.asset.json";

export const GEBAEUDE_ENABLED = import.meta.env.DEV;

export type GebaeudeService = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  plannedPath?: string;
};

export const gebaeudeServices: GebaeudeService[] = [
  { id: "wohnung", title: "Wohnungs- & Hausreinigung", description: "Individuelle Reinigung von Wohnungen und Einfamilienhäusern – abgestimmt auf Ihre persönlichen Bedürfnisse.", image: wohnung.url, alt: "Helles, sauberes Wohnzimmer nach der Wohnungsreinigung", plannedPath: "/wohnungsreinigung" },
  { id: "buero", title: "Büroreinigung", description: "Zuverlässige Reinigung von Büros, Arbeitsplätzen und gewerblich genutzten Räumen.", image: buero.url, alt: "Saubere moderne Büroräume mit Schreibtischen und Glasflächen", plannedPath: "/bueroreinigung" },
  { id: "grund", title: "Grundreinigung", description: "Intensive Reinigung bei stärkeren Verschmutzungen und erhöhtem Reinigungsbedarf.", image: kueche.url, alt: "Gründlich gereinigte moderne Küche", plannedPath: "/grundreinigung" },
  { id: "unterhalt", title: "Unterhaltsreinigung", description: "Regelmäßige Reinigung für dauerhaft gepflegte private und gewerbliche Räumlichkeiten.", image: unterhalt.url, alt: "Regelmäßige Reinigung eines Arbeitsbereichs mit Mikrofasertuch", plannedPath: "/unterhaltsreinigung" },
  { id: "badkueche", title: "Bad- & Küchenreinigung", description: "Gründliche Reinigung von Badezimmern, Küchen, Fliesen, Armaturen und Oberflächen.", image: bad.url, alt: "Sauberes Badezimmer mit glänzenden Armaturen" },
  { id: "umzug", title: "Umzugsreinigung", description: "Reinigung von Wohnungen und Häusern vor oder nach einem Umzug.", image: umzug.url, alt: "Helle, leere Wohnung mit Umzugskartons", plannedPath: "/umzugsreinigung" },
];

export const gebaeudeFormServices = [...gebaeudeServices.map((s) => s.title), "Sonstige Reinigung"];
export const gebaeudeFrequencies = ["Einmalig", "Wöchentlich", "Alle zwei Wochen", "Monatlich", "Nach individueller Absprache"];

export const gebaeudeFaqs = [
  ["Was kostet eine Gebäudereinigung?", "Die Kosten richten sich nach der Größe der Räumlichkeiten, dem Verschmutzungsgrad, dem gewünschten Leistungsumfang und der Reinigungshäufigkeit. Gerne erstellen wir Ihnen ein individuelles und unverbindliches Angebot."],
  ["Reinigen Sie auch private Wohnungen und Häuser?", "Ja, wir bieten individuelle Reinigungsleistungen für Wohnungen, Häuser und private Haushalte an."],
  ["Bieten Sie auch Büroreinigung an?", "Ja, wir bieten Reinigungsleistungen für Büros und gewerblich genutzte Räumlichkeiten an. Der Leistungsumfang wird individuell abgestimmt."],
  ["Ist eine regelmäßige Reinigung möglich?", "Gerne besprechen wir mit Ihnen die Möglichkeiten einer regelmäßigen Unterhaltsreinigung und passende Reinigungsintervalle."],
  ["Bringen Sie Reinigungsmittel und Arbeitsgeräte mit?", "Ja, wir bringen die für die vereinbarten Reinigungsleistungen benötigten Reinigungsmittel und Arbeitsgeräte mit."],
  ["Ist eine einmalige Grundreinigung möglich?", "Ja, neben regelmäßigen Reinigungsleistungen bieten wir auch einmalige Grundreinigungen nach individueller Absprache an."],
  ["In welchen Orten sind Sie tätig?", "Wir bieten unsere Gebäudereinigung in Chemnitz und Umgebung an. Weitere Einsatzorte sind nach individueller Absprache möglich."],
] as const;
