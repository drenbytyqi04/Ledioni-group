// =============================================================
//  Tekstet e faqes. Të gjitha të dhënat bazohen në informacione
//  reale të kompanisë (ARBK / e-Prokurimi). Mos shtoni fakte të pa verifikuara.
// =============================================================
import { images, type Img } from './images';

export type Service = { id: string; icon: string; title: string; short?: string; text: string; image: Img; featured?: boolean };
export type Project = {
  slug: string; title: string; municipality: string; location: string; year: number;
  category: 'ura' | 'rehabilitim'; work: string; summary: string; description: string[];
  image: Img; gallery: Img[];
};
export type Stat = { value: number; label: string; prefix?: string; suffix?: string; plain?: boolean };

export const stats: Stat[] = [
  { value: 2021, label: 'Viti i themelimit', prefix: 'Që nga', plain: true },
  { value: 6, label: 'Projekte publike të realizuara' },
  { value: 3, label: 'Komuna partnere' },
  { value: 100, suffix: '%', label: 'Përkushtim ndaj cilësisë' },
];

export const values = [
  { icon: 'shield', title: 'Cilësi', text: 'Materiale të verifikuara dhe zbatim i saktë sipas projektit.' },
  { icon: 'helmet', title: 'Siguri', text: 'Rregullat e sigurisë në punë zbatohen në çdo kantier.' },
  { icon: 'clock', title: 'Afate të respektuara', text: 'Planifikim i qartë i punimeve dhe i fazave të projektit.' },
  { icon: 'eye', title: 'Transparencë', text: 'Komunikim i hapur me investitorin në çdo fazë.' },
];

export const services: Service[] = [
  {
    id: 'ura',
    icon: 'bridge',
    title: 'Ndërtimi i urave dhe tuneleve',
    text: 'Specializimi ynë kryesor: ndërtimi, zgjerimi dhe rehabilitimi i urave për infrastrukturën publike.',
    image: images.svcBridges,
    featured: true,
  },
  { id: 'rruge', icon: 'road', title: 'Ndërtimi i rrugëve', text: 'Ndërtim dhe rregullim i rrugëve, nga përgatitja e bazës deri te shtresat përfundimtare.', image: images.svcRoads },
  { id: 'objekte', icon: 'building', title: 'Objekte banesore dhe afariste', text: 'Ndërtim i objekteve banesore dhe jobanesore sipas projektit dhe standardeve në fuqi.', image: images.svcBuildings },
  { id: 'arkitekture', icon: 'compass', title: 'Arkitekturë dhe projektim', text: 'Projektim arkitektonik që lidh funksionin, estetikën dhe buxhetin e investitorit.', image: images.svcArchitecture },
  { id: 'inxhinieri', icon: 'ruler', title: 'Inxhinieri dhe këshillim teknik', text: 'Këshillim teknik dhe mbështetje inxhinierike gjatë planifikimit dhe zbatimit.', image: images.svcEngineering },
  { id: 'uje', icon: 'pipe', short: 'Ujësjellës dhe kanalizime', title: 'Ujësjellës, kanalizime dhe tubacione', text: 'Ndërtim i rrjeteve të ujit, kanalizimeve dhe tubacioneve për komunitetet.', image: images.svcWater },
  { id: 'instalime', icon: 'bolt', title: 'Instalime elektrike dhe hidraulike, ngrohje e klimatizim', text: 'Instalime elektrike, hidraulike, të ngrohjes dhe të klimatizimit në objekte.', image: images.svcElectrical },
  { id: 'terreni', icon: 'excavator', title: 'Demolim dhe përgatitje e terrenit', text: 'Demolim i objekteve ekzistuese dhe përgatitje e vendpunishtes para ndërtimit.', image: images.svcSitePrep },
  { id: 'perfundimtare', icon: 'trowel', title: 'Punime përfundimtare', text: 'Suvatim dhe finalizim i punëve të brendshme e të jashtme të ndërtesave.', image: images.svcFinishing },
];

export const processSteps = [
  { icon: 'chat', title: 'Konsultimi', text: 'Takohemi me investitorin, sqarojmë kërkesat, lokacionin dhe afatet e projektit.' },
  { icon: 'compass', title: 'Projektimi dhe Planifikimi', text: 'Përgatisim zgjidhjen teknike, planin e punimeve dhe organizimin e kantierit.' },
  { icon: 'helmet', title: 'Ndërtimi', text: 'Zbatojmë punimet me ekipin tonë, duke ndjekur projektin dhe rregullat e sigurisë.' },
  { icon: 'check', title: 'Dorëzimi dhe Mbikëqyrja', text: 'Dorëzojmë objektin e përfunduar dhe qëndrojmë pranë investitorit pas dorëzimit.' },
];

export const whyUs = [
  { icon: 'landmark', title: 'Përvojë në projekte publike', text: 'Kemi realizuar projekte urash për komunat e Suharekës, Shtimes dhe Malishevës.' },
  { icon: 'team', title: 'Ekip profesional', text: 'Një ekip i përkushtuar që e njeh terrenin dhe kërkesat e projekteve infrastrukturore.' },
  { icon: 'clock', title: 'Respektim i afateve', text: 'Planifikojmë çdo fazë që punimet të përfundojnë në kohën e dakorduar.' },
  { icon: 'shield', title: 'Standarde të larta sigurie', text: 'Siguria e punëtorëve dhe e qytetarëve është përparësi në çdo kantier.' },
];

export const partners = ['Komuna e Suharekës', 'Komuna e Shtimes', 'Komuna e Malishevës'];

export const faq = [
  {
    q: 'Në cilat zona punoni?',
    a: 'Selia jonë është në Semetisht të Suharekës. Deri më tani kemi realizuar projekte në komunat e Suharekës, Shtimes dhe Malishevës. Për projekte në lokacione të tjera në Kosovë, na kontaktoni për të diskutuar mundësitë.',
  },
  {
    q: 'A punoni edhe me klientë privatë?',
    a: 'Përveç projekteve publike, veprimtaritë tona përfshijnë edhe ndërtimin e objekteve banesore dhe afariste, instalimet dhe punimet përfundimtare. Na tregoni për projektin tuaj dhe do t’ju kthejmë përgjigje.',
  },
  {
    q: 'Si mund të kërkoj një ofertë?',
    a: 'Plotësoni formularin e kontaktit, na telefononi ose na shkruani në WhatsApp. Përshkruani shkurt projektin dhe lokacionin, dhe ne do t’ju kontaktojmë për hapat e mëtejshëm.',
  },
  {
    q: 'Sa zgjat zakonisht një projekt?',
    a: 'Kohëzgjatja varet nga lloji, madhësia dhe kompleksiteti i punimeve. Pas vlerësimit të projektit ju japim një plan pune me afate të qarta.',
  },
  {
    q: 'A ofroni edhe projektim dhe këshillim teknik?',
    a: 'Po. Veprimtaritë tona përfshijnë arkitekturën, inxhinierinë dhe këshillimin teknik, prandaj mund t’ju ndihmojmë edhe para fillimit të ndërtimit.',
  },
  {
    q: 'Çfarë lloj punimesh realizoni?',
    a: 'Ura dhe tunele, rrugë, objekte banesore dhe afariste, ujësjellës e kanalizime, instalime elektrike e hidraulike, demolim, përgatitje terreni dhe punime përfundimtare.',
  },
];

// -------------------------------------------------------------
//  Projektet. Fotot janë ilustruese (Unsplash) derisa të
//  zëvendësohen me fotot reale të projekteve.
// -------------------------------------------------------------
export const projects: Project[] = [
  {
    slug: 'ndertimi-dhe-zgjerimi-i-dy-urave-suhareke',
    title: 'Ndërtimi dhe zgjerimi i dy urave',
    municipality: 'Komuna e Suharekës',
    location: 'Suharekë',
    year: 2021,
    category: 'ura',
    work: 'Ndërtim dhe zgjerim i urave',
    summary: 'Ndërtimi dhe zgjerimi i dy urave për përmirësimin e lidhjes rrugore në komunën e Suharekës.',
    description: [
      'Projekt infrastrukturor i realizuar për Komunën e Suharekës, që përfshiu ndërtimin dhe zgjerimin e dy urave.',
      'Qëllimi i projektit ishte përmirësimi i qarkullimit dhe i sigurisë në rrugët që lidhen përmes këtyre urave.',
    ],
    image: images.bridgeLong,
    gallery: [images.bridgeLong2, images.bridgeSiteBw, images.pillarsShadow],
  },
  {
    slug: 'rehabilitimi-i-ures-malisheve',
    title: 'Rehabilitimi i urës',
    municipality: 'Komuna e Malishevës',
    location: 'Malishevë',
    year: 2022,
    category: 'rehabilitim',
    work: 'Rehabilitim i urës',
    summary: 'Punime rehabilitimi për rikthimin e funksionalitetit dhe të sigurisë së urës.',
    description: [
      'Projekt i realizuar për Komunën e Malishevës, i fokusuar në rehabilitimin e një ure ekzistuese.',
      'Rehabilitimi i urës synon zgjatjen e jetëgjatësisë së strukturës dhe sigurinë e qarkullimit.',
    ],
    image: images.stoneBridge,
    gallery: [images.stoneBridgeAerial, images.pillarsShadow, images.bridgeGreen],
  },
  {
    slug: 'punime-ne-ndertimin-e-ures-suhareke-2022',
    title: 'Punime në ndërtimin e urës',
    municipality: 'Komuna e Suharekës',
    location: 'Suharekë',
    year: 2022,
    category: 'ura',
    work: 'Punime ndërtimi në urë',
    summary: 'Punime ndërtimi në urë për Komunën e Suharekës.',
    description: [
      'Punime në ndërtimin e urës, të realizuara për Komunën e Suharekës.',
      'Projekti është pjesë e investimeve të komunës në infrastrukturën rrugore lokale.',
    ],
    image: images.bridgeSiteBw,
    gallery: [images.bridgeSiteBw2, images.excavatorSite, images.underpass],
  },
  {
    slug: 'ndertimi-i-ures-faza-2-shtime',
    title: 'Ndërtimi i urës (Faza II)',
    municipality: 'Komuna e Shtimes',
    location: 'Shtime',
    year: 2023,
    category: 'ura',
    work: 'Ndërtim i urës, faza e dytë',
    summary: 'Faza e dytë e ndërtimit të urës për Komunën e Shtimes.',
    description: [
      'Projekt i realizuar për Komunën e Shtimes, që përfshiu fazën e dytë të ndërtimit të urës.',
      'Me këtë fazë vazhdoi zhvillimi i infrastrukturës rrugore në këtë komunë.',
    ],
    image: images.bridgeSiteBw2,
    gallery: [images.bridgeSiteBw, images.concreteBridge, images.pillarsSunset],
  },
  {
    slug: 'ndertimi-i-ures-suhareke-2023',
    title: 'Ndërtimi i urës',
    municipality: 'Komuna e Suharekës',
    location: 'Suharekë',
    year: 2023,
    category: 'ura',
    work: 'Ndërtim i urës',
    summary: 'Ndërtimi i një ure të re për Komunën e Suharekës.',
    description: [
      'Projekt i realizuar për Komunën e Suharekës, që përfshiu ndërtimin e urës.',
      'Ura kontribuon në lidhjen më të mirë rrugore për banorët e zonës.',
    ],
    image: images.concreteBridge,
    gallery: [images.bridgeLong, images.underpass, images.pillarsShadow],
  },
  {
    slug: 'ndertimi-i-ures-suhareke-2024',
    title: 'Ndërtimi i urës',
    municipality: 'Komuna e Suharekës',
    location: 'Suharekë',
    year: 2024,
    category: 'ura',
    work: 'Ndërtim i urës',
    summary: 'Ndërtimi i urës për Komunën e Suharekës.',
    description: [
      'Projekt i realizuar për Komunën e Suharekës, që përfshiu ndërtimin e urës.',
      'Projekti është vazhdim i bashkëpunimit tonë me komunën në fushën e infrastrukturës publike.',
    ],
    image: images.bridgeGreen,
    gallery: [images.pillarsSunset, images.bridgeLong2, images.excavatorSite],
  },
];

export const categories: Record<Project['category'], string> = {
  ura: 'Ura',
  rehabilitim: 'Rehabilitim',
};
