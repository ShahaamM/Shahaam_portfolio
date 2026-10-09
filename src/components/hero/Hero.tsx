'use client';

import React, { useRef, useState, useEffect } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

export function Hero() {
  const { scrollToTarget } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Video Autoplay & Sound Unlocking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt unmuted play first
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsSoundOn(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          // Browser blocked unmuted autoplay -> fallback to muted
          video.muted = true;
          video.play().catch(() => {});
          setIsSoundOn(false);
          setAutoplayBlocked(true);
        });
    }

    // Unlock sound on first user gesture
    const unlockSound = () => {
      if (video && video.muted) {
        video.muted = false;
        video.play().catch(() => {});
        setIsSoundOn(true);
        setAutoplayBlocked(false);
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('pointerdown', unlockSound);
      window.removeEventListener('keydown', unlockSound);
      window.removeEventListener('touchend', unlockSound);
    };

    window.addEventListener('pointerdown', unlockSound, { once: true });
    window.addEventListener('keydown', unlockSound, { once: true });
    window.addEventListener('touchend', unlockSound, { once: true });

    return () => {
      cleanupListeners();
    };
  }, []);

  // IntersectionObserver pauses video when less than 35% visible
  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          video.pause();
        } else {
          video.play().catch(() => {});
        }
      },
      {
        threshold: [0, 0.35, 0.7, 1],
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isSoundOn) {
      video.muted = true;
      setIsSoundOn(false);
    } else {
      video.muted = false;
      video.play().catch(() => {});
      setIsSoundOn(true);
      setAutoplayBlocked(false);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center pt-24 pb-12 sm:pb-16 overflow-hidden bg-[#f4f2ee]"
    >
      {/* Giant Outlined Name Behind Person (Fully Visible) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-4"
        aria-hidden="true"
      >
        <span
          className="font-mono font-black tracking-tight text-[19vw] sm:text-[17vw] leading-none uppercase select-none text-center"
          style={{
            WebkitTextStroke: '2px rgba(13, 13, 13, 0.22)',
            color: 'transparent',
            transform: 'translateY(-2%)',
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Main Transparent Looping Video in Centre */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center">
        <div
          className="relative max-w-full flex items-center justify-center"
          style={{
            height: 'min(94svh, 980px)',
            aspectRatio: '768 / 960',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/hero/hero-character.png"
            className="w-full h-full object-contain pointer-events-none select-none"
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Sound Control Button */}
          <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
            <button
              onClick={toggleSound}
              aria-label={isSoundOn ? 'Mute audio' : 'Unmute audio'}
              className="relative w-[46px] h-[46px] rounded-full bg-[#0d0d0d] text-[#f4f2ee] flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              {/* Soft ping ring while autoplay is blocked */}
              {autoplayBlocked && (
                <span className="absolute inset-0 rounded-full animate-ping bg-[#0d0d0d]/30 pointer-events-none" />
              )}
              {isSoundOn ? (
                /* Two bars (❚❚) */
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <rect x="2" y="2" width="3.5" height="10" rx="1" />
                  <rect x="8.5" y="2" width="3.5" height="10" rx="1" />
                </svg>
              ) : (
                /* Triangle (▶) */
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M3.5 2.5V11.5L11 7L3.5 2.5Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Content & CTAs */}
      <div className="relative z-20 section-container flex flex-col items-center text-center mt-2">
        <div className="section-tag mb-3">
          <span className="w-2 h-2 rounded-full bg-[#0d0d0d] inline-block" />
          <span>Available for High-Impact Roles · 2026</span>
        </div>

        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.045em] text-[#0d0d0d] max-w-4xl leading-[1.05] mb-8">
          {PROFILE.role}.
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollToTarget('#work')}
            className="btn-primary"
          >
            Explore work
          </button>
          <button
            onClick={() => scrollToTarget('#contact')}
            className="btn-secondary"
          >
            Let&apos;s talk
          </button>
          <a
            href={PROFILE.resumePath}
            download="Shahaam_Marzook_Resume.pdf"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <span>Résumé</span>
            <span className="text-xs">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
