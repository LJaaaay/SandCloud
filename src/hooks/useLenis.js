import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export default function useLenis() {
  const lenisRef = useRef(null);
  const callbacksRef = useRef([]);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      direction: 'vertical',
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      // Run all registered per-frame callbacks in the same RAF
      for (const cb of callbacksRef.current) {
        cb(time);
      }
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Allow other hooks to register callbacks on the same RAF loop
  const addFrameCallback = useCallback((cb) => {
    callbacksRef.current.push(cb);
    return () => {
      callbacksRef.current = callbacksRef.current.filter((c) => c !== cb);
    };
  }, []);

  return { lenisRef, addFrameCallback };
}
