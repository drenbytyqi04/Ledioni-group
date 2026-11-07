import type { Metadata } from 'next';
import { StatusPage } from '@/components/StatusPage';

export const metadata: Metadata = { title: 'Faqja nuk u gjet (404)', robots: { index: false } };

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="Faqja nuk u gjet"
      text="Faqja që kërkoni nuk ekziston ose është zhvendosur. Kthehuni në ballinë ose na kontaktoni."
      actions={
        <>
          <a className="btn btn--gold btn--lg" href="/">
            Kthehu në Ballina
          </a>
          <a className="btn btn--outline btn--lg" href="/#kontakti">
            Na Kontaktoni
          </a>
        </>
      }
    />
  );
}
