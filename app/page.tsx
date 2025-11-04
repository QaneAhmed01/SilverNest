import type { Metadata } from 'next';
import { ArrowDown } from 'lucide-react';
import { Hero } from '@/components/home/hero';
import { ValueCards } from '@/components/home/value-cards';
import { HowItWorks } from '@/components/home/how-it-works';
import { PrimaryCTA } from '@/components/common/primary-cta';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Home',
};

interface SectionArrowProps {
  target: string;
  label: string;
  className?: string;
}

function SectionArrow({ target, label, className }: SectionArrowProps) {
  return (
    <a
      href={target}
      className={cn(
        'group mt-10 flex flex-col items-center gap-2 text-base text-subtle transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
        className
      )}
      aria-label={label}
    >
      <span>{label}</span>
      <ArrowDown className="h-12 w-12 rounded-full border border-brand/40 bg-brand/10 p-2 text-brand transition-transform duration-200 group-hover:translate-y-1 group-hover:shadow-card" aria-hidden />
    </a>
  );
}

export default function HomePage() {
  return (
    <div className="home-snap">
      <div id="hero" className="home-snap-section flex flex-col justify-between">
        <Hero className="flex-1" />
        <div className="flex justify-center pb-12">
          <SectionArrow target="#section-values" label="Explore the SilverNest pillars" />
        </div>
      </div>

      <div id="section-values" className="home-snap-section flex flex-col justify-between">
        <ValueCards className="flex-1" />
        <div className="flex justify-center pb-12">
          <SectionArrow target="#section-how" label="See how SilverNest works" />
        </div>
      </div>

      <div id="section-how" className="home-snap-section flex flex-col justify-between">
        <HowItWorks className="flex-1" />
        <div className="flex justify-center pb-12">
          <SectionArrow target="#section-ready" label="Get ready to improve your profile" />
        </div>
      </div>

      <div id="section-ready" className="home-snap-section flex flex-col justify-center py-16">
        <section className="py-16">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-surface/95 px-6 py-12 text-center shadow-card md:px-12">
            <h2 className="font-serif text-3xl text-ink md:text-4xl">Ready to feel good about your profile?</h2>
            <p className="mt-4 text-lg text-subtle md:text-xl">
              In a few kind, structured steps, we’ll highlight what’s working, suggest refinements, and
              share a refreshed version you can copy in one tap.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:justify-center">
              <PrimaryCTA />
              <p className="text-sm text-subtle">No login required. Friendly guidance in under five minutes.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
