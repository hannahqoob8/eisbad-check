"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/lib/i18n";
import Certificate from "./Certificate";

type Props = {
  open: boolean;
  onClose: () => void;
  onGenerated: () => void;
};

const STORE_KEY = "eisklar-cert-v1";

function formatDate(lang: "de" | "en"): string {
  const d = new Date();
  if (lang === "en") {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  }
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CertificateDialog({ open, onClose, onGenerated }: Props) {
  const { lang, t } = useLang();
  const c = t.certDialog;
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
    const timer = setTimeout(() => nameRef.current?.focus(), 40);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !busy) onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, busy, onClose]);

  if (!mounted || !open) return null;

  const dateStr = formatDate(lang);

  async function generate() {
    const trimmedName = name.trim().replace(/\s+/g, " ");
    if (trimmedName.length < 2) {
      setError(c.errName);
      nameRef.current?.focus();
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError(c.errEmail);
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
          JSON.stringify({
            name: trimmedName,
            email: email.trim(),
            date: dateStr,
            lang,
          })
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
      pdf.save(c.pdfFilename);

      onGenerated();
    } catch {
      setError(c.errPdf);
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
          aria-label={c.title}
        >
          <div className="cert-modal-head">
            <h3 className="cert-modal-title">{c.title}</h3>
            <button
              type="button"
              className="drawer-close"
              aria-label={c.close}
              onClick={onClose}
              disabled={busy}
            >
              ✕
            </button>
          </div>

          <p className="cert-modal-text">{c.text}</p>

          <label className="cert-field">
            <span>{c.nameLabel}</span>
            <input
              ref={nameRef}
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={c.namePlaceholder}
            />
          </label>

          <label className="cert-field">
            <span>{c.emailLabel}</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={c.emailPlaceholder}
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
            {busy ? c.ctaBusy : c.ctaIdle}
          </button>

          <p className="cert-modal-fine">
            {c.fine1}
            <a href="datenschutz/" target="_blank" rel="noopener noreferrer">
              {c.fineLink}
            </a>
            {c.fine2}
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
        <Certificate
          ref={sheetRef}
          name={name.trim() || c.fallbackName}
          dateStr={dateStr}
          cert={t.CERT}
          dateLabel={c.dateLabel}
        />
      </div>
    </>,
    document.body
  );
}
