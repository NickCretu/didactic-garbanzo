import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://your-site-name.netlify.app', // Update after deployment
  base: '/',
  integrations: [
    tailwind(),
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
