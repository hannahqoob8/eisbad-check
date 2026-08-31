"use client";

import { forwardRef, type CSSProperties } from "react";
import { CERT } from "@/lib/content";

type Props = {
  name: string;
  dateStr: string;
};

const grotesk = "var(--font-schibsted), Helvetica, Arial, sans-serif";
const mono = "var(--font-plex-mono), ui-monospace, monospace";

const INK = "#14181a";
const MUTED = "rgba(20,24,26,0.62)";
const FAINT = "rgba(20,24,26,0.45)";
const GREEN = "#17a06b";
const LINE = "rgba(20,24,26,0.14)";
const CARD_BG = "#ffffff";
const CARD_LINE = "rgba(20,24,26,0.08)";

const monoLabel = (color: string): CSSProperties => ({
  fontFamily: mono,
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color,
});

/**
 * A4-Seite der Teilnahmebestaetigung. Wird ausserhalb des Viewports
 * gerendert und per html2canvas -> jsPDF in ein PDF umgewandelt.
 * Feste Pixelmasse (Verhaeltnis ~ 1 : 1.414), damit die Seite 1:1 auf A4 passt.
 */
const Certificate = forwardRef<HTMLDivElement, Props>(function Certificate(
  { name, dateStr },
  ref
) {
  return (
    <div
      ref={ref}
      style={{
        width: 820,
        minHeight: 1160,
        boxSizing: "border-box",
        padding: "56px 60px 48px",
        background: "#f3f0eb",
        color: INK,
        fontFamily: grotesk,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Kopf */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingBottom: 16,
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "-0.02em",
          }}
        >
          Eisklar
        </div>
        <div style={{ fontWeight: 600, fontSize: 13 }}>Powered by qoob8</div>
      </div>

      {/* Titelblock */}
      <div style={{ marginTop: 30 }}>
        <div style={monoLabel(FAINT)}>{CERT.kicker}</div>
        <div
          style={{
            marginTop: 10,
            fontWeight: 600,
            fontSize: 44,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          {name}
        </div>
        <p
          style={{
            margin: "14px 0 0",
            maxWidth: 560,
            fontSize: 14.5,
            lineHeight: 1.55,
            color: MUTED,
          }}
        >
          {CERT.intro}
        </p>
        <div style={{ ...monoLabel(FAINT), marginTop: 18 }}>
          Datum: {dateStr}
        </div>
      </div>

      {/* Trenner */}
      <div style={{ borderTop: `1px solid ${LINE}`, margin: "34px 0 26px" }} />

      <div style={{ fontWeight: 600, fontSize: 22, letterSpacing: "-0.02em" }}>
        {CERT.blockTitle}
      </div>

      {/* Zwei Spalten */}
      <div style={{ display: "flex", gap: 36, marginTop: 20 }}>
        {/* Links: Vor und waehrend der Anwendung */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <div style={monoLabel(GREEN)}>{CERT.practiceLabel}</div>
          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {CERT.practice.map((text, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "11px 13px",
                  background: CARD_BG,
                  border: `1px solid ${CARD_LINE}`,
                  borderRadius: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    color: GREEN,
                    flex: "none",
                    paddingTop: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 12.5, lineHeight: 1.45 }}>{text}</span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                gap: 12,
                padding: "11px 13px",
                background: "rgba(23,160,107,0.1)",
                borderRadius: 10,
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: GREEN,
                  color: "#fff",
                  flex: "none",
                  fontSize: 11,
                  lineHeight: "16px",
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                !
              </span>
              <span style={{ fontSize: 12.5, lineHeight: 1.45 }}>
                {CERT.practiceNote}
              </span>
            </div>
          </div>
        </div>

        {/* Rechts: Gesundheitliche Hinweise */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <div style={monoLabel("#b0601c")}>{CERT.healthLabel}</div>
          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {CERT.health.map((h) => (
              <div
                key={h.title}
                style={{
                  padding: "12px 14px",
                  background: CARD_BG,
                  border: `1px solid ${CARD_LINE}`,
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 12.5,
                    marginBottom: 5,
                  }}
                >
                  {h.title}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    lineHeight: 1.5,
                    color: MUTED,
                  }}
                >
                  {h.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fuss */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 22,
          borderTop: `1px solid ${LINE}`,
          display: "flex",
          gap: 36,
        }}
      >
        <div style={{ flex: "1 1 0" }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>
            {CERT.footerBrandTitle}
          </div>
          <p
            style={{
              margin: "7px 0 0",
              fontSize: 10.5,
              lineHeight: 1.55,
              color: FAINT,
            }}
          >
            {CERT.footerBrandText}
          </p>
        </div>
        <div style={{ flex: "1 1 0" }}>
          <div style={monoLabel(FAINT)}>{CERT.footerNoteLabel}</div>
          <p
            style={{
              margin: "7px 0 0",
              fontSize: 10.5,
              lineHeight: 1.55,
              color: FAINT,
            }}
          >
            {CERT.footerNoteText}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Certificate;
