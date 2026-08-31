"use client";

import { TODAY } from "@/lib/content";
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
  return (
    <>
      <h2 className="h2 h2--sm">Manchmal ist nicht heute der richtige Tag.</h2>

      <div className="scroll stack-9">
        {TODAY.map((c) => (
          <div key={c.label} className="card">
            <div className="card-title">{c.label}</div>
            <p className="card-text">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="foot foot-stack">
        <div className="flow-question">Trifft heute etwas davon auf Dich zu?</div>
        <div className="choice-row">
          <button
            type="button"
            className={`choice${today === "fit" ? " sel-green" : ""}`}
            aria-pressed={today === "fit"}
            onClick={onPickFit}
          >
            Nein, ich fühle mich fit
          </button>
          <button
            type="button"
            className={`choice${today === "stop" ? " sel-orange" : ""}`}
            aria-pressed={today === "stop"}
            onClick={onPickStop}
          >
            Ja oder ich bin unsicher
          </button>
        </div>

        {today === "stop" && (
          <div className="warnbox" role="status">
            <div className="warnbox-title">Heute lieber pausieren.</div>
            <p className="warnbox-text">
              Du kannst den Guide abschließen, solltest heute aber kein Eisbad
              starten.
            </p>
          </div>
        )}

        <button type="button" className="btn btn-primary" onClick={onNext}>
          Weiter
        </button>
      </div>
    </>
  );
}
