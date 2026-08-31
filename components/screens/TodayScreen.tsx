"use client";

import { useT } from "@/lib/i18n";
import type { Today } from "@/lib/state";

type Props = {
  today: Today;
  onPickFit: () => void;
  onPickStop: () => void;
  onNext: () => void;
};

export default function TodayScreen({
  today,
  onPickFit,
  onPickStop,
  onNext,
}: Props) {
  const t = useT();
  return (
    <>
      <h2 className="h2 h2--sm">{t.today.h2}</h2>

      <div className="scroll stack-9">
        {t.TODAY.map((c) => (
          <div key={c.label} className="card">
            <div className="card-title">{c.label}</div>
            <p className="card-text">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="foot foot-stack">
        <div className="flow-question">{t.today.flowQuestion}</div>
        <div className="choice-row">
          <button
            type="button"
            className={`choice${today === "fit" ? " sel-green" : ""}`}
            aria-pressed={today === "fit"}
            onClick={onPickFit}
          >
            {t.today.choiceNo}
          </button>
          <button
            type="button"
            className={`choice${today === "stop" ? " sel-orange" : ""}`}
            aria-pressed={today === "stop"}
            onClick={onPickStop}
          >
            {t.today.choiceYes}
          </button>
        </div>

        {today === "stop" && (
          <div className="warnbox" role="status">
            <div className="warnbox-title">{t.today.warnTitle}</div>
            <p className="warnbox-text">{t.today.warnText}</p>
          </div>
        )}

        <button type="button" className="btn btn-primary" onClick={onNext}>
          {t.today.ctaNext}
        </button>
      </div>
    </>
  );
}
