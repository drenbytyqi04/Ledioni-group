# Ledioni Group: faqja zyrtare

Faqja e internetit e **LEDIONI GROUP SH.P.K.** (Architecture & Construction), Semetisht, Suharekë.

**Teknologjia:** [Next.js 16](https://nextjs.org) (App Router, TypeScript), [React 19](https://react.dev) dhe [Motion](https://motion.dev) (ish Framer Motion) për animacionet. Faqja hostohet në [Vercel](https://vercel.com).

## Komandat

```bash
npm install      # instalon paketat (vetëm herën e parë)
npm run dev      # hap faqen për zhvillim në http://localhost:3000
npm run build    # ndërton versionin për publikim
npm start        # nis versionin e ndërtuar
```

## Ku ndryshohen gjërat

| Çfarë | Skedari |
|---|---|
| Telefoni, adresa, domeni, rrjetet sociale, formulari | `src/data/site.ts` |
| Fotot (Unsplash). Këtu i zëvendësoni me fotot reale | `src/data/images.ts` |
| Tekstet: shërbimet, projektet, pyetjet, vlerat | `src/data/content.ts` |
| Faqja kryesore (seksionet) | `src/app/page.tsx` |
| Animacionet (Motion) | `src/components/motion.tsx`, `src/components/home.tsx` |
| Ngjyrat dhe dizajni | `src/app/globals.css` (variablat në `:root`) |
| Logoja dhe ikonat | `public/` |

### Fotot reale të projekteve
1. Vendosni foton në `public/projektet/`, p.sh. `public/projektet/ura-suhareke-1.jpg`.
2. Te `src/data/images.ts` shtoni p.sh.
   `uraSuhareke1: { src: '/projektet/ura-suhareke-1.jpg', alt: 'Përshkrimi i fotos' }`.
3. Te `src/data/content.ts`, përdoreni te projekti (`image` / `gallery`).
4. Kur të gjitha fotot të jenë reale, hiqni shënimin "Fotot janë ilustruese".

## Animacionet
- Të gjitha bëhen me **Motion**. Elementet hyjnë kur dalin në ekran dhe dalin kur largohen (slide in / slide out).
- Komponentët kryesorë: `Reveal`, `SplitTitle` (tituj fjalë pas fjale), `StaggerGrid`, `Counter` dhe `Eyebrow`.
- Kush ka aktivizuar "Reduce motion" në pajisje e sheh faqen pa lëvizje (`MotionConfig reducedMotion="user"`).

## Formulari i kontaktit
- Pa konfigurim, formulari hap **WhatsApp** me mesazhin e vizitorit të plotësuar.
- Që mesazhet të dërgohen direkt:
  1. Krijoni një formular falas te [Formspree](https://formspree.io).
  2. Në Vercel → *Settings → Environment Variables* shtoni `NEXT_PUBLIC_FORM_ENDPOINT` me adresën e tij.
  3. Bëni *Redeploy*.

## Publikimi
Çdo `git push` në GitHub publikohet automatikisht nga Vercel. `vercel.json` e vendos framework-un në Next.js.
Domeni merret automatikisht. Për domen tjetër vendosni `NEXT_PUBLIC_SITE_URL`.
