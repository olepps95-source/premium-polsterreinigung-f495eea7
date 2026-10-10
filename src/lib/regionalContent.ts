import type { CityKey, ServiceKey } from './regionalPages';

/**
 * Stadtspezifische Texte je Leistung. Stadtteile und Orte sind nur Einsatzgebiet,
 * keine Standorte oder Referenzen. Keine garantierten Ergebnisse oder Zeiten.
 */
export interface LocalContent {
  intro: string;
  sections: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export const localContent: Record<ServiceKey, Record<CityKey, LocalContent>> = {
  polster: {
    chemnitz: {
      intro:
        'Sie suchen eine Polsterreinigung in Chemnitz? Von unserem Firmensitz in Chemnitz aus kommen wir direkt zu Ihnen nach Hause und reinigen Sofa, Ecksofa oder Sessel dort, wo sie stehen. Sie müssen nichts abholen lassen und nichts tragen.',
      sections: [
        {
          title: 'Sofareinigung in Chemnitz – kurze Wege vom Firmensitz',
          text: 'Weil wir in Chemnitz ansässig sind, lassen sich Termine im Stadtgebiet meist unkompliziert abstimmen. Ob Mietwohnung, Einfamilienhaus oder Ferienwohnung: Wir bringen unsere Geräte mit und brauchen vor Ort nur einen Stromanschluss.',
        },
        {
          title: 'Auch im Chemnitzer Umland für Sie da',
          text: 'Viele Anfragen kommen aus dem Umland, etwa aus Limbach-Oberfrohna, Burgstädt oder Flöha. Auch nach Frankenberg, Hohenstein-Ernstthal, Glauchau und Zwickau fahren wir – die Anfahrt ist dabei grundsätzlich kostenlos.',
        },
      ],
      faqs: [
        { q: 'Reinigen Sie auch außerhalb des Chemnitzer Stadtgebiets?', a: 'Ja, unter anderem in Limbach-Oberfrohna, Burgstädt, Frankenberg, Flöha, Hohenstein-Ernstthal, Glauchau und Zwickau. Für andere Orte fragen Sie einfach kurz an.' },
        { q: 'Welche Angaben brauchen Sie für ein Angebot in Chemnitz?', a: 'Ein Foto vom Möbelstück, die ungefähre Größe (z. B. Dreisitzer oder Ecksofa) und Ihren Ort reichen in der Regel aus. Den Preis nennen wir Ihnen dann vorab.' },
      ],
    },
    dresden: {
      intro:
        'Für die Polsterreinigung in Dresden kommen wir mobil zu Ihnen – ob in die Altbauwohnung in Striesen, die Wohnung in der Neustadt oder das Haus in Blasewitz. Ihr Sofa wird direkt bei Ihnen gereinigt, ein Transport ist normalerweise nicht nötig.',
      sections: [
        {
          title: 'Sofareinigung in Dresden ohne Möbeltransport',
          text: 'Gerade in Altbauten mit engen Treppenhäusern ist der Transport eines großen Sofas mühsam. Wir reinigen deshalb vor Ort: gründlich absaugen, Flecken vorbehandeln, mit geeigneten Mitteln reinigen, mit klarem Wasser spülen und absaugen, danach neutralisieren.',
        },
        {
          title: 'Mobil in Dresden und Umgebung – ohne Niederlassung vor Ort',
          text: 'Wir haben keine Niederlassung in Dresden, sondern planen Termine von unserem Sitz in Chemnitz aus. Neben Stadtteilen wie Pieschen, Löbtau oder Plauen fahren wir auch nach Radebeul, Freital, Pirna, Heidenau, Coswig, Radeberg und Meißen.',
        },
      ],
      faqs: [
        { q: 'Wie vereinbare ich einen Termin für die Polsterreinigung in Dresden?', a: 'Am einfachsten per WhatsApp mit einem Foto Ihres Sofas. Wir nennen Ihnen den Preis und schlagen einen Termin vor, an dem wir in Dresden bzw. Ihrer Umgebung unterwegs sind.' },
        { q: 'Kommen Sie auch in Dresdner Nachbarorte?', a: 'Ja, zum Beispiel nach Radebeul, Freital, Pirna, Heidenau, Coswig, Radeberg und Meißen.' },
      ],
    },
    leipzig: {
      intro:
        'Polsterreinigung in Leipzig direkt bei Ihnen zu Hause: Ob Wohnung in Gohlis, Schleußig oder der Südvorstadt – wir reinigen Sofa, Sessel und Ecksofa vor Ort, sodass Ihre Möbel in der Regel nicht transportiert werden müssen.',
      sections: [
        {
          title: 'Sofareinigung in Leipzig – gründlich und schonend',
          text: 'Haustiere, Kinder oder einfach viele gemütliche Abende hinterlassen Spuren. Wir saugen das Polster gründlich ab, behandeln Flecken vor, reinigen mit geeigneten Mitteln, spülen und extrahieren den Schmutz und neutralisieren den Stoff zum Schluss. Eine kostenlose Express-Trocknung beschleunigt das Trocknen.',
        },
        {
          title: 'Unterwegs in Leipzig und im Umland',
          text: 'Eine Niederlassung in Leipzig haben wir nicht – wir kommen mobil zu Ihnen, etwa nach Plagwitz, Reudnitz oder Connewitz. Auch Markkleeberg, Taucha, Markranstädt, Schkeuditz, Borsdorf, Delitzsch und Grimma gehören zu unserem Einsatzgebiet.',
        },
      ],
      faqs: [
        { q: 'Ist das Sofa nach der Reinigung sofort wieder nutzbar?', a: 'Das hängt von Stoff, Verschmutzung und Raumklima ab. Die kostenlose Express-Trocknung beschleunigt das Trocknen, eine feste Zeit können wir aber nicht zusagen.' },
        { q: 'Reinigen Sie auch in Markkleeberg oder Taucha?', a: 'Ja, ebenso in Markranstädt, Schkeuditz, Borsdorf, Delitzsch und Grimma.' },
      ],
    },
  },
  fenster: {
    chemnitz: {
      intro:
        'Fensterreinigung in Chemnitz für Wohnungen, Einfamilienhäuser und geeignete Geschäftsräume: Wir reinigen Ihre Glasflächen sorgfältig vor Ort. Da unser Firmensitz in Chemnitz liegt, sind wir im Stadtgebiet schnell bei Ihnen.',
      sections: [
        {
          title: 'Angebot nach Glasfläche und Umfang',
          text: 'Jedes Haus ist anders: Anzahl und Größe der Fenster, Sprossen, Erreichbarkeit und der gewünschte Umfang bestimmen den Aufwand. Schicken Sie uns ein paar Fotos – danach erhalten Sie ein Angebot mit festem Preis. Rahmen reinigen wir, wenn das im Angebot so vereinbart ist.',
        },
        {
          title: 'Für Haushalte und Geschäfte rund um Chemnitz',
          text: 'Neben Chemnitz kommen wir auch nach Burgstädt, Frankenberg, Flöha oder Limbach-Oberfrohna sowie nach Hohenstein-Ernstthal, Glauchau und Zwickau. Für kleine Ladengeschäfte reinigen wir auch Schaufenster.',
        },
      ],
      faqs: [
        { q: 'Welche Fotos brauchen Sie für ein Angebot in Chemnitz?', a: 'Am besten je ein Foto pro Fenstertyp sowie einen Hinweis auf schwer erreichbare Flächen. So können wir den Aufwand realistisch einschätzen.' },
        { q: 'Reinigen Sie auch hoch gelegene Fenster?', a: 'Das hängt von Höhe und Zugänglichkeit ab. Schwer erreichbare Glasflächen prüfen wir vorab anhand von Fotos und sagen Ihnen ehrlich, ob wir sie übernehmen können.' },
      ],
    },
    dresden: {
      intro:
        'Für die Fensterreinigung in Dresden kommen wir zu Ihnen – zum Beispiel in eine Gründerzeitwohnung in Striesen, ein Haus in Blasewitz oder eine Wohnung in Löbtau. Wir reinigen Fenster und Glasflächen gründlich und streifenarm.',
      sections: [
        {
          title: 'Hohe Altbaufenster und Sprossen',
          text: 'Viele Dresdner Wohnungen haben hohe Fenster, Kastenfenster oder Sprossen. Das erhöht den Aufwand. Deshalb erstellen wir das Angebot nach Ihren Fotos – abhängig von Glasfläche, Erreichbarkeit und gewünschtem Umfang.',
        },
        {
          title: 'Mobil in Dresden und Umgebung',
          text: 'Wir haben keine Niederlassung in Dresden und planen die Termine von Chemnitz aus. Neben der Neustadt, Pieschen oder Plauen fahren wir auch nach Radebeul, Coswig, Freital, Heidenau, Pirna, Radeberg und Meißen.',
        },
      ],
      faqs: [
        { q: 'Reinigen Sie auch Kastenfenster in Dresdner Altbauten?', a: 'Ja, grundsätzlich schon. Da Kastenfenster mehr Glasflächen haben, berücksichtigen wir das im Angebot. Schicken Sie uns dafür bitte Fotos.' },
        { q: 'Wie wird ein Termin in Dresden vereinbart?', a: 'Nach Ihrem Angebot stimmen wir einen Termin ab, an dem wir in Dresden bzw. Ihrer Umgebung unterwegs sind. Für die Innenreinigung ist Ihre Anwesenheit nötig.' },
      ],
    },
    leipzig: {
      intro:
        'Fensterreinigung in Leipzig für Privathaushalte und geeignete gewerbliche Objekte: Ob Wohnung in Gohlis, Altbau in der Südvorstadt oder kleines Geschäft in Plagwitz – wir sorgen für saubere Glasflächen und mehr Licht in Ihren Räumen.',
      sections: [
        {
          title: 'Fenster in Wohnung, Haus und Laden',
          text: 'Wir reinigen Fenster in Wohnungen und Einfamilienhäusern sowie Glasflächen von kleineren Büros und Läden. Der Preis richtet sich nach Glasfläche, Erreichbarkeit und Umfang; Rahmen reinigen wir, wenn sie Teil des Angebots sind.',
        },
        {
          title: 'In Leipzig und im Umland unterwegs',
          text: 'Wir haben keine Niederlassung in Leipzig, kommen aber mobil zu Ihnen – etwa nach Schleußig, Reudnitz oder Connewitz. Auch Markkleeberg, Taucha, Markranstädt, Schkeuditz, Borsdorf, Delitzsch und Grimma gehören dazu.',
        },
      ],
      faqs: [
        { q: 'Reinigen Sie auch Schaufenster in Leipzig?', a: 'Ja, Schaufenster und Glasfronten kleinerer Geschäfte reinigen wir nach Absprache. Den Umfang klären wir vorab im Angebot.' },
        { q: 'Muss ich bei der Fensterreinigung anwesend sein?', a: 'Für die Innenreinigung ja. Ob eine reine Außenreinigung ohne Ihre Anwesenheit möglich ist, klären wir im Einzelfall vorab.' },
      ],
    },
  },
  teppich: {
    chemnitz: {
      intro:
        'Teppichbodenreinigung in Chemnitz direkt vor Ort: Wir reinigen fest verlegte Teppichböden in Wohnräumen, Büros und geeigneten gewerblichen Flächen. Von unserem Firmensitz in Chemnitz aus sind wir im Stadtgebiet und im Umland unterwegs.',
      sections: [
        {
          title: 'Fest verlegter Teppichboden – keine losen Teppiche',
          text: 'Wir reinigen ausschließlich fest verlegten Teppichboden direkt in Ihren Räumen. Lose Teppiche zum Mitnehmen gehören nicht zu unserem Angebot. Die Tiefenreinigung im Sprühextraktionsverfahren löst alltäglichen Schmutz und Laufspuren aus den Fasern.',
        },
        {
          title: 'Für Wohnung und Büro rund um Chemnitz',
          text: 'Ob vor einer Wohnungsübergabe oder im Büro mit viel Laufverkehr: Wir kommen auch nach Limbach-Oberfrohna, Burgstädt, Frankenberg, Flöha, Hohenstein-Ernstthal, Glauchau und Zwickau.',
        },
      ],
      faqs: [
        { q: 'Was brauchen Sie für ein Angebot in Chemnitz?', a: 'Die ungefähre Fläche in m², ein paar Fotos vom Teppichboden und den Ort. Der Preis beginnt bei 8 € pro m² und richtet sich nach Fläche und Verschmutzung.' },
        { q: 'Werden alle Flecken entfernt?', a: 'Viele Verschmutzungen lassen sich deutlich reduzieren. Bei alten oder eingetrockneten Flecken können wir kein vollständiges Ergebnis garantieren.' },
      ],
    },
    dresden: {
      intro:
        'Für die Teppichbodenreinigung in Dresden kommen wir mobil zu Ihnen – in Wohnungen in Striesen oder Pieschen ebenso wie in Büros in der Neustadt. Wir reinigen fest verlegten Teppichboden gründlich direkt vor Ort.',
      sections: [
        {
          title: 'Tiefenreinigung für stark genutzte Flächen',
          text: 'Flure, Treppen und Durchgangszimmer haben oft deutliche Laufspuren. Wir saugen vor, behandeln Flecken und reinigen den Teppichboden im Sprühextraktionsverfahren. Lose Teppiche reinigen wir nicht.',
        },
        {
          title: 'Dresden und Umgebung – ohne Niederlassung vor Ort',
          text: 'Wir haben keine Niederlassung in Dresden und planen Termine von Chemnitz aus. Neben Stadtteilen wie Blasewitz, Löbtau oder Plauen sind wir auch in Freital, Radebeul, Coswig, Heidenau, Pirna, Radeberg und Meißen unterwegs.',
        },
      ],
      faqs: [
        { q: 'Reinigen Sie auch Teppichböden in Dresdner Büros?', a: 'Ja, auch in Büros und anderen geeigneten Gewerbeflächen. Größe der Fläche und Termin stimmen wir individuell ab.' },
        { q: 'Reinigen Sie auch lose Teppiche?', a: 'Nein, wir reinigen ausschließlich fest verlegten Teppichboden direkt vor Ort.' },
      ],
    },
    leipzig: {
      intro:
        'Teppichbodenreinigung in Leipzig: Ob Mietwohnung in Reudnitz vor der Übergabe, Altbau in Gohlis oder Büro in Plagwitz – wir reinigen fest verlegte Teppichböden gründlich vor Ort und zu einem vorab vereinbarten Preis.',
      sections: [
        {
          title: 'Vor dem Auszug oder für mehr Frische im Alltag',
          text: 'Eine gründliche Reinigung kann Laufspuren und alltägliche Verschmutzungen sichtbar reduzieren. Gerade vor einer Wohnungsübergabe lohnt sich das. Eine vollständige Fleckenentfernung können wir nicht garantieren.',
        },
        {
          title: 'In Leipzig und Umgebung',
          text: 'Wir haben keine Niederlassung in Leipzig, kommen aber mobil zu Ihnen, etwa nach Schleußig, die Südvorstadt oder Connewitz. Auch Markkleeberg, Taucha, Markranstädt, Schkeuditz, Borsdorf, Delitzsch und Grimma gehören zu unserem Einsatzgebiet.',
        },
      ],
      faqs: [
        { q: 'Lohnt sich eine Teppichbodenreinigung vor der Wohnungsübergabe in Leipzig?', a: 'Oft ja, weil sich Laufspuren und Alltagsschmutz deutlich reduzieren lassen. Ob ein bestimmter Fleck vollständig verschwindet, können wir vorab nicht garantieren.' },
        { q: 'Wie berechnet sich der Preis?', a: 'Ab 8 € pro m², abhängig von Fläche, Verschmutzung und Aufwand. Den genauen Preis nennen wir Ihnen vorab.' },
      ],
    },
  },
  gewerbe: {
    chemnitz: {
      intro:
        'Gewerbereinigung in Chemnitz für Büros, Praxen und andere Unternehmen: Wir reinigen Teppichböden, Bürostühle, Polstermöbel und weitere textile Oberflächen direkt in Ihren Räumen – von unserem Firmensitz in Chemnitz aus.',
      sections: [
        {
          title: 'Leistungsumfang nach Ihrem Bedarf',
          text: 'Ob Wartezimmer-Sofas einer Praxis, Bürostühle im Großraumbüro oder Teppichboden im Besprechungsraum: Umfang, Termin und Preis stimmen wir individuell mit Ihnen ab. Sie erhalten vorab ein festes Angebot.',
        },
        {
          title: 'Für Unternehmen in Chemnitz und Umgebung',
          text: 'Neben Chemnitz betreuen wir auch Betriebe in Limbach-Oberfrohna, Burgstädt, Frankenberg, Flöha, Hohenstein-Ernstthal, Glauchau und Zwickau.',
        },
      ],
      faqs: [
        { q: 'Welche Angaben brauchen Sie für ein Angebot?', a: 'Art des Objekts, ungefähre Teppichfläche, Anzahl der Stühle oder Polstermöbel und Fotos. Daraus erstellen wir ein individuelles Angebot.' },
        { q: 'Bieten Sie Unterhaltsreinigung an?', a: 'Wir sind auf die Reinigung von Textilien, Polstern und Böden spezialisiert. Eine regelmäßige Unterhaltsreinigung sagen wir nicht pauschal zu – fragen Sie gern nach Ihrem konkreten Bedarf.' },
      ],
    },
    dresden: {
      intro:
        'Gewerbereinigung in Dresden: Für Büros, Praxen und andere Unternehmen reinigen wir Bürostühle, Polstermöbel und Teppichböden direkt vor Ort – ob in der Neustadt, in Pieschen oder in Löbtau.',
      sections: [
        {
          title: 'Bürostühle und textile Flächen',
          text: 'Bürostühle, Sitzgruppen und Teppichböden werden täglich genutzt. Wir reinigen sie gründlich im Sprühextraktionsverfahren. Wie viele Stühle oder Quadratmeter es sind und wann gereinigt werden soll, klären wir vorab gemeinsam.',
        },
        {
          title: 'Dresden und Umgebung – Termine aus Chemnitz geplant',
          text: 'Wir haben keine Niederlassung in Dresden. Gewerbliche Termine in Dresden sowie in Radebeul, Freital, Pirna, Heidenau, Coswig, Radeberg oder Meißen planen wir von Chemnitz aus.',
        },
      ],
      faqs: [
        { q: 'Was gilt bei größeren Gewerbeflächen in Dresden?', a: 'Bei größeren Flächen besichtigen wir das Objekt nach Absprache oder lassen uns Fotos und Grundrisse schicken. Danach erhalten Sie ein individuelles Angebot.' },
        { q: 'Können Sie außerhalb unserer Öffnungszeiten reinigen?', a: 'Das klären wir im Einzelfall. Eine pauschale Zusage für Abend- oder Wochenendtermine geben wir nicht.' },
      ],
    },
    leipzig: {
      intro:
        'Gewerbereinigung in Leipzig für Büros, Praxen und weitere gewerbliche Auftraggeber: Wir reinigen Polstermöbel, Bürostühle und Teppichböden direkt in Ihren Räumen – zum Beispiel in Plagwitz, Gohlis oder der Südvorstadt.',
      sections: [
        {
          title: 'Saubere Sitzmöbel für Wartebereiche und Büros',
          text: 'In Praxen, Kanzleien und Agenturen fallen verschmutzte Sitzmöbel schnell auf. Wir reinigen Wartezimmer-Sofas, Bürostühle und Lounge-Sessel sowie Teppichböden. Leistungsumfang, Termin und Preis legen wir gemeinsam fest.',
        },
        {
          title: 'Leipzig und Umland',
          text: 'Wir haben keine Niederlassung in Leipzig und kommen mobil zu Ihnen. Neben Leipzig betreuen wir auch Unternehmen in Markkleeberg, Taucha, Markranstädt, Schkeuditz, Borsdorf, Delitzsch und Grimma.',
        },
      ],
      faqs: [
        { q: 'Reinigen Sie auch Wartezimmer-Möbel in Leipziger Praxen?', a: 'Ja, Polstermöbel und Stühle in Wartebereichen reinigen wir direkt vor Ort. Den Termin stimmen wir mit Ihrem Praxisablauf ab.' },
        { q: 'Wie läuft eine Anfrage für Leipzig ab?', a: 'Senden Sie uns Fotos und eine kurze Beschreibung per WhatsApp oder Formular. Sie erhalten ein Angebot, danach vereinbaren wir einen Termin.' },
      ],
    },
  },
};
