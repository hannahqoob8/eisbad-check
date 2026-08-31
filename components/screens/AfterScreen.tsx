"use client";

import { AFTER_STEPS } from "@/lib/content";

type Props = { onNext: () => void };

export default function AfterScreen({ onNext }: Props) {
  return (
    <>
      <h2 className="h2">Draußen ist noch nicht vorbei.</h2>
      <p className="lead">
        Dein Körper kann nach dem Ausstieg noch weiter auskühlen. Plane deshalb
        ausreichend Zeit zum kontrollierten Aufwärmen ein.
      </p>

      <div className="scroll">
        <div className="stack-9">
          {AFTER_STEPS.map((text, i) => (
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
        Weiter zum Kurzcheck
      </button>
    </>
  );
}
