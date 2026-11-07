# Ledioni Group: faqja zyrtare

Faqja e internetit e **LEDIONI GROUP SH.P.K.** (Architecture & Construction), Semetisht, Suharekë.

Është faqe statike, e shpejtë dhe pa varësi të jashtme. Kërkon vetëm **Node.js 18+**.

## Komandat

```bash
npm run build    # ndërton faqen në dosjen dist/
npm run dev      # ndërton faqen dhe e hap në http://localhost:4173
npm run images   # rigjeneron favicon-at dhe og-image.jpg nga logoja (kërkon Playwright)
```

## Ku ndryshohen gjërat

| Çfarë | Skedari |
|---|---|
| Telefoni, adresa, domeni, rrjetet sociale | `src/data/site.mjs` |
| Fotot (Unsplash). Këtu i zëvendësoni me fotot reale | `src/data/images.mjs` |
| Tekstet: shërbimet, projektet, pyetjet, vlerat | `src/data/content.mjs` |
| Ngjyrat dhe dizajni | `src/assets/css/style.css` (variablat në `:root`) |
| Logoja | `src/assets/img/logo.svg` (pastaj `npm run images`) |

### Fotot reale të projekteve
1. Vendosni foton, p.sh. `src/assets/img/projektet/ura-suhareke-1.jpg`.
2. Te `src/data/images.mjs` shtoni p.sh.
   `uraSuhareke1: { src: 'assets/img/projektet/ura-suhareke-1.jpg', alt: 'Përshkrimi i fotos' }`.
3. Te `src/data/content.mjs`, përdoreni te projekti (`image` / `gallery`).
4. Kur të gjitha fotot të jenë reale, hiqni shënimin "Fotot janë ilustruese".

## Publikimi (Netlify, rekomandohet)
1. Lidheni këtë repo në [Netlify](https://app.netlify.com). `netlify.toml` e konfiguron vetë ndërtimin (`node build.mjs`, dosja `dist`).
2. **Formulari i kontaktit** funksionon me Netlify Forms. Te *Site configuration → Forms* aktivizoni *Form detection* dhe pastaj bëni sërish deploy.
   Te *Site configuration → Forms → Form notifications* shtoni njoftim me email-in ku doni t'ju vijnë mesazhet.
3. Lidhni domenin (p.sh. `ledionigroup.com`). Linket kanonike dhe `sitemap.xml` e marrin domenin automatikisht.

## Publikimi në Vercel
`vercel.json` e konfiguron vetë ndërtimin (`node build.mjs`, dosja `dist`). Domeni merret automatikisht.
Pa variablën `FORM_ENDPOINT`, formulari hap WhatsApp me mesazhin e vizitorit të plotësuar.
Që mesazhet të dërgohen direkt:
1. Krijoni formular falas në [Formspree](https://formspree.io), me email-in ku doni t'ju vijnë mesazhet.
2. Në Vercel → *Settings → Environment Variables* shtoni `FORM_ENDPOINT` = adresa e Formspree (p.sh. `https://formspree.io/f/xxxx`).
3. Bëni *Redeploy*.

Për host tjetër (cPanel etj.):
- Ndërtojeni faqen me `npm run build` dhe ngarkoni dosjen `dist/`.
- Formulari: krijoni një formular falas në [Formspree](https://formspree.io) dhe vendosni adresën te `formEndpoint` në `src/data/site.mjs`.
- Domeni: vendoseni te `url` në `src/data/site.mjs`.

## Struktura
```
build.mjs              ndërtuesi i faqes
src/data/              të dhënat dhe tekstet
src/pages/             shabllonet e faqeve
src/lib/               layout-i, ikonat, logoja
src/assets/            CSS, JS, imazhet
scripts/               serveri lokal dhe gjeneruesi i ikonave
```
