# CITISTEK logo/icon test (Stop font)

Open `index.html` to compare short word combinations in the Stop typeface (red on black).

**Font path:** The page loads the Stop font from `../Stop-FontZillion/Fonts/stop.ttf` (same setup as the main app’s preloader in `src/App.css`).

**If the font doesn’t appear** when you double‑click `index.html`, browsers may block local font loading over `file://`. Serve this folder instead, for example from the project root:

- `npx serve .` then open http://localhost:3000/logo-icon-test/
- or `python -m http.server` then open http://localhost:8000/logo-icon-test/
