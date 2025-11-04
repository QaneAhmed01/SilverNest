'use client';

import { m } from 'framer-motion';
import { Lightbulb, Heart, Smile } from 'lucide-react';
import { fadeInUp, staggerParent } from '@/lib/motion';
import { cn } from '@/lib/utils';

const cards = [
  {
    title: 'Clarity',
    description: 'Pinpoint what makes your profile feel grounded and true to you.',
    icon: Lightbulb,
  },
  {
    title: 'Confidence',
    description: 'Use prompts and suggestions that fit your voice without sounding canned.',
    icon: Heart,
  },
  {
    title: 'Connection',
    description: 'Share thoughtful first messages designed for respectful conversation.',
    icon: Smile,
  },
];

export function ValueCards({ className }: { className?: string }) {
  return (
    <section className={cn('py-12', className)} aria-labelledby="value-prop">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 id="value-prop" className="font-serif text-3xl text-ink md:text-4xl">
            Gentle guidance for modern dating apps.
          </h2>
          <p className="mt-3 text-lg text-subtle md:text-xl">
            The SilverNest method focuses on polish without pretense, so you sound like the best
            version of yourself.
          </p>
        </div>
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          variants={staggerParent}
          className="mt-12 grid gap-8 md:grid-cols-3"
        >
          {cards.map((card) => (
            <m.article
              key={card.title}
              variants={fadeInUp}
              whileHover={{ y: -8, boxShadow: '0 28px 55px -40px rgba(92,61,61,0.55)' }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="flex h-full cursor-pointer flex-col rounded-[1.75rem] border border-border bg-surface/95 p-6 shadow-card transition-all duration-200 hover:border-brand/40"
            >
              <card.icon className="h-10 w-10 text-brand" aria-hidden />
              <h3 className="mt-6 font-serif text-2xl text-ink">{card.title}</h3>
              <p className="mt-4 text-base text-subtle">
                {card.description}
              </p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
