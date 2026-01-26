import en from './en.json';
import ru from './ru.json';
import ro from './ro.json';

export const languages = {
  en: 'English',
  ru: 'Русский',
  ro: 'Română',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

const translations = { en, ru, ro } as const;

// Get the base URL from Astro (handles both dev and production)
export function getBase(): string {
  // In components, use import.meta.env.BASE_URL
  // This function is for reference
  return import.meta.env.BASE_URL || '/';
}

export function getLangFromUrl(url: URL): Language {
  // Remove the base path first, then get the language
  const base = import.meta.env.BASE_URL || '/';
  let pathname = url.pathname;
  
  // Remove base path if present
  if (base !== '/' && pathname.startsWith(base)) {
    pathname = pathname.slice(base.length);
  }
  
  // Ensure pathname starts with /
  if (!pathname.startsWith('/')) {
    pathname = '/' + pathname;
  }
  
  const segments = pathname.split('/').filter(Boolean);
  const lang = segments[0];
  
  if (lang && lang in languages) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return translations[lang];
}

export function getLocalizedPath(path: string, lang: Language): string {
  const base = import.meta.env.BASE_URL || '/';
  
  // Remove any existing language prefix and base path
  let cleanPath = path
    .replace(new RegExp(`^${base}`), '')
    .replace(/^\/(en|ru|ro)/, '');
  
  // Ensure cleanPath starts with / or is empty
  if (cleanPath && !cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  // Build the final path
  const langPath = `/${lang}${cleanPath || '/'}`;
  
  // Prepend base (remove trailing slash from base if present)
  const baseClean = base.endsWith('/') ? base.slice(0, -1) : base;
  return baseClean === '' ? langPath : `${baseClean}${langPath}`;
}

export function getBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return defaultLang;
  
  const browserLang = navigator.language.split('-')[0];
  if (browserLang in languages) return browserLang as Language;
  return defaultLang;
}

// Telegram helper
export const TELEGRAM_USERNAME = 'YOUR_TELEGRAM_USERNAME';

export function getTelegramOrderLink(
  lang: Language,
  product?: { name: string; strength: number }
): string {
  const t = translations[lang];
  let message = '';
  
  if (product) {
    message = t.telegram.prefill
      .replace('{product}', product.name)
      .replace('{strength}', product.strength.toString());
  } else {
    message = lang === 'en' 
      ? 'Hi, I want to place an order.'
      : lang === 'ru'
      ? 'Привет, хочу сделать заказ.'
      : 'Salut, vreau să plasez o comandă.';
  }
  
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
}

// Get alternate language URLs for hreflang (without base, for SEO purposes)
export function getAlternateUrls(currentPath: string): Array<{ lang: Language; url: string }> {
  const base = import.meta.env.BASE_URL || '/';
  
  // Remove base path and language prefix to get the clean path
  let cleanPath = currentPath;
  if (base !== '/' && cleanPath.startsWith(base)) {
    cleanPath = cleanPath.slice(base.length);
  }
  cleanPath = cleanPath.replace(/^\/(en|ru|ro)/, '') || '/';
  
  return Object.keys(languages).map((lang) => ({
    lang: lang as Language,
    url: `/${lang}${cleanPath}`,
  }));
}
