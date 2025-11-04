'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { PrimaryCTA } from '@/components/common/primary-cta';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerParent } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function Hero({ className }: { className?: string }) {
  return (
    <section className={cn('relative overflow-hidden py-16 md:py-24', className)}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/8 via-transparent to-accent/10" aria-hidden />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <m.div
          className="max-w-2xl space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerParent}
        >
          <m.span variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand-ink">
            SilverNest AI for modern dating
          </m.span>
          <m.h1 variants={fadeInUp} className="font-serif text-4xl leading-tight text-ink md:text-5xl">
            Feel confident about your dating profile
          </m.h1>
          <m.p variants={fadeInUp} className="text-lg text-subtle md:text-xl">
            Kind, practical feedback powered by AI — no coaching packages, just thoughtful prompts
            that help adults 40+ share their story with warmth, clarity, and confidence.
          </m.p>
          <m.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
            <PrimaryCTA />
            <Button asChild variant="ghost">
              <Link href="#how-it-works">Get started</Link>
            </Button>
          </m.div>
          <m.div variants={fadeInUp} className="flex flex-wrap gap-6 text-sm text-subtle">
            <div>
              <p className="font-semibold text-ink">Built with respectful AI</p>
              <p>Guidance tuned specifically for mature daters — no scripts, just your voice elevated.</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Privacy-first</p>
              <p>Delete photos or text any time. Nothing is stored.</p>
            </div>
          </m.div>
          <m.div variants={fadeInUp} className="flex items-center gap-3 text-sm text-subtle">
            <ArrowDown className="h-10 w-10 md:h-12 md:w-12 text-brand" aria-hidden />
            Scroll to explore SilverNest
          </m.div>
        </m.div>

        <m.div
          className="relative mx-auto w-full max-w-md rounded-[2.5rem] border border-border bg-surface/90 p-6 shadow-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="rounded-[2rem] bg-noise p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-brand">Preview</p>
            <h2 className="mt-3 font-serif text-2xl text-ink">A gentler rewrite</h2>
            <p className="mt-4 text-base leading-relaxed text-subtle">
              “Weekends mean farmers market strolls, catching a jazz set, or rolling sushi with my
              daughter. Ready for a partner who finds joy in everyday rituals.”
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-subtle/80">
              <Image src="/logo.svg" alt="SilverNest" width={32} height={32} />
              Written with care for daters 40+
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
