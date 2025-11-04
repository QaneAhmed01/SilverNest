import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'h-12 w-full rounded-2xl border border-border bg-white px-4 text-base text-ink shadow-sm transition-all placeholder:text-subtle/70 focus-visible:border-brand focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-60',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';
