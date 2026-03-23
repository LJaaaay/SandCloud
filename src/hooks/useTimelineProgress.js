import { useEffect } from 'react';

export default function useTimelineProgress(addFrameCallback) {
  useEffect(() => {
    const timeline = document.getElementById('timeline');
    const progress = document.getElementById('timeline-progress');
    if (!timeline || !progress) return;

    // Use shared RAF loop instead of a separate one
    const update = () => {
      const rect = timeline.getBoundingClientRect();
      const trigger = window.innerHeight * 0.35;
      const p = Math.max(0, Math.min(1, (trigger - rect.top) / rect.height));
      progress.style.height = (p * 100) + '%';
    };

    const removeCallback = addFrameCallback(update);

    return () => removeCallback();
  }, [addFrameCallback]);
}
