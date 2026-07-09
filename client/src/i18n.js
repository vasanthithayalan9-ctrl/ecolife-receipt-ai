import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import ta from './locales/ta/translation.json';
import hi from './locales/hi/translation.json';
import te from './locales/te/translation.json';
import kn from './locales/kn/translation.json';
import ml from './locales/ml/translation.json';

const storedLanguage = typeof window !== 'undefined' ? window.localStorage.getItem('appLanguage') : null;
const defaultLanguage = storedLanguage || 'en';

const resources = {
  en: { translation: en },
  ta: { translation: ta },
  hi: { translation: hi },
  te: { translation: te },
  kn: { translation: kn },
  ml: { translation: ml }
};

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('appLanguage', lng);
  }
});

export default i18n;
