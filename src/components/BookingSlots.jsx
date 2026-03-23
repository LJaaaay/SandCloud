import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function BookingSlots({ selectedDate, selectedTime, onSlotSelect }) {
  const { t, i18n } = useTranslation();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dateLocale = t('calendar.dateLocale');

  useEffect(() => {
    if (!selectedDate) return;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    setLoading(true);
    setError(false);

    const dateISO = selectedDate.toISOString().split('T')[0];

    fetch(`https://n8n.srv1195259.hstgr.cloud/webhook/availability?date=${dateISO}`, {
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then((data) => {
        setSlots(data.available_slots || []);
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timeoutId);
        setError(true);
        setLoading(false);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [selectedDate]);

  const dateStr = selectedDate.toLocaleDateString(dateLocale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="booking-slots">
      <h3>{dateStr}</h3>
      <div className="slots-grid">
        {loading && (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)', padding: '20px 0' }}>
            {t('booking.loadingSlots')}
          </p>
        )}
        {!loading && error && (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#ff4444', padding: '20px 0' }}>
            {t('booking.slotsError')}
          </p>
        )}
        {!loading && !error && slots.length === 0 && (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)', padding: '20px 0' }}>
            {t('booking.noSlots')}
          </p>
        )}
        {!loading &&
          !error &&
          slots.map((time) => (
            <button
              key={time}
              className={`slot-btn ${selectedTime === time ? 'slot-selected' : ''}`}
              onClick={() => onSlotSelect(time)}
            >
              {time}
            </button>
          ))}
      </div>
    </div>
  );
}
