'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3 text-base font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 ring-offset-surface',
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-white shadow-card hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-24px_rgba(92,61,61,0.65)] focus-visible:ring-brand/30',
        secondary:
          'bg-surface text-ink border-border hover:border-brand hover:text-brand focus-visible:ring-brand/30',
        ghost:
          'bg-transparent text-brand hover:bg-brand/10 focus-visible:ring-brand/30',
        outline:
          'bg-transparent border-brand/40 text-brand hover:border-brand focus-visible:ring-brand/30',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-12 w-12 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, disabled, ...props }, ref) => {
    const showSpinner = isLoading && !asChild;

    if (asChild) {
      const childArray = React.Children.toArray(children).filter(
        (child) => child !== null && child !== undefined && typeof child !== 'boolean'
      );
      const child = childArray[0] ?? null;

      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          data-loading={isLoading ? '' : undefined}
          {...props}
        >
          {child}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        data-loading={isLoading ? '' : undefined}
        {...props}
      >
        {showSpinner && (
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-[2.5px] border-white/60 border-t-white"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
