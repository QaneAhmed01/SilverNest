'use client';

import { m } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface StepIndicatorProps {
  step: number;
  totalSteps: number;
}

const labels = [
  'Step 1 · Add photos',
  'Step 2 · Share your story',
  'Step 3 · Preferences',
];

export function StepIndicator({ step, totalSteps }: StepIndicatorProps) {
  const progress = Math.round((step / totalSteps) * 100);
  const label = labels[step - 1] ?? `Step ${step}`;

  return (
    <div className="rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 shadow-card">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand">{label}</p>
          <h2 className="mt-2 font-serif text-2xl text-ink">We&apos;ll keep this calm and simple.</h2>
        </div>
        <p className="text-sm text-subtle">
          {step} of {totalSteps} steps
        </p>
      </div>
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mt-5"
      >
        <Progress value={progress} aria-hidden />
      </m.div>
    </div>
  );
}
