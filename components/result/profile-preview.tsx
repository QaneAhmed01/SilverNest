'use client';
import { Button } from '@/components/ui/button';

interface ProfilePreviewProps {
  status: 'idle' | 'loading' | 'ready' | 'error';
  imageBase64?: string | null;
  platform: string;
  onRetry?: () => void;
}

export function ProfilePreview({ status, imageBase64, platform, onRetry }: ProfilePreviewProps) {
  if (status === 'idle') return null;

  return (
    <section className="rounded-[2rem] border border-border bg-surface/95 p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">Preview your {platform} profile</h2>
        {status === 'error' && onRetry ? (
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Try again
          </Button>
        ) : null}
      </div>

      {status === 'loading' && (
        <div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-dashed border-border/70 bg-background/70 text-subtle">
          Generating a visual preview…
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 flex h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-error/40 bg-error/5 text-error">
          <p>We couldn’t generate a preview right now.</p>
          {onRetry ? (
            <Button variant="secondary" onClick={onRetry}>
              Retry
            </Button>
          ) : null}
        </div>
      )}

      {status === 'ready' && imageBase64 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${imageBase64}`}
            alt={`Generated ${platform} profile preview`}
            className="w-full"
          />
        </div>
      )}
    </section>
  );
}
