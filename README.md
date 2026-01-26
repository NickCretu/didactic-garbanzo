# Pouch - Premium Nicotine Pouches Catalog

A static, multilingual (EN/RU/RO) product catalog for nicotine pouches with Telegram ordering integration.

## Features

- **Multilingual Support**: English, Russian, and Romanian
- **Product Catalog**: Filterable by strength and flavor
- **Telegram Ordering**: Deep links with prefilled order messages
- **Age Gate**: Required age verification on first visit
- **SEO Optimized**: Schema markup, hreflang, Open Graph tags
- **Responsive Design**: Mobile-first, Apple-like minimal aesthetic
- **Static Hosting**: Deployable to GitHub Pages

## Tech Stack

- **Astro 4.x** - Static site generator
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Configuration

1. **Telegram Username**: Update `TELEGRAM_USERNAME` in `src/i18n/index.ts`
2. **Site URL**: Update `site` and `base` in `astro.config.mjs`
3. **Product Images**: Add product images to `public/images/products/`

## Project Structure

```
src/
├── components/
│   ├── home/        # Homepage sections
│   ├── layout/      # Header, Footer, etc.
│   ├── product/     # Product components
│   └── ui/          # Reusable UI components
├── content/
│   └── products/    # Product JSON files
├── i18n/            # Translation files
├── layouts/         # Page layouts
├── pages/           # Route pages
│   ├── en/          # English pages
│   ├── ru/          # Russian pages
│   └── ro/          # Romanian pages
└── styles/          # Global CSS
```

## Adding Products

Create a new JSON file in `src/content/products/`:

```json
{
  "slug": "product-slug",
  "brand": "Brand Name",
  "strength": 8,
  "strengthCategory": "medium",
  "flavorCategory": "mint",
  "pouchesPerCan": 20,
  "price": 89,
  "currency": "MDL",
  "image": "/images/products/product-slug.webp",
  "featured": true,
  "translations": {
    "en": {
      "name": "Product Name",
      "description": "Product description in English."
    },
    "ru": {
      "name": "Название продукта",
      "description": "Описание продукта на русском."
    },
    "ro": {
      "name": "Numele produsului",
      "description": "Descrierea produsului în română."
    }
  }
}
```

## Deployment

### GitHub Pages

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy

### Manual Deployment

```bash
npm run build
# Upload contents of ./dist to your hosting
```

## License

All rights reserved.
