/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        body: '#333333',
        accent: '#0066CC',
        background: '#FFFFFF',
        surface: '#F7F7F8',
        muted: '#666666',
        faint: '#999999',
        border: '#E5E5E5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(1.75rem, 5vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h1': ['clamp(1.5rem, 4.5vw, 2rem)', { lineHeight: '1.25', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h2': ['clamp(1.25rem, 3.5vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['clamp(1.0625rem, 2.5vw, 1.25rem)', { lineHeight: '1.35', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'small': ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
        'xs': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
        // Legacy aliases (used in legal pages, AgeGate, StrengthFinder)
        'headline': ['clamp(1.25rem, 3.5vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'title': ['clamp(1.0625rem, 2.5vw, 1.25rem)', { lineHeight: '1.35', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'container': '1200px',
        'article': '680px',
        'cta': '640px',
      },
      boxShadow: {
        'product': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
      },
    },
  },
  plugins: [],
};
