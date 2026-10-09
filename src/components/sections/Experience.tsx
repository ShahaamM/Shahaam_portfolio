'use client';

import React, { useRef, useState, useEffect } from 'react';
import { TIMELINE } from '@/lib/data';

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Start drawing when top enters 75% of viewport
      const start = windowHeight * 0.75;
      const total = rect.height + start * 0.5;
      const current = start - rect.top;

      const p = Math.max(0, Math.min(1, current / total));
      setScrollProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="experience" className="section-padding section-container bg-[#f4f2ee]">
      <div className="section-tag rv" style={{ '--i': 0 } as React.CSSProperties}>
        <span className="font-mono text-xs">05</span>
        <span>—</span>
        <span>Journey</span>
      </div>

      <h2 className="section-heading rv" style={{ '--i': 1 } as React.CSSProperties}>
        Education and experience as one <span className="heading-italic">path.</span>
      </h2>

      {/* Vertical Timeline Container */}
      <div ref={containerRef} className="relative max-w-4xl mx-auto py-8">
        {/* Continuous Spine */}
        <div
          className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(13,13,13,0.1)] -translate-x-1/2"
          aria-hidden="true"
        >
          {/* Active Ink Line */}
          <div
            className="w-full bg-[#0d0d0d] transition-all duration-100 ease-out origin-top"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Timeline Stops */}
        <div className="space-y-12 sm:space-y-16">
          {TIMELINE.map((item, index) => {
            const threshold = (index + 0.5) / TIMELINE.length;
            const isLit = scrollProgress >= threshold;
            const isEven = index % 2 === 0;
            const isNext = item.type === 'next';

            return (
              <div
                key={item.id}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12 pl-10 sm:pl-0`}
              >
                {/* Node Center Marker */}
                <div
                  className={`absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-400 z-10 ${
                    isLit
                      ? 'bg-[#0d0d0d] border-[#0d0d0d] scale-110 shadow-sm'
                      : 'bg-white border-[rgba(13,13,13,0.3)]'
                  }`}
                  aria-hidden="true"
                />

                {/* Content Card (Half Width on Desktop) */}
                <div
                  className={`w-full sm:w-[calc(50%-2rem)] transition-all duration-400 ${
                    isLit ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2'
                  }`}
                >
                  <div
                    className={`${
                      isNext
                        ? 'p-6 sm:p-8 rounded-[26px] border-2 border-dashed border-[#0d0d0d]/30 bg-white/50 hover:bg-white transition-colors duration-300'
                        : 'paper-card p-6 sm:p-8'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-[#77756f]">
                        {item.year}
                      </span>
                      {item.badge && (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f4f2ee] text-[#0d0d0d] font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] mb-1">
                      {item.title}
                    </h3>

                    <div className="font-mono text-xs text-[#77756f] mb-4">
                      {item.place}
                    </div>

                    <p className="text-sm leading-relaxed text-[#3a3a3a]">
                      {item.detail}
                    </p>
                  </div>
                </div>

                {/* Empty opposite column for spacing */}
                <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
