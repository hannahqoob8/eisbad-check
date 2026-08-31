// Sprachneutrale Struktur- und Referenzdaten.
// Der komplette sichtbare Text (DE + EN) liegt in lib/i18n.tsx.

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

// Sichtbarer Domain-Name (Kundenwahl): Eisbad.de
export const BRAND_DOMAIN = "Eisbad.de";

// Orientierungsquellen - Organisationsnamen, sprachneutral.
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
