import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Timeline as AceternityTimeline } from './ui/timeline';

const SERVICE_KEYS = [
  'chatbots', 'crm', 'email', 'data', 'leads',
  'internal', 'ecommerce', 'api', 'websites', 'allinone',
];

export default function Timeline() {
  const { t, i18n } = useTranslation();

  const data = useMemo(
    () =>
      SERVICE_KEYS.map((key) => ({
        title: t(`services.${key}.title`),
        content: (
          <div className={key === 'allinone' ? 'act-allinone-content' : undefined}>
            <p className={`act-desc${key === 'allinone' ? ' act-desc-allinone' : ''}`}>
              {t(`services.${key}.desc`)}
            </p>
          </div>
        ),
      })),
    [t, i18n.language]
  );

  return (
    <section id="features" className="features section">
      <div className="section-header reveal">
        <h2>{t('services.heading')}</h2>
        <p className="features-subtitle">{t('services.subtitle')}</p>
      </div>
      <AceternityTimeline data={data} />
    </section>
  );
}
