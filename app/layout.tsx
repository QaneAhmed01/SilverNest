import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { MotionProvider } from '@/components/providers/motion-provider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://silvernest.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'SilverNest | Confident Profiles for Real Connections',
    template: '%s · SilverNest',
  },
  description:
    'Feel confident about your dating profile. SilverNest gives calm, practical guidance crafted for adults 40+ seeking meaningful matches.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SilverNest',
    description:
      'Kind, practical feedback written for real connections — not gimmicks. Improve your dating profile with SilverNest.',
    siteName: 'SilverNest',
    url: baseUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SilverNest',
    description:
      'Kind, practical feedback written for real connections — not gimmicks. Improve your dating profile with SilverNest.',
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-ink">
        <a href="#skip" data-skip-link>
          Skip to content
        </a>
        <MotionProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main id="skip" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </MotionProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
