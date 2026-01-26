/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        accent: '#0066CC',
        background: '#FFFFFF',
        surface: '#F5F5F7',
        muted: '#86868B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.1', fontWeight: '600' }],
        'headline': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'title': ['1.5rem', { lineHeight: '1.3', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'container': '1280px',
      },
      boxShadow: {
        'product': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
