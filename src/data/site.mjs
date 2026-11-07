// =============================================================
//  Të dhënat kryesore të kompanisë — ndryshojini këtu.
//  (Company data — edit here; every page reads from this file.)
// =============================================================

export const site = {
  name: 'Ledioni Group',
  legalName: 'LEDIONI GROUP SH.P.K.',
  tagline: 'Architecture & Construction',
  nui: '811561308',
  founded: 2021,
  foundingDate: '2021-04-13',
  director: 'Lendita Kryeziu',

  // Domeni i faqes. Në Netlify merret automatikisht nga variabla URL.
  // Nëse keni domen tjetër, vendoseni këtu ose si SITE_URL.
  url: (
    process.env.SITE_URL ||
    process.env.URL || // Netlify
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) || // Vercel
    'https://ledionigroup.com'
  ).replace(/\/$/, ''),

  phone: '+383 49 172 995',
  phoneHref: '+38349172995',
  whatsapp: '38349172995',

  address: {
    street: 'Rr. Bajram Bytyqi, p.n.',
    village: 'Semetisht',
    municipality: 'Suharekë',
    country: 'Kosovë',
    countryCode: 'XK',
  },
  mapQuery: 'Semetisht, Suharekë, Kosovë',

  // Formulari i kontaktit:
  //  - Bosh ('') = përdoret Netlify Forms (funksionon automatikisht kur faqja hostohet në Netlify).
  //  - Ose vendosni një adresë Formspree, p.sh. 'https://formspree.io/f/abcdwxyz'
  //    (ose variablën FORM_ENDPOINT në Vercel/Netlify).
  //  - Në Vercel pa FORM_ENDPOINT: formulari hap WhatsApp me mesazhin të plotësuar.
  formEndpoint: process.env.FORM_ENDPOINT || '',
  formMode: process.env.FORM_ENDPOINT ? 'endpoint' : process.env.VERCEL ? 'whatsapp' : 'netlify',

  // Rrjetet sociale — vendosni linket kur t'i keni. Bosh = ikona nuk shfaqet si link.
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },
};
