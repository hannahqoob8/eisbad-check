"use client";

import { useEffect, useRef } from "react";
import { SOURCES } from "@/lib/content";
import { useT } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SourcesDrawer({ open, onClose }: Props) {
  const t = useT();
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
        aria-label={t.drawer.title}
      >
        <div className="drawer-head">
          <h3 className="drawer-title">{t.drawer.title}</h3>
          <button
            type="button"
            ref={closeRef}
            className="drawer-close"
            aria-label={t.drawer.close}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="drawer-block">
          {t.drawer.block.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <div className="drawer-meta">
          {t.drawer.meta.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <div className="drawer-src-label">{t.drawer.srcLabel}</div>
        <div className="drawer-src">
          {SOURCES.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label} →
            </a>
          ))}
        </div>

        <div className="drawer-src-label">{t.drawer.legalLabel}</div>
        <div className="drawer-src">
          <a href="impressum/">{t.drawer.impressumLink}</a>
          <a href="datenschutz/">{t.drawer.datenschutzLink}</a>
        </div>

        <div className="drawer-foot">{t.drawer.foot}</div>
      </div>
    </div>
  );
}
