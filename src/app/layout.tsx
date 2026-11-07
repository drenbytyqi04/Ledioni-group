import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { MotionConfig } from 'motion/react';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { services } from '@/data/content';
import { site } from '@/data/site';
import { getLogoParts } from '@/lib/logo';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700'], variable: '--font-montserrat', display: 'swap' });
const inter = Inter({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Ledioni Group — Ndërtim urash dhe infrastrukture në Kosovë | Suharekë',
    template: '%s | Ledioni Group',
  },
  description:
    'Ledioni Group SH.P.K. është kompani arkitekture dhe ndërtimi nga Suhareka, e specializuar në ndërtimin dhe rehabilitimin e urave, rrugëve dhe infrastrukturës publike në Kosovë.',
  applicationName: site.legalName,
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'sq_AL',
    siteName: site.legalName,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Logoja e Ledioni Group mbi një foto ure' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.jpg'] },
};

export const viewport: Viewport = { themeColor: '#1A1A1A', width: 'device-width', initialScale: 1 };

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': ['GeneralContractor', 'LocalBusiness'],
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: `${site.url}/`,
  logo: `${site.url}/logo.svg`,
  image: `${site.url}/og-image.jpg`,
  description: 'Kompani arkitekture dhe ndërtimi nga Suhareka, e specializuar në ndërtimin dhe rehabilitimin e urave dhe në infrastrukturën publike.',
  telephone: site.phoneHref,
  foundingDate: site.foundingDate,
  taxID: site.nui,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.village,
    addressRegion: site.address.municipality,
    addressCountry: site.address.countryCode,
  },
  areaServed: { '@type': 'Country', name: 'Kosovë' },
  knowsAbout: services.map((s) => s.title),
  sameAs: Object.values(site.social).filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <a className="skip-link" href="#main">
            Kalo te përmbajtja
          </a>
          <Header logo={getLogoParts()} />
          <main id="main">{children}</main>
          <Footer />
          <FloatingButtons />
        </MotionConfig>
      </body>
    </html>
  );
}
