import { STEPS } from "./content";

export type Risk = "none" | "risk" | null;
export type Today = "fit" | "stop" | null;

export type EisklarState = {
  step: number; // 0..11
  open: string | null; // offener Gesundheits-Chip (key)
  risk: Risk;
  today: Today;
  prep: Record<string, boolean>; // allein | ausstieg | bereit | temp
  answers: Record<number, "A" | "B" | "C">; // Quizindex -> gewaehlter Key
  drawer: boolean; // nicht persistieren
  menu: boolean; // globales Menue offen (nicht persistieren)
  saved: boolean; // Karte gespeichert (UI-Feedback)
};

export const STORAGE_KEY = "eisklar-progress-v1";

export const initialState: EisklarState = {
  step: 0,
  open: null,
  risk: null,
  today: null,
  prep: {},
  answers: {},
  drawer: false,
  menu: false,
  saved: false,
};

// Nur diese Felder werden lokal gespeichert. Keine Gesundheitsdaten an einen
// Server; alles bleibt im Browser des Nutzers.
export function loadState(): Partial<EisklarState> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...parsed, drawer: false, menu: false };
  } catch {
    return null;
  }
}

export function saveState(s: EisklarState): void {
  if (typeof window === "undefined") return;
  try {
    const { step, open, risk, today, prep, answers } = s;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ step, open, risk, today, prep, answers })
    );
  } catch {
    /* ignore */
  }
}

export const lastStep = STEPS.length - 1;

export function clampStep(n: number): number {
  return Math.min(lastStep, Math.max(0, n));
}
