import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    supportedLngs: [
      'en',    // English
      'zh-CN', // Mandarin Chinese (Simplified)
      'es',    // Spanish
      'hi',    // Hindi
      'ar',    // Standard Arabic
      'bn',    // Bengali
      'pt',    // Portuguese
      'ru',    // Russian
      'ja',    // Japanese
      'pa',    // Punjabi
      'de',    // German
      'jv',    // Javanese
      'ko',    // Korean
      'fr',    // French
      'tl',    // Tagalog
      'uk'     // Ukrainian
    ],

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    react: {
      useSuspense: true,
    },
  });

export default i18n;