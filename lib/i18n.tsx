"use client";

// ============================================================
// Zweisprachigkeit (DE / EN)
// ------------------------------------------------------------
// Die komplette sichtbare Textebene liegt hier. Screens lesen den
// aktuellen Sprach-Datensatz ueber useT(); die Sprache wird lokal
// unter eisklar-lang-v1 gespeichert (keine Server-Anfrage).
// Medizinische Formulierungen vor Veroeffentlichung fachaerztlich
// und rechtlich pruefen lassen - in beiden Sprachen.
// ============================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  HealthItem,
  TodayItem,
  PrepItem,
  QuizItem,
} from "./content";

export type Lang = "de" | "en";

export const LANG_KEY = "eisklar-lang-v1";

type DoneVariant = {
  headline: string;
  text: string;
  achievement: string;
  achievementSub: string;
};

export type CertContent = {
  kicker: string;
  intro: string;
  blockTitle: string;
  practiceLabel: string;
  practice: string[];
  practiceNote: string;
  healthLabel: string;
  health: { title: string; text: string }[];
  footerBrandTitle: string;
  footerBrandText: string;
  footerNoteLabel: string;
  footerNoteText: string;
};

export type Strings = {
  htmlLang: string;

  HEALTH: HealthItem[];
  TODAY: TodayItem[];
  PREP: PrepItem[];
  ENTRY_STEPS: string[];
  ENTRY_WARN: string;
  ENTRY_CALM: string;
  BODY_LINES: string[];
  DURING_CALM: string[];
  DURING_WARN: string[];
  AFTER_STEPS: string[];
  QUIZ: QuizItem[];
  CERT: CertContent;

  header: { back: string; progress: string };

  menu: {
    label: string;
    sources: string;
    impressum: string;
    datenschutz: string;
    learnMore: string;
    shop: string;
    brand: string;
  };

  intro: {
    kicker: string;
    h1a: string;
    h1b: string;
    text: string;
    cta: string;
    initiative: string;
    switchLabel: string; // Text des Sprachumschalters (zeigt die ANDERE Sprache)
    switchFlag: string;
    switchAria: string;
  };

  health: {
    h2a: string;
    h2b: string;
    lead: string;
    flowQuestion: string;
    choiceNo: string;
    choiceYes: string;
    warnTitle: string;
    warnText: string;
    ctaNext: string;
    ctaAnyway: string;
  };

  today: {
    h2: string;
    flowQuestion: string;
    choiceNo: string;
    choiceYes: string;
    warnTitle: string;
    warnText: string;
    ctaNext: string;
  };

  body: {
    h2: string;
    lead: string;
    breath: [string, string, string];
    cta: string;
  };

  prep: { h2a: string; h2b: string; ok: string; cta: string };

  entry: { h2a: string; h2b: string; cta: string };

  during: {
    h2: string;
    calmLabel: string;
    warnLabel: string;
    cta: string;
  };

  after: { h2: string; lead: string; cta: string };

  quiz: {
    kicker: string;
    of: string; // "VON 3" / "OF 3"
    correct: string;
    wrong: string;
    ctaFinish: string;
    ctaNext: string;
  };

  done: {
    ready: DoneVariant;
    risk: DoneVariant;
    stop: DoneVariant;
    notMedicalRelease: string;
    downloadedLine: string;
    ctaDownload: string;
    poweredBy: string;
  };

  certDialog: {
    title: string;
    close: string;
    text: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    errName: string;
    errEmail: string;
    errPdf: string;
    ctaIdle: string;
    ctaBusy: string;
    fine1: string; // vor dem Link
    fineLink: string;
    fine2: string; // nach dem Link
    fallbackName: string;
    pdfFilename: string;
    dateLabel: string;
  };

  drawer: {
    title: string;
    close: string;
    block: [string, string, string];
    meta: [string, string, string];
    srcLabel: string;
    legalLabel: string;
    impressumLink: string;
    datenschutzLink: string;
    foot: string;
  };
};

// ---------------------------------------------------------------- DE

const de: Strings = {
  htmlLang: "de",

  HEALTH: [
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
  ],

  TODAY: [
    {
      label: "Infektion oder Fieber",
      text: "Bei einem laufenden Infekt keinen zusätzlichen Kältereiz.",
    },
    {
      label: "Alkohol",
      text: "Alkohol verändert Wahrnehmung und Kreislauf – danach nicht ins Eisbad.",
    },
    {
      label: "Starke Erschöpfung",
      text: "Bei körperlicher oder mentaler Erschöpfung das Eisbad verschieben.",
    },
    {
      label: "Extreme Hitze",
      text: "Nach Sauna oder an sehr heißen Tagen belastet der Temperaturwechsel den Kreislauf zusätzlich.",
    },
  ],

  PREP: [
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
  ],

  ENTRY_STEPS: [
    "Füße und Beine zuerst.",
    "Langsam bis zum Oberkörper absenken.",
    "Kopf und Atemwege bleiben über Wasser.",
  ],
  ENTRY_WARN:
    "Springe nicht hinein. Keine Hyperventilation und kein Luftanhalten vor oder im Wasser.",
  ENTRY_CALM:
    "Es geht nicht darum, etwas auszuhalten. Es geht darum, die Kontrolle zu behalten.",

  BODY_LINES: [
    "Deine Atmung beschleunigt sich.",
    "Herzfrequenz und Blutdruck können steigen.",
    "Dein Körper gerät kurzfristig unter Stress.",
    "Wahrnehmung und Bewegungen können unsicherer werden.",
  ],

  DURING_CALM: [
    "ruhige, kontrollierbare Atmung",
    "klarer Kopf",
    "sicherer Stand oder Sitz",
    "Begleitperson in der Nähe",
  ],
  DURING_WARN: [
    "starkes Unwohlsein",
    "Brustschmerz oder Druckgefühl",
    "Atemnot oder unkontrollierbare Atmung",
    "Schwindel oder Benommenheit",
    "Sehstörungen",
    "Taubheitsgefühl",
    "Verwirrtheit",
    "Koordinationsprobleme",
    "auffälliges Herzrasen oder unregelmäßiger Herzschlag",
  ],

  AFTER_STEPS: [
    "Sorgfältig abtrocknen.",
    "Trockene und warme Kleidung anziehen.",
    "Sanft bewegen und langsam aufwärmen.",
    "Erst weitergehen oder losfahren, wenn Du Dich wieder vollständig klar und sicher fühlst.",
  ],

  QUIZ: [
    {
      q: "Wann solltest Du vor dem Eisbaden ärztlichen Rat einholen?",
      opts: [
        ["A", "Nur wenn Du älter als 60 bist"],
        [
          "B",
          "Bei gesundheitlichen Vorerkrankungen, relevanten Medikamenten oder Unsicherheit",
        ],
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
        [
          "B",
          "Langsam einsteigen, den Kopf über Wasser halten und ruhig ausatmen",
        ],
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
  ],

  CERT: {
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
  },

  header: { back: "Zurück", progress: "Fortschritt" },

  menu: {
    label: "Menü",
    sources: "Quellen & medizinische Hinweise",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    learnMore: "Mehr über Eisbaden erfahren",
    shop: "Eisbad kaufen",
    brand: "Eine Initiative von qoob8",
  },

  intro: {
    kicker: "3 Minuten. Mehr braucht es nicht.",
    h1a: "Bereit fürs Eis?",
    h1b: "",
    text: "In 3 Minuten weißt Du, wie Du Dich vorbereitest, kontrolliert einsteigst und merkst, wann es Zeit ist, wieder rauszugehen.",
    cta: "Ich bin bereit",
    initiative: "Eine Initiative von qoob8",
    switchLabel: "English",
    switchFlag: "🇬🇧",
    switchAria: "Switch language to English",
  },

  health: {
    h2a: "Erst checken.",
    h2b: "Dann starten.",
    lead: "Bestimmte gesundheitliche Situationen solltest Du vor dem Eisbaden ärztlich abklären.",
    flowQuestion: "Trifft etwas davon auf Dich zu?",
    choiceNo: "Nein, nichts davon",
    choiceYes: "Ja oder unsicher",
    warnTitle: "Erst klären, dann starten.",
    warnText:
      "Du kannst den Guide weiter ansehen. Sprich vor Deinem ersten Eisbad aber bitte mit Deinem Arzt oder Deiner Ärztin.",
    ctaNext: "Weiter",
    ctaAnyway: "Guide trotzdem ansehen",
  },

  today: {
    h2: "Manchmal ist nicht heute der richtige Tag.",
    flowQuestion: "Trifft heute etwas davon auf Dich zu?",
    choiceNo: "Nein, nichts davon",
    choiceYes: "Ja oder unsicher",
    warnTitle: "Heute lieber pausieren.",
    warnText:
      "Du kannst den Guide abschließen, solltest heute aber kein Eisbad starten.",
    ctaNext: "Weiter",
  },

  body: {
    h2: "Die Kälte wirkt sofort.",
    lead: "Der erste Moment ist besonders intensiv. Steige langsam ein, halte den Kopf über Wasser und atme ruhig und lang aus.",
    breath: ["EINATMEN", "LÄNGER AUSATMEN", "RUHIG BLEIBEN"],
    cta: "Verstanden",
  },

  prep: {
    h2a: "Erst vorbereiten.",
    h2b: "Dann eintauchen.",
    ok: "Gut vorbereitet.",
    cta: "Weiter zum Einstieg",
  },

  entry: {
    h2a: "Langsam rein.",
    h2b: "Kopf oben.",
    cta: "Ich behalte die Kontrolle",
  },

  during: {
    h2: "Dein Körper entscheidet. Nicht der Timer.",
    calmLabel: "KONTROLLIERTER ZUSTAND",
    warnLabel: "SOFORT AUSSTEIGEN",
    cta: "Warnsignale verstanden",
  },

  after: {
    h2: "Draußen ist noch nicht vorbei.",
    lead: "Dein Körper kann nach dem Ausstieg noch weiter auskühlen. Plane deshalb ausreichend Zeit zum kontrollierten Aufwärmen ein.",
    cta: "Weiter zum Kurzcheck",
  },

  quiz: {
    kicker: "KURZCHECK · FRAGE",
    of: "VON 3",
    correct: "Richtig",
    wrong: "Noch einmal",
    ctaFinish: "Zum Abschluss",
    ctaNext: "Nächste Frage",
  },

  done: {
    ready: {
      headline: "Fertig! Du bist bereit für Dein Eisbad.",
      text: "Du kennst jetzt die wichtigsten Grundlagen für einen kontrollierten Einstieg ins Eisbaden.",
      achievement: "Eisbademeister",
      achievementSub: "Grundlagen abgeschlossen",
    },
    risk: {
      headline: "Fertig! Vorher noch ärztlich abklären.",
      text: "Du kennst jetzt die wichtigsten Sicherheitsregeln. Kläre vor der Anwendung bitte noch Deine persönliche gesundheitliche Situation medizinisch ab.",
      achievement: "Eisbadwissen abgeschlossen",
      achievementSub: "Vor der Anwendung ärztlich abklären",
    },
    stop: {
      headline: "Fertig! Heute noch kein Eisbad.",
      text: "Du kennst die wichtigsten Sicherheitsregeln. Warte mit dem Eisbad, bis Du Dich wieder vollständig fit fühlst.",
      achievement: "Eisbadwissen abgeschlossen",
      achievementSub: "Heute kein Eisbad starten",
    },
    notMedicalRelease:
      "Dieser Wissensabschluss ist keine medizinische Freigabe.",
    downloadedLine: "Teilnahmebestätigung heruntergeladen.",
    ctaDownload: "Zertifikat runterladen",
    poweredBy: "Powered by",
  },

  certDialog: {
    title: "Zertifikat herunterladen",
    close: "Schließen",
    text: "Trag Deinen Namen ein — er erscheint auf der Teilnahmebestätigung.",
    nameLabel: "Vor- und Nachname",
    namePlaceholder: "Vorname Nachname",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "name@beispiel.de",
    errName: "Bitte gib Deinen vollständigen Namen ein.",
    errEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
    errPdf: "Das PDF konnte nicht erstellt werden. Bitte versuche es noch einmal.",
    ctaIdle: "Zertifikat erstellen",
    ctaBusy: "PDF wird erstellt …",
    fine1: "Name und E-Mail werden aktuell nur lokal in Deinem Browser gespeichert und nicht übermittelt. Mehr dazu in der ",
    fineLink: "Datenschutzerklärung",
    fine2: ".",
    fallbackName: "Vorname Nachname",
    pdfFilename: "eisklar-teilnahmebestaetigung.pdf",
    dateLabel: "Datum",
  },

  drawer: {
    title: "Quellen und medizinische Hinweise",
    close: "Schließen",
    block: [
      "Diese Anwendung vermittelt allgemeine Sicherheitsinformationen.",
      "Sie ersetzt keine ärztliche Beratung, Diagnose oder Freigabe.",
      "Bei gesundheitlichen Beschwerden oder Unsicherheit ist medizinischer Rat einzuholen.",
    ],
    meta: [
      "Medizinisch geprüft durch: Platzhalter",
      "Letzte inhaltliche Prüfung: Platzhalter",
      "Version der Inhalte: Platzhalter",
    ],
    srcLabel: "ORIENTIERUNGSQUELLEN",
    legalLabel: "RECHTLICHES",
    impressumLink: "Impressum →",
    datenschutzLink: "Datenschutzerklärung →",
    foot: "Eine Initiative von qoob8 · Eisbad.de",
  },
};

// ---------------------------------------------------------------- EN

const en: Strings = {
  htmlLang: "en",

  HEALTH: [
    {
      k: "herz",
      label: "Heart and circulation",
      text: "With cardiovascular disease, high blood pressure, heart rhythm disorders or other cardiac conditions, get medical advice before ice bathing.",
    },
    {
      k: "schwanger",
      label: "Pregnancy",
      text: "The extreme change in temperature puts strain on circulation and metabolism. Always clarify ice bathing during pregnancy with a doctor beforehand.",
    },
    {
      k: "durchblutung",
      label: "Circulation and cold perception",
      text: "With vascular disease, severe circulatory disorders or an impaired perception of cold, cold exposure should be checked with a doctor beforehand.",
    },
    {
      k: "epilepsie",
      label: "Epilepsy",
      text: "If you have epilepsy or are prone to seizures, be sure to get medical advice before ice bathing.",
    },
    {
      k: "op",
      label: "Surgery and open wounds",
      text: "After surgery or with open wounds, only go into an ice bath once you have fully healed and have medical clearance.",
    },
    {
      k: "medikamente",
      label: "Medication",
      text: "Sedative, blood-pressure-lowering or other medication that affects circulation can change your perception and physical response. Clarify possible risks with a doctor.",
    },
    {
      k: "erschoepfung",
      label: "Exhaustion",
      text: "When you are severely physically or mentally exhausted, the added cold stimulus can overwhelm your body.",
    },
    {
      k: "u18",
      label: "Under 18",
      text: "People under 18 should only ice bathe with the consent of a parent or guardian and after consulting a doctor.",
    },
  ],

  TODAY: [
    {
      label: "Infection or fever",
      text: "No extra cold stimulus while you have an active infection.",
    },
    {
      label: "Alcohol",
      text: "Alcohol changes perception and circulation – no ice bath afterwards.",
    },
    {
      label: "Severe exhaustion",
      text: "Postpone the ice bath when you're physically or mentally exhausted.",
    },
    {
      label: "Extreme heat",
      text: "After a sauna or on very hot days, the temperature swing puts extra strain on your circulation.",
    },
  ],

  PREP: [
    {
      k: "allein",
      label: "Not alone",
      text: "A second person knows what you're doing and stays nearby.",
    },
    {
      k: "ausstieg",
      label: "Safe exit",
      text: "The way out of the water is clear, stable and non-slip.",
    },
    {
      k: "bereit",
      label: "Everything ready",
      text: "Timer, towel, dry clothes and a warm drink are ready.",
    },
    {
      k: "temp",
      label: "Temperature known",
      text: "You know the water temperature and aren't trying to set a record.",
    },
  ],

  ENTRY_STEPS: [
    "Feet and legs first.",
    "Lower yourself slowly to your upper body.",
    "Head and airways stay above water.",
  ],
  ENTRY_WARN:
    "Don't jump in. No hyperventilating and no holding your breath before or in the water.",
  ENTRY_CALM:
    "It's not about enduring something. It's about staying in control.",

  BODY_LINES: [
    "Your breathing speeds up.",
    "Heart rate and blood pressure can rise.",
    "Your body is briefly under stress.",
    "Perception and movement can become less steady.",
  ],

  DURING_CALM: [
    "calm, controllable breathing",
    "clear head",
    "stable standing or sitting",
    "companion nearby",
  ],
  DURING_WARN: [
    "severe discomfort",
    "chest pain or pressure",
    "shortness of breath or uncontrollable breathing",
    "dizziness or light-headedness",
    "vision problems",
    "numbness",
    "confusion",
    "loss of coordination",
    "a noticeably racing or irregular heartbeat",
  ],

  AFTER_STEPS: [
    "Dry off thoroughly.",
    "Put on dry, warm clothes.",
    "Move gently and warm up slowly.",
    "Only carry on or drive once you feel completely clear-headed and safe again.",
  ],

  QUIZ: [
    {
      q: "When should you get medical advice before ice bathing?",
      opts: [
        ["A", "Only if you're over 60"],
        [
          "B",
          "With pre-existing conditions, relevant medication or any uncertainty",
        ],
        ["C", "Only once symptoms appear during the ice bath"],
      ],
      right: "B",
      ok: "Exactly. When in doubt: get it checked medically first, then get in the ice.",
      no: "Not quite. Health risks should be clarified before your first ice bath.",
    },
    {
      q: "What's the right way to get in?",
      opts: [
        ["A", "Plunge in quickly and hold your breath"],
        [
          "B",
          "Get in slowly, keep your head above water and breathe out calmly",
        ],
        ["C", "Hold out as long as possible"],
      ],
      right: "B",
      ok: "Correct. A controlled entry helps you handle the immediate cold response.",
      no: "Almost. Get in slowly, keep your head above water and breathe in a controlled way.",
    },
    {
      q: "What do you do if you feel dizzy, short of breath or have chest pain?",
      opts: [
        ["A", "Push through the remaining time"],
        ["B", "Briefly dip your head under"],
        ["C", "Get out immediately in a controlled way and get help"],
      ],
      right: "C",
      ok: "Correct. Warning signs always matter more than the timer.",
      no: "A warning sign is not a training stimulus. Get out immediately in a controlled way and get help.",
    },
  ],

  CERT: {
    kicker: "Certificate of participation",
    intro:
      "has completed the Eisklar guide for a safe start to ice bathing and passed the quick check on preparation, controlled entry and warning signs.",
    blockTitle: "The essentials at a glance",
    practiceLabel: "Before and during your ice bath",
    practice: [
      "Never bathe alone. A safe, non-slip exit is clear.",
      "Have a timer, towel, dry clothes and a warm drink ready.",
      "Don't jump in. No hyperventilating, no breath-holding.",
      "The colder the water, the shorter the session. The timer is an upper limit, not a goal.",
      "Afterwards dry off, dress warmly, move gently and only carry on once you're clear-headed and safe again.",
    ],
    practiceNote:
      "It's not about enduring something. It's about staying in control.",
    healthLabel: "Health notes",
    health: [
      {
        title: "Check with a doctor beforehand if you have",
        text: "cardiovascular disease, high blood pressure, heart rhythm disorders · pregnancy · vascular disease, circulatory disorders, impaired cold perception · epilepsy or a tendency to seizures · recent surgery or open wounds · medication affecting circulation or with a sedative effect · are under 18 (only with a guardian's consent)",
      },
      {
        title: "No ice bath today with",
        text: "infection or fever · alcohol consumption · severe physical or mental exhaustion · immediately after a sauna or extreme heat",
      },
      {
        title: "Get out immediately with",
        text: "chest pain or pressure · shortness of breath or uncontrollable breathing · dizziness, light-headedness or confusion · vision problems · numbness · loss of coordination · a noticeably racing or irregular heartbeat",
      },
    ],
    footerBrandTitle: "Powered by qoob8",
    footerBrandText:
      "qoob8 designs ice baths and cold-therapy products for everyday use, with a focus on well-engineered technology, clean design and a safe approach to cold. Eisklar is an initiative by qoob8 on Eisbad.de.",
    footerNoteLabel: "Note",
    footerNoteText:
      "This certificate documents participation in an informational offering. It is not a medical clearance, not a diagnosis and not confirmation of individual fitness for ice bathing. In case of symptoms or uncertainty, seek medical advice.",
  },

  header: { back: "Back", progress: "Progress" },

  menu: {
    label: "Menu",
    sources: "Sources & medical notes",
    impressum: "Imprint",
    datenschutz: "Privacy",
    learnMore: "Learn more about ice bathing",
    shop: "Shop ice baths",
    brand: "An initiative by qoob8",
  },

  intro: {
    kicker: "3 minutes. That's all it takes.",
    h1a: "Ready for the ice?",
    h1b: "",
    text: "In 3 minutes you'll know how to prepare, how to get in under control and how to tell when it's time to get out again.",
    cta: "I'm ready",
    initiative: "An initiative by qoob8",
    switchLabel: "Deutsch",
    switchFlag: "🇩🇪",
    switchAria: "Sprache auf Deutsch umstellen",
  },

  health: {
    h2a: "Check first.",
    h2b: "Then start.",
    lead: "Some health conditions should be checked with a doctor before ice bathing.",
    flowQuestion: "Does any of this apply to you?",
    choiceNo: "No, none of it",
    choiceYes: "Yes or unsure",
    warnTitle: "Clarify first, then start.",
    warnText:
      "You can keep going through the guide. But please talk to your doctor before your first ice bath.",
    ctaNext: "Continue",
    ctaAnyway: "View the guide anyway",
  },

  today: {
    h2: "Sometimes today just isn't the day.",
    flowQuestion: "Does any of this apply to you today?",
    choiceNo: "No, none of it",
    choiceYes: "Yes or unsure",
    warnTitle: "Better to skip it today.",
    warnText:
      "You can finish the guide, but you shouldn't start an ice bath today.",
    ctaNext: "Continue",
  },

  body: {
    h2: "The cold hits instantly.",
    lead: "The first moment is especially intense. Get in slowly, keep your head above water and breathe out slowly and calmly.",
    breath: ["BREATHE IN", "LONGER OUT-BREATH", "STAY CALM"],
    cta: "Got it",
  },

  prep: {
    h2a: "Prepare first.",
    h2b: "Then get in.",
    ok: "Well prepared.",
    cta: "Continue to getting in",
  },

  entry: {
    h2a: "In slowly.",
    h2b: "Head up.",
    cta: "I stay in control",
  },

  during: {
    h2: "Your body decides. Not the timer.",
    calmLabel: "IN CONTROL",
    warnLabel: "GET OUT IMMEDIATELY",
    cta: "Warning signs understood",
  },

  after: {
    h2: "Out of the water isn't the end.",
    lead: "Your body can keep cooling down after you get out. So allow enough time to warm up in a controlled way.",
    cta: "Continue to the quick check",
  },

  quiz: {
    kicker: "QUICK CHECK · QUESTION",
    of: "OF 3",
    correct: "Correct",
    wrong: "Try again",
    ctaFinish: "Finish",
    ctaNext: "Next question",
  },

  done: {
    ready: {
      headline: "Done! You're ready for your ice bath.",
      text: "You now know the key essentials for a controlled start to ice bathing.",
      achievement: "Ice Bathing Master",
      achievementSub: "Essentials completed",
    },
    risk: {
      headline: "Done! Get a medical check first.",
      text: "You now know the key safety rules. Before your ice bath, please have your personal health situation checked by a doctor.",
      achievement: "Ice bathing knowledge completed",
      achievementSub: "Get a medical check before your ice bath",
    },
    stop: {
      headline: "Done! No ice bath today.",
      text: "You know the key safety rules. Wait to ice bathe until you feel completely fit again.",
      achievement: "Ice bathing knowledge completed",
      achievementSub: "Don't start an ice bath today",
    },
    notMedicalRelease: "This completion is not a medical clearance.",
    downloadedLine: "Certificate of participation downloaded.",
    ctaDownload: "Download certificate",
    poweredBy: "Powered by",
  },

  certDialog: {
    title: "Download certificate",
    close: "Close",
    text: "Enter your name — it will appear on the certificate of participation.",
    nameLabel: "First and last name",
    namePlaceholder: "First name Last name",
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    errName: "Please enter your full name.",
    errEmail: "Please enter a valid email address.",
    errPdf: "The PDF could not be created. Please try again.",
    ctaIdle: "Create certificate",
    ctaBusy: "Creating PDF …",
    fine1: "Your name and email are currently stored only locally in your browser and are not transmitted. More on this in the ",
    fineLink: "privacy policy",
    fine2: ".",
    fallbackName: "First name Last name",
    pdfFilename: "eisklar-certificate.pdf",
    dateLabel: "Date",
  },

  drawer: {
    title: "Sources and medical notes",
    close: "Close",
    block: [
      "This app provides general safety information.",
      "It does not replace medical advice, diagnosis or clearance.",
      "In case of health problems or uncertainty, seek medical advice.",
    ],
    meta: [
      "Medically reviewed by: placeholder",
      "Last content review: placeholder",
      "Content version: placeholder",
    ],
    srcLabel: "REFERENCE SOURCES",
    legalLabel: "LEGAL",
    impressumLink: "Imprint →",
    datenschutzLink: "Privacy policy →",
    foot: "An initiative by qoob8 · Eisbad.de",
  },
};

export const STRINGS: Record<Lang, Strings> = { de, en };

// ---------------------------------------------------------------- Context

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: Strings;
};

const Ctx = createContext<LangCtx | null>(null);

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "de";
  try {
    const stored = window.localStorage.getItem(LANG_KEY);
    if (stored === "de" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  const nav = typeof navigator !== "undefined" ? navigator.language : "";
  return nav && nav.toLowerCase().startsWith("en") ? "en" : "de";
}

export function LangProvider({ children }: { children: ReactNode }) {
  // SSR und erster Client-Render immer "de" (verhindert Hydration-Mismatch),
  // danach ggf. auf gespeicherte / erkannte Sprache wechseln.
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    const initial = detectInitialLang();
    if (initial !== "de") setLangState(initial);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "de" ? "en" : "de");
  }, [lang, setLang]);

  const value = useMemo<LangCtx>(
    () => ({ lang, setLang, toggleLang, t: STRINGS[lang] }),
    [lang, setLang, toggleLang]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used within LangProvider");
  return c;
}

export function useT(): Strings {
  return useLang().t;
}
