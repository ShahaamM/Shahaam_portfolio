'use client';

import React, { useState, useEffect, useRef } from 'react';
import { NAV, PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

export function Navigation() {
  const { scrollToTarget } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [menuOpen, setMenuOpen] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Scroll listener for 40px threshold and scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (y / total) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section with IntersectionObserver rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const sectionIds = NAV.map((item) => item.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update sliding pill indicator position
  useEffect(() => {
    if (!navContainerRef.current) return;
    const activeBtn = navContainerRef.current.querySelector<HTMLButtonElement>(
      `[data-nav="${activeSection}"]`
    );

    if (activeBtn && indicatorRef.current) {
      const navRect = navContainerRef.current.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      indicatorRef.current.style.width = `${btnRect.width}px`;
      indicatorRef.current.style.transform = `translateX(${btnRect.left - navRect.left}px)`;
      indicatorRef.current.style.opacity = '1';
    } else if (indicatorRef.current) {
      indicatorRef.current.style.opacity = '0';
    }
  }, [activeSection, scrolled]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      {/* 2px ink scroll-progress bar along top */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#0d0d0d] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 sm:py-6 transition-all duration-300 pointer-events-none">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between pointer-events-auto">
          {/* Left: Initials mark + Name */}
          <button
            onClick={() => scrollToTarget('#hero')}
            aria-label="Back to top"
            className="group flex items-center gap-3 cursor-pointer py-1"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs tracking-wider transition-all duration-500 group-hover:rotate-[360deg] ${
                scrolled
                  ? 'bg-[#0d0d0d] text-[#f4f2ee] shadow-sm'
                  : 'bg-transparent text-[#0d0d0d] border border-[rgba(13,13,13,0.25)]'
              }`}
            >
              SM
            </div>
            <span
              className={`font-semibold text-sm tracking-tight text-[#0d0d0d] transition-opacity duration-300 hidden sm:inline-block ${
                scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {PROFILE.name}
            </span>
          </button>

          {/* Desktop Centre/Right: Nav links pill */}
          <nav
            ref={navContainerRef}
            aria-label="Main Navigation"
            className={`hidden md:flex items-center relative p-1.5 rounded-full transition-all duration-400 ${
              scrolled
                ? 'bg-white/80 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(13,13,13,0.08),inset_0_0_0_1px_rgba(13,13,13,0.08)]'
                : 'bg-transparent border border-[rgba(13,13,13,0.12)]'
            }`}
          >
            {/* Sliding ink indicator pill */}
            <div
              ref={indicatorRef}
              className="absolute left-0 top-1.5 bottom-1.5 bg-[#0d0d0d] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
              style={{ opacity: 0 }}
            />

            {NAV.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.href}
                  data-nav={item.href.replace('#', '')}
                  onClick={() => handleLinkClick(item.href)}
                  className={`relative z-10 px-4 py-2 text-xs font-semibold tracking-wide rounded-full transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#f4f2ee]'
                      : 'text-[#3a3a3a] hover:text-[#0d0d0d]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm ${
                scrolled
                  ? 'bg-white/90 backdrop-blur-md text-[#0d0d0d] border border-[rgba(13,13,13,0.1)]'
                  : 'bg-[#0d0d0d] text-[#f4f2ee]'
              }`}
              aria-expanded={menuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay with clip-path */}
      <div
        className={`fixed inset-0 z-50 bg-[#f4f2ee] flex flex-col justify-between p-8 md:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          clipPath: menuOpen
            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          transition: 'clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
        }}
        aria-modal="true"
        role="dialog"
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full bg-[#0d0d0d] text-[#f4f2ee] flex items-center justify-center font-mono font-bold text-xs">
            SM
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center text-sm font-semibold"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => (
            <button
              key={item.href}
              onClick={() => handleLinkClick(item.href)}
              style={{
                transitionDelay: `${idx * 60}ms`,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
              }}
              className="flex items-baseline gap-4 text-left transition-all duration-400 group cursor-pointer"
            >
              <span className="font-mono text-sm text-[#77756f]">{item.num}</span>
              <span className="font-bold text-3xl tracking-tight text-[#0d0d0d] group-hover:translate-x-2 transition-transform duration-200">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-[rgba(13,13,13,0.08)] flex justify-between items-center text-xs font-mono text-[#77756f]">
          <span>{PROFILE.role}</span>
          <span>{PROFILE.location}</span>
        </div>
      </div>
    </>
  );
}
