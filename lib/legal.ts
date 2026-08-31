// ============================================================
// Rechtstexte fuer Impressum und Datenschutz.
//
// Inhaltlich uebernommen von:
//   - https://qoob8.com/pages/impressum
//   - https://qoob8.com/pages/datenschutz  (Stand dort: Februar 2026)
//
// HINWEIS: Die Drittanbieter-Abschnitte der Datenschutzerklaerung
// stammen 1:1 von qoob8.com und beschreiben die dortige Shop-Umgebung
// (Shopify, Klaviyo, Google Analytics, Meta/TikTok Pixel usw.).
// Der Eisklar-Guide selbst nutzt KEINE dieser Dienste (siehe Abschnitt
// "Eisklar-Guide"). Vor Veroeffentlichung durch die Rechtsabteilung
// pruefen und auf die tatsaechlich unter eisbad.de eingesetzten
// Dienste eindampfen.
// ============================================================

export const COMPANY = {
  name: "qoob8 GmbH",
  street: "Friedenstraße 20",
  postalCity: "40219 Düsseldorf",
  country: "Deutschland",
  managers: "Christian Puschkeit und Verena Scholz",
  contentResponsible: "Christian Puschkeit",
  register: "HRB 107949, Amtsgericht Düsseldorf",
  vatId: "DE454040330",
  email: "icebreaker@qoob8.com",
};

export const LEGAL_UPDATED = "August 2026";

// ---------------- Datenschutz: Bausteine ----------------

const BASIS = {
  consent:
    "Die Rechtsgrundlage der Verarbeitung ist Art. 6 Abs. 1 S. 1 lit. a DSGVO. Die Verarbeitung erfolgt auf der Basis von Einwilligungen. Betroffene können ihre Einwilligung jederzeit widerrufen, indem sie uns z. B. unter den in dieser Datenschutzerklärung angegebenen Kontaktdaten kontaktieren. Der Widerruf berührt nicht die Rechtmäßigkeit der Verarbeitung bis zum Widerruf.",
  liWebsite:
    "Die Rechtsgrundlage der Verarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse, eine funktionsfähige Website zur Verfügung zu stellen.",
  liSell:
    "Die Rechtsgrundlage der Verarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse, unsere Produkte für Interessenten leicht zugänglich zu verkaufen.",
  contract:
    "Die Rechtsgrundlage der Verarbeitung ist Art. 6 Abs. 1 S. 1 lit. b DSGVO, da sie für die Erfüllung des Vertrags erforderlich ist.",
} as const;

const TRANSFER = {
  scc:
    "Rechtsgrundlage der Übermittlung in ein Land außerhalb des EWR sind Standardvertragsklauseln. Die Sicherheit der übermittelten Daten ist durch gemäß dem Prüfverfahren nach Art. 93 Abs. 2 DSGVO erlassene Standarddatenschutzklauseln gewährleistet (Art. 46 Abs. 2 lit. c DSGVO), die wir mit dem Anbieter vereinbart haben.",
  adequacy:
    "Rechtsgrundlage der Übermittlung in ein Land außerhalb des EWR ist ein Angemessenheitsbeschluss der EU-Kommission nach Art. 45 Abs. 3 DSGVO, mit dem die EU-Kommission ein angemessenes Schutzniveau im Drittland festgestellt hat.",
} as const;

const DELETE_STD =
  "Die Daten werden gelöscht, wenn der Zweck ihrer Erhebung entfallen ist und keine Aufbewahrungspflicht entgegensteht.";

export type DsService = {
  n: string;
  heading: string;
  intro: string;
  basis: keyof typeof BASIS;
  transfer?: keyof typeof TRANSFER;
  moreInfoUrl?: string;
};

export function dsParagraphs(s: DsService): string[] {
  const out = [s.intro, BASIS[s.basis]];
  if (s.transfer) out.push(TRANSFER[s.transfer]);
  out.push(
    s.moreInfoUrl
      ? `${DELETE_STD} Weitere Informationen sind in der Datenschutzerklärung des Anbieters unter ${s.moreInfoUrl} abrufbar.`
      : DELETE_STD
  );
  return out;
}

export const DS_SERVICES: DsService[] = [
  {
    n: "Pick & Pack 24",
    heading: "Pick & Pack 24",
    intro:
      "Wir setzen Pick & Pack 24 zum Fulfillment ein. Anbieter ist die Pick & Pack 24 GmbH, Wiesenstraße 51a, 40549 Düsseldorf. Der Anbieter verarbeitet Inhaltsdaten, Kontaktdaten und Meta-/Kommunikationsdaten in der EU.",
    basis: "liSell",
    moreInfoUrl: "https://pickpack24.de/dsgvo",
  },
  {
    n: "Google Webfonts",
    heading: "Google Webfonts",
    intro:
      "Wir setzen Google Webfonts für Schriftarten ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die Einbindung erfolgt lokal von unseren Servern; der Anbieter verarbeitet dabei Meta-/Kommunikationsdaten in der EU.",
    basis: "liWebsite",
    moreInfoUrl: "https://policies.google.com/privacy?hl=de",
  },
  {
    n: "Shopify",
    heading: "Shopify",
    intro:
      "Wir setzen Shopify zur Unterhaltung eines Online-Shops ein. Anbieter ist die Shopify International Limited, Victoria Buildings, 2. Etage, 1–2 Haddington Road, Dublin 4, D04 XN32, Irland. Der Anbieter verarbeitet Meta-/Kommunikationsdaten in der EU.",
    basis: "liSell",
    moreInfoUrl: "https://www.shopify.de/legal/datenschutz",
  },
  {
    n: "Hotjar",
    heading: "Hotjar",
    intro:
      "Wir setzen Hotjar zur Analyse ein. Anbieter ist die Hotjar Ltd., Dragonara Business Centre, 5th Floor, Dragonara Road, Paceville St Julian's, STJ 3141, Malta. Der Anbieter verarbeitet Nutzungsdaten und Meta-/Kommunikationsdaten in der EU.",
    basis: "consent",
    moreInfoUrl: "https://www.hotjar.com/legal/policies/privacy/",
  },
  {
    n: "Google Analytics",
    heading: "Google Analytics",
    intro:
      "Wir setzen Google Analytics zur Analyse ein. Anbieter ist die Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Der Anbieter verarbeitet Nutzungsdaten und Meta-/Kommunikationsdaten in den USA.",
    basis: "consent",
    transfer: "adequacy",
    moreInfoUrl: "https://policies.google.com/privacy?hl=de",
  },
  {
    n: "Meta Pixel",
    heading: "Meta Pixel",
    intro:
      "Wir setzen das Meta Pixel zur Analyse ein. Anbieter ist die Meta Platforms Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Der Anbieter verarbeitet Nutzungsdaten in den USA.",
    basis: "consent",
    transfer: "adequacy",
    moreInfoUrl: "https://www.facebook.com/policy.php",
  },
  {
    n: "Google Conversion Tag",
    heading: "Google Conversion Tag",
    intro:
      "Wir setzen das Google Conversion Tag zum Konversions-Tracking ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Der Anbieter verarbeitet Nutzungsdaten in den USA.",
    basis: "consent",
    transfer: "adequacy",
    moreInfoUrl: "https://policies.google.com/privacy?hl=de",
  },
  {
    n: "TikTok Pixel",
    heading: "TikTok Pixel",
    intro:
      "Wir setzen das TikTok Pixel zur Analyse und für Werbung ein. Anbieter ist die TikTok, Inc., 10100 Venice Blvd Suite 401, Culver City, CA 90232, USA. Der Anbieter verarbeitet Meta-/Kommunikationsdaten in den USA.",
    basis: "consent",
    transfer: "scc",
    moreInfoUrl: "https://www.tiktok.com/legal/privacy-policy?lang=de",
  },
  {
    n: "Facebook Conversion API",
    heading: "Facebook Conversion API",
    intro:
      "Wir setzen die Facebook Conversion API zur Analyse ein. Anbieter ist die Meta Platforms Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Der Anbieter verarbeitet Nutzungs- und Meta-/Kommunikationsdaten in den USA.",
    basis: "consent",
    transfer: "adequacy",
    moreInfoUrl: "https://www.facebook.com/policy.php",
  },
  {
    n: "Google Marketing Platform",
    heading: "Google Marketing Platform",
    intro:
      "Wir setzen die Google Marketing Platform zur Analyse und für Werbung ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Der Anbieter verarbeitet Nutzungs- und Meta-/Kommunikationsdaten in den USA.",
    basis: "consent",
    transfer: "adequacy",
    moreInfoUrl: "https://policies.google.com/privacy?hl=de",
  },
  {
    n: "Google Tag Manager",
    heading: "Google Tag Manager",
    intro:
      "Wir setzen den Google Tag Manager zur Analyse und für Werbung ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Der Anbieter verarbeitet Nutzungsdaten in den USA.",
    basis: "consent",
    transfer: "adequacy",
    moreInfoUrl: "https://policies.google.com/privacy?hl=de",
  },
  {
    n: "Klaviyo",
    heading: "Klaviyo",
    intro:
      "Wir setzen Klaviyo zum E-Mail-Marketing und zum Management von Kundenbeziehungen ein. Anbieter ist die Klaviyo, Inc., 125 Summer St, Floor 6, Boston, MA 02111, USA. Der Anbieter verarbeitet Inhalts-, Nutzungs-, Meta-/Kommunikations- und Kontaktdaten in den USA.",
    basis: "consent",
    transfer: "scc",
    moreInfoUrl: "https://www.klaviyo.com/privacy/policy",
  },
  {
    n: "Google Merchant Center",
    heading: "Google Merchant Center",
    intro:
      "Wir setzen das Google Merchant Center zur Unterhaltung eines Online-Shops ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Der Anbieter verarbeitet Meta-/Kommunikationsdaten in den USA.",
    basis: "consent",
    transfer: "adequacy",
    moreInfoUrl: "https://policies.google.com/privacy?hl=de",
  },
  {
    n: "Facebook Custom Audiences",
    heading: "Facebook Custom Audiences",
    intro:
      "Wir setzen Facebook Custom Audiences für Werbung ein. Anbieter ist die Meta Platforms Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Der Anbieter verarbeitet Nutzungsdaten in den USA.",
    basis: "consent",
    transfer: "adequacy",
    moreInfoUrl: "https://www.facebook.com/policy.php",
  },
];

export const DS_SOCIAL: { heading: string; text: string }[] = [
  {
    heading: "Facebook",
    text: "Betreiber ist die Meta Platforms Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Datenschutzerklärung: https://www.facebook.com/policy.php. Widerspruch über die Einstellungen für Werbeanzeigen: https://www.facebook.com/settings?tab=ads. Für die Verarbeitung der Daten der Besucher unseres Profils sind wir gemäß Art. 26 DSGVO gemeinsam mit Facebook verantwortlich (https://www.facebook.com/legal/terms/information_about_page_insights_data).",
  },
  {
    heading: "Instagram",
    text: "Betreiber ist die Meta Platforms Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Datenschutzerklärung: https://help.instagram.com/519522125107875.",
  },
  {
    heading: "TikTok",
    text: "Betreiber ist die TikTok Technology Limited, 10 Earlsfort Terrace, Dublin, D02 T380, Irland. Datenschutzerklärung: https://www.tiktok.com/de/privacy-policy.",
  },
  {
    heading: "YouTube",
    text: "Betreiber ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Datenschutzerklärung: https://policies.google.com/privacy?hl=de.",
  },
  {
    heading: "LinkedIn",
    text: "Betreiber ist die LinkedIn Ireland Unlimited Company, Wilton Place, Dublin 2, Irland. Datenschutzerklärung: https://www.linkedin.com/legal/privacy-policy. Widerspruch über die Einstellungen für Werbeanzeigen: https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out.",
  },
];
