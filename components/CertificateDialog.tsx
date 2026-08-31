"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Certificate from "./Certificate";

type Props = {
  open: boolean;
  onClose: () => void;
  onGenerated: () => void;
};

const STORE_KEY = "eisklar-cert-v1";

function todayDe(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CertificateDialog({ open, onClose, onGenerated }: Props) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setBusy(false);
    const t = setTimeout(() => nameRef.current?.focus(), 40);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !busy) onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, busy, onClose]);

  if (!mounted || !open) return null;

  const dateStr = todayDe();

  async function generate() {
    const trimmedName = name.trim().replace(/\s+/g, " ");
    if (trimmedName.length < 2) {
      setError("Bitte gib Deinen vollständigen Namen ein.");
      nameRef.current?.focus();
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }

    setError(null);
    setBusy(true);
    try {
      // localStorage: Name + E-Mail bleiben vorerst nur im Browser.
      // TODO: an das qoob8-E-Mail-Tool anbinden, sobald verfügbar.
      try {
        localStorage.setItem(
          STORE_KEY,
          JSON.stringify({ name: trimmedName, email: email.trim(), date: dateStr })
        );
      } catch {
        /* ignore */
      }

      if (document.fonts?.ready) await document.fonts.ready;

      const [{ default: html2canvas }, { jsPDF: JsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const node = sheetRef.current;
      if (!node) throw new Error("no node");

      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: "#f3f0eb",
        useCORS: true,
        logging: false,
        windowWidth: node.offsetWidth,
        windowHeight: node.offsetHeight,
      });

      const img = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      // Seitenverhaeltnis des Sheets auf die A4-Breite skalieren.
      const imgH = (canvas.height / canvas.width) * pageW;
      pdf.addImage(img, "JPEG", 0, 0, pageW, Math.min(imgH, pageH));
      pdf.save("eisklar-teilnahmebestaetigung.pdf");

      onGenerated();
    } catch {
      setError(
        "Das PDF konnte nicht erstellt werden. Bitte versuche es noch einmal."
      );
      setBusy(false);
    }
  }

  return createPortal(
    <>
      <div
        className="cert-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget && !busy) onClose();
        }}
      >
        <div
          className="cert-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Zertifikat herunterladen"
        >
          <div className="cert-modal-head">
            <h3 className="cert-modal-title">Zertifikat herunterladen</h3>
            <button
              type="button"
              className="drawer-close"
              aria-label="Schließen"
              onClick={onClose}
              disabled={busy}
            >
              ✕
            </button>
          </div>

          <p className="cert-modal-text">
            Trag Deinen Namen ein — er erscheint auf der Teilnahmebestätigung.
          </p>

          <label className="cert-field">
            <span>Vor- und Nachname</span>
            <input
              ref={nameRef}
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Vorname Nachname"
            />
          </label>

          <label className="cert-field">
            <span>E-Mail-Adresse</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@beispiel.de"
            />
          </label>

          {error && (
            <div className="cert-error" role="alert">
              {error}
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary btn-52"
            onClick={generate}
            disabled={busy}
          >
            {busy ? "PDF wird erstellt …" : "Zertifikat erstellen"}
          </button>

          <p className="cert-modal-fine">
            Name und E-Mail werden aktuell nur lokal in Deinem Browser
            gespeichert und nicht übermittelt. Mehr dazu in der{" "}
            <a href="datenschutz/" target="_blank" rel="noopener noreferrer">
              Datenschutzerklärung
            </a>
            .
          </p>
        </div>
      </div>

      {/* Off-Screen-Vorlage fuer die PDF-Erzeugung */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: -100000,
          top: 0,
          width: 820,
          pointerEvents: "none",
        }}
      >
        <Certificate ref={sheetRef} name={name.trim() || "Vorname Nachname"} dateStr={dateStr} />
      </div>
    </>,
    document.body
  );
}
