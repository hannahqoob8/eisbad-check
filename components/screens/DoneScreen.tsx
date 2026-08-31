"use client";

import { useState } from "react";
import type { Risk, Today } from "@/lib/state";
import { useT } from "@/lib/i18n";
import CertificateDialog from "../CertificateDialog";

type Props = {
  risk: Risk;
  today: Today;
};

export default function DoneScreen({ risk, today }: Props) {
  const t = useT();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const v =
    today === "stop"
      ? t.done.stop
      : risk === "risk"
        ? t.done.risk
        : t.done.ready;

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
            {`${v.achievementSub}. ${t.done.notMedicalRelease}`}
          </span>
        </div>
      </div>

      <div className="foot done-foot">
        {downloaded && (
          <div className="saved-line" role="status">
            {t.done.downloadedLine}
          </div>
        )}
        <button
          type="button"
          className="btn btn-primary btn-52"
          onClick={() => setDialogOpen(true)}
        >
          {t.done.ctaDownload}
        </button>
        <p className="powered-by">
          {t.done.poweredBy}{" "}
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
