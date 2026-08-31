// Alle Inhalte verbatim aus dem qoob8-Briefing / Design-Handoff.
// Medizinische Formulierungen vor Veroeffentlichung fachaerztlich und
// rechtlich pruefen lassen.

export type HealthItem = { k: string; label: string; text: string };
export type TodayItem = { label: string; text: string };
export type PrepItem = { k: string; label: string; text: string };
export type QuizItem = {
  q: string;
  opts: [string, string][];
  right: "A" | "B" | "C";
  ok: string;
  no: string;
};

export const HEALTH: HealthItem[] = [
  {
    k: "herz",
    label: "Herz und Kreislauf",
    text: "Bei Herz-Kreislauf-Erkrankungen, Bluthochdruck, Herzrhythmusstörungen oder anderen kardiologischen Vorerkrankungen solltest Du vor dem Eisbaden ärztlichen Rat einholen.",
  },
  {
    k: "schwanger",
    label: "Schwangerschaft",
    text: "Der extreme Temperaturwechsel belastet Kreislauf und Stoffwechsel. Kläre die Anwendung während der Schwangerschaft immer vorab medizinisch ab.",
  },
  {
    k: "durchblutung",
    label: "Durchblutung und Kälteempfinden",
    text: "Bei Gefäßerkrankungen, starken Durchblutungsstörungen oder einem beeinträchtigten Kälteempfinden sollte Kälteexposition vorher medizinisch abgeklärt werden.",
  },
  {
    k: "epilepsie",
    label: "Epilepsie",
    text: "Wenn Du Epilepsie hast oder zu Krampfanfällen neigst, solltest Du vor dem Eisbaden unbedingt ärztlichen Rat einholen.",
  },
  {
    k: "op",
    label: "Operationen und offene Wunden",
    text: "Nach Operationen oder bei offenen Wunden solltest Du erst nach vollständiger Heilung und ärztlicher Freigabe ins Eisbad gehen.",
  },
  {
    k: "medikamente",
    label: "Medikamente",
    text: "Sedierende, blutdrucksenkende oder andere kreislaufwirksame Medikamente können Deine Wahrnehmung und körperliche Reaktion verändern. Kläre mögliche Risiken ärztlich ab.",
  },
  {
    k: "erschoepfung",
    label: "Erschöpfung",
    text: "Bei starker körperlicher oder mentaler Erschöpfung kann der zusätzliche Kältereiz Deinen Körper überfordern.",
  },
  {
    k: "u18",
    label: "Unter 18",
    text: "Personen unter 18 Jahren sollten nur mit Zustimmung einer erziehungsberechtigten Person und nach ärztlicher Rücksprache eisbaden.",
  },
];

export const TODAY: TodayItem[] = [
  {
    label: "Infektion oder Fieber",
    text: "Wenn Dein Körper bereits gegen einen Infekt arbeitet, solltest Du auf den zusätzlichen Kältereiz verzichten.",
  },
  {
    label: "Alkohol",
    text: "Alkohol verändert Wahrnehmung, Reaktionsfähigkeit und Kreislauf. Gehe nach Alkoholkonsum nicht ins Eisbad.",
  },
  {
    label: "Starke Erschöpfung",
    text: "Wenn Du körperlich oder mental stark erschöpft bist, verschiebe Dein Eisbad.",
  },
  {
    label: "Extreme Hitze",
    text: "Nach einer Sauna, intensiver Hitze oder an sehr heißen Tagen kann der abrupte Temperaturwechsel Deinen Kreislauf zusätzlich belasten. Gehe besonders behutsam vor und gib Deinem Körper Zeit.",
  },
];

export const PREP: PrepItem[] = [
  {
    k: "allein",
    label: "Nicht allein",
    text: "Eine zweite Person weiß Bescheid und bleibt in der Nähe.",
  },
  {
    k: "ausstieg",
    label: "Sicherer Ausstieg",
    text: "Der Weg aus dem Becken ist frei, stabil und rutschfest.",
  },
  {
    k: "bereit",
    label: "Alles bereit",
    text: "Timer, Handtuch, trockene Kleidung und ein warmes Getränk liegen bereit.",
  },
  {
    k: "temp",
    label: "Temperatur bekannt",
    text: "Du kennst die Wassertemperatur und versuchst nicht, einen Rekord aufzustellen.",
  },
];

export const ENTRY_STEPS = [
  "Füße und Beine zuerst.",
  "Langsam bis zum Oberkörper absenken.",
  "Kopf und Atemwege bleiben über Wasser.",
];

// Ein einziger roter Hinweis (frueher drei einzelne Merksaetze).
export const ENTRY_WARN =
  "Springe nicht hinein. Keine Hyperventilation und kein Luftanhalten vor oder im Wasser.";

// Ruhiger Leitgedanke, bewusst schlicht gehalten (kein zweites Farbelement).
export const ENTRY_CALM =
  "Es geht nicht darum, etwas auszuhalten. Es geht darum, die Kontrolle zu behalten.";

export const BODY_LINES = [
  "Deine Atmung beschleunigt sich.",
  "Herzfrequenz und Blutdruck können steigen.",
  "Dein Körper gerät kurzfristig unter Stress.",
  "Wahrnehmung und Bewegungen können unsicherer werden.",
];

export const DURING_CALM = [
  "ruhige, kontrollierbare Atmung",
  "klarer Kopf",
  "sicherer Stand oder Sitz",
  "Begleitperson in der Nähe",
];

export const DURING_WARN = [
  "starkes Unwohlsein",
  "Brustschmerz oder Druckgefühl",
  "Atemnot oder unkontrollierbare Atmung",
  "Schwindel oder Benommenheit",
  "Sehstörungen",
  "Taubheitsgefühl",
  "Verwirrtheit",
  "Koordinationsprobleme",
  "auffälliges Herzrasen oder unregelmäßiger Herzschlag",
];

export const AFTER_STEPS = [
  "Sorgfältig abtrocknen.",
  "Trockene und warme Kleidung anziehen.",
  "Sanft bewegen und langsam aufwärmen.",
  "Erst weitergehen oder losfahren, wenn Du Dich wieder vollständig klar und sicher fühlst.",
];

export const QUIZ: QuizItem[] = [
  {
    q: "Wann solltest Du vor dem Eisbaden ärztlichen Rat einholen?",
    opts: [
      ["A", "Nur wenn Du älter als 60 bist"],
      ["B", "Bei gesundheitlichen Vorerkrankungen, relevanten Medikamenten oder Unsicherheit"],
      ["C", "Erst wenn während des Eisbads Beschwerden auftreten"],
    ],
    right: "B",
    ok: "Genau. Im Zweifel gilt immer: erst medizinisch abklären, dann ins Eis.",
    no: "Noch nicht ganz. Gesundheitliche Risiken sollten vor dem ersten Eisbad geklärt werden.",
  },
  {
    q: "Was ist beim Einstieg richtig?",
    opts: [
      ["A", "Schnell eintauchen und die Luft anhalten"],
      ["B", "Langsam einsteigen, den Kopf über Wasser halten und ruhig ausatmen"],
      ["C", "Möglichst lange durchhalten"],
    ],
    right: "B",
    ok: "Richtig. Ein kontrollierter Einstieg hilft Dir, mit der unmittelbaren Kältereaktion umzugehen.",
    no: "Fast. Steige langsam ein, halte Deinen Kopf über Wasser und atme kontrolliert.",
  },
  {
    q: "Was tust Du bei Schwindel, Atemnot oder Brustschmerz?",
    opts: [
      ["A", "Die restliche Zeit durchhalten"],
      ["B", "Kurz den Kopf untertauchen"],
      ["C", "Sofort kontrolliert aussteigen und Hilfe holen"],
    ],
    right: "C",
    ok: "Richtig. Warnsignale sind immer wichtiger als der Timer.",
    no: "Ein Warnsignal ist kein Trainingsreiz. Steige sofort kontrolliert aus und hole Hilfe.",
  },
];

// Sichtbarer Domain-Name (Kundenwahl): Eisbad.de
export const BRAND_DOMAIN = "Eisbad.de";

// ============================================================
// Inhalte der PDF-Teilnahmebestaetigung (Zertifikat)
// ============================================================
export const CERT = {
  kicker: "Teilnahmebestätigung",
  intro:
    "hat den Eisklar-Guide für einen sicheren Einstieg ins Eisbaden vollständig durchlaufen und den Kurzcheck zu Vorbereitung, kontrolliertem Einstieg und Warnsignalen bestanden.",
  blockTitle: "Das Wichtigste auf einen Blick",
  practiceLabel: "Vor und während der Anwendung",
  practice: [
    "Nie allein baden. Sicherer, rutschfester Ausstieg ist frei.",
    "Timer, Handtuch, trockene Kleidung und ein warmes Getränk bereitlegen.",
    "Nicht hineinspringen. Keine Hyperventilation, kein Luftanhalten.",
    "Je kälter das Wasser, desto kürzer die Anwendung. Der Timer ist eine Obergrenze, kein Ziel.",
    "Danach abtrocknen, warm anziehen, sanft bewegen und erst weitergehen, wenn Du wieder klar und sicher bist.",
  ],
  practiceNote:
    "Es geht nicht darum, etwas auszuhalten. Es geht darum, die Kontrolle zu behalten.",
  healthLabel: "Gesundheitliche Hinweise",
  health: [
    {
      title: "Vorher ärztlich abklären bei",
      text: "Herz-Kreislauf-Erkrankungen, Bluthochdruck, Herzrhythmusstörungen · Schwangerschaft · Gefäßerkrankungen, Durchblutungsstörungen, beeinträchtigtem Kälteempfinden · Epilepsie oder Neigung zu Krampfanfällen · frischen Operationen oder offenen Wunden · kreislaufwirksamen oder sedierenden Medikamenten · Alter unter 18 Jahren (nur mit Zustimmung der Erziehungsberechtigten)",
    },
    {
      title: "Heute kein Eisbad bei",
      text: "Infektion oder Fieber · Alkoholkonsum · starker körperlicher oder mentaler Erschöpfung · unmittelbar nach Sauna oder extremer Hitze",
    },
    {
      title: "Sofort aussteigen bei",
      text: "Brustschmerz oder Druckgefühl · Atemnot oder unkontrollierbarer Atmung · Schwindel, Benommenheit oder Verwirrtheit · Sehstörungen · Taubheitsgefühl · Koordinationsproblemen · auffälligem Herzrasen oder unregelmäßigem Herzschlag",
    },
  ],
  footerBrandTitle: "Powered by qoob8",
  footerBrandText:
    "qoob8 entwickelt Eisbäder und Kälteanwendungen für den täglichen Gebrauch, mit Fokus auf durchdachte Technik, klares Design und einen sicheren Umgang mit Kälte. Eisklar ist eine Initiative von qoob8 auf Eisbad.de.",
  footerNoteLabel: "Hinweis",
  footerNoteText:
    "Diese Bestätigung dokumentiert die Teilnahme an einem Informationsangebot. Sie ist keine medizinische Freigabe, keine Diagnose und keine Bestätigung der individuellen Eignung zum Eisbaden. Bei Beschwerden oder Unsicherheit ist ärztlicher Rat einzuholen.",
} as const;

export const SOURCES = [
  {
    label: "American Heart Association",
    url: "https://www.heart.org/en/news/2022/12/09/youre-not-a-polar-bear-the-plunge-into-cold-water-comes-with-risks",
  },
  {
    label: "British Heart Foundation",
    url: "https://www.bhf.org.uk/informationsupport/heart-matters-magazine/activity/cold-water-swimming",
  },
  {
    label: "RNLI - Cold Water Shock",
    url: "https://rnli.org/water-safety/know-the-risks/cold-water-shock",
  },
];

// Reihenfolge der 12 Schritte (Index 0-11). Fortschritt = step / 11.
export const STEPS = [
  "intro",
  "health",
  "today",
  "body",
  "prep",
  "entry",
  "during",
  "after",
  "q1",
  "q2",
  "q3",
  "done",
] as const;

export type StepName = (typeof STEPS)[number];
