# Mindathon Academy — Website

The official website for **Mindathon Academy** and the **Mindathon** cognitive training game.

A premium, multi-page, static website built with clean HTML, CSS and vanilla JavaScript — no frameworks, no build-time dependencies.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| About | `about.html` |
| The Game | `game.html` |
| Cognitive Skills | `skills.html` |
| How It Works | `how-it-works.html` |
| For Parents | `parents.html` |
| For Schools | `schools.html` |
| Programmes | `programmes.html` |
| Gallery | `gallery.html` |
| FAQ | `faq.html` |
| Contact | `contact.html` |
| Get Mindathon | `get-mindathon.html` |

## Project structure

```
├── build.js                 # assembles pages from src/ into dist/
├── src/
│   ├── partials/            # head, navbar, footer, scripts
│   └── pages/               # one file per page (uses {{TOKEN}} slots)
├── assets/
│   ├── css/main.css         # design system
│   └── js/main.js           # interactions (vanilla)
├── images/                  # source images (logo, product angles)
└── dist/                    # built site (deploy this folder)
```

## Build

```bash
node build.js        # outputs the full site to dist/
```

Then serve `dist/` (e.g. `python3 -m http.server 8080 --directory dist`) or deploy it to GitHub Pages.

## Editing content

- **Copy** — edit the files in `src/pages/` and rebuild.
- **Shared chrome** — navbar, footer, head meta live in `src/partials/`.
- **Brand colours / fonts / spacing** — all design tokens are in `assets/css/main.css` under `:root`.
- **SEO / social share** — per-page titles, descriptions and Open Graph tags are set in `build.js` (`PAGES_CONF`).
- **Site URL** — update `SITE_URL` in `build.js` before going live (used for canonical/OG URLs).

## Images

Real product images live in `images/`:

- `logo.png` — Mindathon logo (used in navbar, footer, favicon)
- `mindathon-box-1.jpg` — the Mindathon box photo (used across every page)
- `founder-alagan.jpg` — Master Alagan Govindan (founder cards)

Add `mindathon-box-2.jpg` … `mindathon-box-5.jpg` later and swap them into the
gallery tiles. Replace files with the same names to swap images site-wide.
Placeholder tiles marked **"Photo coming soon"** (K. Kumaran's photo,
"What's Inside", students/programmes/community gallery slots) are intended to be
replaced with real photography later.

## Notes

- The contact form opens WhatsApp with the message pre-filled — no data is stored or sent to a server.
- No payments are processed on this site; the Get Mindathon page is a conversion/enquiry page by design.
- All content is factual and intentionally avoids claims that have not been verified.

© 2026 Mindathon Academy. All Rights Reserved.