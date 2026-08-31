import type { ReactNode } from "react";

// Wandelt nackte URLs und E-Mail-Adressen in einem String in Links um.
export function Linked({ text }: { text: string }) {
  const parts = text.split(
    /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g
  );
  return (
    <>
      {parts.map((p, i) => {
        if (/^https?:\/\//.test(p)) {
          const m = p.match(/^(.*?)([.,;:)]*)$/) ?? [p, p, ""];
          return (
            <span key={i}>
              <a href={m[1]} target="_blank" rel="noopener noreferrer">
                {m[1]}
              </a>
              {m[2]}
            </span>
          );
        }
        if (/^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/.test(p)) {
          return (
            <a key={i} href={`mailto:${p}`}>
              {p}
            </a>
          );
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

export function P({ children }: { children: string }) {
  return (
    <p>
      <Linked text={children} />
    </p>
  );
}

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="legal-page">
      <header className="legal-head">
        <a className="legal-logo" href="../">
          Eisklar
        </a>
        <a className="legal-back" href="../">
          ← Zurück zum Guide
        </a>
      </header>
      <main className="legal">
        <h1>{title}</h1>
        {updated && <p className="legal-updated">Stand: {updated}</p>}
        {children}
        <p className="legal-updated" style={{ marginTop: 48 }}>
          Eine Initiative von qoob8 · Eisbad.de
        </p>
      </main>
    </div>
  );
}
