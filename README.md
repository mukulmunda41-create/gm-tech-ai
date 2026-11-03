# GM Tech Solution: website

A one-page website for **GM Tech Solution**, an AI automation agency. It covers four services: autonomous AI agents, workflow automations, AI voice agents, and WhatsApp & social media AI.

**Live:** https://gm-tech-ai.vercel.app

## What's on the page

The site works on three kinds of devices. The section is picked automatically, so there is no separate mobile URL.

**Desktop (wider than 760px)**
- Scroll-driven hero: a human hand and a robot hand reach for each other.
- A pinned server-corridor video with cycling words.
- "What we build": a stack of four service cards that spreads into a grid as you scroll.
- A rotating 3D ring of tool logos.
- A small cursor "spark" that opens into a ring over links.

**Phone (760px and narrower)** has its own layout:
- Native scrolling, with nothing pinned.
- The hands meet on load instead of on scroll.
- Swipeable cards and reviews.
- A 2-column tools grid.
- A full-screen menu.
- A "Book a Call" bar that appears while you scroll down.
- A lighter, portrait-cropped video.

**Reduced motion:** if a visitor's system asks for less motion, the page shows its complete, static form.

**Also included:**
- a designed 404 page
- an Open Graph share image and Twitter tags
- JSON-LD
- a skip link and visible keyboard focus

## Tech

Plain HTML, CSS and JavaScript. There is no build step and no `package.json`.

- [GSAP](https://gsap.com) 3.12.5 + ScrollTrigger, loaded from cdnjs
- [Lenis](https://github.com/darkroomengineering/lenis) 1.3.27 smooth scrolling, desktop only, loaded from unpkg
- [Inter](https://fonts.google.com/specimen/Inter), from Google Fonts
- Tool logos from [Simple Icons](https://simpleicons.org). The logos are trademarks of their respective owners.

## Run locally

From this folder, run:

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173.

- Hard-reload after editing (Cmd + Shift + R). The Python server lets the browser cache `main.js` and `style.css`.
- The Python server does not serve `404.html`; Vercel does.
- **To test on a real phone:** keep the phone on the same Wi-Fi and open `http://<your-computer's-IP>:5173`.

There are no tests or linters. To check the script for syntax errors:

```bash
node --check main.js
```

## Project structure

```
index.html        the page: all sections and content
style.css         design tokens, sections, the phone layout (@media max-width: 760px), reduced motion
main.js           menu, nav, cursor spark, and the GSAP motion (desktop / phone / reduced-motion branches)
404.html          designed not-found page
book.html         Book a Call form; opens WhatsApp (+91 70002 11498) with the client's details filled in
assets/           hand cut-outs, service card images, videos, tool icons, logo, favicon, share image
asset-prompts.md  the prompts used to generate the images and videos
CLAUDE.md         architecture notes and design decisions (read this before changing motion or layout)
```

## Deploy

The site is hosted on Vercel as the project **gm-tech-ai**. Pushing to GitHub does not deploy it. Deploy from this folder with:

```bash
vercel --prod
```

When linking a fresh checkout, use `vercel link --project gm-tech-ai`. A different, older project uses this folder's name.

`.vercelignore` keeps `README.md`, `CLAUDE.md`, `asset-prompts.md` and `.env*` files out of the deployment.

## Before launch

Replace these placeholders. Each one is marked `<!-- PLACEHOLDER -->` in `index.html`.

- [ ] **Client reviews:** the "Our Impact & Results" section shows three outcome cards for launch. Swap in real reviews once clients sign off.
- [x] **Booking:** every "Book a Call" button opens `book.html`, which sends the client's details to WhatsApp +91 70002 11498. Email gmtechsolution24.7@gmail.com and the WhatsApp number are in the footer *and* the phone menu.
- [ ] **Final domain:** once it is set, add a canonical link, `robots.txt`, `sitemap.xml`, and absolute `og:image` / `twitter:image` URLs.

## Editing notes

See [CLAUDE.md](CLAUDE.md) for the details. The rules that most often break things:

- **GSAP owns transforms.** Never put CSS `transform`, `translate`, `rotate` or `scale` on an element GSAP animates. GSAP overwrites them.
- **Phone changes go in the `@media (max-width: 760px)` block** and the phone branch of `main.js`. The desktop should not change when the phone layout is edited.
- **The hero hand positions are calculated** from the hand images' sizes. If you replace a hand image, recompute the numbers in `style.css`.
