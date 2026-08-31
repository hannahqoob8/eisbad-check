"use client";

import { useEffect, useRef } from "react";

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
        aria-label="Menü"
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
            Quellen &amp; medizinische Hinweise
          </button>
          <a role="menuitem" href="impressum/" onClick={onClose}>
            Impressum
          </a>
          <a role="menuitem" href="datenschutz/" onClick={onClose}>
            Datenschutz
          </a>

          <div className="app-menu-sep" aria-hidden="true" />

          <a
            role="menuitem"
            className="app-menu-shop"
            href="https://qoob8.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mehr über Eisbaden erfahren
          </a>
          <a
            role="menuitem"
            className="app-menu-shop"
            href="https://qoob8.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eisbad kaufen
          </a>

          <div className="app-menu-brand">Eine Initiative von qoob8</div>
        </div>
      )}
    </div>
  );
}
