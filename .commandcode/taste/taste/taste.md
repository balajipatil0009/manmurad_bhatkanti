# Taste
- Prefers the homepage header to be transparent (bg-less, white text) overlaying a full-viewport hero, while all other pages use a solid/semi-opaque sticky header — i.e. per-page header treatment rather than one global style. Confidence: 0.65
- Prefers the hero section itself to fill the whole viewport (`min-h-screen`) with the nav overlaying it, rather than subtracting the navbar height from the hero or adding a top margin/offset to push content below the nav. Confidence: 0.6
- Specifies colors by named design tokens defined as CSS variables (e.g. `var(--color-forest)` / `bg-forest`) instead of hardcoded hex or arbitrary values. Confidence: 0.7
- Expects text/icons on a dark or colored solid header to be explicitly white so contrast holds, and expects unused color-state logic to be deleted once a single treatment is chosen. Confidence: 0.55
- Wants the main menu links rendered inline in the desktop navbar (visible between logo and CTA) rather than hiding all navigation behind a burger at every breakpoint; the burger menu is for mobile/tablet only. Confidence: 0.6
- Expects menu links that name a category/filter (e.g. "Night Treks", "Backpacking Tours") to deep-link to the pre-filtered results (`/trips?category=night-trek`), not all land on the same unfiltered listing page. Confidence: 0.75
- When a value is duplicated between hardcoded code defaults and CMS seed data (e.g. seeded `trekLinks`), expects both to be updated together so a re-seed doesn't reintroduce the old behavior. Confidence: 0.6
- Expects behavior claims to be verified against the running built app (start server, hit the actual URLs, confirm the expected results), not just typecheck/lint/build passing. Confidence: 0.55
