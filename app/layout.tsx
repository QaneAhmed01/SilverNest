import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { MotionProvider } from '@/components/providers/motion-provider';
import { PostHogProvider } from '@/components/providers/posthog-provider';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { GoogleAnalyticsPageView } from '@/components/analytics/ga-pageview';
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
    default: 'SilverNest | Write a dating profile that sounds like you',
    template: '%s · SilverNest',
  },
  description:
    'Write a dating profile that sounds like you — warm, confident, and ready for what’s next. SilverNest offers tech that understands maturity.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SilverNest',
    description:
      'Tech that understands maturity. SilverNest helps you write a profile that feels like yourself.',
    siteName: 'SilverNest',
    url: baseUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SilverNest',
    description:
      'Write a profile that sounds like you — warm, confident, ready for what’s next.',
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
        <GoogleAnalytics />
        <GoogleAnalyticsPageView />
        <a href="#skip" data-skip-link>
          Skip to content
        </a>
        <PostHogProvider>
          <MotionProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main id="skip" className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
          </MotionProvider>
        </PostHogProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
