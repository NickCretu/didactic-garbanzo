# Pauch Website - Client Content Guide

**Русская версия:** see `README.ru.md`

This guide is written for nontechnical users. You can update products, blog posts, and site texts directly from GitHub in the browser.

## 1. What This Website Is

This is a multilingual static website (English, Russian, Romanian) for nicotine pouch catalog + blog.

Main content lives in:

- `src/content/products/` - products
- `src/content/blog/` - blog posts (all 3 languages in each file)
- `src/content/hubs/` - blog categories
- `src/i18n/en.json`, `src/i18n/ru.json`, `src/i18n/ro.json` - homepage UI text, menu, FAQ, labels
- `public/images/products/` - product images
- `public/images/blog/` - blog images

## 2. Safe Publishing Workflow (No Terminal)

Use this every time:

1. Open your GitHub repo in browser.
2. Open the file you want to edit.
3. Click the pencil icon (`Edit this file`).
4. Make your changes.
5. Scroll down and write a short commit message.
6. Select `Commit directly to the main branch`.
7. Click `Commit changes`.
8. Wait for Netlify to deploy (usually 1-3 minutes).
9. Open the website and verify the change.

If something looks wrong, revert from GitHub:

1. Open `Commits`.
2. Open the last commit.
3. Click `Revert`.

## 3. What You Can Change and Where

- Change product name/description/price/strength: `src/content/products/*.json`
- Add or remove products: `src/content/products/`
- Change blog text/SEO titles/descriptions/slugs: `src/content/blog/*.json`
- Add or remove blog posts: `src/content/blog/`
- Change homepage section texts, FAQ, button labels: `src/i18n/en.json`, `src/i18n/ru.json`, `src/i18n/ro.json`
- Change legal pages: `src/pages/en/*.astro`, `src/pages/ru/*.astro`, `src/pages/ro/*.astro` (`terms.astro`, `privacy.astro`, `age-policy.astro`)
- Change Telegram destination link: `src/i18n/index.ts` (`TELEGRAM_DEEP_LINK`)
- Replace images: `public/images/products/`, `public/images/blog/`

## 4. Editing Products

### 4.1 Update existing product

1. Open any file in `src/content/products/` (example: `src/content/products/pablo-ice-cold.json`).
2. Edit values you need:
   - `price`
   - `strength`
   - `strengthCategory` (`low`, `medium`, `strong`, `extra`)
   - `flavorCategory` (`mint`, `citrus`, `berry`, `coffee`, `tropical`)
   - `translations.en.name`, `translations.ru.name`, `translations.ro.name`
   - `translations.*.description`
3. Commit.

### 4.2 Add a new product

1. In `src/content/products/`, click `Add file` -> `Create new file`.
2. Name it like: `brand-flavor-strength.json`.
3. Copy structure from an existing product JSON.
4. Fill all fields.
5. Upload product image to `public/images/products/`.
6. Set `image` field exactly like:
   - `"image": "/images/products/your-image.webp"`
7. Commit.

## 5. Editing Blog Posts

Each blog file contains **all 3 languages** (EN/RU/RO).

### 5.1 Update an existing blog post

1. Open file in `src/content/blog/`.
2. Edit inside `translations.en`, `translations.ru`, `translations.ro`.
3. Important fields:
   - `title` -> article title on page
   - `slug` -> URL part (change carefully)
   - `metaTitle` -> SEO title
   - `metaDescription` -> SEO description
   - `excerpt` -> short card text
   - `content` -> full article text
   - `faq` -> optional FAQ block
4. Commit.

### 5.2 Add a new blog post

1. Duplicate an existing blog file in `src/content/blog/`.
2. Rename to a new unique file name (example: `p013-new-topic.json`).
3. Change:
   - `postId` to new unique ID (`P013`, etc.)
   - `publishedAt` date (`YYYY-MM-DD`)
   - `hub` (`switching`, `strength`, `selection`, `safety`)
   - translations for all 3 languages
4. Add image in `public/images/blog/` and set `"image": "/images/blog/filename.jpg"`.
5. Commit.

## 6. Blog Content Formatting Rules

Inside `translations.*.content` use simple markdown style:

- `## Heading` for H2
- `### Subheading` for H3
- `- Item` for bullet list
- `1. Item` for numbered list
- `**bold**` for bold

### SEO recommendations for blog posts

- `metaTitle`: about 50-70 characters
- `metaDescription`: about 140-160 characters
- Keep `slug` short and readable
- Ensure all 3 languages are filled

## 7. Editing Homepage Text (Buttons, Sections, FAQ)

Text for homepage and many UI labels is in:

- `src/i18n/en.json`
- `src/i18n/ru.json`
- `src/i18n/ro.json`

Examples of editable sections inside these files:

- `hero`
- `catalog`
- `faq`
- `shipping`
- `about`
- `strengthFinder`
- `footer`

Important:

- Change text values only.
- Do not rename keys (for example keep `"hero"`, `"faq"`, `"title"` as they are).

## 8. Editing Legal Pages

Legal pages are separate per language:

- English: `src/pages/en/terms.astro`, `src/pages/en/privacy.astro`, `src/pages/en/age-policy.astro`
- Russian: `src/pages/ru/terms.astro`, `src/pages/ru/privacy.astro`, `src/pages/ru/age-policy.astro`
- Romanian: `src/pages/ro/terms.astro`, `src/pages/ro/privacy.astro`, `src/pages/ro/age-policy.astro`

You can edit the visible text directly in these files.

## 9. Editing Telegram Contact Link

If order/contact link changes:

1. Open `src/i18n/index.ts`
2. Update this line:
   - `export const TELEGRAM_DEEP_LINK = 'https://...'`
3. Commit.

## 10. Image Rules

- Product images: `public/images/products/`
- Blog images: `public/images/blog/`
- Use web-safe names (lowercase, hyphens, no spaces), for example:
  - `pablo-ice-cold.webp`
  - `beginner-guide.jpg`
- After uploading, ensure JSON path matches file name exactly.

## 11. Common Mistakes to Avoid

- Do not remove commas or quotes in JSON.
- Do not rename keys like `translations`, `title`, `metaTitle`.
- Do not leave one language empty if others are updated.
- Do not change folder names or move files.

If Netlify build fails after your edit, most likely reason is invalid JSON syntax. Compare with previous working commit and fix commas/brackets.

## 12. Quick Checklist Before Every Commit

1. Edited correct file?
2. Updated EN + RU + RO where needed?
3. JSON still valid (commas/brackets/quotes)?
4. Image uploaded if referenced?
5. URL slug still correct?
6. Netlify deploy passed?

## 13. For Developers (Optional)

Local run:

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```
