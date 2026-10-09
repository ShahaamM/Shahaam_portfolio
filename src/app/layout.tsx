import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ScrollProvider } from '@/lib/scroll';
import { PROFILE } from '@/lib/data';

const interTight = localFont({
  src: [
    {
      path: '../fonts/InterTight-normal-100_900.woff2',
      style: 'normal',
    },
    {
      path: '../fonts/InterTight-italic-100_900.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = localFont({
  src: [
    {
      path: '../fonts/InstrumentSerif-normal-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/InstrumentSerif-italic-400.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-instrument',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: [
    {
      path: '../fonts/JetBrainsMono-normal-100_800.woff2',
      style: 'normal',
    },
    {
      path: '../fonts/JetBrainsMono-italic-100_800.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shahaam.dev'),
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: PROFILE.resumeSummary,
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.resumeSummary,
    url: 'https://shahaam.dev',
    siteName: `${PROFILE.name} Portfolio`,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} — ${PROFILE.role}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.resumeSummary,
    images: ['/og.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#f4f2ee] text-[#0d0d0d] antialiased selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}
