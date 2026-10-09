'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PROFILE } from '@/lib/data';
import { usePrefersReducedMotion } from '@/lib/hooks';

export function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);
  const cardAreaRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const angleRef = useRef(0);
  const lastXRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Damped pendulum swing with idle sway
  useEffect(() => {
    if (prefersReduced) return;

    let rafId: number;
    let idleTime = 0;

    const loop = () => {
      idleTime += 0.03;
      // Idle sway when velocity is low
      const idleSway = Math.sin(idleTime) * 1.8;

      // Spring damping physics
      const spring = -0.06 * angleRef.current;
      velocityRef.current = (velocityRef.current + spring) * 0.92;
      angleRef.current += velocityRef.current;

      const totalAngle = angleRef.current + idleSway;
      setSwingAngle(Math.max(-18, Math.min(18, totalAngle)));

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReduced]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (prefersReduced) return;
    const now = performance.now();
    const x = e.clientX;

    if (lastXRef.current !== null && lastTimeRef.current !== null) {
      const dt = Math.max(1, now - lastTimeRef.current);
      const dx = x - lastXRef.current;
      const vx = (dx / dt) * 12; // impulse multiplier
      velocityRef.current = Math.max(-12, Math.min(12, velocityRef.current + vx * 0.35));
    }

    lastXRef.current = x;
    lastTimeRef.current = now;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <section id="about" className="section-padding section-container bg-[#f4f2ee]">
      <div className="section-tag rv" style={{ '--i': 0 } as React.CSSProperties}>
        <span className="font-mono text-xs">01</span>
        <span>—</span>
        <span>About me</span>
      </div>

      <h2 className="section-heading rv" style={{ '--i': 1 } as React.CSSProperties}>
        Engineering intelligent <span className="heading-italic">solutions.</span>
      </h2>

      {/* Three Column Grid: minmax(0,1fr) 320px minmax(0,1fr) */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 lg:gap-10 items-stretch">
        {/* Left Column: Summary and Primary CTAs */}
        <div className="paper-card p-6 sm:p-8 flex flex-col justify-between rv" style={{ '--i': 2 } as React.CSSProperties}>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#77756f] block mb-3">
              Summary
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-4">
              Hi, I&apos;m {PROFILE.name.split(' ')[0]}.
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#3a3a3a] mb-4 font-normal">
              {PROFILE.resumeSummary}
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-[#77756f] border-l-2 border-[#0d0d0d]/20 pl-3">
              {PROFILE.oneMoreLine}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-6 mt-6 border-t border-[rgba(13,13,13,0.08)]">
            <a
              href={PROFILE.resumePath}
              download="Shahaam_Marzook_Resume.pdf"
              className="btn-primary text-xs h-10 px-4"
            >
              Résumé ↓
            </a>
            {PROFILE.github && (
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs h-10 px-4"
              >
                GitHub ↗
              </a>
            )}
            {PROFILE.linkedin && (
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs h-10 px-4"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>

        {/* Centre Column: Hanging Lanyard ID Card */}
        <div
          ref={cardAreaRef}
          onPointerMove={handlePointerMove}
          className="flex flex-col items-center justify-start relative select-none rv"
          style={{ '--i': 3 } as React.CSSProperties}
        >
          {/* Lanyard Strap with Scrolling Text */}
          <div className="relative flex flex-col items-center z-10">
            <div className="w-[30px] h-[56px] bg-[#0d0d0d] text-[#f4f2ee] overflow-hidden rounded-t-sm flex items-center justify-center relative shadow-sm">
              <div className="lanyard-text text-[9px] font-mono tracking-widest whitespace-nowrap uppercase opacity-80 rotate-90">
                {PROFILE.name} · {PROFILE.role}
              </div>
            </div>
            {/* Metallic Clip */}
            <div className="w-[20px] h-[10px] bg-gradient-to-b from-[#a9a6a0] to-[#77756f] rounded-sm shadow-inner flex items-center justify-center">
              <div className="w-[8px] h-[2px] bg-[#0d0d0d]/40 rounded-full" />
            </div>
          </div>

          {/* Swinging Pendulum Card Wrapper */}
          <div
            className="w-full flex justify-center origin-top cursor-pointer pt-1"
            style={{
              transform: prefersReduced ? 'none' : `rotate(${swingAngle}deg)`,
              transition: prefersReduced ? 'none' : 'transform 0.05s linear',
            }}
          >
            {/* 3D Flip Card Container */}
            <div
              tabIndex={0}
              role="button"
              aria-label="Interactive developer ID card. Press Enter or click to flip."
              onClick={() => setIsFlipped((prev) => !prev)}
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
              onKeyDown={handleKeyDown}
              className="relative w-[300px] h-[404px] outline-none rounded-[24px] focus-visible:ring-2 focus-visible:ring-[#0d0d0d]"
              style={{ perspective: 1000 }}
            >
              <div
                className="w-full h-full rounded-[24px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-white rounded-[24px] shadow-[0_12px_36px_-8px_rgba(13,13,13,0.12),inset_0_0_0_1px_rgba(13,13,13,0.12)] p-5 flex flex-col justify-between overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Top Black Band */}
                  <div className="w-full bg-[#0d0d0d] text-[#f4f2ee] rounded-xl px-3 py-1.5 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold tracking-wider">DEVELOPER ID</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Centred Portrait */}
                  <div className="flex flex-col items-center my-auto">
                    <div className="relative group w-[128px] h-[156px] rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-[#e9e6e0] to-[#a9a6a0] shadow-sm">
                      <div className="w-full h-full rounded-xl overflow-hidden relative bg-white">
                        <Image
                          src="/portrait-bust.webp"
                          alt={PROFILE.name}
                          width={128}
                          height={156}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          priority
                        />
                      </div>
                    </div>

                    <h4 className="font-bold text-base tracking-tight text-[#0d0d0d] mt-3">
                      {PROFILE.name}
                    </h4>
                    <p className="text-[11px] font-mono text-[#77756f]">
                      {PROFILE.role}
                    </p>
                  </div>

                  {/* Metadata Rows */}
                  <div className="grid grid-cols-3 gap-1 py-2 border-y border-[rgba(13,13,13,0.08)] text-[10px] font-mono">
                    <div>
                      <span className="text-[#a9a6a0] block">ID NO</span>
                      <span className="text-[#0d0d0d] font-semibold">{PROFILE.idNo}</span>
                    </div>
                    <div>
                      <span className="text-[#a9a6a0] block">DEPT</span>
                      <span className="text-[#0d0d0d] font-semibold truncate block">DS & AI</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#a9a6a0] block">VALID</span>
                      <span className="text-[#0d0d0d] font-semibold">{PROFILE.validTill}</span>
                    </div>
                  </div>

                  {/* Barcode & Holographic Sticker */}
                  <div className="flex items-center justify-between pt-1">
                    {/* Barcode */}
                    <div className="flex items-center gap-[2px] h-6 opacity-70">
                      {[3, 1, 4, 1, 2, 5, 2, 1, 3, 2, 4, 1, 3, 1, 2, 4, 1].map((w, i) => (
                        <div
                          key={i}
                          className="h-full bg-[#0d0d0d]"
                          style={{ width: `${w}px` }}
                        />
                      ))}
                    </div>

                    {/* Holographic Sticker */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#e9e6e0] via-[#ffffff] to-[#a9a6a0] border border-[rgba(13,13,13,0.15)] flex items-center justify-center shadow-inner">
                      <span className="text-[8px] font-mono font-black text-[#77756f]">VER</span>
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-white rounded-[24px] shadow-[0_12px_36px_-8px_rgba(13,13,13,0.12),inset_0_0_0_1px_rgba(13,13,13,0.12)] p-5 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="border-b border-[rgba(13,13,13,0.08)] pb-2">
                    <span className="font-mono text-[10px] font-bold tracking-wider text-[#77756f] uppercase block">
                      What I Am
                    </span>
                    <h4 className="font-bold text-sm text-[#0d0d0d]">
                      {PROFILE.headline}
                    </h4>
                  </div>

                  {/* 4-5 lines drawn strictly from resume */}
                  <div className="space-y-2 text-[11px] text-[#3a3a3a] my-auto leading-relaxed">
                    <div className="flex items-start gap-2">
                      <span className="text-[#0d0d0d] font-bold">›</span>
                      <span>Forward Deployment Engineer at {PROFILE.currentCompany} (2025–2026).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#0d0d0d] font-bold">›</span>
                      <span>{PROFILE.degree} (Specializing in {PROFILE.specialization}) — CGPA {PROFILE.cgpa}.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#0d0d0d] font-bold">›</span>
                      <span>5 Deployed Systems: Ask Git, HospitalDW, KMP Pharmacy, RentalPro, SAD.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#0d0d0d] font-bold">›</span>
                      <span>6 Professional Credentials across Azure, Power BI, SQL & R.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#0d0d0d] font-bold">›</span>
                      <span>Leadership: AIESEC Business Manager 2025 & SLIIT Community Treasurer.</span>
                    </div>
                  </div>

                  {/* Signature and Contact */}
                  <div className="border-t border-[rgba(13,13,13,0.08)] pt-3">
                    <div className="font-serif italic text-lg text-[#0d0d0d] opacity-80 mb-1">
                      {PROFILE.name}
                    </div>
                    <p className="font-mono text-[9px] text-[#77756f]">
                      If found, say hello · {PROFILE.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Facts & Quote */}
        <div className="paper-card p-6 sm:p-8 flex flex-col justify-between rv" style={{ '--i': 4 } as React.CSSProperties}>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#77756f] block mb-4">
              Quick Facts
            </span>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="border-b border-[rgba(13,13,13,0.08)] pb-2.5">
                <span className="text-[#77756f] block text-[11px] font-mono uppercase mb-0.5">Location</span>
                <span className="font-semibold text-[#0d0d0d]">{PROFILE.location}</span>
              </div>

              <div className="border-b border-[rgba(13,13,13,0.08)] pb-2.5">
                <span className="text-[#77756f] block text-[11px] font-mono uppercase mb-0.5">Education</span>
                <span className="font-semibold text-[#0d0d0d]">
                  SLIIT · Oct {PROFILE.validTill}
                </span>
                <span className="text-[11px] text-[#77756f] block font-mono">
                  BSc IT (Data Science) · CGPA {PROFILE.cgpa}
                </span>
              </div>

              <div className="border-b border-[rgba(13,13,13,0.08)] pb-2.5">
                <span className="text-[#77756f] block text-[11px] font-mono uppercase mb-0.5">Current Role</span>
                <span className="font-semibold text-[#0d0d0d]">{PROFILE.currentRole}</span>
                <span className="text-[11px] text-[#77756f] block font-mono">
                  {PROFILE.currentCompany} (2025–2026)
                </span>
              </div>

              <div>
                <span className="text-[#77756f] block text-[11px] font-mono uppercase mb-0.5">Direct Contact</span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-semibold text-[#0d0d0d] hover:underline"
                >
                  {PROFILE.email}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[rgba(13,13,13,0.08)]">
            <span className="font-mono text-[10px] text-[#77756f] uppercase block mb-1">Ethos</span>
            <blockquote className="font-serif italic text-base sm:text-lg text-[#3a3a3a] leading-snug">
              &ldquo;{PROFILE.quote}&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
