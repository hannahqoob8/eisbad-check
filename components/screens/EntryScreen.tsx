"use client";

import { ENTRY_STEPS, ENTRY_WARN, ENTRY_CALM } from "@/lib/content";

type Props = { onNext: () => void };

export default function EntryScreen({ onNext }: Props) {
  return (
    <>
      <h2 className="h2 h2--lg">
        Langsam rein.
        <br />
        Kopf oben.
      </h2>

      <div className="scroll">
        <div className="stack-9">
          {ENTRY_STEPS.map((text, i) => (
            <div key={text} className="step-card">
              <span className="step-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="step-text">{text}</span>
            </div>
          ))}
        </div>

        <div className="memo memo-warn mt-16">
          <p>{ENTRY_WARN}</p>
          <p>{ENTRY_CALM}</p>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary foot mt-16"
        onClick={onNext}
      >
        Ich behalte die Kontrolle
      </button>
    </>
  );
}
