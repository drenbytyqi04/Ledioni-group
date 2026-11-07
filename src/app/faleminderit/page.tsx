import type { Metadata } from 'next';
import { StatusPage } from '@/components/StatusPage';

export const metadata: Metadata = { title: 'Faleminderit', description: 'Mesazhi juaj u dërgua me sukses.', robots: { index: false } };

export default function ThanksPage() {
  return (
    <StatusPage
      eyebrow="Mesazhi u dërgua"
      title="Faleminderit!"
      text="Mesazhi juaj u pranua me sukses. Do t’ju kontaktojmë sa më shpejt."
      actions={
        <a className="btn btn--gold btn--lg" href="/">
          Kthehu në Ballina
        </a>
      }
    />
  );
}
