// =============================================================
//  Të gjitha fotot e faqes në një vend.
//  Fotot janë nga Unsplash (unsplash.com) dhe janë ilustruese.
//  Për t'i zëvendësuar me fotot reale të kompanisë:
//    1. vendosni foton te src/assets/img/projektet/...
//    2. ndryshoni `src` më poshtë në p.sh. 'assets/img/projektet/ura-1.jpg'
// =============================================================

const unsplash = (photo, author, username, alt, focus = 'center') => ({
  src: `https://images.unsplash.com/photo-${photo}`,
  unsplash: true,
  author,
  authorUrl: `https://unsplash.com/@${username}?utm_source=ledioni_group&utm_medium=referral`,
  alt,
  focus,
});

export const images = {
  hero: unsplash('1774151416517-1b9136287a7f', 'Arthur', 'frontspace101',
    'Shtyllat prej betoni të një ure mbi ujë, të ndriçuara nga drita e artë e perëndimit', 'center'),

  about: unsplash('1714562377019-e6d03ea94ba2', 'Darrel Louise Almanzor', 'darrel23',
    'Ekip punëtorësh me helmeta mbrojtëse dhe jelekë sigurie gjatë punimeve në terren'),
  aboutSecondary: unsplash('1760161306014-e2dcc13cbdf8', 'Eric Stoynov', 'ericstoynov',
    'Dy punëtorë ndërtimi me helmeta dhe jelekë sigurie në kantier'),

  // Shërbimet
  svcBridges: unsplash('1569925457326-59b1c3611227', 'Indira Tjokorda', 'indiratjokorda',
    'Urë betoni në ndërtim e sipër me shtylla dhe trarë të montuar'),
  svcRoads: unsplash('1708117390188-d1547de962be', 'Tom Shamberger', 'tshamberger',
    'Makineri duke shtruar asfalt në një rrugë të re'),
  svcBuildings: unsplash('1591955506264-3f5a6834570a', 'Ben Allan', 'ballonandon',
    'Vinç ndërtimi pranë një objekti banesor në ndërtim'),
  svcArchitecture: unsplash('1503387762-592deb58ef4e', 'Daniel McCullough', 'd_mccullough',
    'Arkitekt duke vizatuar një projekt me laps dhe vizore'),
  svcEngineering: unsplash('1766830110938-0ea8a6d78ecb', 'Nazmul ahsan Meraz', 'meraz123',
    'Gjeodet duke bërë matje me stacion total në terren', 'top'),
  svcWater: unsplash('1790009267942-a6f86740f660', 'antonio massara', 'antoniomassara',
    'Tubacione vertikale përgjatë një muri prej betoni'),
  svcElectrical: unsplash('1621905251189-08b45d6a269e', 'Emmanuel Ikwuegbu', 'emmages',
    'Elektricist me helmetë duke punuar në një instalim elektrik'),
  svcSitePrep: unsplash('1622082679766-c5912d9416eb', 'Abdul Zreika', 'sandaproductions',
    'Eskavator duke gërmuar dhe përgatitur terrenin për ndërtim'),
  svcFinishing: unsplash('1768839725085-829e6ac7ac26', 'Sasun Bughdaryan', 'sasun1990',
    'Duar që aplikojnë suva në mur me shpatull'),

  // Projektet (foto ilustruese)
  bridgeLong: unsplash('1777955842965-ec2a2d36267d', 'Palak Pitroda', 'palak_pitroda',
    'Urë e gjatë prej betoni mbi një lumë në muzg'),
  bridgeLong2: unsplash('1777955842957-351b4e6b772b', 'Palak Pitroda', 'palak_pitroda',
    'Pamje anësore e një ure betoni me shumë shtylla mbi ujë'),
  stoneBridge: unsplash('1770810803392-d35f02681b81', 'Sergei Gussev', 'sergei_gussev',
    'Urë e vjetër me harqe guri mbi një lumë në mjegull'),
  stoneBridgeAerial: unsplash('1764439145328-87a26990859c', 'Bob Brewer', 'brewbottle',
    'Pamje nga lart e një ure me harqe mbi lumë'),
  bridgeSiteBw: unsplash('1678512691253-9ec1c66efa1f', 'Dillon T.', 'dillont',
    'Kantier ndërtimi me eskavatorë pranë një ure'),
  bridgeSiteBw2: unsplash('1678512680110-19a1e548585c', 'Dillon T.', 'dillont',
    'Makineri ndërtimi duke punuar në shtratin e lumit pranë shtyllave të urës'),
  concreteBridge: unsplash('1584892104071-82c5c7e8c06d', 'Maksym Kaharlytskyi', 'qwitka',
    'Urë moderne prej betoni e parë nga bregu me bimësi'),
  bridgeGreen: unsplash('1777813894359-e29713dcd577', 'Heng Chiu', 'chiuchuuu',
    'Pamje nën një urë betoni me pemë dhe reflektim në ujë'),
  pillarsSunset: unsplash('1774207164322-ea206f5cf3ef', 'Arthur', 'frontspace101',
    'Shtylla betoni që mbajnë një urë mbi ujë në perëndim të diellit', 'left'),
  pillarsShadow: unsplash('1766200544158-8bf130575642', '雙 film', 'film002',
    'Shtylla masive betoni të një ure me hije dramatike'),
  underpass: unsplash('1635600207252-22f7a36e9dcd', 'Kaffeebart', 'kaffeebart',
    'Rrugë që kalon nën një mbikalim betoni'),
  excavatorSite: unsplash('1603465410243-af3e840367dd', 'Maarten van den Heuvel', 'mvdheuvel',
    'Eskavator duke punuar nën një strukturë betoni'),

  cta: unsplash('1614687472578-7196c3d698c7', 'Minku Kang', 'minkus',
    'Siluetë e një ure mbi ujë në perëndim të diellit'),
};

/** Ndërton URL-në e Unsplash me madhësinë dhe cilësinë e duhur. */
export function imgUrl(img, w, h, q = 75) {
  if (!img.unsplash) return img.src;
  const p = new URLSearchParams({ auto: 'format', fit: 'crop', w: String(w), q: String(q) });
  if (h) p.set('h', String(h));
  if (img.focus && img.focus !== 'center') p.set('crop', img.focus === 'top' ? 'top' : img.focus);
  return `${img.src}?${p.toString()}`;
}

/** srcset për foto responsive. ratio = lartësia/gjerësia (opsionale). */
export function srcset(img, widths, ratio, q = 75) {
  if (!img.unsplash) return '';
  return widths.map((w) => `${imgUrl(img, w, ratio ? Math.round(w * ratio) : undefined, q)} ${w}w`).join(', ');
}
