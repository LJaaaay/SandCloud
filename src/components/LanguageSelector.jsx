import { useTranslation } from 'react-i18next';

const LANGUAGES = ['en', 'es', 'pt'];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <div className="lang-selector">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          className={`lang-btn ${i18n.language === lang ? 'lang-btn-active' : ''}`}
          onClick={() => i18n.changeLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
