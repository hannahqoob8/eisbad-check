"use client";

import { BODY_LINES } from "@/lib/content";

type Props = { onNext: () => void };

// Verzoegerungen fuer das sequenzielle Einblenden der Zeilen.
const DELAYS = ["0.05s", "0.45s", "0.85s", "1.25s"];

export default function BodyScreen({ onNext }: Props) {
  return (
    <>
      <h2 className="h2 h2--lg">Die Kälte wirkt sofort.</h2>
      <p className="lead">
        Der erste Moment ist besonders intensiv. Steige langsam ein, halte den
        Kopf über Wasser und atme ruhig und lang aus.
      </p>

      <div className="scroll">
        <div className="breath" aria-hidden="true">
          <div className="breath-circle" />
          <div className="breath-ring" />
          <div className="breath-text">
            EINATMEN
            <br />
            LÄNGER AUSATMEN
            <br />
            RUHIG BLEIBEN
          </div>
        </div>

        <div className="reveal-list">
          {BODY_LINES.map((line, i) => (
            <div
              key={line}
              className="reveal-row"
              style={{ animationDelay: DELAYS[i] }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary foot mt-16"
        onClick={onNext}
      >
        Verstanden
      </button>
    </>
  );
}
