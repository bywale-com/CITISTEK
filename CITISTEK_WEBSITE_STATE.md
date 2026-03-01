# CITISTEK Website — Full State Document

This document describes the **entire current state** of the CITISTEK website (https://citistek.com) so another context (e.g. ChatGPT, a new developer, or an AI) can understand and work on it precisely. It covers preloader, layout, content, styling, behavior, assets, and tech stack.

---

## 1. Tech stack and project structure

- **Framework:** React 18 with TypeScript.
- **Build:** Vite 5 (`vite`, `@vitejs/plugin-react`). No SSR; client-side only (SPA).
- **Smoothing:** Lenis for smooth scrolling (`lenis`, `@gsap/react`); GSAP + ScrollTrigger for scroll-driven animations.
- **Entry:** `index.html` → `src/main.tsx` → `App.tsx` → `HomePage` (single page, no router).

**Key files:**

| Path | Purpose |
|------|--------|
| `index.html` | Root HTML; only `<div id="root">` and script. Favicon: `/citistek_icon.png`. Title: "Citistek - Advanced Technology Solutions". No meta description or Open Graph. |
| `src/main.tsx` | Renders `<App />` into `#root`; imports `index.css`. |
| `src/App.tsx` | Preloader logic + wraps content in `<ReactLenis>`; renders `HomePage`. |
| `src/App.css` | Preloader styles + Stop font `@font-face`. |
| `src/index.css` | Global reset, scrollbar styling, Microgamma font, `html`/`body` background `#000`. |
| `src/components/HomePage.tsx` | Single-page layout: nav, hero, statement, industries, look-ahead (incl. InversaScroll), mission, news carousel, footer. |
| `src/components/HomePage.css` | All section and component styles for the above. |
| `src/components/DecodeText.tsx` | Character-by-character “decode” animation for nav and section titles. |
| `src/components/InversaScroll.tsx` | Scroll-pinned “Inversa” block with mask, image, grid, markers, content blocks. |
| `src/components/NewsCarousel.tsx` | Auto-rotating news slides + dots. |

**Cursor rules:** `.cursor/rules/git-commit-full-repo.mdc` — on “commit” or “push”, run `git add .`, commit with a clear message, then `git push`.

---

## 2. Preloader (App.tsx + App.css)

- **Purpose:** Full-screen overlay showing the word “CITISTEK” with a decode-from-both-ends animation, then fade out and reveal main content.
- **Target word:** `CITISTEK` (constant `TARGET`).
- **Character set for scrambling:** `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>`.
- **Timing:**
  - Decode runs over **1500 ms** (`totalDecodeMs`).
  - Characters lock in **waves from both ends** (indices 0 and 7 first, then 1 and 6, etc.). Lock time per character: `startTime + (waveIndex + 1) * (1500/4)` ms (4 waves).
  - Update interval: **95 ms** (`cycleIntervalMs`).
  - When all characters are locked: after **200 ms** preloader gets class `preloader--fade-out` (opacity 0); after **450 ms** preloader is unmounted and content gets `app-content--fade-in`.
- **Styling:**
  - Full viewport, fixed, centered, `z-index: 9999`, background `#000`.
  - Text: font **Stop** (see Fonts below), `clamp(2.5rem, 8vw, 5rem)`, `letter-spacing: 0.02em`, color `#fff`.
  - Fade-out: `opacity 0.2s ease-out`.
- **Accessibility:** Preloader div has `aria-hidden="true"`; the text span has `aria-label={TARGET}`.
- **Font:** Stop is loaded in `App.css` from `/fonts/stop.ttf` (must exist in `public/fonts/stop.ttf` for Vite).

---

## 3. Main content wrapper and smooth scroll

- After preloader is “done”, the main content is a div with classes `app-content` and (after fade) `app-content--fade-in`.
- Content is wrapped in **ReactLenis** with `options={{ lerp: 0.1, smoothWheel: true }}`.
- `HomePage` is rendered with `key={preloaderPhase}` so it mounts when phase becomes `'done'`.
- Lenis scroll is tied to GSAP ScrollTrigger in `HomePage` via `lenis.on('scroll', ScrollTrigger.update)`.

---

## 4. Homepage reveal phases (staggered)

- **State:** `revealPhase`: `'black'` → `'logo'` → `'nav'` → `'all'`.
- **Timing (useEffect):**
  - At 500 ms: `'logo'`.
  - At 1000 ms: `'nav'`.
  - At 1500 ms: `'all'` (500 ms after nav via `MAIN_REVEAL_OFFSET_MS`).
- **Effect:**
  - `black`: nav logo, nav links, CTA, and main content are hidden (opacity 0, pointer-events none).
  - `logo`: only nav logo visible (opacity 1, 0.4s ease-out).
  - `nav`: nav links and Contact CTA visible; main content still hidden.
  - `all`: main content fades in (0.4s ease-out).

---

## 5. Navigation

- **Position:** Fixed top, full width, `z-index: 1000`, padding 1.5rem vertical.
- **Scroll behavior:** After `window.scrollY > 50`, class `scrolled` is added: background `rgba(0,0,0,0.95)`, blur, smaller padding, bottom border `rgba(255,255,255,0.1)`.
- **Light mode:** When over “Look Ahead” or “News” sections (`lookAheadInView` or `newsInView`), class `navbar--light`: background white-ish, dark text and dark CTA button; nav logo image gets `filter: brightness(0)` (black logo).
- **Structure:**
  - **Logo:** `<img src="/citistek_logo_cropped.png" alt="CITISTEK" />`, height 36px.
  - **Links (DecodeText when `revealPhase === 'nav'`):** Capabilities (#capabilities), Products (#products), About (#about), Careers (#careers), News (#news). Decode duration **1000 ms**.
  - **CTA:** Button “Contact” with same decode; links are `<a href="#...">`, CTA is `<button class="nav-cta">`.
- **Font:** Microgamma, 0.95rem, weight 500. Hover: white (dark nav) or black (light nav).

---

## 6. Hero section

- **Layout:** Min-height 100vh, flex center, padding 8rem 2rem 4rem; content z-index 2, visual (video + gradient) absolute full-bleed z-index 1.
- **Content:**
  - **Title (h1):** “Transforming Defense Capabilities” / “with Advanced Technology” (two lines).
  - **Subtitle (p):** “Building autonomous systems and AI-powered platforms that solve critical defense challenges at the tactical edge.”
  - **Buttons:** “Explore Capabilities” (primary), “Watch Video” (secondary). Primary: white bg, black text; secondary: transparent, white border.
- **Visual:** Video `src="/2025_Home-Page_Masthead_V3_autooptimized_1920x1080.mp4"` — autoPlay, muted, loop, playsInline; full cover. Overlay: radial gradient (white 10% center to transparent 70%) with 8s pulse animation.
- **Styles:** Title `clamp(2rem, 5vw, 3.5rem)` weight 700; subtitle `clamp(0.95rem, 1.5vw, 1.2rem)`, color `rgba(255,255,255,0.7)`.

---

## 7. Statement section (Capabilities)

- **Id:** `#capabilities`. Ref used for IntersectionObserver: when 15% visible (with rootMargin bottom -5%), `statementInView` becomes true.
- **Layout:** Two-column row: left = headline container, right = trapezoid image. Max-width 1680px, padding responsive.
- **Headline (two layers):**
  - **Ghost (invisible):** Full text to reserve height; same copy as visible headline.
  - **Visible:** Typing effect. Full copy: “Our software powers real-time, **AI-driven** decisions in critical government and commercial enterprises in the West, from the factory floors to the front lines.” “AI-driven” is wrapped in `statement-headline-accent` (slightly dimmed white). Typing starts **1800 ms** after section is in view; interval **38 ms** per character. Blinking cursor `|` while typing.
- **Image:** `src="/MMAUV-thumb.jpg"` in a trapezoid container (`clip-path: polygon(18% 0, 100% 0, 100% 100%, 0% 100%)`). When in view, image fades in and slides from right (opacity + translateX, 1.8s / 1s).
- **Constants:** `STATEMENT_HEADLINE`, `STATEMENT_ACCENT_START = 28`, `STATEMENT_ACCENT_END = 37`, `TYPING_INTERVAL_MS = 38`, `STATEMENT_IMAGE_ANIMATION_MS = 1800`.

---

## 8. Industries section

- **Id:** `#industries`. Ref + IntersectionObserver: threshold 0.2, rootMargin bottom -5%; when in view, after **500 ms** delay `industriesInView` becomes true (and resets to false when leaving).
- **Title:** “Industries” — DecodeText, duration **900 ms**, only when `industriesInView`. Title is right-aligned, large (`clamp(4rem, 12vw, 10rem)`), visibility controlled by `industries--decode-active`.
- **Panels:** 5 links in a grid (5 columns; at 900px breakpoint 2 columns with 5th spanning 2; at 600px single column). Each panel: DecodeText label (duration **700 ms** when in view), arrow “→”. Panel classes and gradients:
  - **Air** (#air): `industries-panel--air` — gradient blue/sky.
  - **Land** (#land): brown/earth.
  - **Sea** (#sea): navy/blue.
  - **Space** (#space): deep purple.
  - **Cyber** (#cyber): dark gray.
- **Hover:** Scale 1.02, overlay darkens less (0.35 instead of 0.5).

---

## 9. Look Ahead section

- **Id:** `#look-ahead`. Background **CITISTEK red** `#E10600`, white text.
- **Ref:** Used for IntersectionObserver with thresholds [0.05, 0.25, 0.55]; when ratio ≥ 0.55 (or scrolling up and ≥ 0.25), `lookAheadInView` is true; when ≤ 0.05, false. This drives nav light mode.
- **Content:**
  - **Title:** “2026 Look Ahead”
  - **Subtitle:** “Delivering the Next Era of Defense”
  - **CTA:** “LEARN MORE →” link to `#contact`; white bg, red text; hover darker red.
- **Below:** InversaScroll component (same section, no extra wrapper in DOM).

---

## 10. InversaScroll (Look Ahead scroll block)

- **Component:** `InversaScroll.tsx`. Renders a full-width block with class `look-ahead-inversa` (background `#141414`), min-height 100vh, used as a ScrollTrigger pin for **4 viewport heights** of scroll.
- **Structure:**
  - **Hero image:** Tall div (200vh) with inner gradient `linear-gradient(135deg, #7a5229 0%, #9B6836 50%, #b07d45 100%)`. Scroll-driven: moves up, overlay opacity and saturation driven by scroll progress.
  - **Mask:** Fixed full-viewport div with `inversa-mask.svg` (center, 50% size; 75% on width ≤800px). Mask-composite subtract so the “hole” reveals the image. Scale animated 2.5 → 1 → 2.5 over scroll phases.
  - **Grid overlay:** `inversa-grid-overlay.svg`, 55% width, opacity 0.25; opacity animated in/out at specific progress ranges.
  - **Markers:** Two labels with pulsing dot icons — “Anchor Field” (orange `#dc5935`), “Drift Field” (lime `#d3ef76`). Opacity animated by scroll.
  - **Content blocks:** Four vertical blocks (400vh total) with copy; scroll scrubs their vertical position. Copy:
    1. “Location Framework” (title only).
    2. “Coordinate Mapping” + “Terrain data is interpreted through directional vectors. Movement responds to relative position rather than absolute distance.”
    3. “Active Locations” + “Key points are indexed within the field. Each location functions as a reference for spatial alignment and transition logic.”
    4. “Spatial Center” + “The system converges toward a balanced focal region. Motion decelerates as positional variance reaches equilibrium.”
  - **Progress bar:** Right side, vertical, height 10rem; CSS variable `--progress` set by ScrollTrigger to show scroll progress.
- **ScrollTrigger:** Pin for 4× viewport height, scrub 1; progress drives image Y, mask scale, overlay opacity, saturation, content Y, marker opacities, progress bar.

---

## 11. Mission section

- **Layout:** Two columns (grid 1fr 1fr), max-width 1680px, gap 4rem, padding 8rem 2rem. On 768px single column.
- **Text:**
  - **H2:** “Mission-Driven Innovation”
  - **P:** “We bring together talented engineers and veterans to solve defense problems at the tactical edge. Our AI platforms power diverse applications from troop protection to wildfire fighting and search & rescue missions.”
  - **Button:** “Learn More” (primary style).
- **Visual:** Right column has a box (height 400px) with a subtle white gradient placeholder (no image).

---

## 12. News section (Latest Updates)

- **Id:** `#news`. Ref: IntersectionObserver threshold 0.3; `newsInView` drives nav light mode.
- **Background:** White. Title “Latest Updates” (section-title), color `#111111`.
- **Component:** `NewsCarousel`. Three items, auto-rotate every **8000 ms**; dots to switch manually.
- **Data (NEWS_ITEMS):**
  1. Dec 2024 — “How Defense Technology Actually Gets Built” — “Exploring the engineering and development process behind modern defense systems.” — media variant `a`.
  2. Nov 2024 — “Advancing Autonomous Capabilities” — “Latest developments in AI-powered autonomous systems for defense applications.” — variant `b`.
  3. Oct 2024 — “Partnership Announcements” — “Strategic collaborations to accelerate defense technology innovation.” — variant `c`.
- **Slide layout:** Grid: left = meta (date + progress bar), title, body, “Read More →” link (href `#`); right = decorative media block (gradient variants a/b/c). Progress bar animates over 8s when slide is active.
- **Dots:** Buttons for each item; active dot wider (28px) and dark.

---

## 13. Footer

- **Background:** White, top border `rgba(0,0,0,0.08)`, padding 4rem 2rem 2rem.
- **Layout:** Grid, auto-fit minmax(200px, 1fr), gap 3rem, max-width 1680px.
- **Columns:**
  - **Company:** About (#about), Careers (#careers), News (#news), Contact (#contact).
  - **Capabilities:** Lattice (#lattice), Autonomous Systems (#autonomous), AUVs (#auv), Counter-UAS (#counter-uas).
  - **Legal:** Privacy Policy (#privacy), Terms of Service (#terms).
  - **Logo + copyright:** “CITISTEK” (text, 1.5rem, weight 700, letter-spacing 2px), “© 2024 Citistek. All rights reserved.”

---

## 14. Fonts

- **Stop:** Logo/preloader. `App.css`: `url('/fonts/stop.ttf')`, font-family `'Stop'`, font-display block. Used in preloader only in main app; also used in standalone `logo-icon-test/index.html` (path `../Stop-FontZillion/Fonts/stop.ttf`).
- **Microgamma:** Body/UI. `index.css`: `url('/fonts/microgamma.ttf')`, font-display swap. Applied to `body`; fallback -apple-system, BlinkMacSystemFont, Segoe UI.

---

## 15. Colors (key)

- **Background (default):** `#000` (html, body, hero, statement, industries, mission, Inversa block).
- **CITISTEK red:** `#E10600` (Look Ahead section, CTA hover `#B00000`).
- **White / light:** `#fff`, `#f5f5f7` (news slide text); nav light mode white bg.
- **Dark text (footer/news):** `#111111`, `rgba(0,0,0,0.6)` etc.
- **Inversa markers:** `#dc5935`, `#d3ef76`; overlay bg `#141414`.

---

## 16. Assets (public/)

Referenced in code (all from `/` i.e. `public/`):

- **Favicon:** `citistek_icon.png`
- **Nav logo:** `citistek_logo_cropped.png`
- **Hero video:** `2025_Home-Page_Masthead_V3_autooptimized_1920x1080.mp4`
- **Statement image:** `MMAUV-thumb.jpg`
- **Inversa:** `inversa-mask.svg`, `inversa-grid-overlay.svg`
- **Fonts (expected in public/fonts/):** `stop.ttf`, `microgamma.ttf`

---

## 17. Responsive breakpoints (from HomePage.css)

- **768px:** Nav links hidden; statement column stack; mission single column; hero buttons stack; news slide single column.
- **800px:** Inversa mask 75%, grid 100%, marker positions and content padding adjusted.
- **900px:** Industries 2 columns (5th spans 2); look-ahead container full width.
- **600px:** Industries single column.

---

## 18. SEO and meta (current state)

- **index.html** has: charset UTF-8, viewport, title “Citistek - Advanced Technology Solutions”, favicon link. **No** `<meta name="description">`, **No** Open Graph (`og:title`, `og:description`, `og:image`, etc.), **No** Twitter Card meta.
- **Rendering:** Entire content is client-rendered (React); crawlers and link-preview scrapers that don’t run JS only see the title and empty body.

---

## 19. Other project bits

- **logo-icon-test:** Standalone folder with `index.html` for testing Stop font logo/wordmarks (red on black). Uses `../Stop-FontZillion/Fonts/stop.ttf`. Not part of the main Vite app.
- **codegrid-inversa-scroll-animation-nextjs:** Separate Next.js project in repo (different stack); not the live site.

---

## 20. Summary checklist for another AI/developer

- Single-page React (Vite) SPA; no router.
- Preloader: CITISTEK decode 1.5s, wave lock from both ends, then fade 200ms, content in 450ms.
- Staggered homepage reveal: black → logo (500ms) → nav (1000ms) → all (1500ms).
- Nav: fixed; scrolled = dark bar; over Look Ahead/News = light bar; DecodeText on links/CTA (1s).
- Sections in order: Hero (video + gradient) → Statement (typing headline + trapezoid image) → Industries (5 panels, decode) → Look Ahead (red band + InversaScroll) → Mission → News carousel → Footer.
- InversaScroll: 4vh pin, mask + gradient image + grid + 2 markers + 4 content blocks; GSAP ScrollTrigger.
- Fonts: Stop (preloader), Microgamma (body). Red #E10600, black #000.
- No meta description or OG in index.html; site is JS-rendered only.

Use this document to replicate behavior, add features, or migrate (e.g. to Next.js with SSR) without losing fidelity to the current site.
