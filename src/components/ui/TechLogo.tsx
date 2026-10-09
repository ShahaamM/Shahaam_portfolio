'use client';

import React from 'react';
import Image from 'next/image';

export const BRAND_MAP: Record<string, { src: string; alt: string; glow: string }> = {
  python: { src: '/logos/python.svg', alt: 'Python', glow: 'rgba(55, 118, 171, 0.25)' },
  r: { src: '/logos/r.svg', alt: 'R Programming', glow: 'rgba(39, 108, 196, 0.25)' },
  java: { src: '/logos/java.svg', alt: 'Java', glow: 'rgba(234, 45, 46, 0.2)' },
  csharp: { src: '/logos/csharp.svg', alt: 'C#', glow: 'rgba(155, 73, 150, 0.25)' },
  pandas: { src: '/logos/pandas.svg', alt: 'Pandas', glow: 'rgba(19, 7, 88, 0.2)' },
  numpy: { src: '/logos/numpy.svg', alt: 'NumPy', glow: 'rgba(77, 119, 197, 0.25)' },
  scikitlearn: { src: '/logos/scikitlearn.svg', alt: 'Scikit-learn', glow: 'rgba(247, 153, 56, 0.25)' },
  matplotlib: { src: '/logos/matplotlib.svg', alt: 'Matplotlib', glow: 'rgba(17, 86, 126, 0.25)' },
  react: { src: '/logos/react.svg', alt: 'React', glow: 'rgba(97, 218, 251, 0.25)' },
  nodejs: { src: '/logos/nodejs.svg', alt: 'Node.js', glow: 'rgba(83, 158, 67, 0.25)' },
  express: { src: '/logos/express.svg', alt: 'Express.js', glow: 'rgba(50, 50, 50, 0.2)' },
  fastapi: { src: '/logos/fastapi.svg', alt: 'FastAPI', glow: 'rgba(5, 153, 139, 0.25)' },
  mysql: { src: '/logos/mysql.svg', alt: 'MySQL', glow: 'rgba(0, 117, 143, 0.25)' },
  sqlite: { src: '/logos/sqlite.svg', alt: 'SQLite', glow: 'rgba(0, 59, 87, 0.25)' },
  mongodb: { src: '/logos/mongodb.svg', alt: 'MongoDB', glow: 'rgba(71, 162, 72, 0.25)' },
  microsoftsqlserver: { src: '/logos/microsoftsqlserver.svg', alt: 'SQL Server', glow: 'rgba(204, 41, 43, 0.25)' },
  azure: { src: '/logos/azure.svg', alt: 'Microsoft Azure', glow: 'rgba(0, 127, 255, 0.25)' },
  git: { src: '/logos/git.svg', alt: 'Git', glow: 'rgba(240, 80, 50, 0.25)' },
  github: { src: '/logos/github.svg', alt: 'GitHub', glow: 'rgba(24, 23, 23, 0.2)' },
  pycharm: { src: '/logos/pycharm.svg', alt: 'PyCharm', glow: 'rgba(33, 214, 130, 0.25)' },
  jupyter: { src: '/logos/jupyter.svg', alt: 'Jupyter', glow: 'rgba(243, 118, 38, 0.25)' },
  vscode: { src: '/logos/vscode.svg', alt: 'VS Code', glow: 'rgba(0, 120, 215, 0.25)' },
  intellij: { src: '/logos/intellij.svg', alt: 'IntelliJ IDEA', glow: 'rgba(254, 49, 88, 0.25)' },
  linkedin: { src: '/logos/linkedin.svg', alt: 'LinkedIn', glow: 'rgba(10, 102, 194, 0.25)' },
  chartjs: { src: '/logos/chartjs.svg', alt: 'Chart.js', glow: 'rgba(255, 99, 132, 0.25)' },
  powerbi: { src: '/logos/powerbi.svg', alt: 'Power BI', glow: 'rgba(242, 200, 17, 0.25)' },
  excel: { src: '/logos/excel.svg', alt: 'Microsoft Excel', glow: 'rgba(16, 124, 65, 0.25)' },
  powerpoint: { src: '/logos/powerpoint.svg', alt: 'Microsoft PowerPoint', glow: 'rgba(196, 62, 28, 0.25)' },
  langchain: { src: '/logos/langchain.svg', alt: 'LangChain', glow: 'rgba(0, 166, 126, 0.25)' },
  chromadb: { src: '/logos/chromadb.svg', alt: 'ChromaDB', glow: 'rgba(255, 87, 34, 0.25)' },
  sql: { src: '/logos/sql.svg', alt: 'Structured Query Language', glow: 'rgba(0, 117, 143, 0.25)' },
  coursera: { src: '/logos/coursera.svg', alt: 'Coursera', glow: 'rgba(0, 86, 210, 0.25)' },
  simplilearn: { src: '/logos/simplilearn.svg', alt: 'Simplilearn', glow: 'rgba(243, 112, 35, 0.25)' },
  greatlearning: { src: '/logos/greatlearning.svg', alt: 'Great Learning', glow: 'rgba(0, 164, 239, 0.25)' },
  sliit: { src: '/logos/sliit.svg', alt: 'SLIIT', glow: 'rgba(255, 199, 44, 0.25)' },
  ieee: { src: '/logos/ieee.svg', alt: 'IEEE', glow: 'rgba(0, 98, 155, 0.25)' },
  aiesec: { src: '/logos/aiesec.svg', alt: 'AIESEC', glow: 'rgba(3, 126, 243, 0.25)' },
};

export const CONCEPT_MAP: Record<string, { label: string; icon: (size: number) => React.ReactNode }> = {
  olap: {
    label: 'OLAP Cube',
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    )
  },
  rag: {
    label: 'RAG Architecture',
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <circle cx="18" cy="6" r="3" />
        <path d="M8.5 7.5L15.5 16.5" />
        <path d="M9 6h6" />
        <path d="M18 9v6" />
      </svg>
    )
  },
  ai: {
    label: 'Agentic AI',
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  dw: {
    label: 'Data Warehousing',
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    )
  },
  ba: {
    label: 'Business Analytics',
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path d="M3 20h18" />
      </svg>
    )
  },
  fd: {
    label: 'Forward Deployment',
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    )
  },
  qa: {
    label: 'Testing & QA',
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    )
  },
  sa: {
    label: 'System Architecture',
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  pm: {
    label: 'People Management',
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
};

export function isBrand(key: string): boolean {
  const normalized = key.toLowerCase().replace(/[^a-z0-9]/g, '');
  return Boolean(BRAND_MAP[normalized] || BRAND_MAP[key]);
}

interface TechLogoProps {
  logoKey: string;
  size?: number;
  className?: string;
  showGlow?: boolean;
}

export function TechLogo({ logoKey, size = 32, className = '', showGlow = false }: TechLogoProps) {
  const normKey = logoKey.toLowerCase().replace(/[^a-z0-9]/g, '');
  const brand = BRAND_MAP[normKey] || BRAND_MAP[logoKey];
  const concept = CONCEPT_MAP[normKey] || CONCEPT_MAP[logoKey];

  if (brand) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        {showGlow && (
          <div
            className="absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
            style={{ backgroundColor: brand.glow }}
          />
        )}
        <Image
          src={brand.src}
          alt={brand.alt}
          width={size}
          height={size}
          className="relative z-10 w-full h-full object-contain"
          unoptimized
        />
      </div>
    );
  }

  if (concept) {
    return (
      <div
        className={`relative inline-flex items-center justify-center text-[#3a3a3a] shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        {concept.icon(size)}
      </div>
    );
  }

  // Fallback icon
  return (
    <div
      className={`inline-flex items-center justify-center font-mono font-semibold text-xs border border-[rgba(13,13,13,0.15)] rounded bg-white text-[#0d0d0d] shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {logoKey.slice(0, 2).toUpperCase()}
    </div>
  );
}
