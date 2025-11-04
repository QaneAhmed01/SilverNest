import { ImageOff } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function EmptyState() {
  return (
    <div className="rounded-[2rem] border border-dashed border-border/80 bg-surface/95 p-12 text-center shadow-card">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand-ink">
        <ImageOff className="h-8 w-8" aria-hidden />
      </div>
      <h2 className="mt-6 font-serif text-3xl text-ink">Ready when you are.</h2>
      <p className="mt-3 text-base text-subtle">
        Add your profile details and preferences, then we&apos;ll offer calm, practical suggestions. No account required.
      </p>
      <Button asChild className="mt-6">
        <Link href="/analyze">Start improving my profile</Link>
      </Button>
    </div>
  );
}
