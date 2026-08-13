# UNBonded Evidence Hub

This is a static research repository website. It requires no build step, server-side code, database, or environment variables.

## Publish

Deploy the complete project folder to any static host. Keep the `assets/` and `data/` folders beside the HTML files, preserving the current folder structure.

`index.html` is the entry page. The other HTML files are direct routes and should be served without rewriting their paths.

## Runtime structure

- `assets/site.css` — the single visual design layer
- `assets/site.js` — the single interaction and rendering layer
- `data/sources.js` — source records, claims, themes, and timeline data
- `data/nepal-districts.js` — district map geometry

Legacy iteration files are not used by any page and can be retained locally as historical reference during review.
