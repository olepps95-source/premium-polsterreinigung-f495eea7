# Gebäudereinigung (/gebaeudereinigung) – Launch-Checkliste

Status: **unveröffentlichter Entwurf**. Diese Datei bei jeder Änderung an der Entwurfsseite aktualisieren.

Betroffene Dateien: `src/pages/drafts/Gebaeudereinigung.tsx`, `src/lib/gebaeudereinigung.ts`, `src/lib/draftAccess.ts`, `src/App.tsx`, `src/assets/gebaeudereinigung/`.

## 1. Aktuelle temporäre Einschränkungen (vor Launch aufheben)

| Einschränkung | Ort |
|---|---|
| Route nur bei `DRAFTS_ENABLED` (DEV oder Lovable-Preview-Host, sonst 404) | `src/App.tsx`, `src/lib/draftAccess.ts` |
| Erlaubte Vorschau-Hosts: `localhost`, `*.lovableproject.com`, `id-preview--*.lovable.app`, `id-preview-N--*.lovable.app` (Entwürfe), `preview--*.lovable.app`; alle anderen → 404 | `src/lib/draftAccess.ts` (+ Test `draftAccess.test.ts`) |
| Seite per `lazy()` geladen und nur unter Preview-Hosts eingebunden | `src/App.tsx` |
| `<meta name="robots" content="noindex, nofollow">` | Helmet in `Gebaeudereinigung.tsx` |
| Kein Canonical (nur Kommentar) | Helmet in `Gebaeudereinigung.tsx` |
| Banner „Entwurf – nur in der Vorschau sichtbar · Formular im Testmodus“ | oben in `Gebaeudereinigung.tsx` |
| Formular-Testmodus: kein Webhook, Telegram, Google Ads, Meta Pixel; nur `console.info` + Test-Toast | `onSubmit` in `Gebaeudereinigung.tsx` |
| Hinweis „Testmodus: Es werden keine Anfragen versendet.“ und Button „Anfrage senden (Test)“ | Formularbereich |
| Google-Bewertungskarte ist Platzhalter (keine Sterne/Zahlen) | Abschnitt „Google Bewertungen“ |
| Hero-Foto ist ein echtes ReinWerk-Foto; Leistungs- und Galeriebilder sind weiterhin generierte Beispielbilder | `src/assets/gebaeudereinigung/` |
| `plannedPath`-Unterseiten (/wohnungsreinigung, /bueroreinigung …) existieren nicht und dürfen nicht verlinkt sein | `src/lib/gebaeudereinigung.ts` |
| Nicht in Sitemap, Navigation, Header, Footer oder internen Links | – |
| Kein JSON-LD (Service/Breadcrumb/FAQ) | – |

## 2. Freigabe-Schritte

### Inhalte
- [ ] Texte, Leistungen, FAQ final vom Betreiber bestätigen (keine unbelegten Versprechen).
- [ ] Beispielbilder durch echte Fotos ersetzen (oder ausdrücklich freigeben); Alt-Texte prüfen.
- [ ] Google-Bewertungskarte: nur echte, bestätigte Bewertung bzw. Link zum Google-Profil; keine erfundenen Sterne/Zahlen.
- [ ] Entwurfsbanner, Testmodus-Hinweis und „(Test)“ im Button entfernen.

### Routing / Zugriff
- [ ] Route in `App.tsx` regulär (ohne `DRAFTS_ENABLED`) registrieren; Seite ggf. nach `src/pages/` verschieben.
- [ ] `DRAFTS_ENABLED`-Bedingung für diese Route entfernen (Host-Allowlist bleibt für andere Entwürfe).
- [ ] `GEBAEUDE_ENABLED`-Export entfernen, falls nicht mehr genutzt.
- [ ] Direktaufruf + Neuladen auf reinwerk-service.de prüfen (kein 404).

### Formular & Integrationen
- [ ] Ziel-Webhook festlegen (Make.com → Telegram) analog zu bestehenden Formularen; Payload-Felder (Name, Telefon/E-Mail, Leistung, Häufigkeit, Ort, Nachricht, Quelle „gebaeudereinigung“) mit Make-Szenario abstimmen.
- [ ] Erfolgs-/Fehler-Toasts wie auf bestehenden Seiten; Conversion nur bei Erfolg.
- [ ] Testanfrage end-to-end bis Telegram prüfen.
- [ ] WhatsApp-/Telefon-CTAs: bestehenden Link/Nummer unverändert verwenden.

### Tracking (nur nach Cookie-Einwilligung, über `src/lib/consent.ts` / `meta-pixel.ts`)
- [ ] Google-Ads-Conversion für erfolgreiche Anfrage, WhatsApp- und Anrufklicks.
- [ ] Meta-Pixel-Events (Lead/Contact) analog zu bestehenden Seiten.
- [ ] Prüfen, dass ohne Einwilligung nichts geladen wird.

### SEO
- [ ] `noindex, nofollow` entfernen.
- [ ] Canonical `https://reinwerk-service.de/gebaeudereinigung` setzen.
- [ ] Title/Description final; OG-Tags (title, description, url).
- [ ] JSON-LD: Service (Provider-@id `https://reinwerk-service.de/#organization`, areaServed bestätigt) + BreadcrumbList; FAQPage optional.
- [ ] In `public/sitemap.xml` aufnehmen.

### Navigation & interne Links
- [ ] Platzierung in Navigation/Mobilmenü/Footer mit Betreiber abstimmen und einfügen.
- [ ] Interne Links von passenden Seiten (z. B. Startseite, Gewerbe) ergänzen.
- [ ] Keine Links auf noch nicht existierende `plannedPath`-Seiten.

### Rechtliches
- [ ] Datenschutzerklärung deckt Formular/Empfänger ab (Make.com, Telegram).

### Abschluss
- [ ] Mobil/Desktop prüfen, Build fehlerfrei, Security-Scan, dann ausdrücklich freigegebene Veröffentlichung.

## Änderungsprotokoll
- 2026-11-28: Checkliste angelegt. Zugriff über Host-Allowlist (`draftAccess.ts`) statt nur DEV, damit Preview zuverlässig funktioniert.
- 2026-11-28: Ursache der sporadischen 404 in der Vorschau: gebaute Vorschau hat DEV=false; Host-Allowlist ergänzt um Entwurfs-Vorschauen `id-preview-N--`. Schutz, noindex/nofollow und Testmodus unverändert.
- 2026-11-28: Allowlist um `preview--*.lovable.app` erweitert. Gehostete Vorschau erfordert Lovable-Login und konnte nicht automatisiert geprüft werden; lokale Reload-Tests OK.
- 2026-11-28: Hero-Bild durch das echte ReinWerk-Foto ersetzt (`src/assets/gebaeudereinigung/hero_reinwerk.jpg.asset.json`, CDN). Das generierte Hero-Asset `hero.webp.asset.json` ist nicht mehr eingebunden (CDN-Objekt bewusst nicht gelöscht). Mobile: Foto jetzt als Band in voller Breite unter dem Text (`h-60`), ab `md` wie bisher rechts im Zweispalter; Ausschnitt `md:object-[58%_center]`, ab `xl` `object-[46%_center]`. „Beispielbild"-Badge im Hero entfernt, Alt-Text angepasst. Sonstige Inhalte, Formular-Testmodus, noindex/nofollow und Routing unverändert.
- 2026-11-28: Hero im Stil der Startseite neu gestaltet: Vollbild-Foto mit dunklem Verlauf, transparenter Header, weiße H1 mit „für Privat & Gewerbe" in Markenblau, Buttons „Kostenloses Angebot erhalten" (scrollt zum Testformular) und „WhatsApp schreiben" (direkter wa.me-Link, **ohne Tracking** – beim Launch Kontakt-Tracking wie auf der Startseite ergänzen). Vier Vorteile direkt im Hero; separate hellblaue Vorteilsleiste entfernt. Entwurfshinweis als Badge im Hero. Schutz, noindex/nofollow und Testmodus unverändert.
- 2026-11-28: Header verhält sich auf `/gebaeudereinigung` wie auf der Startseite (transparent-dunkel über dem Hero, weiß nach Scroll/offenem Mobilmenü) – über `hasHomeStyleHero` in `Header.tsx`, andere Seiten unverändert.
