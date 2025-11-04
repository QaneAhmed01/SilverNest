'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface FeedbackCardProps {
  highlights: string[];
  improvements: string[];
  originalText: string;
  rewrittenText: string;
}

export function FeedbackCard({ highlights, improvements, originalText, rewrittenText }: FeedbackCardProps) {
  return (
    <Tabs defaultValue="highlights">
      <TabsList>
        <TabsTrigger value="highlights">Highlights</TabsTrigger>
        <TabsTrigger value="improve">What to refine</TabsTrigger>
        <TabsTrigger value="rewrite">Suggested rewrite</TabsTrigger>
      </TabsList>
      <TabsContent value="highlights">
        <ListPanel title="Your strengths" items={highlights} emptyText="We&apos;ll fill this once you generate feedback." />
      </TabsContent>
      <TabsContent value="improve">
        <ListPanel title="What to refine" items={improvements} variant="outlined" emptyText="Add more detail about your goals so we can suggest refinements." />
      </TabsContent>
      <TabsContent value="rewrite">
        <RewritePanel original={originalText} improved={rewrittenText} />
      </TabsContent>
    </Tabs>
  );
}

function ListPanel({ title, items, emptyText, variant = 'default' }: { title: string; items: string[]; emptyText: string; variant?: 'default' | 'outlined' }) {
  if (!items.length) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-border/80 bg-surface/90 p-8 text-center text-subtle">
        {emptyText}
      </div>
    );
  }

  return (
    <div className={cn('rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 shadow-card', variant === 'outlined' && 'border-accent/60 bg-accent/5')}
    >
      <h3 className="font-serif text-2xl text-ink">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3 text-base text-subtle">
            <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-brand" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RewritePanel({ original, improved }: { original: string; improved: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded-[1.75rem] border border-border/80 bg-surface/90 p-6 shadow-sm">
        <h3 className="font-serif text-xl text-ink">Your original</h3>
        <p className="mt-3 whitespace-pre-wrap text-base text-subtle">{original || 'Paste your profile first so we can compare.'}</p>
      </article>
      <article className="rounded-[1.75rem] border border-brand/60 bg-brand/5 p-6 shadow-card">
        <h3 className="font-serif text-xl text-brand-ink">A clearer version to try</h3>
        <p className="mt-3 whitespace-pre-wrap text-base text-subtle">
          {improved || 'Generate feedback to receive a thoughtful rewrite you can copy in one tap.'}
        </p>
      </article>
    </div>
  );
}
