'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;
    const search = searchParams?.toString();
    const url = `${window.location.origin}${pathname}${search ? `?${search}` : ''}`;
    if (typeof window === 'undefined' || !(window as any).gtag) return;
    (window as any).gtag('event', 'page_view', {
      page_path: pathname,
      page_location: url,
    });
  }, [pathname, searchParams]);

  return null;
}
