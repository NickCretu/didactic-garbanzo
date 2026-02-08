# Pauch Design System

This is the single source of truth for all visual decisions on the Pauch website.
Every component, page, and layout change must follow these rules.

---

## Colors

| Token        | Value     | Usage                                      |
|-------------|-----------|---------------------------------------------|
| `primary`   | `#111111` | Headings, nav links, strong text            |
| `body`      | `#333333` | Body/paragraph text (long-form reading)     |
| `muted`     | `#666666` | Metadata, captions, helper text             |
| `faint`     | `#999999` | Disabled states, placeholders               |
| `accent`    | `#0066CC` | Buttons, links, interactive highlights      |
| `surface`   | `#F7F7F8` | Card backgrounds, alternating sections      |
| `background`| `#FFFFFF` | Page background                             |
| `border`    | `#E5E5E5` | Dividers, card borders, section separators  |

Rules:
- Never use pure black (`#000`) for text. Use `primary` (#111).
- Never use `muted` for body paragraphs. Reserve it for dates, labels, captions.
- Body text in blog posts and descriptions uses `body` (#333).

---

## Typography

Font family: Inter, system-ui, -apple-system, sans-serif.

| Token     | Mobile       | Desktop      | Weight | Line-height |
|-----------|-------------|--------------|--------|-------------|
| Display   | 28px        | 40px         | 700    | 1.2         |
| H1        | 24px        | 32px         | 700    | 1.25        |
| H2        | 20px        | 28px         | 600    | 1.3         |
| H3        | 17px        | 20px         | 600    | 1.35        |
| Body      | 15px        | 16px         | 400    | 1.7         |
| Small     | 13px        | 14px         | 400    | 1.5         |
| Caption   | 12px        | 13px         | 400    | 1.5         |

Rules:
- Use `clamp()` for fluid sizing between mobile and desktop breakpoints.
- Headings use `letter-spacing: -0.01em` for tighter feel at large sizes.
- Never skip heading levels (no H1 -> H3).
- Section headings on the landing page use H2 size.
- Blog article headings: H2 for major sections, H3 for subsections.

---

## Spacing Scale

Base unit: 4px. All spacing values must come from this scale.

| Token | Value |
|-------|-------|
| 1     | 4px   |
| 2     | 8px   |
| 3     | 12px  |
| 4     | 16px  |
| 6     | 24px  |
| 8     | 32px  |
| 12    | 48px  |
| 16    | 64px  |
| 20    | 80px  |

---

## Layout

| Element                | Mobile    | Desktop   |
|------------------------|-----------|-----------|
| Container max-width    | 100%      | 1200px    |
| Container padding (x)  | 20px      | 32px      |
| Section padding (y)    | 48px      | 80px      |
| Blog article max-width | 100%      | 680px     |
| CTA banner max-width   | 100%      | 640px     |

---

## Section Pattern (Landing Page)

Every landing page section follows this structure:

```
<section class="section [bg-surface]">
  <div class="container">
    <h2>Section Title</h2>           <!-- H2 size, text-center -->
    <p>Optional subtitle</p>         <!-- Small size, muted, mb-6 md:mb-8 -->
    <!-- Content -->
  </div>
</section>
```

Spacing rules:
- Section title bottom margin: 8px (to subtitle) or 24px (to content if no subtitle)
- Subtitle bottom margin: 24px mobile / 32px desktop
- Alternate section backgrounds: white -> surface -> white -> surface

---

## Blog Article Rules

Blog posts must read like a clean document (Google Docs feel).

- Body: 16px, line-height 1.8, color #333
- Paragraph gap: `margin-bottom: 1.5em` (clear visual break between paragraphs)
- H2: 24px mobile / 28px desktop, weight 700, margin `2em 0 0.75em`
- H3: 18px mobile / 20px desktop, weight 600, margin `1.75em 0 0.5em`
- Lists: margin `0.75em 0 1.25em`, item gap `0.5em`
- No decorative borders between headings. Let whitespace define hierarchy.
- Blog title: 28px mobile / 36px desktop, weight 700
- Blog excerpt: 16px, color #555, line-height 1.6

---

## Buttons

Three sizes, consistent across the site:

| Size | Padding        | Font size |
|------|---------------|-----------|
| sm   | 12px 16px     | Small     |
| md   | 12px 24px     | Body      |
| lg   | 14px 28px     | Body      |

All buttons use `border-radius: 9999px` (pill shape), `font-weight: 500`.

---

## Cards

- Border radius: 12px (mobile) / 16px (desktop)
- Padding: 20px (mobile) / 24px (desktop)
- Shadow: `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)`
- Icon containers inside cards: 40px mobile / 48px desktop, rounded-xl

---

## Component Max-widths

CTA banners (ReviewsBanner, StrengthFinderCTA) must be constrained:
- `max-w-2xl mx-auto` (max 672px) so they don't stretch on large screens.

---

## Logo

- The SVG viewBox must be cropped tightly to the artwork bounds.
- In the header: render at `h-7 sm:h-8 w-auto`.
- Never distort aspect ratio.

---

## Telegram Floating Button

- Size: 48px on mobile, 56px on desktop.
- Position: bottom-right, 16px from edges on mobile, 24px on desktop.
- Body must have bottom-padding equal to button size + 16px on mobile to prevent overlap.
- On blog pages, add extra bottom padding to the article container.
