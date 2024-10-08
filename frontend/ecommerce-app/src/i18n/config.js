// src/i18n/config.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esTranslations from './translations/es.json';
import enTranslations from './translations/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
    },
    lng: 'es', // Idioma por defecto
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
