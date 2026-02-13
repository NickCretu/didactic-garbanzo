import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pauch.netlify.app',
  base: '/',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'ro'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  build: {
    format: 'directory',
  },
});
