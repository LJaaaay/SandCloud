import { useEffect, useRef } from 'react';

export default function useVideoScrub(lenisRef, addFrameCallback) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const lenis = lenisRef.current;
    if (!video || !lenis) return;

    let targetTime = 0;
    let currentTime = 0;

    const onScroll = ({ progress }) => {
      if (video.duration) {
        targetTime = progress * video.duration;
      }
    };

    lenis.on('scroll', onScroll);

    // Use shared RAF loop instead of a separate one
    const animate = () => {
      if (video.duration) {
        currentTime += (targetTime - currentTime) * 0.15;
        if (Math.abs(currentTime - video.currentTime) > 0.04) {
          video.currentTime = currentTime;
        }
      }
    };
    const removeCallback = addFrameCallback(animate);

    return () => {
      lenis.off('scroll', onScroll);
      removeCallback();
    };
  }, [lenisRef, addFrameCallback]);

  return videoRef;
}
