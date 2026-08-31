"use client";

import { useT } from "@/lib/i18n";

type Props = { onNext: () => void };

export default function EntryScreen({ onNext }: Props) {
  const t = useT();
  return (
    <>
      <h2 className="h2 h2--lg">
        {t.entry.h2a}{" "}
        <br />
        {t.entry.h2b}
      </h2>

      <div className="scroll">
        <div className="stack-9">
          {t.ENTRY_STEPS.map((text, i) => (
            <div key={text} className="step-card">
              <span className="step-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="step-text">{text}</span>
            </div>
          ))}
        </div>

        <div className="memo memo-warn mt-16">
          <p>{t.ENTRY_WARN}</p>
          <p>{t.ENTRY_CALM}</p>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary foot mt-16"
        onClick={onNext}
      >
        {t.entry.cta}
      </button>
    </>
  );
}
