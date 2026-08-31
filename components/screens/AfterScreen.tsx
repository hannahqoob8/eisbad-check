"use client";

import { useT } from "@/lib/i18n";

type Props = { onNext: () => void };

export default function AfterScreen({ onNext }: Props) {
  const t = useT();
  return (
    <>
      <h2 className="h2">{t.after.h2}</h2>
      <p className="lead">{t.after.lead}</p>

      <div className="scroll">
        <div className="stack-9">
          {t.AFTER_STEPS.map((text, i) => (
            <div key={text} className="step-card">
              <span className="step-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="step-text">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary foot mt-16"
        onClick={onNext}
      >
        {t.after.cta}
      </button>
    </>
  );
}
