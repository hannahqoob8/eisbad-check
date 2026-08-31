"use client";

import { PREP } from "@/lib/content";

type Props = {
  prep: Record<string, boolean>;
  allPrep: boolean;
  onToggle: (k: string) => void;
  onNext: () => void;
};

export default function PrepScreen({ prep, allPrep, onToggle, onNext }: Props) {
  return (
    <>
      <h2 className="h2">
        Erst vorbereiten.
        <br />
        Dann eintauchen.
      </h2>

      <div className="scroll stack-9">
        {PREP.map((p) => {
          const on = !!prep[p.k];
          return (
            <button
              key={p.k}
              type="button"
              className={`check-card${on ? " on" : ""}`}
              aria-pressed={on}
              onClick={() => onToggle(p.k)}
            >
              <span className="check-ring" aria-hidden="true">
                {on ? "✓" : ""}
              </span>
              <span>
                <span className="check-title">{p.label}</span>
                <span className="check-text">{p.text}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="foot" style={{ paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        {allPrep && <div className="prep-ok">Gut vorbereitet.</div>}
        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled={!allPrep}
          aria-disabled={!allPrep}
        >
          Weiter zum Einstieg
        </button>
      </div>
    </>
  );
}
