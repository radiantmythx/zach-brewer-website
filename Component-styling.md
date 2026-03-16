Component Styling Changes
=========================

Summary
-------
This document records the exact component styling and behavior changes I made to implement a "hollow" rainbow reset button and to harden pulse behavior across components.

Files Edited
-----------
- `src/components/RainbowResetButton.js`
- `src/components/RainbowButton.js`

What I changed (exact edits)
----------------------------
1. `src/components/RainbowResetButton.js`
   - Introduced utility color helpers (copied/used same helpers as `RainbowButton`): `hexToRgb`, `rgbToHsl`, `hslString`.
   - Added `baseColors` and computed `compColors` (complementary hues) so the reset button border calculation matches `RainbowButton`.
   - Added `ringWidth` constant and set it to `1` (px) to ensure a consistent 1px ring.
   - Default `bgAlpha` prop changed to `0` so the inner area is transparent by default.
   - Added `textRainbow` prop (default `false`) so the label can optionally render a rainbow gradient text.
   - Replaced brittle CSS masking approach with an SVG ring overlay:
     - Created an `svg` element (cached in `svgRingRef`) inside the button element and updated it in the RAF loop.
     - The SVG contains a `linearGradient` (with stops computed from `compColors`) and a rounded `rect` stroked with that gradient. The `rect` stroke uses `stroke-width = ringWidth` and `rx` computed from the element's computed `borderRadius` so the ring appears rounded and exactly 1px thick.
     - The SVG overlay is positioned absolutely inside the button so the center remains transparent while the ring renders visually as a rounded border.
   - Ensured the RAF loop updates the gradient rotation (`hueShift`) for smooth animation.
   - Inner content container (`innerStyle`) uses `background: transparent` when `bgAlpha` === 0; otherwise it uses the provided `bgAlpha` to show a fill.
   - The label uses the `textRainbow` boolean to either render white text or use `-webkit-background-clip: text` + `conic-gradient` for rainbow text.
   - Pulse creation (`createBodyPulse`) unchanged in shape, but each generated pulse SVG is tagged with `data-rbg-rst` and cleaned up on new clicks to prevent accumulation.
   - Cleanup on unmount now clears timeouts and removes the SVG ring overlay.

2. `src/components/RainbowButton.js`
   - Tagged pulse SVGs created by `createBodyPulse` with `data-rbg` and a class so they can be removed reliably.
   - On click, any existing global pulse SVGs (`svg[data-rbg]`) are removed immediately before creating a new one. This prevents visual "burn" when users spam-click.

Behavior Notes
--------------
- The `RainbowResetButton` now appears hollow by default: a transparent center with a 1px rounded rainbow ring calculated the same way `RainbowButton` computes its border color.
- Pulses are short-lived SVG overlays appended to the document that are always removed either via scheduled timeouts or immediately on subsequent clicks.
- `textRainbow` toggles rainbow text (animated via the same hue rotation used by the ring). If `textRainbow` is `false`, the text is white by default.

How to Use
----------
- Default hollow reset button (transparent center):

  <RainbowResetButton onClick={resetHandler}>Reset</RainbowResetButton>

- With visible inner fill:

  <RainbowResetButton bgAlpha={0.08}>Reset</RainbowResetButton>

- With rainbow text:

  <RainbowResetButton textRainbow>Reset</RainbowResetButton>

Implementation Rationale
------------------------
- CSS masking proved unreliable across browsers and caused invisibility in certain layout states. The SVG ring overlay provides pixel-exact control of stroke thickness and rounded corners and avoids masking inconsistencies.
- Tagging pulse SVG elements and removing them on new clicks ensures pulses do not accumulate even under spam-clicking; this makes the UI predictable and avoids visual artifacts.

Next Steps / TODOs
------------------
- Run visual tests on target browsers (Chrome, Edge, Firefox, Safari) to ensure the SVG ring overlay behaves identically across engines. If any engine shows issues, we can fall back to an inline SVG inside the React render tree.
- Consider moving commonly used helpers (color conversions, pulse creation) into a shared utility module if more components will reuse them.

---
File created by automated edit on behalf of the project maintainer.
