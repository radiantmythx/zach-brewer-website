Conversion progress and notes
- **PostCSS/Tailwind conversion:** Completed local conversion steps — removed the Tailwind CDN from `public/index.html` and ensured `postcss.config.js` and `tailwind.config.js` exist and reference `./src/**/*.{js,jsx,ts,tsx}`. Added helpful npm scripts in `package.json`:
	- `npm run build:css` — compiles Tailwind from `src/tailwind.css` to `src/tailwind.generated.css` (minified)
	- `npm run watch:css` — runs the Tailwind CLI in watch mode for local development

- **Visual polish:** added a modern glassy `panel` utility in `src/index.css`, improved the `Navbar` for a glass/backdrop look, gradient mark, hover animations, and a cleaner mobile menu. Updated `Home` and `Projects` to use the new panel style.

Next recommended steps
- Run `npm install` to make sure `tailwindcss`, `postcss`, and `autoprefixer` are installed (they are listed in `devDependencies`).
- For production builds prefer letting `react-scripts` + PostCSS process `src/tailwind.css` during `npm run build`. Alternatively, you can run `npm run build:css` to produce `src/tailwind.generated.css` and import it from `src/index.js` if you prefer an explicit compiled file.

If you want, I can now:
- run the `npm run build:css` locally and wire the generated file into `src/index.js`, or
- keep the current setup (PostCSS via CRA) and continue refining the navbar animations and other panels.
 
Session summary (what we changed in this session)
- **Goal:** Convert from Tailwind CDN to PostCSS/Tailwind build, and polish visual components (navbar, panels).
- **Key edits made:**
	- Removed Tailwind CDN from `public/index.html` and configured Tailwind/PostCSS for CRA.
	- Added Tailwind CLI helper scripts: `npm run build:css` and `npm run watch:css` in `package.json`.
	- Updated `src/App.js` to apply app-level background and `dark` class handling.
	- Removed a hard-coded `background-color` from `src/index.css` so `bg-` utilities control the page.
	- Added a reusable `.panel` CSS utility and visual helpers (`glow`, `bloom`, `nav-bloom`) in `src/index.css`.
	- Rewrote `src/components/Navbar.js` for a slick glassy navbar with gradient mark, hover animations, and improved mobile menu.
	- Updated `src/pages/Home.js` and `src/pages/Projects.js` to use the new `panel` style and refined CTAs.
	- Removed `react-typical` (incompatible with React 19) and simplified the Home subtitle.

- **Dev commands I ran locally** (on your machine via the workspace):
	- `npm install --legacy-peer-deps` — installed dependencies resolving a peer conflict with `react-typical`.
	- `npm start` (ran on `PORT=3001` to avoid port conflicts) — started CRA dev server and verified styles compile via PostCSS.

- **Files changed (high level):**
	- `public/index.html`, `package.json`, `postcss.config.js`, `tailwind.config.js`,
		`src/tailwind.css`, `src/index.css`, `src/App.js`, `src/components/Navbar.js`,
		`src/pages/Home.js`, `src/pages/Projects.js`, `README-structure.md`.

- **Notes & recommended next steps:**
	- Run `npm install` locally (or `npm install --legacy-peer-deps` if you hit peer conflicts) and `npm start`.
	- Optionally run `npm run watch:css` during active CSS edits to get an explicit compiled `src/tailwind.generated.css`.
	- For production use the CRA PostCSS pipeline (`npm run build`) — no CDN required.

## Project Structure & Refactor Guide

This repository is organized for clarity and easy extension. The goal is a modern,
component-driven portfolio with a separate `playground/` area for experiments.
This project was migrated from Material UI to Tailwind CSS to give full visual
control and a mobile-first utility workflow.

Top-level folders of interest:

- `src/components/` — Small, reusable UI components (e.g., `Navbar.js`, `Footer.js`).
- `src/layouts/` — Page layout helpers that compose common UI (e.g., `MainLayout.js`).
- `src/pages/` — Routeable pages (e.g., `Home.js`, `Projects.js`, `PlaygroundIndex.js`).
- `src/playground/` — Self-contained experiments and mini-projects. Each experiment
	should live in its own folder and export a single React component for easy routing.
- `public/` — Static assets: favicons, `index.html`, manifest, etc. (Large legacy
	media tools were removed to keep the bundle small.)

Design goals

- Mobile-first: layout and components work well on phones — touch targets,
	font sizing, and navigation are responsive.
- Utility-first styling: Tailwind CSS is used for consistent spacing, small
	bundle sizes, and fast iteration.
- Accessibility: use semantic elements and ARIA attributes; Tailwind +
	accessible primitives (Headless UI / Radix) are recommended for interactive
	components.
- Performance: keep the public bundle small, lazy-load large assets, and run
	Lighthouse audits to measure improvements.

Recommended UI stacks (all free / permissive licenses)

- Tailwind CSS (MIT) + Headless UI / Radix (MIT): utility-first styling plus
	accessible primitives. This project now uses Tailwind across pages and
	components.

Notes on migration

- Material UI and Emotion were removed from runtime; the app now uses Tailwind
	with PostCSS (Tailwind v3 + PostCSS 8 + Autoprefixer).
- Tailwind is compiled during the CRA build using `src/tailwind.css` and
	`postcss.config.js` (no CDN in final setup).
- Key files changed in the migration:
	- `src/tailwind.css` — Tailwind directive entrypoint.
	- `postcss.config.js` / `tailwind.config.js` — build configuration.
	- `src/layouts/MainLayout.js`, `src/components/Navbar.js`, `src/components/Footer.js`,
		`src/pages/*.js` — migrated from MUI markup to Tailwind utilities.

Commands used during cleanup & verification

1. Install compatible toolchain (if not already):

```
npm install -D tailwindcss@3 postcss@8 autoprefixer
npx tailwindcss init -p
```

2. Development & build

```
npm start
npm run build
```

What I removed/cleaned in this session

- Removed MUI runtime usage from source files.
- Added a Tailwind-based responsive layout and polished main pages (Home,
	Projects, About, Contact, Navbar, Footer).
- Removed generated `build/` artifacts from the working workspace (safe to
	regenerate via `npm run build`).

Files of note (recent edits)

- `src/index.js`, `src/tailwind.css`, `src/index.css` — CSS entry and helpers
- `src/layouts/MainLayout.js` — responsive container
- `src/components/Navbar.js`, `src/components/Footer.js` — navigation and footer
- `src/pages/Home.js`, `src/pages/Projects.js`, `src/pages/About.js`,
	`src/pages/Contact.js`, `src/pages/PlaygroundIndex.js` — page content
- `postcss.config.js`, `tailwind.config.js` — build configs

Next recommended steps

- Run `npm run lint` (or your preferred linter) and fix any remaining warnings.
- Add a small Jest/react-testing-library test or two for critical components.
- Optionally enable stricter purging in `tailwind.config.js` for further CSS
	size reductions.

If you want, I can:
- run the build and resolve any lint warnings now, or
- continue polishing specific pages or add a dark-mode toggle with persistence.
Tell me which you prefer and I'll proceed.

How to run the project

1. Install dependencies: `npm install` (use `--legacy-peer-deps` only if necessary).
2. Start dev server: `npm start`.
3. Build for production: `npm run build`.
4. Tests: the repository currently contains no unit tests — add Jest/react-testing-library
	 tests under `src/**/__tests__` or `src/**/*.{spec,test}.(js|jsx|ts|tsx)`.

Quick refactor checklist (recommended next steps)

1. Layout & responsiveness
	 - Use `src/layouts/MainLayout.js` to provide a responsive container and main/content
		 element; make sure it provides sufficient vertical space, padding, and handles
		 small-screen widths gracefully.
2. Navigation
	 - Update `src/components/Navbar.js` to collapse long link lists into a menu on
		 small screens (MUI `Drawer` or `Menu` components work well).
3. Images & media
	 - Optimize images and lazy-load large media. Keep the `public/` folder lean.
4. Theming
	 - Use MUI's `ThemeProvider` for light/dark themes and consistent spacing/scales.
5. Accessibility & testing
	 - Run Lighthouse audits, add keyboard checks, and add basic component tests.

How to add a playground experiment

1. Create `src/playground/<name>/` and export a default React component as the
	 experiment entry-point.
2. Add a route or link to `/playground` (see `src/pages/PlaygroundIndex.js`).
3. Keep the playground self-contained (local assets + styles) and lazy-load it if
	 it includes heavy dependencies.

Notes & next steps for maintainers

- The project already contains `@mui/material` — leverage the responsive `Grid`,
	`Container`, `Stack`, and `useMediaQuery` utilities to make pages adapt to phone
	and tablet sizes.
- If you want a utility-first workflow, consider adding Tailwind CSS later — both
	approaches work, but mixing them increases cognitive overhead.
- To verify visual changes on phones, run dev server and use Chrome DevTools device
	toolbar or test on a real device.

If you'd like, I can make the first small refactor changes now: ensure the mobile
meta tags are present, make `MainLayout` more mobile-friendly, and add a short
Nav collapse for small screens. Tell me which of those you'd like me to do next.

Recent quick changes made in this session
- **Added Tailwind CDN**: included `https://cdn.tailwindcss.com` in `public/index.html` so Tailwind utilities work immediately without a PostCSS build.
- **Enabled class-based dark mode**: Tailwind config is set for `darkMode: 'class'` so the app's theme toggles work as expected.
- **Removed hard-coded body background**: cleared `background-color: white;` from `src/index.css` so page-level `bg-` utilities can control appearance.
- **App root background handling**: updated `src/App.js` to apply `bg-` and text color classes and to add/remove the `dark` class when toggling theme.

These edits make the existing Tailwind-based components render correctly in development without requiring a build step. If you want, I can:
- convert the project to a full PostCSS/Tailwind build (recommended for production), or
- keep using the CDN for quick edits and continue polishing component styles (recommended for rapid iteration).

Migration notes: Tailwind

- This repo now uses Tailwind CSS utility classes in components for the redesign.
- For fastest iteration I added Tailwind via the official CDN in `public/index.html`.
	That enables the new Tailwind classes without requiring a PostCSS build step.
- If you prefer a production PostCSS setup (faster CSS and purging unused styles),
	I can convert the project to a full Tailwind/PostCSS build (will update `postcss.config.js`
	and `tailwind.config.js`). For now, CDN keeps the dev flow simple and mobile-first.
