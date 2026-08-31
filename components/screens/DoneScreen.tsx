"use client";

import { useState } from "react";
import type { Risk, Today } from "@/lib/state";
import CertificateDialog from "../CertificateDialog";

type Props = {
  risk: Risk;
  today: Today;
};

function variant(risk: Risk, today: Today) {
  if (today === "stop") {
    return {
      headline: "Fertig! Heute noch kein Eisbad.",
      text: "Du kennst die wichtigsten Sicherheitsregeln. Warte mit dem Eisbad, bis Du Dich wieder vollständig fit fühlst.",
      achievement: "Eisbadwissen abgeschlossen",
      achievementSub: "Heute kein Eisbad starten",
    };
  }
  if (risk === "risk") {
    return {
      headline: "Fertig! Vorher noch ärztlich abklären.",
      text: "Du kennst jetzt die wichtigsten Sicherheitsregeln. Kläre vor der Anwendung bitte noch Deine persönliche gesundheitliche Situation medizinisch ab.",
      achievement: "Eisbadwissen abgeschlossen",
      achievementSub: "Vor der Anwendung ärztlich abklären",
    };
  }
  return {
    headline: "Fertig! Du bist bereit für Dein Eisbad.",
    text: "Du kennst jetzt die wichtigsten Grundlagen für einen kontrollierten Einstieg ins Eisbaden.",
    achievement: "Eisbademeister",
    achievementSub: "Grundlagen abgeschlossen",
  };
}

export default function DoneScreen({ risk, today }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const v = variant(risk, today);

  return (
    <>
      <div className="scroll">
        <div className="done-hero">
          <img
            className="done-hero-img"
            src="/images/genesis-man-sunglasses.webp"
            alt=""
          />
        </div>

        <h2 className="h2-done">{v.headline}</h2>
        <p className="lead">{v.text}</p>

        <div className="done-achievement">
          <span className="achievement-check">{v.achievement}</span>
          <span className="achievement-note">
            {`${v.achievementSub}. Dieser Wissensabschluss ist keine medizinische Freigabe.`}
          </span>
        </div>
      </div>

      <div className="foot done-foot">
        {downloaded && (
          <div className="saved-line" role="status">
            Teilnahmebestätigung heruntergeladen.
          </div>
        )}
        <button
          type="button"
          className="btn btn-primary btn-52"
          onClick={() => setDialogOpen(true)}
        >
          Zertifikat runterladen
        </button>
        <p className="powered-by">
          Powered by{" "}
          <a href="https://qoob8.com" target="_blank" rel="noopener noreferrer">
            qoob8
          </a>
        </p>
      </div>

      <CertificateDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onGenerated={() => {
          setDownloaded(true);
          setDialogOpen(false);
        }}
      />
    </>
  );
}
