import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-container relative">
        <div className="hero-top">
          <div className="hero-logo reveal">
            <span className="logo-line">Sand</span>
            <span className="logo-line">Cloud</span>
          </div>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
        </div>
        <div className="hero-actions">
          <Link to="/booking" className="btn btn-primary btn-large">
            {t('hero.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
