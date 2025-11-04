import * as React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'min-h-[160px] w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-ink shadow-sm transition-all placeholder:text-subtle/70 focus-visible:border-brand focus-visible:shadow-focus',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
