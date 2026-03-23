import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function BookingCalendar({ selectedDate, onDateSelect }) {
  const { t } = useTranslation();
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const months = t('calendar.months', { returnObjects: true });
  const weekdays = t('calendar.weekdays', { returnObjects: true });

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const goPrev = () => {
    if (currentYear === today.getFullYear() && currentMonth === today.getMonth()) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<span key={`empty-${i}`} className="cal-day cal-day-empty" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear, currentMonth, d);
    const dayOfWeek = date.getDay();
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
    const isAvailable = isWeekday && !isPast;
    const isSelected =
      selectedDate &&
      selectedDate.getFullYear() === currentYear &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getDate() === d;

    const classes = [
      'cal-day',
      isAvailable ? 'cal-day-available' : 'cal-day-unavailable',
      isSelected ? 'cal-day-selected' : '',
    ]
      .filter(Boolean)
      .join(' ');

    days.push(
      <button
        key={d}
        className={classes}
        disabled={!isAvailable}
        onClick={() => isAvailable && onDateSelect(new Date(currentYear, currentMonth, d))}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="booking-calendar">
      <div className="cal-header">
        <button className="cal-nav" onClick={goPrev}>&lsaquo;</button>
        <span className="cal-month">{months[currentMonth]} {currentYear}</span>
        <button className="cal-nav" onClick={goNext}>&rsaquo;</button>
      </div>
      <div className="cal-weekdays">
        {weekdays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="cal-grid">{days}</div>
    </div>
  );
}
