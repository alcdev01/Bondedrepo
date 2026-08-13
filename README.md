# UNBonded Evidence Hub

The UNBonded Evidence Hub is a single-page React 19 + Vite 8 application. React Router provides the clean client-side routes: `/catalogue`, `/timeline`, `/geography`, `/how-to-use`, `/source?id=…`, and `/contacts`.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The built static site is written to `dist/`. Configure the production host with an SPA fallback to `index.html` so direct visits to routes remain available.

## Application structure

- `src/main.jsx` — React views and interactive UI
- `data/sources.js` — source records, claims, themes and timelines
- `data/nepal-districts.js` — district map geometry
- `data/contacts.js` — verified organisation-contact records
- `assets/site.css` and `assets/site-repair.css` — established visual system

Only React, React DOM, Vite and Lenis are installed. There is no backend, database or environment configuration.
