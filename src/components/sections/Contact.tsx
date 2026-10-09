'use client';

import React, { useState } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

export function Contact() {
  const { scrollToTarget } = useScroll();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <footer id="contact" className="w-full bg-[#f4f2ee] pt-24 sm:pt-36 pb-12 border-t border-[rgba(13,13,13,0.08)]">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 sm:mb-28">
          <div>
            <div className="section-tag mb-4">
              <span className="font-mono text-xs">06</span>
              <span>—</span>
              <span>Get in touch</span>
            </div>

            {/* Huge Heading with Hopping Letters */}
            <h2 className="font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.045em] text-[#0d0d0d] leading-[0.95] select-none">
              <div className="block">
                {line1.split('').map((char, i) => (
                  <LetterHop key={i} char={char} />
                ))}
              </div>
              <div className="block mt-2">
                {line2.split(' ').map((word, wIdx) => {
                  const isItalic = word === 'together.';
                  return (
                    <span key={wIdx} className="inline-block mr-3 sm:mr-4">
                      {word.split('').map((char, cIdx) => (
                        <LetterHop
                          key={cIdx}
                          char={char}
                          className={isItalic ? 'font-serif italic font-normal text-[#77756f]' : ''}
                        />
                      ))}
                    </span>
                  );
                })}
              </div>
            </h2>
          </div>

          {/* Circular Spinning 'Say Hello' Badge */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 flex items-center justify-center select-none">
            <div className="absolute inset-0 animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[10.5px] font-mono tracking-widest uppercase fill-[#0d0d0d]">
                  <textPath href="#circlePath" startOffset="0%">
                    · SAY HELLO · GET IN TOUCH · LET&apos;S TALK
                  </textPath>
                </text>
              </svg>
            </div>
            {/* Center Arrow */}
            <div className="w-12 h-12 rounded-full bg-[#0d0d0d] text-[#f4f2ee] flex items-center justify-center font-mono text-base">
              ↓
            </div>
          </div>
        </div>

        {/* Email & Contact Details */}
        <div className="paper-card p-8 sm:p-12 mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#77756f] block mb-2">
              Primary Dispatch
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PROFILE.email}`}
                className="font-bold text-xl sm:text-3xl md:text-4xl text-[#0d0d0d] underline underline-offset-8 decoration-1 decoration-[rgba(13,13,13,0.3)] hover:decoration-[#0d0d0d] transition-colors"
              >
                {PROFILE.email}
              </a>

              {/* Copy Chip */}
              <button
                onClick={copyEmail}
                className="px-3.5 py-1.5 rounded-full bg-[#f4f2ee] hover:bg-[#e9e6e0] text-xs font-mono text-[#0d0d0d] transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm"
                aria-label="Copy email address"
              >
                <span aria-live="polite">
                  {copied ? 'Copied ✓' : 'Copy'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 sm:gap-8 font-mono text-xs text-[#0d0d0d]">
            <div>
              <span className="text-[#77756f] block uppercase mb-1">Telephone</span>
              <a href={PROFILE.phoneHref} className="hover:underline font-semibold">
                {PROFILE.phone}
              </a>
            </div>

            {PROFILE.github && (
              <div>
                <span className="text-[#77756f] block uppercase mb-1">Source Code</span>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <span>↗</span>
                </a>
              </div>
            )}

            {PROFILE.linkedin && (
              <div>
                <span className="text-[#77756f] block uppercase mb-1">Network</span>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <span>↗</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="pt-8 border-t border-[rgba(13,13,13,0.08)] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs text-[#77756f]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with Next.js 15 & React 19</span>
            <button
              onClick={() => scrollToTarget('#hero')}
              className="text-[#0d0d0d] hover:underline font-semibold cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </footer>
  );
}

function LetterHop({ char, className = '' }: { char: string; className?: string }) {
  const [hopping, setHopping] = useState(false);

  const handleMouseEnter = () => {
    setHopping(true);
    setTimeout(() => setHopping(false), 400);
  };

  if (char === ' ') {
    return <span className="inline-block">&nbsp;</span>;
  }

  return (
    <span
      onMouseEnter={handleMouseEnter}
      style={{
        transform: hopping ? 'translateY(-14px)' : 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`inline-block transition-transform duration-300 cursor-default ${className}`}
    >
      {char}
    </span>
  );
}
