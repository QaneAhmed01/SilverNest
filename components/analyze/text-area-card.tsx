'use client';

import { ReactNode } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { countCharacters, percentFilled } from '@/lib/format';
import { cn } from '@/lib/utils';

interface TextAreaCardProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: ReactNode;
  max?: number;
  placeholder?: string;
}

export function TextAreaCard({
  id,
  label,
  value,
  onChange,
  description,
  max = 1200,
  placeholder,
}: TextAreaCardProps) {
  const chars = countCharacters(value);
  const percent = percentFilled(chars, max);

  return (
    <div className="rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 shadow-card">
      <div className="flex flex-col gap-2">
        <Label htmlFor={id} className="text-base font-semibold text-ink">
          {label}
        </Label>
        {typeof description === 'string' ? (
          <p className="text-sm text-subtle">{description}</p>
        ) : (
          description
        )}
      </div>
      <div className="mt-4 space-y-3">
        <Textarea
          id={id}
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={max}
          placeholder={placeholder}
          aria-describedby={`${id}-description`}
        />
        <div className="flex items-center justify-between text-xs text-subtle">
          <p id={`${id}-description`}>We keep this private and never store submissions.</p>
          <span
            className={cn(
              'rounded-full px-3 py-1',
              percent > 90 ? 'bg-warning/15 text-warning' : 'bg-brand/10 text-brand-ink'
            )}
          >
            {chars}/{max}
          </span>
        </div>
      </div>
    </div>
  );
}
