'use client';

import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { Hero } from './hero/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Work } from './sections/Work';
import { Certifications } from './sections/Certifications';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';

export function App() {
  // Global RevealObserver for .rv and .rv-mask elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.05,
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll('.rv:not(.is-in), .rv-mask:not(.is-in)');
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();

    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f4f2ee] text-[#0d0d0d] overflow-x-hidden selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
