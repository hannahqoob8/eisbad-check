# Eisklar

3-Minuten-Guide für einen sicheren Einstieg ins Eisbaden. Mobile-first Web-App,
eine Initiative von qoob8, für **Eisbad.de** (bzw. `eisbad.de/eisklar`).

Diese App wurde auf Basis des Design-Handoffs von Claude Design umgesetzt. Sie
ist ein produktionsnaher Ausgangspunkt für die Weiterentwicklung durch einen
Entwickler.

---

## Tech-Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **CSS** mit Design-Tokens (`app/globals.css`), keine UI-Library
- **Schriften selbst gehostet** über `next/font/local` (DSGVO-konform, keine
  Anfrage an Google beim Seitenaufruf). Die `.woff2`-Dateien liegen in
  `app/fonts/` und stammen aus den Open-Source-Paketen
  `@fontsource/schibsted-grotesk` und `@fontsource/ibm-plex-mono`
  (SIL Open Font License).
- **Statischer Export** (`output: 'export'`) → reiner Static-Build in `out/`,
  deploybar auf Cloudflare Pages, Netlify, Vercel oder jedem Static-Host.
- **PWA**: Manifest, Icons, Service-Worker (Offline-Shell), installierbar.

---

## Lokal starten

Voraussetzung: Node.js ≥ 18.

```bash
npm install        # Abhängigkeiten installieren
npm run dev        # Dev-Server auf http://localhost:3000
```

Produktions-Build (erzeugt den Static-Export in `out/`):

```bash
npm run build
```

Den Static-Build ansehen (ohne Node, z. B. für ein schnelles Review):

```bash
cd out && python3 -m http.server 8080   # dann http://localhost:8080 öffnen
```

---

## Projektstruktur

```
app/
  layout.tsx          Root-Layout, Schriften, Metadaten, PWA-Verknüpfung
  page.tsx            Einstiegspunkt (rendert die App)
  globals.css         Design-Tokens + alle Komponenten-Styles
  fonts/              selbst gehostete .woff2-Schriften
components/
  EisklarApp.tsx      State-Machine, Persistenz, History pro Schritt
  AppHeader.tsx       Header (Zurück, Fortschritt, Schritt-Label, Quellen)
  SourcesDrawer.tsx   Quellen-/Disclaimer-Bottom-Sheet (Dialog, Fokus-Trap)
  ServiceWorkerRegister.tsx
  screens/            je ein Screen (Intro, Health, Today, Body, Prep,
                      Entry, During, After, Quiz, Done)
lib/
  content.ts          Alle Texte/Inhalte (verbatim aus dem Briefing)
  state.ts            State-Typen + localStorage-Persistenz
public/
  images/             Foto Screen 1 (qoob8)
  icons/              PWA-Icons
  manifest.webmanifest
  sw.js               Service-Worker
```

---

## Screenflow & State

12 Schritte (Index 0–11): `intro, health, today, body, prep, entry, during,
after, q1, q2, q3, done`. Fortschritt = `step / 11`.

- **History pro Schritt**: jede Ansicht bekommt eine eigene History-Entry
  (`pushState`, Hash `#health` usw.). Browser-Zurück und der Zurück-Button gehen
  einen Schritt zurück, **ohne den Fortschritt zu löschen**. Deep-Links per Hash
  funktionieren (QR-Code-tauglich, z. B. `…/#intro`).
- **Persistenz**: `localStorage` unter `eisklar-progress-v1`. Gespeichert werden
  `step, open, risk, today, prep, answers`. **Keine Gesundheitsdaten an einen
  Server**, kein Login, keine E-Mail-Pflicht.
- **Abschlussvarianten**: `today==='stop'` → „Heute Pause" (hat Vorrang);
  sonst `risk==='risk'` → „ärztlich abklären"; sonst Standard („Eisbademeister").

---

## Barrierefreiheit

Echte `<button>`/`<a>`, sichtbare Fokus-Ringe, `aria-pressed` an Auswahlkarten,
`role="progressbar"` mit `aria-valuenow`, Drawer als `role="dialog"` mit
Fokus-Trap und Escape, `prefers-reduced-motion` schaltet alle Animationen aus.
Tap-Flächen ≥ 44 px. Farbkontraste nach WCAG AA.

---

## Offene Punkte für die Produktion (TODO)

- [ ] **Medizinische & rechtliche Prüfung** aller Formulierungen (Pflicht vor
      Veröffentlichung). Platzhalter im Quellen-Drawer füllen:
      „Medizinisch geprüft durch", „Letzte inhaltliche Prüfung",
      „Version der Inhalte" (siehe `components/SourcesDrawer.tsx`).
- [ ] **Bildmaterial**: responsive Varianten des Screen-1-Fotos (AVIF/WebP,
      1x/2x). Aktuell ein `<img>` mit einer WebP-Datei.
- [ ] **Favicon** für den Browser-Tab final setzen (Icons liegen in
      `public/icons/`, aktuell ein schlichtes Platzhalter-Icon).
- [ ] **Abschlusskarte teilen**: „Karte speichern" exportiert die Regelkarte als
      PNG (Canvas). Optional PDF-Export und Social-Sharing nur auf ausdrückliche
      Aktion ergänzen.
- [ ] **Analytics/Consent**: falls gewünscht, nur mit ausdrücklicher Einwilligung
      und ohne Auswertung einzelner Gesundheitsantworten.
- [ ] Domain-Konfiguration: App unter `eisbad.de` bzw. `eisbad.de/eisklar`.
      Der Service-Worker registriert sich relativ und funktioniert unter einem
      Unterpfad.

## Bewusst nicht umgesetzt (laut Briefing)

Keine Ranglisten, keine öffentlichen Profile, keine Zeit-/Kälterekorde, keine
Streaks, keine Durchhalte-Aufforderungen, keine Atemanhalte-Challenges, keine
Diagnosen/Eignungsbestätigungen, kein Zertifikat, keine Produktwerbung vor
Abschluss, keine pauschalen Zeitangaben, keine langen Textseiten.
