## Project Structure (readability-first)

This repository is organized for clarity and easy extension. The goal is a modern,
component-driven portfolio with a separate `playground/` area for experiments.

Top-level folders of interest:

- `src/components/` — Small, reusable UI components (e.g., `Navbar.js`, `Footer.js`).
- `src/layouts/` — Page layout helpers that compose common UI (e.g., `MainLayout.js`).
- `src/pages/` — Routeable pages (e.g., `Home.js`, `Projects.js`, `PlaygroundIndex.js`).
- `src/playground/` — Self-contained experiments and mini-projects. Each experiment
	should live in its own folder and export a single React component for easy routing.
- `public/` — Static assets: favicons, `index.html`, images, etc. (Removed the older
	dice-roller app and background video to keep the public folder lean.)

How to run

1. Install dependencies: `npm install` (use `--legacy-peer-deps` if needed for older peers).
2. Start the dev server: `npm start`.
3. Run tests: `npm test -- --watchAll=false`.

How to add a playground experiment

1. Create `src/playground/<name>/` and put the component and any assets there.
2. Export the default component as the experiment entry-point.
3. Add a link to `/playground` (see `src/pages/PlaygroundIndex.js`) so it is discoverable.
