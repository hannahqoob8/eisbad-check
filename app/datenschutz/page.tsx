import type { Metadata } from "next";
import LegalLayout, { P } from "@/components/LegalLayout";
import {
  COMPANY,
  LEGAL_UPDATED,
  DS_SERVICES,
  DS_SOCIAL,
  dsParagraphs,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Eisklar",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten beim Eisklar-Guide auf Eisbad.de.",
};

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung" updated={LEGAL_UPDATED}>
      <h2>1. Einleitung</h2>
      <P>
        {"Im Folgenden informieren wir über die Verarbeitung personenbezogener Daten bei der Nutzung unserer Website eisbad.de einschließlich des Eisklar-Guides sowie unserer Profile in Sozialen Medien."}
      </P>
      <P>
        {"Personenbezogene Daten sind alle Daten, die auf eine konkrete natürliche Person beziehbar sind, z. B. ihr Name oder ihre IP-Adresse."}
      </P>

      <h3>1.1 Kontaktdaten</h3>
      <P>
        {`Verantwortlicher gem. Art. 4 Abs. 7 EU-Datenschutz-Grundverordnung (DSGVO) ist die ${COMPANY.name}, ${COMPANY.street}, ${COMPANY.postalCity}, ${COMPANY.country}, E-Mail: ${COMPANY.email}. Gesetzlich vertreten werden wir durch ${COMPANY.contentResponsible}.`}
      </P>

      <h3>1.2 Umfang der Datenverarbeitung, Verarbeitungszwecke und Rechtsgrundlagen</h3>
      <P>
        {"Den Umfang der Verarbeitung der Daten, Verarbeitungszwecke und Rechtsgrundlagen führen wir im Detail weiter unten aus. Als Rechtsgrundlage für eine Datenverarbeitung kommen grundsätzlich die folgenden in Betracht:"}
      </P>
      <ul>
        <li>
          Art. 6 Abs. 1 S. 1 lit. a DSGVO für Verarbeitungsvorgänge, für die wir
          eine Einwilligung einholen.
        </li>
        <li>
          Art. 6 Abs. 1 S. 1 lit. b DSGVO, soweit die Verarbeitung zur Erfüllung
          eines Vertrages oder für vorvertragliche Maßnahmen erforderlich ist.
        </li>
        <li>
          Art. 6 Abs. 1 S. 1 lit. c DSGVO, wenn wir mit der Verarbeitung eine
          rechtliche Verpflichtung erfüllen.
        </li>
        <li>
          Art. 6 Abs. 1 S. 1 lit. f DSGVO, wenn wir uns auf berechtigte Interessen
          berufen können, z. B. für technisch erforderliche Cookies.
        </li>
      </ul>

      <h3>1.3 Datenverarbeitung außerhalb des EWR</h3>
      <P>
        {"Soweit wir Daten an Dienstleister oder sonstige Dritte außerhalb des EWR übermitteln, erfolgt dies nur, wenn die besonderen Voraussetzungen der Art. 44 ff. DSGVO erfüllt sind. Die Datenverarbeitung erfolgt dann auf Grundlage von Angemessenheitsbeschlüssen der EU-Kommission (Art. 45 DSGVO) oder geeigneter Garantien wie Standardvertragsklauseln (Art. 46 Abs. 2 lit. b/c DSGVO). Viele Anbieter haben über die Standardvertragsklauseln hinausgehende vertragliche Garantien abgegeben, etwa zur Verschlüsselung der Daten oder zur Benachrichtigung Betroffener bei behördlichen Zugriffen."}
      </P>

      <h3>1.4 Speicherdauer</h3>
      <P>
        {"Sofern nicht im Rahmen dieser Datenschutzerklärung ausdrücklich angegeben, werden die bei uns gespeicherten Daten gelöscht, sobald sie für ihre Zweckbestimmung nicht mehr erforderlich sind und der Löschung keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Andernfalls wird ihre Verarbeitung eingeschränkt, d. h. die Daten werden gesperrt und nicht für andere Zwecke verarbeitet."}
      </P>

      <h3>1.5 Rechte der Betroffenen</h3>
      <P>
        {"Betroffene haben gegenüber uns folgende Rechte hinsichtlich der sie betreffenden personenbezogenen Daten:"}
      </P>
      <ul>
        <li>Recht auf Auskunft,</li>
        <li>Recht auf Berichtigung oder Löschung,</li>
        <li>Recht auf Einschränkung der Verarbeitung,</li>
        <li>Recht auf Widerspruch gegen die Verarbeitung,</li>
        <li>Recht auf Datenübertragbarkeit,</li>
        <li>Recht, eine erteilte Einwilligung jederzeit zu widerrufen.</li>
      </ul>
      <P>
        {"Betroffene haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung ihrer personenbezogenen Daten zu beschweren. Kontaktdaten der Aufsichtsbehörden sind unter https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html abrufbar."}
      </P>

      <h3>1.6 Pflicht zur Bereitstellung von Daten</h3>
      <P>
        {"Kunden, Interessenten oder Dritte müssen uns im Rahmen einer Geschäftsbeziehung nur diejenigen personenbezogenen Daten bereitstellen, die für die Begründung, Durchführung und Beendigung der Geschäftsbeziehung erforderlich sind oder zu deren Erhebung wir gesetzlich verpflichtet sind. Ohne diese Daten können wir einen Vertrag in der Regel nicht schließen oder eine Leistung nicht erbringen. Pflichtangaben sind als solche gekennzeichnet."}
      </P>

      <h3>1.7 Keine automatische Entscheidungsfindung im Einzelfall</h3>
      <P>
        {"Wir nutzen grundsätzlich keine vollautomatisierte Entscheidungsfindung gemäß Art. 22 DSGVO. Sollten wir diese Verfahren in Einzelfällen einsetzen, informieren wir hierüber gesondert, sofern dies gesetzlich geboten ist."}
      </P>

      <h3>1.8 Kontaktaufnahme</h3>
      <P>
        {"Bei der Kontaktaufnahme mit uns, z. B. per E-Mail, werden die uns mitgeteilten Daten (z. B. Name und E-Mail-Adresse) von uns gespeichert, um Fragen zu beantworten. Rechtsgrundlage ist unser berechtigtes Interesse (Art. 6 Abs. 1 S. 1 lit. f DSGVO), an uns gerichtete Anfragen zu beantworten. Die Daten löschen wir, sobald die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen."}
      </P>

      <h2>2. Eisklar-Guide (eisbad.de/eisklar)</h2>
      <P>
        {"Der Eisklar-Guide ist eine reine Client-Anwendung. Er wird als statische Website ausgeliefert und läuft vollständig in Deinem Browser."}
      </P>
      <h3>2.1 Fortschritt und Antworten</h3>
      <P>
        {"Dein Fortschritt im Guide und Deine Auswahl im Kurzcheck werden ausschließlich lokal in Deinem Browser gespeichert (localStorage, Schlüssel „eisklar-progress-v1“). Diese Daten werden nicht an uns oder an Dritte übertragen. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG bzw. Art. 6 Abs. 1 S. 1 lit. f DSGVO (Bereitstellung des von Dir gewünschten Dienstes). Du kannst die Daten jederzeit über die Einstellungen Deines Browsers löschen."}
      </P>
      <h3>2.2 Gesundheitsbezogene Angaben</h3>
      <P>
        {"Die im Kurzcheck abgefragten gesundheitsbezogenen Angaben verlassen Dein Gerät nicht und werden von uns nicht erhoben."}
      </P>
      <h3>2.3 Teilnahmebestätigung (PDF)</h3>
      <P>
        {"Wenn Du eine Teilnahmebestätigung erstellst, gibst Du Deinen Namen und Deine E-Mail-Adresse ein. Das PDF wird direkt in Deinem Browser erzeugt; Dein Name erscheint darin. Name und E-Mail-Adresse werden derzeit ausschließlich lokal in Deinem Browser gespeichert (Schlüssel „eisklar-cert-v1“) und nicht an einen Server übermittelt. Sollte künftig eine Übermittlung oder weitere Verarbeitung erfolgen (z. B. Zusendung oder Newsletter), informieren wir an dieser Stelle gesondert und holen, soweit erforderlich, Deine Einwilligung nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ein."}
      </P>
      <h3>2.4 Schriften</h3>
      <P>
        {"Alle Schriftarten werden von unserem eigenen Server ausgeliefert. Es besteht keine Verbindung zu Google Fonts."}
      </P>
      <h3>2.5 Offline-Nutzung (Service Worker)</h3>
      <P>
        {"Zur Offline-Nutzung legt ein Service Worker die Programmdateien im Cache Deines Browsers ab. Dabei werden keine personenbezogenen Daten an uns übertragen."}
      </P>

      <h2>3. Newsletter</h2>
      <P>
        {"Interessenten haben die Möglichkeit, einen kostenlosen Newsletter zu abonnieren. Wir verarbeiten die bei der Anmeldung angegebenen Daten ausschließlich für den Versand des Newsletters. Die Anmeldung erfolgt durch eine eindeutige Handlung, mit der Interessenten ihr Einverständnis in die Verarbeitung erklären; Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. a DSGVO. Die Einwilligung kann jederzeit widerrufen werden, z. B. über den Abmeldelink im Newsletter oder per Hinweis an unsere oben genannte E-Mail-Adresse. Die Verarbeitung bis zum Widerruf bleibt rechtmäßig."}
      </P>
      <P>
        {"Kunden, die bereits Waren oder Leistungen von uns bezogen haben, können wir auf Grundlage von Art. 6 Abs. 1 S. 1 lit. f DSGVO (Direktwerbung, Erwägungsgrund 47 DSGVO) per E-Mail über eigene ähnliche Angebote informieren, solange sie dem nicht widersprochen haben."}
      </P>
      <P>
        {"Wir versenden Newsletter mit dem Tool Klaviyo der Klaviyo, Inc., 125 Summer St, Floor 6, Boston, MA 02111, USA. Weitere Informationen: https://www.klaviyo.com/privacy/policy."}
      </P>

      <h2>4. Datenverarbeitung auf unserer Website</h2>

      <h3>4.1 Hinweis für Websitebesucher aus Deutschland</h3>
      <P>
        {"Unsere Website speichert Informationen auf Deinem Endgerät (z. B. Cookies) oder greift auf dort bereits gespeicherte Informationen zu (z. B. IP-Adressen). Soweit dies unbedingt erforderlich ist, um den ausdrücklich gewünschten Dienst bereitzustellen oder die IT-Sicherheit zu gewährleisten, erfolgt dies auf Grundlage von § 25 Abs. 2 Nr. 2 TDDDG. Im Übrigen erfolgt dieser Zugriff auf Grundlage Deiner Einwilligung (§ 25 Abs. 1 TDDDG). Die nachgelagerte Datenverarbeitung richtet sich nach den folgenden Abschnitten und der DSGVO."}
      </P>

      <h3>4.2 Informatorische Nutzung der Website</h3>
      <P>
        {"Bei der rein informatorischen Nutzung erheben wir die personenbezogenen Daten, die Dein Browser an unseren Server übermittelt, um die Stabilität und Sicherheit der Website zu gewährleisten (Art. 6 Abs. 1 S. 1 lit. f DSGVO). Diese Daten sind:"}
      </P>
      <ul>
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit der Anfrage</li>
        <li>Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
        <li>Inhalt der Anfrage (konkrete Seite)</li>
        <li>Zugriffsstatus / HTTP-Statuscode</li>
        <li>jeweils übertragene Datenmenge</li>
        <li>Website, von der die Anfrage kommt</li>
        <li>Browser, Betriebssystem und dessen Oberfläche</li>
        <li>Sprache und Version der Browsersoftware</li>
      </ul>
      <P>
        {"Diese Daten werden in Logfiles gespeichert und gelöscht, wenn ihre Speicherung nicht mehr erforderlich ist, spätestens nach 14 Tagen."}
      </P>

      <h3>4.3 Webhosting und Auslieferung der Website</h3>
      <P>
        {"Unsere Website wird bei einem Hosting-Dienstleister betrieben, der die über die Website übermittelten personenbezogenen Daten (z. B. Inhalts-, Nutzungs-, Meta-/Kommunikations- oder Kontaktdaten) in unserem Auftrag verarbeitet. Es ist unser berechtigtes Interesse, eine Website zur Verfügung zu stellen (Art. 6 Abs. 1 S. 1 lit. f DSGVO)."}
      </P>

      <h3>4.4 Kundenkonto</h3>
      <P>
        {"Besucher können auf unserer Website ein Kundenkonto eröffnen. Die in diesem Zusammenhang angeforderten Daten verarbeiten wir auf Grundlage der Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO). Die Einwilligung kann jederzeit widerrufen werden; die Rechtmäßigkeit der Verarbeitung bis zum Widerruf bleibt unberührt."}
      </P>

      <h3>4.5 Angebot von Waren</h3>
      <P>
        {"Wir bieten über unsere Website Waren an. Im Rahmen der Bestellung verarbeiten wir Name, Anschrift, E-Mail-Adresse und optional die Telefonnummer zur Erfüllung des Vertrags (Art. 6 Abs. 1 S. 1 lit. b DSGVO). Diese Daten geben wir an die am Versand beteiligten Dienstleister weiter, soweit dies für die Bestellabwicklung erforderlich ist."}
      </P>

      <h3>4.6 Zahlungsdienstleister</h3>
      <P>
        {"Zur Abwicklung von Zahlungen nutzen wir Zahlungsdienstleister, die datenschutzrechtlich eigene Verantwortliche sind. Soweit diese im Bestellprozess eingegebene Daten und Zahlungsdaten erhalten, erfüllen wir damit den mit unseren Kunden geschlossenen Vertrag (Art. 6 Abs. 1 S. 1 lit. b DSGVO). Eingesetzt werden u. a. Amazon Payments Europe s.c.a., American Express Europe S.A., Apple Inc. (Apple Pay), giropay GmbH, Google Ireland Limited (Google Pay), Klarna Bank AB (publ), Mastercard Europe SA, PayPal (Europe) S.à r.l. et Cie S.C.A., Shopify Inc. (Shop Pay), Stripe Payments Europe Ltd. und Visa Europe Services Inc."}
      </P>

      <h3>4.7 Technisch notwendige Cookies</h3>
      <P>
        {"Unsere Website setzt Cookies. Soweit diese für den Betrieb der Website oder ihre Funktionen erforderlich sind, ist Rechtsgrundlage Art. 6 Abs. 1 S. 1 lit. f DSGVO. Dazu zählen z. B. Cookies, die Spracheinstellungen oder den Warenkorb speichern, Log-in-Daten sichern oder von Zahlungsanbietern zur Zahlungsabwicklung gesetzt werden, ohne das Nutzerverhalten zu analysieren."}
      </P>

      <h3>4.8 Drittanbieter</h3>
      {DS_SERVICES.map((s) => (
        <div key={s.n}>
          <h4>{s.heading}</h4>
          {dsParagraphs(s).map((para, i) => (
            <P key={i}>{para}</P>
          ))}
        </div>
      ))}

      <h2>5. Datenverarbeitung auf Social-Media-Plattformen</h2>
      <P>
        {"Wir sind in Sozialen Netzwerken vertreten, um unsere Organisation und unsere Leistungen vorzustellen. Die Betreiber dieser Netzwerke verarbeiten Daten ihrer Nutzer regelmäßig zu Werbezwecken und erstellen aus dem Nutzungsverhalten Nutzerprofile. Es ist möglich, dass Betreiber oder ihre Server außerhalb der EU sitzen und Daten dort verarbeiten. Wenn Nutzer über unsere Profile mit uns in Kontakt treten, verarbeiten wir die mitgeteilten Daten, um die Anfragen zu beantworten (Art. 6 Abs. 1 S. 1 lit. f DSGVO)."}
      </P>
      {DS_SOCIAL.map((sn) => (
        <div key={sn.heading}>
          <h4>{sn.heading}</h4>
          <P>{sn.text}</P>
        </div>
      ))}

      <h2>6. Änderungen dieser Datenschutzerklärung</h2>
      <P>
        {"Wir behalten uns das Recht vor, diese Datenschutzerklärung mit Wirkung für die Zukunft zu ändern. Die jeweils aktuelle Version ist auf dieser Seite verfügbar."}
      </P>

      <h2>7. Fragen und Kommentare</h2>
      <P>
        {`Für Fragen oder Kommentare zu dieser Datenschutzerklärung stehen wir gern unter ${COMPANY.email} zur Verfügung.`}
      </P>
    </LegalLayout>
  );
}
