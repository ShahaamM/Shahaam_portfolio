'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './hooks';

interface ScrollContextType {
  lenis: Lenis | null;
  scrollToTarget: (target: string | HTMLElement, options?: { offset?: number }) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollToTarget: () => {},
});

export const useScroll = () => useContext(ScrollContext);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  const scrollToTarget = (target: string | HTMLElement, options?: { offset?: number }) => {
    const offset = options?.offset ?? 0;
    if (lenisRef.current && !prefersReduced) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.4 });
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
        }
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    }
  };

  return (
    <ScrollContext.Provider value={{ lenis: lenisRef.current, scrollToTarget }}>
      {children}
    </ScrollContext.Provider>
  );
}
