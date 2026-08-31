"use client";

import { useT } from "@/lib/i18n";

type Props = { onNext: () => void };

// Verzoegerungen fuer das sequenzielle Einblenden der Zeilen.
const DELAYS = ["0.05s", "0.45s", "0.85s", "1.25s"];

export default function BodyScreen({ onNext }: Props) {
  const t = useT();
  return (
    <>
      <h2 className="h2 h2--lg">{t.body.h2}</h2>
      <p className="lead">{t.body.lead}</p>

      <div className="scroll">
        <div className="breath" aria-hidden="true">
          <div className="breath-circle" />
          <div className="breath-ring" />
          <div className="breath-text">
            {t.body.breath[0]}
            <br />
            {t.body.breath[1]}
            <br />
            {t.body.breath[2]}
          </div>
        </div>

        <div className="reveal-list">
          {t.BODY_LINES.map((line, i) => (
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
        {t.body.cta}
      </button>
    </>
  );
}
