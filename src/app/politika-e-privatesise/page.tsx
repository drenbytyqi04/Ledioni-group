import type { Metadata } from 'next';
import { Reveal } from '@/components/motion';
import { PageHero } from '@/components/PageHero';
import { site } from '@/data/site';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = {
  title: 'Politika e Privatësisë',
  description:
    'Politika e privatësisë së Ledioni Group SH.P.K.: si i mbledhim, përdorim dhe mbrojmë të dhënat personale që na dërgoni përmes formularit të kontaktit.',
  alternates: { canonical: '/politika-e-privatesise/' },
};

const Contact = () => (
  <>
    <a href={`tel:${site.phoneHref}`}>{site.phone}</a> ose në{' '}
    <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">
      WhatsApp
    </a>
  </>
);

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Politika e Privatësisë" lead="Si i mbledhim dhe i përdorim të dhënat tuaja personale." crumbs={[{ label: 'Ballina', href: '/' }, { label: 'Politika e Privatësisë' }]} />
      <section className="section">
        <div className="container">
          <Reveal className="prose">
            <p className="prose__updated">Përditësuar më: 7 nëntor 2026</p>

            <h2>1. Kush jemi</h2>
            <p>
              Kontrollues i të dhënave është <strong>{site.legalName}</strong>, NUI {site.nui}, me adresë në {site.address.street}, {site.address.village},{' '}
              {site.address.municipality}, {site.address.country}. Për çdo pyetje rreth të dhënave tuaja na kontaktoni në <Contact />.
            </p>

            <h2>2. Cilat të dhëna mbledhim</h2>
            <p>Kur plotësoni formularin e kontaktit në këtë faqe, ne marrim të dhënat që ju vetë na jepni:</p>
            <ul>
              <li>emrin dhe mbiemrin;</li>
              <li>adresën e email-it;</li>
              <li>numrin e telefonit (opsional);</li>
              <li>përmbajtjen e mesazhit tuaj.</li>
            </ul>
            <p>Kjo faqe nuk përdor cookies për reklamim ose ndjekje të vizitorëve.</p>

            <h2>3. Për çfarë i përdorim</h2>
            <p>
              Të dhënat i përdorim vetëm për t’iu përgjigjur kërkesës suaj dhe për komunikim në lidhje me projektin ose shërbimin për të cilin na keni kontaktuar. Nuk i
              shesim, nuk i japim me qira dhe nuk i përdorim për marketing pa pëlqimin tuaj.
            </p>

            <h2>4. Baza ligjore</h2>
            <p>
              Të dhënat përpunohen në bazë të pëlqimit tuaj, të cilin e jepni duke shënuar kutizën përkatëse para dërgimit të formularit, në përputhje me Ligjin Nr.
              06/L-082 për Mbrojtjen e të Dhënave Personale. Pëlqimin mund ta tërhiqni në çdo kohë.
            </p>

            <h2>5. Sa kohë i ruajmë</h2>
            <p>
              Mesazhet i ruajmë për aq kohë sa është e nevojshme për komunikimin me ju dhe për realizimin e kërkesës suaj. Pas kësaj, të dhënat fshihen, përveç rasteve kur
              ligji kërkon ruajtjen e tyre.
            </p>

            <h2>6. Shërbime të palëve të treta</h2>
            <p>Për funksionimin e faqes përdoren disa shërbime të jashtme:</p>
            <ul>
              <li>shërbimi i hostimit (Vercel) dhe, nëse aktivizohet, shërbimi i formularëve përmes të cilit dërgohen mesazhet;</li>
              <li>WhatsApp, kur zgjidhni të na shkruani përmes tij;</li>
              <li>Google Maps, për shfaqjen e hartës së lokacionit;</li>
              <li>Unsplash, nga ku shfaqen fotot ilustruese.</li>
            </ul>
            <p>Këto shërbime mund të përpunojnë të dhëna teknike, si adresa IP, sipas politikave të tyre të privatësisë.</p>

            <h2>7. Të drejtat tuaja</h2>
            <p>
              Keni të drejtë të kërkoni qasje në të dhënat tuaja, korrigjimin ose fshirjen e tyre, kufizimin e përpunimit, si dhe të tërhiqni pëlqimin. Për këto kërkesa
              na kontaktoni në <Contact />. Nëse mendoni se të drejtat tuaja janë shkelur, mund të ankoheni në Agjencinë për Informim dhe Privatësi (AIP).
            </p>

            <h2>8. Ndryshimet</h2>
            <p>Kjo politikë mund të përditësohet herë pas here. Versioni aktual publikohet gjithmonë në këtë faqe.</p>

            <p>
              <a className="link-arrow" href="/#kontakti">
                Kthehu te formulari i kontaktit <Icon name="arrowRight" size={18} />
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
