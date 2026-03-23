import { useTranslation } from 'react-i18next';

const CASES = [
  { key: 'finance', metrics: 4 },
  { key: 'ecommerce', metrics: 3 },
  { key: 'leadQual', metrics: 3 },
  { key: 'opsHub', metrics: 3 },
];

export default function Results() {
  const { t } = useTranslation();

  return (
    <section id="results" className="results section">
      <div className="section-header reveal">
        <h2>{t('results.title')}</h2>
        <p className="results-subtitle">{t('results.subtitle')}</p>
      </div>

      <div className="results-stack">
        {CASES.map(({ key, metrics }) => (
          <div className="result-card glass-panel reveal" key={key}>
            <h3>{t(`results.${key}.title`)}</h3>
            <div className="result-block">
              <h4>{t('results.challenge')}</h4>
              <p>{t(`results.${key}.challenge`)}</p>
            </div>
            <div className="result-block">
              <h4>{t('results.whatWeBuilt')}</h4>
              <p>{t(`results.${key}.solution`)}</p>
            </div>
            <div className="result-metrics">
              {Array.from({ length: metrics }, (_, i) => (
                <span
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: t(`results.${key}.metric${i + 1}`),
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
