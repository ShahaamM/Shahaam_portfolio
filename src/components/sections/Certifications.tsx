'use client';

import React from 'react';
import { CERTIFICATIONS } from '@/lib/data';
import { TechLogo } from '@/components/ui/TechLogo';

export function Certifications() {
  return (
    <section
      id="certifications"
      className="w-full bg-white border-y border-[rgba(13,13,13,0.1)] py-20 sm:py-28"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">
          {/* Sticky Left Column */}
          <div className="lg:sticky lg:top-28">
            <div className="section-tag rv" style={{ '--i': 0 } as React.CSSProperties}>
              <span className="font-mono text-xs">04</span>
              <span>—</span>
              <span>Credentials</span>
            </div>

            <h2 className="section-heading mb-4 rv" style={{ '--i': 1 } as React.CSSProperties}>
              Always <span className="heading-italic">learning.</span>
            </h2>

            <p className="text-sm text-[#77756f] font-mono rv" style={{ '--i': 2 } as React.CSSProperties}>
              {CERTIFICATIONS.length.toString().padStart(2, '0')} verified professional credentials across Data Science, Cloud Infrastructure, and Business Intelligence.
            </p>
          </div>

          {/* Right Column: Ink-Flood Rows */}
          <div className="divide-y divide-[rgba(13,13,13,0.08)] border-y border-[rgba(13,13,13,0.08)]">
            {CERTIFICATIONS.map((cert, index) => (
              <div
                key={cert.id}
                tabIndex={0}
                className="group relative overflow-hidden py-6 sm:py-7 px-4 sm:px-6 flex items-center justify-between cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] transition-colors duration-300"
              >
                {/* Ink Flood Layer */}
                <div
                  className="absolute inset-0 bg-[#0d0d0d] origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Left Content */}
                <div className="relative z-10 flex items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs sm:text-sm font-semibold text-[#77756f] group-hover:text-[#a9a6a0] group-focus:text-[#a9a6a0] transition-colors duration-300">
                    {cert.index}
                  </span>

                  <div className="w-8 h-8 rounded-lg bg-[#f4f2ee] group-hover:bg-[#3a3a3a] group-focus:bg-[#3a3a3a] flex items-center justify-center p-1.5 transition-colors duration-300 shrink-0">
                    <TechLogo logoKey={cert.logoKey} size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-base sm:text-xl text-[#0d0d0d] group-hover:text-[#f4f2ee] group-focus:text-[#f4f2ee] transition-colors duration-300 tracking-tight">
                      {cert.title}
                    </h3>
                    <span className="font-mono text-xs text-[#77756f] group-hover:text-[#a9a6a0] group-focus:text-[#a9a6a0] transition-colors duration-300">
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                {/* Right Arrow (Slides In) */}
                <div className="relative z-10 flex items-center">
                  <span className="font-mono text-sm sm:text-base text-[#0d0d0d] group-hover:text-[#f4f2ee] group-focus:text-[#f4f2ee] transform translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 transition-all duration-300">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
