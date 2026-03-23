import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="cta-section section text-center">
      <div className="reveal">
        <h2>{t('cta.title')}</h2>
        <p className="cta-subtitle">{t('cta.subtitle')}</p>
        <div className="mt-4">
          <Link to="/booking" className="btn btn-primary btn-large">
            {t('cta.button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
