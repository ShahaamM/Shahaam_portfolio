'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ACHIEVEMENTS, Achievement } from '@/lib/data';
import { TechLogo } from '@/components/ui/TechLogo';
import { usePrefersReducedMotion } from '@/lib/hooks';

export function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    let rafId: number;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);

      // Determine card nearest viewport center
      const cardCount = ACHIEVEMENTS.length;
      const currentIndex = Math.min(cardCount - 1, Math.floor(progress * cardCount));
      setActiveCardIndex(currentIndex);
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

  // Compute horizontal travel translation percentage
  const maxTranslate = 70; // percent travel across card track

  return (
    <div
      id="achievements"
      ref={sectionRef}
      className="relative w-full bg-[#f4f2ee]"
      style={{ height: '320vh' }}
    >
      {/* Pinned 100svh Sticky Viewport */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between py-10 sm:py-14">
        {/* Section Header */}
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="section-tag mb-2">
                <span className="font-mono text-xs">06</span>
                <span>—</span>
                <span>Achievements & Honours</span>
              </div>
              <h2 className="section-heading mb-0 text-3xl sm:text-5xl">
                Quantifiable <span className="heading-italic">impact.</span>
              </h2>
            </div>

            {/* Thin Horizontal Progress Bar in Header */}
            <div className="w-48 sm:w-64 h-1 bg-[rgba(13,13,13,0.1)] rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-[#0d0d0d] transition-all duration-75 ease-out rounded-full"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Horizontal Card Track */}
        <div className="w-full overflow-visible my-auto">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 px-6 sm:px-16 transition-transform duration-100 ease-out"
            style={{
              transform: prefersReduced
                ? 'none'
                : `translateX(-${scrollProgress * maxTranslate}%)`,
              width: 'max-content',
            }}
          >
            {ACHIEVEMENTS.map((item, index) => {
              const isCenter = activeCardIndex === index;

              return (
                <AchievementCard
                  key={item.index}
                  item={item}
                  isCenter={isCenter}
                  hasTriggered={scrollProgress > 0.05}
                />
              );
            })}

            {/* Track End Card */}
            <div
              className="w-[clamp(300px,32vw,440px)] h-[clamp(260px,36vh,310px)] rounded-[28px] border-2 border-dashed border-[rgba(13,13,13,0.2)] bg-white/40 flex flex-col justify-center items-center text-center p-8 shrink-0 select-none"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-[#77756f] mb-3">
                Forward Vector
              </span>
              <div className="font-serif italic text-3xl sm:text-4xl text-[#0d0d0d] mb-2">
                and counting →
              </div>
              <p className="text-xs text-[#77756f] max-w-xs font-mono">
                Continuous engineering, intelligent data architectures, and leadership.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="section-container flex items-center justify-between text-xs font-mono text-[#77756f]">
          <span>SCROLL DOWN TO ADVANCE CARDS</span>
          <span>{activeCardIndex + 1} OF {ACHIEVEMENTS.length}</span>
        </div>
      </div>
    </div>
  );
}

function AchievementCard({
  item,
  isCenter,
  hasTriggered,
}: {
  item: Achievement;
  isCenter: boolean;
  hasTriggered: boolean;
}) {
  const [displayNumber, setDisplayNumber] = useState(0);

  // easeOutQuart counter over 1.4s
  useEffect(() => {
    if (!hasTriggered) return;

    let start: number | null = null;
    const duration = 1400; // ms
    const target = item.value;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / duration);
      // easeOutQuart: 1 - (1 - progress)^4
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = ease * target;
      setDisplayNumber(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [hasTriggered, item.value]);

  const formattedValue =
    item.value % 1 !== 0
      ? displayNumber.toFixed(1)
      : Math.round(displayNumber).toString().padStart(2, '0');

  return (
    <div
      style={{
        transform: isCenter ? 'translateY(-12px)' : 'translateY(0)',
        boxShadow: isCenter
          ? '0 24px 48px -12px rgba(13, 13, 13, 0.14), inset 0 0 0 1px rgba(13, 13, 13, 0.08)'
          : '0 8px 24px -6px rgba(13, 13, 13, 0.05), inset 0 0 0 1px rgba(13, 13, 13, 0.06)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,310px)] bg-white rounded-[28px] p-6 sm:p-8 flex flex-col justify-between shrink-0 select-none relative overflow-hidden"
    >
      {/* Top Row: 72px Logo Tile with Glow + Index */}
      <div className="flex items-center justify-between">
        <div
          className="w-[72px] h-[72px] rounded-2xl bg-[#f4f2ee] flex items-center justify-center p-3 relative transition-all duration-300"
          style={{
            boxShadow: isCenter ? `0 0 32px 4px ${item.glowColor}` : 'none',
          }}
        >
          <TechLogo logoKey={item.logoKey} size={42} showGlow={isCenter} />
        </div>

        <span className="font-mono text-xs font-bold text-[#77756f]">
          {item.index}
        </span>
      </div>

      {/* Bottom Content: Left Information + Right Huge Number */}
      <div className="flex items-end justify-between gap-4 pt-4 border-t border-[rgba(13,13,13,0.06)]">
        {/* Left Side */}
        <div className="max-w-[62%]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#77756f] block mb-1">
            {item.label}
          </span>
          <h3 className="font-bold text-base sm:text-lg text-[#0d0d0d] tracking-tight leading-snug mb-1">
            {item.caption}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#77756f] leading-relaxed line-clamp-2">
            {item.detail}
          </p>
        </div>

        {/* Right Side: Huge Number with easeOutQuart */}
        <div className="text-right">
          <div className="font-mono font-bold text-4xl sm:text-5xl text-[#0d0d0d] tracking-tight leading-none">
            {formattedValue}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#77756f] block mt-1">
            {item.unit}
          </span>
        </div>
      </div>
    </div>
  );
}
