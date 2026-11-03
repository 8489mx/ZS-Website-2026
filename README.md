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
npm test         # unit tests (Vitest) for money/currency/pricing logic
```

CI (`.github/workflows/ci.yml`) runs lint, tests, and the production
build on every push to `main` and every pull request. The build itself
type-checks first (`tsc --noEmit && vite build`), so a type error can
no longer ship silently. TypeScript runs in `strict` mode with
`noUnusedLocals`/`noUnusedParameters`.

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
product). If the fetch fails, the pricing UI shows an error with a
retry button; it never shows stored or invented prices — including in
the ROI calculator, which shows the written-quote state when no live
level exists for the visitor's country. The bundled catalog dump was
removed in Batch 1. Offline (lifetime) licences have no API price
source, so the site shows "Request a Quote" instead of computing a
price client-side. The product list itself is static metadata
(`DEFAULT_PRODUCTS` in `src/services/pricingCatalog.ts`): the
~900 kB full-catalog response is no longer downloaded just to refresh
product names.

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
  CurrencyContext.tsx     currency/country detection + formats + VAT rates
  utils/calculations.ts   POS totals, VAT, ROI and plan-recommendation maths (tested)
  hooks/useDialog.ts      accessible dialog behaviour (focus trap, Escape, restore)
  services/pricingCatalog.ts  live pricing API client
  components/             robot, gallery, chart, logo, simulation
  pages/                  legal pages, contact, 404
public/
  sitemap.xml robots.txt llms.txt  SEO/GEO files (keep lastmod current)
  logo.png logo.webp screenshot*.png screenshot*.webp
```

## Notes and limits

- Unit tests cover the pure logic that has regressed before:
  POS/VAT totals, plan recommendation, currency detection
  reconciliation, pricing-country mapping, and the pricing catalog's
  cache/404 behaviour (`src/**/*.test.ts`, run with `npm test`).
  Verification is `npm run lint` + `npm test` + `npm run build`
  (also enforced by CI) plus a live check after deploy.
- The trial-signup form sends `businessName` / `ownerName` /
  `ownerPhone` / `ownerEmail` to the API.
- Known remaining limitation: this is still a client-rendered SPA, so
  unknown routes are served with HTTP 200 (soft 404, mitigated by a
  client-side `noindex`) and first paint depends on JavaScript.
  Prerendering/SSG for `/` and `/erp` is the planned follow-up, not
  part of the current setup.
- VAT rates used by the POS simulator live in the currency configs
  (`src/CurrencyContext.tsx`, `vatRate` per currency), and POS/ROI
  maths lives in `src/utils/calculations.ts`.
- Performance was not measured with Lighthouse on the live site;
  bundle sizes quoted in change reports are build-output sizes only.
