# Pauch Website — Project Documentation

This document explains the full context of the codebase, everything that has been built and changed, and how the site gets pushed to production.

---

## 1. What This Project Is

Pauch is a static, multilingual product catalog for nicotine pouches, targeting users in Moldova. It supports three languages (English, Russian, Romanian) and lets customers browse products, read blog content, and place orders via Telegram.

The site is a pure static build — no server, no database, no API. Everything compiles to HTML/CSS/JS files in a `dist/` folder that gets deployed to a CDN.

---

## 2. Tech Stack

| Layer       | Tool                     | Purpose                                        |
|-------------|--------------------------|------------------------------------------------|
| Framework   | **Astro 4.x**            | Static site generator with component islands   |
| Styling     | **Tailwind CSS 3.4**     | Utility-first CSS framework                    |
| Language    | **TypeScript**           | Type safety across components and content       |
| Content     | **JSON content collections** | Products, blog posts, and hubs stored as JSON |
| i18n        | **Custom helpers**       | `src/i18n/index.ts` with translation loaders   |
| Deployment  | **Netlify** (primary) / **GitHub Pages** (secondary) | Static hosting with CDN |

---

## 3. Project Structure

```
pouchwebsite_2/
├── .cursor/rules/
│   └── design-system.md          # Design system (single source of truth for all visual decisions)
├── .github/workflows/
│   └── deploy.yml                # GitHub Pages CI/CD pipeline
├── netlify.toml                  # Netlify build configuration
├── astro.config.mjs              # Astro framework config (site URL, i18n, integrations)
├── tailwind.config.mjs           # Tailwind theme tokens (colors, fonts, spacing, shadows)
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript config with path aliases
├── public/                       # Static assets (served as-is)
│   ├── favicon.svg
│   ├── logo-new.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
│       ├── products/             # Product images (.webp)
│       └── brands/               # Brand logos
├── src/
│   ├── components/
│   │   ├── home/                 # Landing page sections
│   │   │   ├── Hero.astro
│   │   │   ├── TrustBand.astro
│   │   │   ├── BrandsSection.astro
│   │   │   ├── CatalogGrid.astro
│   │   │   ├── WhyUs.astro
│   │   │   ├── ShippingSection.astro
│   │   │   ├── AboutSection.astro
│   │   │   ├── StrengthGuide.astro
│   │   │   ├── StrengthFinderCTA.astro
│   │   │   ├── ReviewsBanner.astro
│   │   │   ├── FAQ.astro
│   │   │   ├── BlogPreview.astro
│   │   │   └── StrengthFinder.astro
│   │   ├── layout/               # Structural components
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── AgeGate.astro
│   │   │   └── LanguageSwitcher.astro
│   │   ├── product/              # Product catalog components
│   │   │   ├── ProductCard.astro
│   │   │   ├── ProductLineCard.astro
│   │   │   ├── ProductDetail.astro
│   │   │   └── ProductFilter.astro
│   │   └── ui/                   # Reusable UI primitives
│   │       ├── Button.astro
│   │       ├── Accordion.astro
│   │       └── TelegramButton.astro
│   ├── content/                  # Content collections (validated by Zod schemas)
│   │   ├── config.ts             # Collection schemas
│   │   ├── products/             # Product JSON files (slug, brand, strength, price, translations)
│   │   ├── blog/                 # Blog post JSON files (postId, translations with markdown content)
│   │   └── hubs/                 # Content hub JSON files (group blog posts by theme)
│   ├── i18n/                     # Internationalization
│   │   ├── index.ts              # Helper functions: getLangFromUrl, useTranslations, getLocalizedPath, etc.
│   │   ├── en.json               # English UI strings
│   │   ├── ru.json               # Russian UI strings
│   │   └── ro.json               # Romanian UI strings
│   ├── layouts/
│   │   └── Layout.astro          # Base HTML layout (head, meta, JSON-LD, Open Graph)
│   ├── pages/                    # File-based routing
│   │   ├── index.astro           # Root redirect (detects browser language → /en/, /ru/, or /ro/)
│   │   ├── en/                   # English routes
│   │   │   ├── index.astro       # Homepage
│   │   │   ├── product/[slug].astro
│   │   │   ├── blog/index.astro
│   │   │   ├── blog/[slug].astro
│   │   │   ├── strength-finder.astro
│   │   │   ├── age-policy.astro
│   │   │   ├── terms.astro
│   │   │   └── privacy.astro
│   │   ├── ru/                   # Russian routes (same structure)
│   │   └── ro/                   # Romanian routes (same structure)
│   └── styles/
│       └── global.css            # Global styles: font imports, base resets, component classes
└── dist/                         # Build output (generated, not committed)
```

---

## 4. How Routing and i18n Work

Every page exists three times — once per language. The URL structure is:

```
/{lang}/                      → Homepage
/{lang}/product/{slug}        → Product detail
/{lang}/blog                  → Blog index
/{lang}/blog/{slug}           → Blog post
/{lang}/strength-finder       → Strength calculator
/{lang}/terms                 → Terms of service
/{lang}/privacy               → Privacy policy
/{lang}/age-policy            → Age verification policy
```

The root `/` page uses JavaScript to detect the browser's language and redirects to the appropriate locale prefix. All internal links use `getLocalizedPath()` from `src/i18n/index.ts` to stay in the correct language.

Translations for UI strings live in `src/i18n/{lang}.json`. Content translations (product names, blog posts) are embedded in each content JSON file under a `translations` key.

---

## 5. How Content Works

### Products

Each product is a JSON file in `src/content/products/`. Products have a `slug`, `brand`, `strength`, `price`, and translations for `name` and `description` in all three languages.

### Blog Posts

Blog posts are JSON files in `src/content/blog/`. Each contains markdown-like content in the `translations.{lang}.content` field. A custom `simpleMarkdown()` function (defined inline in the blog slug pages) converts this content to HTML at build time.

Blog content uses `##` for H2 headings, `###` for H3, and standard markdown for bold, links, and lists. The rendered HTML is injected via Astro's `set:html` directive.

**Important**: Because `set:html` injects content that Astro's scoped styles cannot reach, blog slug pages use `<style is:global>` instead of `<style>`. The CSS is still scoped by class selectors (`.blog-article`, `.blog-content`), just not by Astro's data attributes.

### Content Hubs

Hub JSON files in `src/content/hubs/` group related blog posts by theme (e.g., "switching", "safety", "strength"). Blog index pages use these hubs to organize posts.

---

## 6. The Design System

All visual decisions are codified in `.cursor/rules/design-system.md`. This file is the single source of truth and must be consulted before making any visual changes.

Key decisions:

- **Colors**: 8 semantic tokens (primary, body, muted, faint, accent, surface, background, border) defined in `tailwind.config.mjs`
- **Typography**: Fluid `clamp()` sizes for Display, H1, H2, H3, Body, Small, Caption — also defined as Tailwind `fontSize` tokens
- **Spacing**: 4px base unit scale
- **Layout**: 1200px max container, 680px max article width, 640px max CTA width
- **Cards**: Consistent border-radius, padding, and shadow across all cards
- **Buttons**: Three sizes (sm, md, lg), pill-shaped
- **Blog articles**: Google Docs-like reading experience with generous paragraph spacing and clear heading hierarchy

---

## 7. What Has Been Done (Changelog)

### Phase 1 — Mobile Density Overhaul

Reduced excessive whitespace on mobile without changing the visual style:

- Reduced section vertical padding on mobile (from 72–120px down to 48px)
- Scaled down H1/H2 sizes on mobile using `clamp()` fluid sizing
- Compacted feature cards (WhyUs, ShippingSection) — tighter padding, smaller icon containers
- Fixed floating Telegram button overlap by adding bottom body padding
- Compressed hero section spacing
- Tightened product filter and catalog intro spacing
- Made FAQ accordion rows denser
- Compressed CTA banners (StrengthFinderCTA, ReviewsBanner)

### Phase 2 — Blog Post Readability

Fixed blog posts that were rendering without any paragraph spacing or heading hierarchy:

- Diagnosed that Astro's scoped CSS was preventing styles from reaching `set:html` content
- Changed `<style>` to `<style is:global>` in all three blog slug page files
- Implemented comprehensive blog typography: 16px body text with 1.8 line-height, clear paragraph gaps (1.5em), properly styled H2/H3 with margins, tight list spacing
- Verified all 12 blog JSON files already contained proper markdown hierarchy — no content edits needed

### Phase 3 — Logo and Favicon

- Replaced the logo and favicon with a new SVG (`transparent.svg`)
- Fixed "gray strips" around the logo caused by empty space in the SVG viewBox using CSS `clip-path: inset(15% 0)` and `transform: scale(1.18)` in both Header and Footer

### Phase 4 — Full Design System Overhaul

Created a consistent design system and applied it across the entire website:

- **Created `.cursor/rules/design-system.md`** — the codified design reference
- **Updated `tailwind.config.mjs`** — added all color tokens, fluid font size tokens, max-width tokens, and card shadow
- **Updated `src/styles/global.css`** — standardized container, section, button, and card base styles
- **Updated every landing page component** — applied consistent typography tokens (`text-h2`, `text-small`, `text-body`, etc.), standardized card padding, icon sizes, and section spacing
- **Updated Header/Footer** — consistent nav link sizes, logo sizing, footer spacing
- **Updated blog index pages** — consistent heading and card preview sizes
- **Added legacy Tailwind aliases** (`headline`, `title`) to avoid breaking existing pages that used older class names

### Phase 5 — Final Polish

- Bumped `text-small` from 14px to 15px with line-height 1.6 for better readability of body text across the landing page
- Added equal top/bottom padding (16px each) to FAQ accordion answers for balanced breathing room

---

## 8. How to Push to Production

### Option A: Netlify (current primary)

The site is currently configured to deploy to `https://pauch.netlify.app`.

**Automatic deploys**: If the repo is connected to Netlify, every push to the `main` branch triggers a build automatically. Netlify reads `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

**Manual deploy** (if not connected to Git, or for one-off deploys):

```bash
# 1. Build the site
npm run build

# 2. Deploy via Netlify CLI
npx netlify-cli deploy --prod --dir=dist
```

Or drag-and-drop the `dist/` folder in the Netlify dashboard under Deploys.

### Option B: GitHub Pages (secondary)

A GitHub Actions workflow exists at `.github/workflows/deploy.yml`. It:

1. Triggers on push to `main` or manual dispatch
2. Checks out the code
3. Installs dependencies with `npm ci`
4. Runs `npm run build`
5. Uploads the `dist/` folder as a Pages artifact
6. Deploys to GitHub Pages

To use this:

1. Push the code to a GitHub repository
2. Go to Settings → Pages → set source to "GitHub Actions"
3. Every push to `main` will auto-deploy

**Important**: If switching to GitHub Pages, update `site` in `astro.config.mjs` to match the GitHub Pages URL (e.g., `https://username.github.io/repo-name`), and set `base` accordingly if the site is not at the root.

### The General Workflow

```bash
# 1. Make changes locally
# 2. Test with dev server
npm run dev

# 3. Build to verify no errors
npm run build

# 4. Preview the production build locally
npm run preview

# 5. Commit and push
git add .
git commit -m "describe your changes"
git push origin main
# → Netlify or GitHub Pages auto-deploys from here
```

---

## 9. Key Configuration Points

| What                  | Where                           | Notes                                    |
|-----------------------|---------------------------------|------------------------------------------|
| Site URL              | `astro.config.mjs` → `site`    | Currently `https://pauch.netlify.app`    |
| Telegram username     | `src/i18n/index.ts` line ~80   | Used for order deep links                |
| Design system rules   | `.cursor/rules/design-system.md`| Must be consulted for all visual changes |
| Tailwind theme tokens | `tailwind.config.mjs`          | Colors, fonts, spacing, shadows          |
| Global CSS            | `src/styles/global.css`        | Base styles, component classes           |
| Content schemas       | `src/content/config.ts`        | Zod validation for products, blog, hubs  |
| Product images        | `public/images/products/`      | Must be `.webp`, named by product slug   |
| Static assets         | `public/`                      | Favicon, robots.txt, sitemap, logos      |

---

## 10. Common Tasks

### Adding a new product

Create a JSON file in `src/content/products/` following the schema. Add a product image to `public/images/products/{slug}.webp`.

### Adding a new blog post

Create a JSON file in `src/content/blog/` with a unique `postId`. Include translations with markdown content. Use `##` for H2 sections and `###` for H3 subsections. The `simpleMarkdown()` function handles rendering.

### Changing visual styles

1. Read `.cursor/rules/design-system.md` first
2. Check if the change should be made in `tailwind.config.mjs` (tokens) or `src/styles/global.css` (base classes)
3. Update the design system doc if you're changing a design token or rule
4. Build and verify: `npm run build`

### Adding a new language

1. Add the locale to `astro.config.mjs` → `i18n.locales`
2. Create a new translation file in `src/i18n/`
3. Create a new page directory under `src/pages/` (copy an existing language's folder)
4. Add translations to all content JSON files
