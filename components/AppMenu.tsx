"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/lib/i18n";

type Props = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onOpenInfo: () => void; // oeffnet den Quellen-/Hinweise-Drawer
  onPhoto?: boolean; // true auf dem Intro-Foto -> helle Darstellung
};

export default function AppMenu({
  open,
  onToggle,
  onClose,
  onOpenInfo,
  onPhoto = false,
}: Props) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open, onClose]);

  return (
    <div
      className={`app-menu${onPhoto ? " app-menu--on-photo" : ""}`}
      ref={ref}
    >
      <button
        type="button"
        className="app-menu-btn"
        aria-label={t.menu.label}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {open && (
        <div className="app-menu-panel" role="menu">
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onClose();
              onOpenInfo();
            }}
          >
            {t.menu.sources}
          </button>
          <a role="menuitem" href="impressum/" onClick={onClose}>
            {t.menu.impressum}
          </a>
          <a role="menuitem" href="datenschutz/" onClick={onClose}>
            {t.menu.datenschutz}
          </a>

          <div className="app-menu-sep" aria-hidden="true" />

          <a
            role="menuitem"
            className="app-menu-shop"
            href="https://qoob8.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.menu.learnMore}
          </a>
          <a
            role="menuitem"
            className="app-menu-shop"
            href="https://qoob8.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.menu.shop}
          </a>

          <div className="app-menu-brand">{t.menu.brand}</div>
        </div>
      )}
    </div>
  );
}
