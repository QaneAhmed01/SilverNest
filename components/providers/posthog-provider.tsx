'use client';

import { ReactNode, useEffect } from 'react';
import posthog from 'posthog-js';
import { usePathname, useSearchParams } from 'next/navigation';

const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

export function PostHogProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!apiKey) return;
    if (typeof window === 'undefined') return;
    posthog.init(apiKey, {
      api_host: apiHost,
      capture_pageview: false,
      autocapture: true,
      persistence: 'localStorage',
    });
    return () => {
      posthog.reset();
    };
  }, []);

  useEffect(() => {
    if (!apiKey) return;
    if (typeof window === 'undefined') return;
    const search = searchParams?.toString();
    const url = `${window.location.origin}${pathname}${search ? `?${search}` : ''}`;
    posthog.capture('$pageview', {
      $current_url: url,
    });
  }, [pathname, searchParams]);

  return children;
}
