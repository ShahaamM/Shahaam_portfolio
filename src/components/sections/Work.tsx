'use client';

import React, { useState } from 'react';
import { PROJECTS, Project } from '@/lib/data';
import { TechLogo } from '@/components/ui/TechLogo';

export function Work() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" className="section-padding section-container bg-[#f4f2ee]">
      <div className="section-tag rv" style={{ '--i': 0 } as React.CSSProperties}>
        <span className="font-mono text-xs">03</span>
        <span>—</span>
        <span>Selected Work</span>
      </div>

      <h2 className="section-heading rv" style={{ '--i': 1 } as React.CSSProperties}>
        Things I&apos;ve <span className="heading-italic">built.</span>
      </h2>

      {/* Accordion Container: Desktop Horizontal Panels (min(78svh, 600px)), Mobile Vertical Accordion */}
      <div className="hidden lg:flex gap-3 w-full h-[min(78svh,620px)] items-stretch">
        {PROJECTS.map((project) => {
          const isOpen = activeId === project.id;

          return (
            <div
              key={project.id}
              onClick={() => setActiveId(project.id)}
              onFocus={() => setActiveId(project.id)}
              tabIndex={0}
              role="button"
              aria-expanded={isOpen}
              aria-label={`Project ${project.title}`}
              style={{
                flex: isOpen ? 8 : 1,
                transition: 'flex 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`paper-card relative overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] ${
                isOpen ? 'p-8' : 'p-4 hover:bg-white/90'
              }`}
            >
              {/* SLIM SPINE VIEW (When closed) */}
              {!isOpen && (
                <div className="w-full h-full flex flex-col justify-between items-center py-4 select-none">
                  <span className="font-mono font-bold text-xs text-[#77756f]">
                    {project.index}
                  </span>

                  <div className="flex-1 flex items-center justify-center">
                    <span
                      className="font-bold text-sm tracking-tight text-[#0d0d0d] whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {project.title.split(':')[0]}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center text-xs font-mono group-hover:rotate-45 transition-transform duration-300">
                    +
                  </div>
                </div>
              )}

              {/* OPEN PANEL VIEW */}
              {isOpen && (
                <div className="w-full h-full flex flex-col md:flex-row gap-8 justify-between animate-fade-in">
                  {/* Left Side: Information */}
                  <div className="flex-1 flex flex-col justify-between max-w-xl">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs font-bold text-[#77756f]">
                          {project.index}
                        </span>
                        <span className="text-[#a9a6a0]">/</span>
                        <span className="font-mono text-xs uppercase tracking-wider text-[#77756f]">
                          {project.kicker}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-4">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base leading-relaxed text-[#3a3a3a] mb-6">
                        {project.description}
                      </p>

                      {/* 2-Column Feature List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                        {project.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#3a3a3a]">
                            <span className="font-mono font-bold text-[#0d0d0d]">›</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Chips + GitHub Button */}
                    <div className="pt-4 border-t border-[rgba(13,13,13,0.08)]">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {project.tech.map((t) => (
                          <div
                            key={t}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4f2ee] text-[11px] font-mono text-[#0d0d0d]"
                          >
                            <TechLogo logoKey={t} size={14} />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs h-9 px-4 inline-flex items-center gap-1.5"
                        >
                          <span>View on GitHub</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Illustrative Mini-UI (Pure CSS/JSX Grayscale) */}
                  <div className="flex-1 h-full min-h-[300px] bg-[#f4f2ee] rounded-2xl border border-[rgba(13,13,13,0.08)] p-5 relative overflow-hidden flex flex-col justify-between select-none">
                    <div className="flex items-center justify-between border-b border-[rgba(13,13,13,0.08)] pb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#a9a6a0]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e9e6e0]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e9e6e0]" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#77756f] bg-white px-2 py-0.5 rounded border border-[rgba(13,13,13,0.08)]">
                        Illustrative UI
                      </span>
                    </div>

                    {/* Mini-UI Specific Mockup */}
                    <div className="flex-1 py-4 flex items-center justify-center">
                      <MiniUIRenderer type={project.uiType} />
                    </div>

                    <div className="pt-2 border-t border-[rgba(13,13,13,0.06)] flex items-center justify-between text-[10px] font-mono text-[#a9a6a0]">
                      <span>SYSTEM ARCHITECTURE PREVIEW</span>
                      <span>100% RESPONSIVE</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MOBILE ACCORDION VIEW */}
      <div className="flex lg:hidden flex-col gap-4">
        {PROJECTS.map((project) => {
          const isOpen = activeId === project.id;

          return (
            <div
              key={project.id}
              className="paper-card p-6 overflow-hidden"
            >
              <button
                onClick={() => setActiveId(isOpen ? '' : project.id)}
                className="w-full flex items-center justify-between text-left cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-[#77756f]">{project.index}</span>
                    <span className="text-[#a9a6a0]">/</span>
                    <span className="font-mono text-xs uppercase text-[#77756f]">{project.kicker}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0d0d0d]">{project.title}</h3>
                </div>
                <span className="w-8 h-8 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center font-mono text-sm shrink-0 ml-2">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="pt-6 mt-6 border-t border-[rgba(13,13,13,0.08)] space-y-5 animate-fade-in">
                  <p className="text-sm text-[#3a3a3a] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3a3a3a]">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="font-mono font-bold">›</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((t) => (
                      <div
                        key={t}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f4f2ee] text-[10px] font-mono text-[#0d0d0d]"
                      >
                        <TechLogo logoKey={t} size={12} />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Illustrative UI */}
                  <div className="bg-[#f4f2ee] p-4 rounded-xl border border-[rgba(13,13,13,0.08)]">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-[9px] uppercase text-[#77756f]">Illustrative UI</span>
                    </div>
                    <MiniUIRenderer type={project.uiType} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

function MiniUIRenderer({ type }: { type: Project['uiType'] }) {
  if (type === 'chat') {
    // Ask Git: conversational RAG interface
    return (
      <div className="w-full max-w-sm space-y-3 font-mono text-xs">
        <div className="bg-white p-2.5 rounded-xl border border-[rgba(13,13,13,0.08)] shadow-sm">
          <div className="text-[10px] text-[#77756f] mb-1">USER QUERY</div>
          <div className="text-[#0d0d0d] font-semibold">&ldquo;Explain how authentication middleware functions.&rdquo;</div>
        </div>
        <div className="bg-[#0d0d0d] text-[#f4f2ee] p-3 rounded-xl shadow-sm">
          <div className="flex items-center gap-1.5 text-[10px] text-[#a9a6a0] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>RAG VECTOR MATCH · CHROMADB (0.92)</span>
          </div>
          <div className="text-[11px] leading-relaxed">
            JWT header decoded at /src/auth/jwt.py:42. Token claims verified against Redis cache before pipeline dispatch.
          </div>
        </div>
      </div>
    );
  }

  if (type === 'bi') {
    // HospitalDW: Data warehouse dashboard
    return (
      <div className="w-full max-w-sm space-y-2.5 font-mono">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-white p-2 rounded-xl border border-[rgba(13,13,13,0.08)]">
            <span className="text-[10px] text-[#77756f] block">PATIENT FLOW</span>
            <span className="text-base font-bold text-[#0d0d0d]">1,420 / mo</span>
          </div>
          <div className="bg-white p-2 rounded-xl border border-[rgba(13,13,13,0.08)]">
            <span className="text-[10px] text-[#77756f] block">BILLING ACCURACY</span>
            <span className="text-base font-bold text-[#0d0d0d]">99.8%</span>
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.08)]">
          <div className="text-[10px] text-[#77756f] mb-2">SSIS ETL EXTRACTION SCHEDULE</div>
          <div className="space-y-1.5">
            <div className="h-2 w-full bg-[#f4f2ee] rounded-full overflow-hidden">
              <div className="h-full bg-[#0d0d0d] w-4/5" />
            </div>
            <div className="h-2 w-full bg-[#f4f2ee] rounded-full overflow-hidden">
              <div className="h-full bg-[#77756f] w-3/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'pharmacy') {
    // KMP Pharmacy
    return (
      <div className="w-full max-w-sm bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.08)] font-mono text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-[rgba(13,13,13,0.08)] text-[10px] text-[#77756f]">
          <span>PRODUCT CATALOG</span>
          <span>STOCK STATUS</span>
        </div>
        <div className="space-y-2 py-2">
          <div className="flex justify-between items-center">
            <span className="text-[#0d0d0d] font-semibold">Paracetamol 500mg</span>
            <span className="px-2 py-0.5 rounded bg-[#f4f2ee] text-[10px]">480 Units</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#0d0d0d] font-semibold">Amoxicillin 250mg</span>
            <span className="px-2 py-0.5 rounded bg-[#0d0d0d] text-[#f4f2ee] text-[10px]">Restocked</span>
          </div>
        </div>
        <div className="pt-2 border-t border-[rgba(13,13,13,0.08)] text-right text-[10px] text-[#77756f]">
          POS RECEIPT #8421 AUDITED
        </div>
      </div>
    );
  }

  if (type === 'rental') {
    // RentalPro
    return (
      <div className="w-full max-w-sm bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.08)] font-mono text-xs space-y-2">
        <div className="flex justify-between items-center text-[10px] text-[#77756f]">
          <span>RENTAL PROPERTIES</span>
          <span className="font-bold text-[#0d0d0d]">12 ACTIVE LEASES</span>
        </div>
        <div className="p-2 bg-[#f4f2ee] rounded-lg">
          <div className="text-[11px] font-bold text-[#0d0d0d]">Unit 4B — Obeysekarapura</div>
          <div className="text-[10px] text-[#77756f]">Tenant verified · Settlement Cleared</div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#77756f] pt-1">
          <span>MYSQL REPLICATION</span>
          <span className="text-emerald-700 font-bold">ONLINE ✓</span>
        </div>
      </div>
    );
  }

  // SAD Sales Analytics Dashboard
  return (
    <div className="w-full max-w-sm space-y-2 font-mono text-xs">
      <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.08)]">
        <div className="flex justify-between text-[10px] text-[#77756f] mb-1">
          <span>SUPERSTORE REVENUE</span>
          <span className="font-bold text-[#0d0d0d]">+18.4% YOY</span>
        </div>
        <div className="flex items-end gap-1.5 h-12 pt-2">
          {[40, 65, 50, 85, 95, 70, 100].map((h, i) => (
            <div key={i} className="flex-1 bg-[#f4f2ee] rounded-t flex items-end">
              <div
                className="w-full bg-[#0d0d0d] rounded-t"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
