"use client";

import { useT } from "@/lib/i18n";

type Props = {
  progress: number; // 0..100
  stepLabel: string;
  onBack: () => void;
};

export default function AppHeader({ progress, stepLabel, onBack }: Props) {
  const t = useT();
  return (
    <div className="hdr">
      <button
        type="button"
        className="hdr-back"
        aria-label={t.header.back}
        onClick={onBack}
      >
        ←
      </button>
      <div
        className="hdr-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label={t.header.progress}
      >
        <div className="hdr-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="hdr-step">{stepLabel}</span>
    </div>
  );
}
