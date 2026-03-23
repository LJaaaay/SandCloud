import { useTranslation } from 'react-i18next';

export default function ConfirmationCard({ data }) {
  const { t } = useTranslation();
  const { name, company, brief, meetLink, selectedDate, selectedTime } = data;

  const dateLocale = t('calendar.dateLocale');
  const dateFormatted = selectedDate.toLocaleDateString(dateLocale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const greeting = t('booking.confirmGreeting', { name });
  const intro = t('booking.confirmIntro', { company });

  return (
    <div className="confirm-card">
      <div className="confirm-header">
        <span className="confirm-logo">Sand Cloud</span>
        <span className="confirm-agency">AI AUTOMATION AGENCY</span>
      </div>
      <div className="confirm-divider"></div>
      <div className="confirm-body">
        <h2 className="confirm-greeting">{greeting}</h2>
        <p className="confirm-intro" dangerouslySetInnerHTML={{ __html: intro }} />
        <div className="confirm-meeting">
          <div className="confirm-meeting-header">
            {t('booking.confirmMeetingHeader')}
          </div>
          <div className="confirm-meeting-body">
            <span className="confirm-label">{t('booking.confirmDateLabel')}</span>
            <p className="confirm-datetime">{dateFormatted} — {selectedTime}</p>
            <div className="confirm-separator"></div>
            <span className="confirm-label">{t('booking.confirmTopicLabel')}</span>
            <p className="confirm-topic">{brief}</p>
            {meetLink ? (
              <a
                href={meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="confirm-meet-btn"
              >
                {t('booking.confirmJoinBtn')}
              </a>
            ) : (
              <p className="confirm-meet-note">{t('booking.confirmMeetNote')}</p>
            )}
          </div>
        </div>
      </div>
      <div className="confirm-footer">
        <span className="confirm-footer-logo">Sand Cloud</span>
        <span className="confirm-footer-tagline">
          {t('booking.confirmFooterTagline')}
        </span>
      </div>
    </div>
  );
}
