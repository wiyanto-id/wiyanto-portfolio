# Project memory

## Product intent & audience

- WIYANTO personal portfolio website built with Vite + React.
- Showcases projects grouped into Technology, Creative, and Research categories.
- Audience: visitors evaluating WIYANTO’s professional work and background.

## Brand personality & voice

- “Modern Heritage” identity: sophisticated, premium, calm, understated.
- Editorial character with generous spacing; restraint over decoration.

## Visual design & UX direction

- Primary theme: Royal Navy with very subtle tonal gradients/shade variation for depth (not vivid blue, not neon).
- Light surfaces: Ivory Heritage — warm ivory, soft cream, pale parchment, slightly deeper neutrals; avoid pure white dominance, avoid beige/brown/vintage.
- Accent: Royal Premium Gold — restrained, elegant; not mustard, metallic, glitter, bevel, or glow; reserved identity accent, not universal UI color.
- Project category colors preserved: Technology (blue), Creative (red), gold accent, Research (green). Now use restrained tonal gradients instead of flat blocks; original hue identity must stay recognizable.
- Typography: approved serif + sans-serif pairing; do not resize headings or rearrange composition.
- Layout approved and frozen: navigation, section arrangement, spacing, project card proportions, project numbering, circular image placeholders.
- Project Detail Modal: Ivory surface + Royal Navy overlay, close controls, responsive; layout and action logic unchanged.
- Avoid: glassmorphism, heavy/large blurry shadows, excessive outlines, artificial 3D, batik patterns, heritage ornaments, decorative illustrations, new animations.
- Theme is centralized via reusable design tokens/variables; prefer token-based palette changes over isolated edits.

## Decisions, constraints & rationale

- Visual refinement only — not a redesign. CSS-only gradients/tonal variation; no new libraries or assets.
- Preserve all functionality: navigation, project filtering, modal behavior, CTA logic, interactions.
- Exact brand color values not established from original logo; use restrained approximations and keep palette easy to adjust for future brand integration.
- Original logo not yet integrated.
- Production build verified passing after refinement.

## Open questions & assumptions

- Exact brand hex values pending original logo integration; current palette is approximation.
- Future brand integration may require token adjustments.
- Assumes centralized theme tokens already exist and are the correct place for palette changes.