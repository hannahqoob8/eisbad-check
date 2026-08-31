"use client";

import { HEALTH } from "@/lib/content";
import type { Risk } from "@/lib/state";

type Props = {
  open: string | null;
  risk: Risk;
  onToggleChip: (k: string) => void;
  onPickNoRisk: () => void;
  onPickRisk: () => void;
  onNext: () => void;
};

export default function HealthScreen({
  open,
  risk,
  onToggleChip,
  onPickNoRisk,
  onPickRisk,
  onNext,
}: Props) {
  const openCard = HEALTH.find((h) => h.k === open) ?? null;

  return (
    <>
      <h2 className="h2">
        Erst checken.
        <br />
        Dann starten.
      </h2>
      <p className="lead">
        Eisbaden ist ein intensiver Reiz für Deinen Körper. Bestimmte
        gesundheitliche Situationen solltest Du deshalb vorab medizinisch
        abklären.
      </p>

      {openCard && (
        <div className="explain">
          <div className="explain-title">{openCard.label}</div>
          <p className="explain-text">{openCard.text}</p>
        </div>
      )}

      <div className="scroll">
        <div className="chip-grid">
          {HEALTH.map((h) => (
            <button
              key={h.k}
              type="button"
              className="chip"
              aria-expanded={open === h.k}
              onClick={() => onToggleChip(h.k)}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      <div className="foot foot-stack">
        <div className="flow-question">Trifft etwas davon auf Dich zu?</div>
        <button
          type="button"
          className={`choice${risk === "none" ? " sel-green" : ""}`}
          aria-pressed={risk === "none"}
          onClick={onPickNoRisk}
        >
          Nichts davon trifft auf mich zu
        </button>
        <button
          type="button"
          className={`choice${risk === "risk" ? " sel-orange" : ""}`}
          aria-pressed={risk === "risk"}
          onClick={onPickRisk}
        >
          Etwas trifft zu oder ich bin unsicher
        </button>

        {risk === "risk" && (
          <div className="warnbox" role="status">
            <div className="warnbox-title">Erst klären, dann starten.</div>
            <p className="warnbox-text">
              Du kannst den Guide weiter ansehen. Sprich vor Deinem ersten Eisbad
              aber bitte mit Deinem Arzt oder Deiner Ärztin.
            </p>
          </div>
        )}

        <button type="button" className="btn btn-primary" onClick={onNext}>
          {risk === "risk" ? "Guide trotzdem ansehen" : "Weiter"}
        </button>
      </div>
    </>
  );
}
