Tailwind Structure & Agent Guide

Purpose
- Provide a quick reference for future contributors or automation agents working with Tailwind in this project.

Key files
- `src/tailwind.css` — Tailwind entrypoint; contains the `@tailwind base; @tailwind components; @tailwind utilities;` directives.
- `postcss.config.js` — PostCSS plugins (Tailwind + Autoprefixer) used by CRA during `npm start`/`npm run build`.
- `tailwind.config.js` — Tailwind configuration: `darkMode: 'class'`, `content` globs, theme extensions (colors, spacing, etc.).
- `src/index.css` — App-level CSS helpers and small custom utilities (`.panel`, `glow`, `bloom`) used across components.
- `src/tailwind.generated.css` (optional) — if you prefer an explicit compiled output, the CLI scripts will write here.

Scripts (in `package.json`)
- `npm run build:css` — compile Tailwind once: `npx tailwindcss -i ./src/tailwind.css -o ./src/tailwind.generated.css --minify`.
- `npm run watch:css` — run Tailwind CLI in watch mode for rapid iterations.
- Default CRA workflows (`npm start`, `npm run build`) rely on `postcss.config.js` and `tailwind.config.js` during bundling.

Development workflow recommendations
- Fast iteration (explicit compile): run `npm run watch:css` in a separate terminal while editing styles/components; import `src/tailwind.generated.css` from `src/index.js` if you choose an explicit compiled flow.
- CRA/PostCSS flow: Keep `src/tailwind.css` and let CRA process it during `npm start`/`npm run build` (no extra import needed if `src/index.js` already imports `./tailwind.css`).
- Dark mode: project uses `darkMode: 'class'` — toggle by adding/removing the `dark` class on the root element (e.g., `<div className={`min-h-screen ${darkMode? 'dark':''}`}>`).

Content globs
- Keep `tailwind.config.js` `content` globs tight to project source: `./src/**/*.{js,jsx,ts,tsx}` and `./public/index.html` to ensure unused CSS is purged in production builds.

Extending Tailwind
- Add tokens under `theme.extend` in `tailwind.config.js` (colors, spacing, fonts) and commit them with clear intent.
- Use official plugins (forms, typography, aspect-ratio) where appropriate: `npm install -D @tailwindcss/typography` then add to `plugins: []`.

Agent responsibilities (when updating styles)
- Always update `tailwind.config.js` when adding theme tokens the components will rely on.
- Run `npm run build:css` or `npm run watch:css` locally if you add custom utilities and want to verify the generated CSS quickly.
- When modifying `public/index.html`, avoid injecting CDN tailwind; prefer local PostCSS build for reproducible results.

Troubleshooting
- If Tailwind classes are not appearing: ensure `src/tailwind.css` is imported by `src/index.js` and that `postcss.config.js` contains `tailwindcss` and `autoprefixer`.
- If you encounter peer dependency errors on `npm install`, try `npm install --legacy-peer-deps` and consider updating/removing incompatible packages.
- When tests or builds fail due to large CSS, verify `tailwind.config.js` `content` includes only project files to allow purging.

Commit & CI guidance
- Keep Tailwind configuration and generated assets out of source if CI builds can run `npm run build` (preferred). If you commit compiled CSS, document it clearly.
- Add a short note in PRs describing any global tokens or design system changes.

Minimal checklist before merging style changes
- [ ] Confirm `tailwind.config.js` updated (if theme tokens added).
- [ ] Run `npm run build:css` (if using explicit compiled file) and verify visual changes.
- [ ] Run `npm start` and manually verify a couple of pages on desktop and mobile viewport.

This file is intended to help future agents and contributors understand the intended Tailwind workflow for this repository.
