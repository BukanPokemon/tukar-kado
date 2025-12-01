import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './en';
import { id } from './id';

export type Translations = typeof en;

const resources = {
  en: { translation: en },
  id: { translation: id }
} satisfies Record<string, { translation: Translations }>;

export const SUPPORTED_LANGUAGES = Object.keys(resources);

i18n
  .use(LanguageDetector) // mendeteksi bahasa browser
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'id', // <-- default ke Bahasa Indonesia
    lng: 'id',          // force default to Indonesian
    interpolation: {
      escapeValue: false
    }
  });

// Type augmentation untuk useTranslation hook
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['en'];
  }
}

export default i18n;
