"use client";

type Props = {
  onNext: () => void;
};

export default function IntroScreen({ onNext }: Props) {
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
          <div className="intro-kicker">3 Minuten. Mehr braucht es nicht.</div>
          <h1 className="h1-intro">Bereit fürs Eis?</h1>
          <p className="intro-text">
            In 3 Minuten weißt Du, wie Du Dich vorbereitest, kontrolliert
            einsteigst und merkst, wann es Zeit ist, wieder rauszugehen.
          </p>
          <div className="intro-cta-wrap">
            <button
              type="button"
              className="btn btn-primary btn-on-photo"
              onClick={onNext}
            >
              Ich bin bereit
            </button>
            <p className="intro-initiative">Eine Initiative von qoob8</p>
          </div>
        </div>
      </div>
    </div>
  );
}
