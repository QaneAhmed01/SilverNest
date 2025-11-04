'use client';

import { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { celebrateCopy } from '@/lib/confetti';
import { cn } from '@/lib/utils';

interface CopyBlockProps {
  label: string;
  content: string;
  className?: string;
}

export function CopyBlock({ label, content, className }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success('Copied to clipboard');
      celebrateCopy();
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      toast.error('Could not copy. Try again.');
      console.error(error);
    }
  };

  return (
    <div className={cn('rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 shadow-card', className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-serif text-xl text-ink">{label}</p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          className="min-w-[120px]"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" aria-hidden /> Copied
            </>
          ) : (
            <>
              <Clipboard className="h-4 w-4" aria-hidden /> Copy
            </>
          )}
        </Button>
      </div>
      <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-subtle">{content}</p>
    </div>
  );
}
