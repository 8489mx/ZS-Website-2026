# ZS-Website-2026

Marketing website for **Z-ERP / ZS-ERP** (Z Systems): home page, ERP
details and live pricing, legal pages, and contact. The site is a
front-end only; there is no backend, database, or test suite in this
repository. Trial signup and pricing data come from the live ZS-ERP
application at `https://app.zsystemai.com`.

## Stack

React 19 + TypeScript + Vite 6, React Router 7, Tailwind CSS 4,
`motion` for animation. The ROI savings chart is a hand-rolled SVG
component (`src/components/RoiSavingsChart.tsx`); there is no charting
library dependency. Product images are served as display-sized WebP
with the original PNG kept as fallback.

## Run locally

Prerequisites: Node.js 20+ and npm.

```sh
npm install
npm run dev      # Vite dev server (proxies /api/public to app.zsystemai.com)
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run lint     # rule check (no prohibited icons) + tsc --noEmit
```

There is no `.env` configuration: the site calls the public pricing
and trial-signup endpoints directly. The Vite dev proxy exists only
for local development; production code always uses the absolute
`https://app.zsystemai.com` API URLs.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/erp` | ERP details, live pricing, ROI calculator, simulators |
| `/terms`, `/refund-policy`, `/privacy`, `/contact` | Legal and contact pages |
| `/register`, `/login` | Redirect to the live app (`app.zsystemai.com/trial`, `/login`) |
| anything else | 404 page (noindex) |

Document title, description, Open Graph tags, and canonical URL are
owned by one hook, `src/useDocumentMeta.ts`, keyed by route and
language. Pages must not set `document.title` themselves.

## Pricing

Prices are fetched live from
`GET https://app.zsystemai.com/api/public/pricing-catalog` (per
product, and the full catalog). If the fetch fails, the pricing UI
shows an error with a retry button; it never shows stored or invented
prices. The bundled catalog dump was removed in Batch 1. Offline
(lifetime) licences have no API price source, so the site shows
"Request a Quote" instead of computing a price client-side.

Forms (trial signup, waitlist) validate input, check the HTTP
response, and show real failures. No personal data is ever put into a
WhatsApp link. The WhatsApp simulation on the ERP page is labelled as
an illustration, not a live chat.

## Deployment

This is a single-page app with client-side routing. The host **must**
rewrite every non-file request to `/index.html`, otherwise deep links
such as `/erp` return 404 on refresh. Two common-host configs are
included and are inert on hosts that do not read them:

- `public/_redirects` — Netlify-style: `/* /index.html 200`
- `vercel.json` — Vercel rewrites: `[{ "source": "/(.*)", "destination": "/index.html" }]`

Build output is `dist/` (static files, no server). There is no
server-side cache/compression config in this repository; that lives
with the hosting provider and is not verified here.

## Structure

```
src/
  App.tsx                 routes + lazy pages
  useDocumentMeta.ts      per-route title/meta/canonical
  HomePage.tsx            home page
  ErpPage.tsx             ERP page (pricing, ROI, simulators)
  CurrencyContext.tsx     currency/country detection + formats
  services/pricingCatalog.ts  live pricing API client
  components/             robot, gallery, chart, logo, simulation
  pages/                  legal pages, contact, 404
public/
  sitemap.xml robots.txt llms.txt  SEO/GEO files (keep lastmod current)
  logo.png logo.webp screenshot*.png screenshot*.webp
```

## Notes and limits

- No automated tests exist in this repository. Verification is
  `npm run lint` + `npm run build` plus a live check after deploy.
- The trial-signup API currently accepts only
  `businessName` / `ownerPhone` / `ownerEmail`; the visitor's personal
  name is collected by the form but not sent. Accepting an `ownerName`
  field is a backend decision for the ZS-ERP application, not this site.
- Performance was not measured with Lighthouse on the live site;
  bundle sizes quoted in change reports are build-output sizes only.
