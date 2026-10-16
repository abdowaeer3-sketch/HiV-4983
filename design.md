# HIV Virology Training Deck — Design

An animated, keyboard-driven 10-slide training deck on HIV virology (genome structure, replication cycle,
antigenic genes, pathogenic genes). Ships on web (Vite + React 19 + Motion). The deck presents itself:
one idea per slide, two points per slide, ending on what happens next.

Visual direction: dark editorial science. Cinematic electron-micrograph imagery treated as duotone,
huge high-contrast serif headlines, mono spec-sheet labels, a single acid-lime accent, and animated
SVG figures that teach the biology rather than decorate it. Reference: Superside "Overcommitted" report
cover supplied by the user (dark ground, oversized serif title, small tracked meta labels).

## Brand & Colors

CSS variables live in `packages/web/src/web/styles.css` (`.deck-root` scope).

| Token | Value | Use |
|-------|-------|-----|
| `--ink-900` | #07090A | Page letterbox / deepest ground |
| `--ink-800` | #0B0F11 | Slide background |
| `--ink-700` | #121A1D | Panels, figure wells |
| `--line` | rgba(255,255,255,0.09) | Hairlines, rules |
| `--text` | #F1F3EC | Headlines, primary text |
| `--text-dim` | #9AA4A8 | Body copy |
| `--text-faint` | #6B7478 | Captions, meta |
| `--lime` | #C9F24D | Accent: numerals, active states, viral elements |
| `--lime-deep` | #9BC22F | Accent hover / underline sweeps |
| `--steel` | #7FA8B8 | Diagram semantics: host / cellular elements |
| `--coral` | #FF7A5A | Semantic only: mutation, escape, error |

## Typography

Self-hosted woff2 in `packages/web/public/fonts/` (Google Fonts subsets), imported via `/fonts/fonts.css`.

- **Display** — `Fraunces` (variable serif, 300–700). Slide headlines, cover title, big numerals. Tight
  leading (0.95–1.05), slight negative tracking.
- **Body** — `Archivo` (300–700). Point titles, body copy, labels.
- **Mono** — `JetBrains Mono` (400/500). Section eyebrows, slide meta, figure labels, deck number.
- Scale (stage is a fixed 1600×900 design surface, scaled to fit the viewport): cover title 132px,
  slide headline 60px, point title 21px, body 16.5px/1.6, mono meta 11–12px with 0.18em tracking.

## Stage & Layout

- Fixed **1600×900** design stage, uniformly scaled to fit the viewport (letterboxed on the ink ground),
  so composition is identical on every screen and in screenshots.
- 72px gutters. Top meta bar (section eyebrow left, deck number right) over a hairline; bottom bar with
  slide counter, progress rail, and nav controls.
- Content slides: headline block full width, then a two-column body — left column carries the two points
  (stacked, numbered `01` / `02`), right column carries the animated figure.
- Cover: full-bleed duotone micrograph, oversized serif title, meta row pinned to the bottom.
- Closing slide: "what happens next" as a two-part handoff — the takeaway map plus a checklist.

## Motion

Motion (`motion/react`) is the single motion system.

- **Slide transition** — outgoing slide exits with x/scale/blur, incoming enters from the opposite side;
  ~0.5s, ease `[0.22, 1, 0.36, 1]`.
- **Per-slide orchestration** — one staggered reveal per slide: headline first, then figure, then points,
  then meta. No scattered micro-interactions.
- **Figures** — SVG paths draw (`pathLength`), genome blocks scale in sequence, virions travel along a
  path, strands convert base by base, selection arrows sweep, checklist ticks cascade.
- **Ambient** — slow drifting gradient bloom, fine grain overlay, cover image Ken Burns drift.
- Navigation: ←/→, space, PageUp/Down, Home/End, digit keys jump to a slide, `F` fullscreen, click
  prev/next, dot rail.

## Pages & Screens

- **Web — Deck** (`packages/web/src/web/pages/index.tsx` → `components/deck/Deck.tsx`) — the whole deck:
  10 slides, one screen, keyboard + pointer navigation.

## Key User Flows

1. Open → cover animates in → arrow keys / dots move through the four content sections → closing
   "what happens next" slide.
2. Presenter hits `F` for fullscreen, navigates with ←/→, reads two points per slide.
3. Reader scans: every slide states one idea, two supporting points, and one figure.

## Architecture

- Static, no API calls: content is a typed array in `lib/deck/content.ts`; figures are React/SVG
  components in `components/deck/figures/`.
- Imagery: public-domain CDC/NIH electron micrographs in `packages/web/public/images/`, treated with
  CSS duotone rather than baked into the asset.
