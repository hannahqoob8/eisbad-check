# Eisklar lokal ansehen (für Hannah)

Die App liegt fertig in diesem Ordner. Du brauchst nichts zu installieren, es
ist bereits ein fertiges Vorschau-Build enthalten (Ordner `out`).

## Schnellster Weg (Mac, ein Befehl)

1. Öffne die App **Terminal** (Spotlight mit Cmd+Leertaste, „Terminal" tippen,
   Enter).
2. Kopiere diese Zeile hinein und drücke Enter:

   ```
   cd ~/Eisbaden.de/eisklar/out && python3 -m http.server 8080
   ```

3. Öffne im Browser: **http://localhost:8080**

Das war's. Die App startet mit dem Intro-Screen „Bereit fürs Eis?".

### Am besten in der Handy-Ansicht ansehen

Die App ist mobile-first (für ein iPhone gestaltet). So siehst du sie am
realistischsten:

- Im Browser Rechtsklick → „Untersuchen" öffnen, dann oben das kleine
  Handy-Symbol anklicken (Geräte-Ansicht) und z. B. „iPhone 14" wählen.
- Am breiten Bildschirm wird die App automatisch als zentrierte „Handy-Fläche"
  mit Rahmen dargestellt.

### Beenden

Im Terminal **Ctrl + C** drücken. Zum erneuten Ansehen einfach den Befehl aus
Schritt 2 wieder ausführen.

---

## Was du testen kannst

- Den ganzen Durchlauf: Intro → Gesundheits-Check → Tages-Check → Wissen →
  Vorbereitung → Einstieg → Warnsignale → Nach dem Eisbad → 3 Quizfragen →
  Abschluss.
- Die **drei Abschluss-Varianten**: Wähle im Gesundheits-Check „Etwas trifft zu"
  oder im Tages-Check „Ja" – der Abschluss passt sich an. Ohne Auswahl bekommst
  du den Standard-Abschluss „Eisbademeister".
- **Fortschritt bleibt erhalten**: Wenn du die Seite neu lädst, bist du wieder an
  derselben Stelle.
- Oben rechts das **ⓘ** öffnet die Quellen und Hinweise.

## Hinweis

Alle medizinischen Formulierungen sind noch **fachärztlich und rechtlich zu
prüfen**, bevor die App online geht. Die Prüf-Angaben im Quellen-Bereich sind
aktuell Platzhalter. Details für den Entwickler stehen in `README.md`.
