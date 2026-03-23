import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../translations/en.json';
import es from '../translations/es.json';
import pt from '../translations/pt.json';

const STORAGE_KEY = 'sc-lang';
const SUPPORTED = ['en', 'es', 'pt'];

function getInitialLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;
  const browserLang = (navigator.language || '').slice(0, 2).toLowerCase();
  if (SUPPORTED.includes(browserLang)) return browserLang;
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    pt: { translation: pt },
  },
  lng: getInitialLang(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lang) => {
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
});

export default i18n;
