import type { Metadata } from "next";
import LegalLayout, { P } from "@/components/LegalLayout";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Impressum – Eisklar",
  description: "Impressum und Anbieterkennzeichnung für den Eisklar-Guide auf Eisbad.de.",
};

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {COMPANY.name}
        <br />
        {COMPANY.street}
        <br />
        {COMPANY.postalCity}
        <br />
        {COMPANY.country}
      </p>

      <h2>Vertreten durch</h2>
      <P>{`Geschäftsführer: ${COMPANY.managers}`}</P>

      <h2>Kontakt</h2>
      <P>{`E-Mail: ${COMPANY.email}`}</P>

      <h2>Registereintrag</h2>
      <P>{`Eintragung im Handelsregister: ${COMPANY.register}`}</P>

      <h2>Umsatzsteuer-ID</h2>
      <P>
        {`Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: ${COMPANY.vatId}`}
      </P>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {COMPANY.contentResponsible}
        <br />
        Anschrift wie oben
      </p>

      <h2>EU-Streitschlichtung</h2>
      <P>
        {"Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben in diesem Impressum."}
      </P>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <P>
        {"Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit."}
      </P>

      <h2>Bildnachweise</h2>
      <P>
        {"Eigene Fotografien sowie KI-generierte Visualisierungen, verwendet im Rahmen der jeweils geltenden Lizenzen."}
      </P>

      <h2>Haftung für Inhalte</h2>
      <P>
        {"Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen."}
      </P>

      <h2>Haftung für Links</h2>
      <P>
        {"Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen."}
      </P>
    </LegalLayout>
  );
}
