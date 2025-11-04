'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { m, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>((props, ref) => <TabsPrimitive.Root ref={ref} {...props} />);
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'relative inline-flex w-full items-center justify-stretch overflow-hidden rounded-[2.5rem] border border-[#d6c4b4] bg-gradient-to-r from-[#f2e6da] via-surface/95 to-[#f2e6da] text-base shadow-[0_30px_60px_-40px_rgba(131,105,81,0.35)] md:text-lg [&>button:first-child]:rounded-l-[2.5rem] [&>button:last-child]:rounded-r-[2.5rem]',
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const isActive = (props as { 'data-state'?: string })['data-state'] === 'active';

  return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          'relative inline-flex min-w-[160px] flex-1 cursor-pointer items-center justify-center whitespace-nowrap border-r border-[#ceb69f] bg-gradient-to-b from-[#f1dfc9] to-[#fffdfa] px-6 py-4 font-medium text-ink/85 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c29d79]/60 hover:-translate-y-1 hover:bg-[#e6d0b8] hover:text-ink hover:shadow-[0_26px_46px_-24px_rgba(131,105,81,0.45)] data-[state=active]:translate-y-[2px] data-[state=active]:bg-[#d6bea3] data-[state=active]:text-brand-ink data-[state=active]:shadow-[inset_0_8px_18px_rgba(131,105,81,0.3)] data-[state=active]:ring-2 data-[state=active]:ring-[#ad8661]/70 first:border-l first:border-[#ceb69f]',
          className
        )}
        {...props}
      >
        {children}
        <AnimatePresence>
          {isActive && (
            <m.span
              layoutId="tabs-active-indicator"
              className="absolute inset-0 -z-10 rounded-full bg-brand/12"
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            />
          )}
        </AnimatePresence>
      </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn('mt-6 rounded-3xl border border-border/80 bg-surface/95 p-6 shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30', className)}
      {...props}
    />
  )
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
