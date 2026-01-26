import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://NickCretu.github.io',
  base: '/didactic-garbanzo',
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
