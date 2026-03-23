import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Timeline descriptions
    const timelineReveals = document.querySelectorAll('.timeline-reveal');
    const tlObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );
    timelineReveals.forEach((el) => tlObserver.observe(el));

    // Timeline dots
    const dots = document.querySelectorAll('.timeline-dot');
    const dotObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
    );
    dots.forEach((dot) => dotObserver.observe(dot));

    return () => {
      observer.disconnect();
      tlObserver.disconnect();
      dotObserver.disconnect();
    };
  }, []);
}
