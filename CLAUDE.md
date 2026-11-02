# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page marketing site for **GM Tech Solution**, an AI automation agency. It is made of plain static files: `index.html`, `style.css`, `main.js`, `404.html` and `assets/`. There is no build step and no `package.json`. GSAP 3.12.5 with ScrollTrigger, and Lenis 1.3.27, load from CDNs at the bottom of `index.html`.

## Commands

- **Run locally:** run `python3 -m http.server 5173` from the repo root. The parent folder's `.claude/launch.json` defines the same server as `gm-tech-site`. This server has two limits:
  - It does not serve `404.html`; Vercel does.
  - Browsers cache `main.js` and `style.css` from it, so hard-reload after every edit.
- **Syntax check:** `node --check main.js`. There are no tests, linters or build.
- **Deploy:** run `vercel --prod`.
  - This folder is linked to the Vercel project **gm-tech-ai** (`.vercel/project.json`), which serves https://gm-tech-ai.vercel.app.
  - Git pushes do not trigger deploys. The repo is github.com/mukulmunda41-create/gm-tech-ai.
  - An older, separate GM Tech site already uses the name **gm-tech-solution**, on both GitHub and Vercel. This folder has that same name, so always pass `--project gm-tech-ai` to `vercel link`, and never push or deploy to gm-tech-solution.
  - `.vercelignore` keeps `asset-prompts.md`, `CLAUDE.md` and `.env*` out of the deployment. The Vercel CLI writes a `VERCEL_OIDC_TOKEN` into `.env.local`.

## Architecture

**Static-first motion.** Every element's HTML/CSS resting state is its final state. Under reduced motion, or if a CDN fails, the page is complete and static.

**Motion runs in three non-overlapping `gsap.matchMedia` branches in `main.js`:**

| Branch | Media query | What it runs |
|---|---|---|
| Desktop | `(min-width: 761px) and (prefers-reduced-motion: no-preference)` | Lenis, the three pins, scrubbed choreography |
| Phone | `(max-width: 760px) and (prefers-reduced-motion: no-preference)` | Native scroll; no pins and no Lenis; a time-based hero intro and enter reveals |
| Reduced motion | `(prefers-reduced-motion: reduce)` | Only `watchNav` |

- The cursor spark is a fourth, independent branch, for fine pointers only.
- The shared `intro()` timeline and `staticZones` sit above the branches.
- The CSS breakpoint is `@media (max-width: 760px)`.
- Phones and reduced motion share one static block, `@media (max-width: 760px), (prefers-reduced-motion: reduce)`. It holds the stacked dark words and the flattened ring.

**Section order and pins.** Create ScrollTriggers in page order. Anything that measures a position below a pin must be created after that pin.

| Section | Desktop | Phone (≤760px) |
|---|---|---|
| hero | pinned `+=120%`; the hands converge on scroll | hands meet on load; a "See what we build" button replaces the chips |
| `.dark` video | clip-path reveal, then pinned `+=200%`; the words cycle | ~72svh band; all three words stacked; plays `tunnel-mobile.mp4` |
| `.fan-sec` cards | pinned `+=130%`; the stack fans out | native scroll-snap row (`.fan .card` overrides the tilt) |
| how we work | 3 columns; a line draws across | vertical timeline with numbered circles |
| `.stack` tools | CSS 3D ring (keyframes, not GSAP) | 2×5 grid of tiles |
| reviews | 3 columns | scroll-snap row |
| engagement rows | number, title, description | stacked |
| footer | dark | dark |

**GSAP owns the transforms of anything it animates.** When GSAP first touches an element, it writes inline `translate: none; scale: none; rotate: none`. CSS individual transform properties on that element, including in `:hover` and `:active` rules, are therefore silently dead.
- Elements GSAP animates (orb, hands) are positioned with margins and `calc`.
- The cards' resting tilt is a CSS `transform`. GSAP reads it as the end state of the scroll `.from()`.
- Hover and press effects go on colours or backgrounds, or on a child or pseudo-element that GSAP never animates. For example, the logo hover scales `.mark`, not `.brand`.
- The intro animates `.nav > *`, so this applies to the nav CTA, the brand link and the nav links.

**ScrollTrigger rules learned in this file:**
- Never use `invalidateOnRefresh` on a `.from()`: it re-records the end state as the from-state.
- If a from-state must show at progress 0 (the hands apart), set it with `gsap.set` outside the scroll timeline. A refresh reverts timelines and does not re-render progress 0.
- Nav classes are derived from the scroll position on every update (`watchNav`), never set with `toggleClass`, so a mid-page reload cannot leave them stuck.

**Hero hands geometry** is CSS math in `style.css`.
- Three variables drive it: `--s` is the width of the original 1500px photo frame, `--g` is the gap, and `--meet` is the fingertip height.
- The multipliers (`.838`, `.0648`, `.7813`, `.0488`) come from the cut-out sizes and the fingertip positions in `assets/hand-*.webp`. The comment above `.hand` shows the derivation. Recompute them if a hand image changes.
- JS only animates `xPercent`.
  - On desktop, the hands start 0.38 of the viewport apart and are scrubbed together.
  - On phones, they start 0.24 apart and meet in a ~1.8s intro on load.

**Nav** has no bar: links on the left, the logo in the centre and the CTA on the right, with a soft white gradient `::before`.
- `nav--dark` makes the UI white over the video, the tools ring and the footer.
- `nav--hidden` hides the nav while scrolling down and brings it back on scroll up.
- **On phones, the `.callbar` "Book a Call" bar is driven by CSS alone.** It shows through `.nav--hidden:not(:focus-within) ~ .callbar`, so it must stay a later sibling of `header.nav`. Only one Book a Call is ever on screen. An IntersectionObserver on `#contact` adds `.is-off` once the footer is in view.
- **The phone menu is a full-screen sheet.** `setMenu()` does four things:
  - toggles `html.menu-open`, which locks scroll, keeps the nav in ink colour and hides the nav CTA;
  - sets `inert` on `main` and the footer;
  - closes the sheet when the 760px breakpoint changes;
  - returns focus to the menu button on Escape.

**CSS masks paint with `currentColor`.** The GM logo (`.mark`, from `assets/logo.png`) and the tool icons (`--src` and `--c` on each `.tool`) are masks. Masks only load from the same origin, so they render blank in `file://` test pages.

**Cursor spark** runs for fine pointers with motion on. `main.js` creates two fixed elements, `.spark` and `.spark-glow`.
- `mix-blend-mode: difference` sits on the fixed element itself. A blended child of a fixed element would be isolated and would not blend with the page.
- The spark opens into a ring over `a` and `button`. On scroll, it is re-checked with `elementFromPoint`.

## Owner decisions (don't undo)

- **Palette:** monochrome black, white and grey. The only colour is the hero orb's pastel conic gradient, which the cursor glow reuses.
- **Nav:** no background bar or border, no underline or active marker, no dividers between links, no dropdown chevron.
- **Removed on purpose:**
  - the floating WhatsApp button
  - the giant footer headline and its ring
  - the stats section
  - the "Why now" card
  - the services-detail section
  - the pill sliders
- **Content:**
  - Copy is written for GM Tech, not copied from reference sites.
  - Never invent reviews, stats or contact details. Reviews, email, WhatsApp number and booking link are marked `<!-- PLACEHOLDER -->` until the owner provides real ones. The email and WhatsApp appear twice, in the footer and in `.menu-foot`; update both together.
- **Mobile:** same URL. Phones get their own layout and motion at ≤760px, and desktop must not change when the phone version is edited.
  - No em dashes in visible copy.
- **Pending until a final domain is chosen:** canonical, `robots.txt`, `sitemap.xml`, and absolute `og:image` and `twitter:image` URLs.

## Assets

`asset-prompts.md` holds the image and video prompts the owner runs in external tools.
- The hands are background-removed cut-outs.
- The cards are 600×900 webp.
- `tunnel.mp4` is re-encoded as a seamless crossfade loop.
- `tunnel-mobile.mp4` is a 600×900 centre crop of it, for phones. The `<video>` has no `src`, because a `src` attribute would disable `<source media>` selection. Its desktop source comes first.
- The tool icons come from simple-icons. Pinecone has no icon there, so its card is text-only.
