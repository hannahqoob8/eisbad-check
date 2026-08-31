"use client";

import { DURING_CALM, DURING_WARN } from "@/lib/content";

type Props = { onNext: () => void };

export default function DuringScreen({ onNext }: Props) {
  return (
    <>
      <h2 className="h2 h2--sm">Dein Körper entscheidet. Nicht der Timer.</h2>

      <div className="scroll">
        <div className="panel panel-calm">
          <div className="panel-label">KONTROLLIERTER ZUSTAND</div>
          <div className="panel-list">
            {DURING_CALM.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        <div className="panel panel-warn mt-16" style={{ marginTop: 10 }}>
          <div className="panel-label">SOFORT AUSSTEIGEN</div>
          <div className="panel-list">
            {DURING_WARN.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary foot mt-16"
        onClick={onNext}
      >
        Warnsignale verstanden
      </button>
    </>
  );
}
