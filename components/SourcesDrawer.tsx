"use client";

import { useEffect, useRef } from "react";
import { SOURCES, BRAND_DOMAIN } from "@/lib/content";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SourcesDrawer({ open, onClose }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    // Fokus in den Dialog setzen
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && sheetRef.current) {
        const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="drawer-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={sheetRef}
        className="drawer-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Quellen und medizinische Hinweise"
      >
        <div className="drawer-head">
          <h3 className="drawer-title">Quellen und medizinische Hinweise</h3>
          <button
            type="button"
            ref={closeRef}
            className="drawer-close"
            aria-label="Schließen"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="drawer-block">
          <span>Diese Anwendung vermittelt allgemeine Sicherheitsinformationen.</span>
          <span>Sie ersetzt keine ärztliche Beratung, Diagnose oder Freigabe.</span>
          <span>
            Bei gesundheitlichen Beschwerden oder Unsicherheit ist medizinischer
            Rat einzuholen.
          </span>
        </div>

        <div className="drawer-meta">
          <span>Medizinisch geprüft durch: Platzhalter</span>
          <span>Letzte inhaltliche Prüfung: Platzhalter</span>
          <span>Version der Inhalte: Platzhalter</span>
        </div>

        <div className="drawer-src-label">ORIENTIERUNGSQUELLEN</div>
        <div className="drawer-src">
          {SOURCES.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label} →
            </a>
          ))}
        </div>

        <div className="drawer-src-label">RECHTLICHES</div>
        <div className="drawer-src">
          <a href="impressum/">Impressum →</a>
          <a href="datenschutz/">Datenschutzerklärung →</a>
        </div>

        <div className="drawer-foot">Eine Initiative von qoob8 · {BRAND_DOMAIN}</div>
      </div>
    </div>
  );
}
