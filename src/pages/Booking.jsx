import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BookingCalendar from '../components/BookingCalendar';
import BookingSlots from '../components/BookingSlots';
import BookingForm from '../components/BookingForm';
import ConfirmationCard from '../components/ConfirmationCard';

export default function Booking() {
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState('calendar'); // calendar | slots | form | success | error
  const [bookingData, setBookingData] = useState(null);
  const [errorDetails, setErrorDetails] = useState('');

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setStep('slots');
  }, []);

  const handleSlotSelect = useCallback((time) => {
    setSelectedTime(time);
    setStep('form');
  }, []);

  const handleBookingSuccess = useCallback((data) => {
    setBookingData(data);
    setStep('success');
  }, []);

  const handleBookingError = useCallback((details) => {
    setErrorDetails(details);
    setStep('error');
  }, []);

  return (
    <div className="glass-wrapper container mt-glass">
      <div className="booking-layout">
        <div className="booking-info">
          <Link to="/" className="booking-back">
            {t('booking.backToSite')}
          </Link>

          <div className="booking-logo">
            <span className="booking-logo-line">Sand</span>
            <span className="booking-logo-line">Cloud</span>
          </div>

          <h1 className="booking-title">{t('booking.title')}</h1>
          <p className="booking-desc">{t('booking.desc')}</p>

          <ol className="booking-agenda">
            <li dangerouslySetInnerHTML={{ __html: t('booking.agenda1') }} />
            <li dangerouslySetInnerHTML={{ __html: t('booking.agenda2') }} />
            <li dangerouslySetInnerHTML={{ __html: t('booking.agenda3') }} />
          </ol>

          <div className="booking-meta">
            <span>{t('booking.duration')}</span>
            <span>{t('booking.platform')}</span>
          </div>
        </div>

        <div className="booking-widget">
          <BookingCalendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />

          {(step === 'slots' || step === 'form') && selectedDate && (
            <BookingSlots
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSlotSelect={handleSlotSelect}
            />
          )}

          {step === 'form' && selectedDate && selectedTime && (
            <BookingForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSuccess={handleBookingSuccess}
              onError={handleBookingError}
            />
          )}

          {step === 'success' && bookingData && (
            <ConfirmationCard data={bookingData} />
          )}

          {step === 'error' && (
            <div className="booking-error">
              <p style={{ color: '#ff4444', fontWeight: 600 }}>
                {t('booking.connectionFailed')}
              </p>
              <pre
                style={{
                  marginTop: '12px',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'left',
                }}
              >
                {errorDetails}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
