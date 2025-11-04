'use client';

import { cn } from '@/lib/utils';

interface PreferenceChipsProps {
  options: string[];
  value: string[];
  onToggle: (option: string) => void;
}

export function PreferenceChips({ options, value, onToggle }: PreferenceChipsProps) {
  return (
    <div className="rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 shadow-card">
      <p className="font-serif text-xl text-ink">What matters most right now?</p>
      <p className="mt-2 text-sm text-subtle">
        Choose a few focus areas so we can tailor feedback. You can change these any time.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((option) => {
          const active = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              role="switch"
              aria-checked={active}
              onClick={() => onToggle(option)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
                active
                  ? 'border-brand bg-brand/15 text-brand-ink shadow-card'
                  : 'border-border bg-white text-subtle hover:border-brand/50 hover:text-brand-ink'
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
