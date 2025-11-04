'use client';

import { m } from 'framer-motion';
import { fadeInUp, staggerParent } from '@/lib/motion';
import { cn } from '@/lib/utils';

const steps = [
  {
    title: 'Add your profile',
    description: 'Upload photos or paste your current bio. Tell us what already feels true to you.',
  },
  {
    title: 'Share preferences',
    description: 'Choose your tone, length, and what matters most in a match or message.',
  },
  {
    title: 'Review calm feedback',
    description:
      'See highlights, refined suggestions, and an optional rewrite you can copy in one tap.',
  },
];

export function HowItWorks({ className }: { className?: string }) {
  return (
    <section id="how-it-works" className={cn('py-16', className)} aria-labelledby="how-it-works-title">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 id="how-it-works-title" className="font-serif text-3xl text-ink md:text-4xl">
            Designed to feel like a conversation with a trusted guide — powered by AI.
          </h2>
          <p className="mt-3 text-lg text-subtle md:text-xl">
            You stay in control of every word. We simply help you express it with warmth and clarity.
          </p>
        </div>

        <m.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerParent}
          className="mt-12 grid gap-8 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <m.li
              key={step.title}
              variants={fadeInUp}
              className="flex h-full flex-col rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 shadow-card"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/12 font-semibold text-brand-ink">
                0{index + 1}
              </span>
              <h3 className="mt-6 font-serif text-2xl text-ink">{step.title}</h3>
              <p className="mt-4 text-base text-subtle">{step.description}</p>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  );
}
