import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="container footer-container">
        <div className="footer-col">
          <span className="footer-logo">Sand Cloud</span>
          <p className="footer-desc">{t('footer.desc')}</p>
        </div>
        <div className="footer-col">
          <h4>{t('footer.product')}</h4>
          <a href="#">{t('footer.features')}</a>
          <a href="#">{t('footer.integrations')}</a>
          <Link to="/booking">{t('footer.contact')}</Link>
          <a href="#">{t('footer.changelog')}</a>
        </div>
        <div className="footer-col">
          <h4>{t('footer.resources')}</h4>
          <a href="#">{t('footer.documentation')}</a>
          <a href="#">{t('footer.apiReference')}</a>
          <a href="#">{t('footer.community')}</a>
          <a href="#">{t('footer.blog')}</a>
        </div>
        <div className="footer-col">
          <h4>{t('footer.company')}</h4>
          <a href="#">{t('footer.aboutUs')}</a>
          <a href="#">{t('footer.careers')}</a>
          <a href="#">{t('footer.privacy')}</a>
          <a href="#">{t('footer.terms')}</a>
        </div>
      </div>
      <div className="container copyright">
        {t('footer.copyright')}
      </div>
    </footer>
  );
}
