'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      richColors
      toastOptions={{
        className: 'rounded-full border border-border bg-surface/95 px-5 py-3 text-ink shadow-card',
      }}
    />
  );
}
