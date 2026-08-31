"use client";

import { useT } from "@/lib/i18n";
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
  const t = useT();
  const openCard = t.HEALTH.find((h) => h.k === open) ?? null;

  return (
    <>
      <h2 className="h2">
        {t.health.h2a}{" "}
        <br />
        {t.health.h2b}
      </h2>
      <p className="lead">{t.health.lead}</p>

      {openCard && (
        <div className="explain">
          <div className="explain-title">{openCard.label}</div>
          <p className="explain-text">{openCard.text}</p>
        </div>
      )}

      <div className="scroll">
        <div className="chip-grid">
          {t.HEALTH.map((h) => (
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
        <div className="flow-question">{t.health.flowQuestion}</div>
        <div className="choice-row">
          <button
            type="button"
            className={`choice${risk === "none" ? " sel-green" : ""}`}
            aria-pressed={risk === "none"}
            onClick={onPickNoRisk}
          >
            {t.health.choiceNo}
          </button>
          <button
            type="button"
            className={`choice${risk === "risk" ? " sel-orange" : ""}`}
            aria-pressed={risk === "risk"}
            onClick={onPickRisk}
          >
            {t.health.choiceYes}
          </button>
        </div>

        {risk === "risk" && (
          <div className="warnbox" role="status">
            <div className="warnbox-title">{t.health.warnTitle}</div>
            <p className="warnbox-text">{t.health.warnText}</p>
          </div>
        )}

        <button type="button" className="btn btn-primary" onClick={onNext}>
          {risk === "risk" ? t.health.ctaAnyway : t.health.ctaNext}
        </button>
      </div>
    </>
  );
}
