'use client';

import React, { useState } from 'react';
import { SKILL_GROUPS, Skill } from '@/lib/data';
import { TechLogo, isBrand } from '@/components/ui/TechLogo';

const FAMILIES = [
  'All',
  'Languages',
  'Data Science',
  'Web & Backend',
  'Databases',
  'Tools & Cloud',
  'Concepts',
] as const;

type FamilyFilter = (typeof FAMILIES)[number];

export function Skills() {
  const [selectedFamily, setSelectedFamily] = useState<FamilyFilter>('All');
  const [activeSkill, setActiveSkill] = useState<Skill>(SKILL_GROUPS[0]);

  return (
    <section id="skills" className="section-padding section-container bg-[#f4f2ee]">
      <div className="section-tag rv" style={{ '--i': 0 } as React.CSSProperties}>
        <span className="font-mono text-xs">02</span>
        <span>—</span>
        <span>Tech Stack</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 rv" style={{ '--i': 1 } as React.CSSProperties}>
        <h2 className="section-heading mb-0">
          The periodic table of my <span className="heading-italic">stack.</span>
        </h2>

        {/* Family Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {FAMILIES.map((family) => {
            const isSelected = selectedFamily === family;
            return (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0d0d0d] text-[#f4f2ee] shadow-sm'
                    : 'bg-white text-[#77756f] border border-[rgba(13,13,13,0.12)] hover:border-[#0d0d0d] hover:text-[#0d0d0d]'
                }`}
              >
                {family}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container: Periodic Table Grid + Sticky Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Periodic Grid (8 cols on desktop, 4 on mobile) */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
          {SKILL_GROUPS.map((skill, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            const delay = (row + col) * 0.04;
            const matchesFilter =
              selectedFamily === 'All' || skill.family === selectedFamily;
            const isActive = activeSkill.num === skill.num;

            return (
              <button
                key={skill.num}
                onMouseEnter={() => setActiveSkill(skill)}
                onFocus={() => setActiveSkill(skill)}
                onClick={() => setActiveSkill(skill)}
                tabIndex={0}
                style={{
                  transitionDelay: `${delay}s`,
                }}
                className={`relative aspect-square p-2 rounded-xl transition-all duration-300 flex flex-col justify-between text-left cursor-pointer group ${
                  matchesFilter
                    ? 'bg-white shadow-[0_2px_8px_-2px_rgba(13,13,13,0.06),inset_0_0_0_1px_rgba(13,13,13,0.08)] hover:-translate-y-1 hover:shadow-md'
                    : 'bg-white/40 opacity-30 grayscale pointer-events-none sm:pointer-events-auto border border-transparent'
                } ${
                  isActive
                    ? 'ring-2 ring-[#0d0d0d] shadow-md -translate-y-1'
                    : 'hover:border-[rgba(13,13,13,0.25)]'
                }`}
              >
                {/* Atomic Number */}
                <div className="flex justify-between items-center w-full">
                  <span className="font-mono text-[10px] text-[#77756f] font-semibold">
                    {skill.num.toString().padStart(2, '0')}
                  </span>
                  {skill.isBrand && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]/30" />
                  )}
                </div>

                {/* 2-Letter Symbol */}
                <div className="text-center my-auto">
                  <span className="font-mono font-bold text-lg sm:text-xl text-[#0d0d0d] tracking-tight block">
                    {skill.symbol}
                  </span>
                </div>

                {/* Skill Name */}
                <span className="text-[10px] font-medium text-[#77756f] truncate block text-center w-full">
                  {skill.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Inspector Panel (Sticky on Desktop, 320px wide) */}
        <aside className="sticky top-28 paper-card p-6 sm:p-7 flex flex-col items-center text-center">
          <div className="w-full flex items-center justify-between pb-4 mb-6 border-b border-[rgba(13,13,13,0.08)]">
            <span className="font-mono text-[11px] text-[#77756f] uppercase tracking-wider">
              Element Inspector
            </span>
            <span className="font-mono text-xs font-bold text-[#0d0d0d]">
              No. {activeSkill.num.toString().padStart(2, '0')}
            </span>
          </div>

          {/* Real Brand Logo at 150px with Pop Animation */}
          <div className="relative w-[150px] h-[150px] flex items-center justify-center my-4 group">
            <div className="keyframe-pop transition-transform duration-300 transform scale-100 group-hover:scale-105">
              <TechLogo
                logoKey={activeSkill.logoKey}
                size={120}
                showGlow={isBrand(activeSkill.logoKey)}
              />
            </div>
          </div>

          {/* Details */}
          <div className="mt-2 w-full">
            <div className="inline-block px-3 py-1 rounded-full bg-[#f4f2ee] text-[11px] font-mono text-[#77756f] mb-2 uppercase tracking-wide">
              {activeSkill.family}
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d] mb-1">
              {activeSkill.name}
            </h3>
            <span className="font-mono text-xs text-[#77756f] block mb-6">
              Symbol &ldquo;{activeSkill.symbol}&rdquo;
            </span>

            {/* Related Projects from Resume */}
            <div className="text-left w-full pt-4 border-t border-[rgba(13,13,13,0.08)]">
              <span className="font-mono text-[10px] text-[#77756f] uppercase tracking-wider block mb-2">
                Applied In
              </span>
              <ul className="space-y-1.5 text-xs text-[#3a3a3a]">
                {activeSkill.projects.map((proj, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                    <span className="font-medium">{proj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .keyframe-pop {
          animation: pop 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes pop {
          0% {
            transform: scale(0.85);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
