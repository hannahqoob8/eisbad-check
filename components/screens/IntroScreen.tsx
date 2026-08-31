"use client";

import { useLang } from "@/lib/i18n";

type Props = {
  onNext: () => void;
};

export default function IntroScreen({ onNext }: Props) {
  const { t, toggleLang } = useLang();

  return (
    <div className="intro">
      {/* Foto vom Kunden (qoob8). Produktion: responsive AVIF/WebP-Varianten. */}
      <img
        className="intro-img"
        src="/images/vorteile-eisbad-qoob8.webp"
        alt="Person im Eisbad mit Eisschollen"
      />
      <div className="intro-grad" />
      <div className="intro-body">
        <div>
          <div className="intro-logo">Eisklar</div>
        </div>
        <div className="intro-bottom">
          <div className="intro-kicker">{t.intro.kicker}</div>
          <h1 className="h1-intro">{t.intro.h1a}</h1>
          <p className="intro-text">{t.intro.text}</p>
          <div className="intro-cta-wrap">
            <button
              type="button"
              className="btn btn-primary btn-on-photo"
              onClick={onNext}
            >
              {t.intro.cta}
            </button>
            <p className="intro-initiative">{t.intro.initiative}</p>
            <button
              type="button"
              className="intro-lang"
              onClick={toggleLang}
              aria-label={t.intro.switchAria}
            >
              <span aria-hidden="true">{t.intro.switchFlag}</span>
              {t.intro.switchLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
