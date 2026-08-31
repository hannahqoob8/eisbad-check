"use client";

import { useT } from "@/lib/i18n";

type Props = {
  prep: Record<string, boolean>;
  allPrep: boolean;
  onToggle: (k: string) => void;
  onNext: () => void;
};

export default function PrepScreen({ prep, allPrep, onToggle, onNext }: Props) {
  const t = useT();
  return (
    <>
      <h2 className="h2">
        {t.prep.h2a}{" "}
        <br />
        {t.prep.h2b}
      </h2>

      <div className="scroll stack-9">
        {t.PREP.map((p) => {
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
        {allPrep && <div className="prep-ok">{t.prep.ok}</div>}
        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled={!allPrep}
          aria-disabled={!allPrep}
        >
          {t.prep.cta}
        </button>
      </div>
    </>
  );
}
