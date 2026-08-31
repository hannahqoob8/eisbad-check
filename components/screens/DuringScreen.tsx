"use client";

import { useT } from "@/lib/i18n";

type Props = { onNext: () => void };

export default function DuringScreen({ onNext }: Props) {
  const t = useT();
  return (
    <>
      <h2 className="h2 h2--sm">{t.during.h2}</h2>

      <div className="scroll">
        <div className="panel panel-calm">
          <div className="panel-label">{t.during.calmLabel}</div>
          <div className="panel-list">
            {t.DURING_CALM.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>

        <div className="panel panel-warn mt-16" style={{ marginTop: 10 }}>
          <div className="panel-label">{t.during.warnLabel}</div>
          <div className="panel-list">
            {t.DURING_WARN.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary foot mt-16"
        onClick={onNext}
      >
        {t.during.cta}
      </button>
    </>
  );
}
