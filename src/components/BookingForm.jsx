import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function BookingForm({ selectedDate, selectedTime, onSuccess, onError }) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  const dateLocale = t('calendar.dateLocale');
  const dateStr = selectedDate.toLocaleDateString(dateLocale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      company: form.company.value,
      project_brief: form.project_brief.value,
      selected_date: selectedDate.toISOString().split('T')[0],
      selected_time: selectedTime,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('https://n8n.srv1195259.hstgr.cloud/webhook/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        signal: controller.signal,
        body: JSON.stringify(payload),
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const bodyText = await res.text().catch(() => '(could not read response body)');
        throw new Error(`HTTP ${res.status}: ${res.statusText}\n\nResponse body:\n${bodyText}`);
      }

      const data = await res.json();
      onSuccess({
        name: payload.name,
        company: payload.company,
        brief: payload.project_brief,
        meetLink: data.meet_link || '',
        selectedDate,
        selectedTime,
      });
    } catch (err) {
      clearTimeout(timeoutId);
      let details;
      if (err.name === 'AbortError') {
        details = t('booking.timeoutError');
      } else {
        details = err.message || String(err);
        if (err.message && err.message.includes('Failed to fetch')) {
          details += t('booking.corsHint');
        }
      }
      onError(details);
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-confirm">
      <h3>{dateStr} at {selectedTime}</h3>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="booking-field">
          <label htmlFor="booking-name">{t('booking.formName')}</label>
          <input type="text" id="booking-name" name="name" required />
        </div>
        <div className="booking-field">
          <label htmlFor="booking-email">{t('booking.formEmail')}</label>
          <input type="email" id="booking-email" name="email" required />
        </div>
        <div className="booking-field">
          <label htmlFor="booking-company">{t('booking.formCompany')}</label>
          <input type="text" id="booking-company" name="company" required />
        </div>
        <div className="booking-field">
          <label htmlFor="booking-brief">{t('booking.formBrief')}</label>
          <textarea
            id="booking-brief"
            name="project_brief"
            required
            placeholder={t('booking.formBriefPlaceholder')}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-large booking-submit-btn"
          disabled={submitting}
        >
          {submitting ? t('booking.sending') : t('booking.submitBtn')}
        </button>
      </form>
    </div>
  );
}
