'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { FeedbackCard } from '@/components/result/feedback-card';
import { CopyBlock } from '@/components/result/copy-block';
import { EmptyState } from '@/components/result/empty-state';
import { ResultSkeleton } from '@/components/result/result-skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { clearResult, loadResult } from '@/lib/storage';
import type { ResultRecord } from '@/lib/types';
import { ProfileMock } from '@/components/result/profile-mock';
import { cn } from '@/lib/utils';

export function ResultView() {
  const [record, setRecord] = useState<ResultRecord | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty'>('loading');
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const value = loadResult();
    if (value) {
      setRecord(value);
      setStatus('ready');
    } else {
      setStatus('empty');
    }
  }, []);

  const feedback = useMemo(() => {
    if (!record) return null;
    const highlights = extractList(record.output.style_notes);
    const improvements = record.input.priorities.length
      ? record.input.priorities.map(
          (priority) => `Emphasize ${priority.toLowerCase()} earlier in your profile to invite matches who share it.`
        )
      : ['Add a short sentence about what makes daily life meaningful to you.', 'Mention one detail that shows your personality in action.'];
    return {
      highlights,
      improvements,
      original: record.input.profileText,
      improved: record.output.bio,
    };
  }, [record]);

  const gallery = useMemo(() => {
    if (!record) return [];
    const stored = record.input.gallery?.filter((photo) => photo?.dataUrl);
    if (stored && stored.length > 0) {
      return stored;
    }
    if (record.input.photoDataUrl) {
      return [{ id: 'primary', dataUrl: record.input.photoDataUrl }];
    }
    return [];
  }, [record]);

  useEffect(() => {
    setPhotoIndex(0);
  }, [gallery.length]);

  const handleClear = () => {
    clearResult();
    setRecord(null);
    setStatus('empty');
    toast.success('Your previous result has been cleared.');
  };

  if (status === 'loading') {
    return (
      <div className="px-4 pb-16 pt-10 md:px-6">
        <ResultSkeleton />
      </div>
    );
  }

  if (status === 'empty' || !record || !feedback) {
    return (
      <div className="px-4 pb-16 pt-10 md:px-6">
        <EmptyState />
      </div>
    );
  }

  const { output } = record;
  const currentPhoto = gallery[photoIndex]?.dataUrl ?? record.input.photoDataUrl;

  return (
    <div className="space-y-10 px-4 pb-16 pt-10 md:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand">Your personalized guidance</p>
          <h1 className="mt-2 font-serif text-3xl text-ink md:text-4xl">Thoughtful next steps for your profile</h1>
          <p className="mt-2 text-sm text-subtle">
            Generated on {new Date(record.generatedAt).toLocaleString()} · Tailored to {record.input.platform}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-error/90 text-white hover:bg-error/80 focus-visible:ring-error/40">
                Delete all
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete this feedback?</DialogTitle>
                <DialogDescription>
                  This removes the generated insights from this browser. You can always create a new
                  version without losing access to our guidance.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 flex justify-end gap-3">
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button className="bg-error text-white hover:bg-error/90 focus-visible:ring-error/50" onClick={handleClear}>
                    Delete
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <FeedbackCard
        highlights={feedback.highlights}
        improvements={feedback.improvements}
        originalText={feedback.original}
        rewrittenText={feedback.improved}
      />
      <ProfileMock
        platform={record.input.platform}
        photoDataUrl={currentPhoto}
        bio={record.output.bio}
        promptAnswers={record.output.prompt_answers}
        firstMessages={record.output.first_messages}
        name={record.input.name}
        city={record.input.city}
        age={record.input.age}
      />

      {gallery.length > 1 && (
        <div className="flex flex-wrap gap-3 rounded-2xl border border-border/70 bg-surface/90 p-4">
          {gallery.map((photo, index) => (
            <button
              key={photo.id ?? index}
              type="button"
              className={cn(
                'h-16 w-16 overflow-hidden rounded-2xl border border-border/70 shadow-sm transition focus-visible:ring-2 focus-visible:ring-brand/40',
                index === photoIndex ? 'ring-2 ring-brand' : 'opacity-80 hover:opacity-100'
              )}
              onClick={() => setPhotoIndex(index)}
              aria-label={`Show photo ${index + 1}`}
            >
              {photo.dataUrl ? (
                <img src={photo.dataUrl} alt={`Photo ${index + 1}`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-subtle">No image</div>
              )}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <CopyBlock label="Prompt answers" content={output.prompt_answers.join('\n\n')} />
        <CopyBlock label="First messages" content={output.first_messages.join('\n\n')} />
      </div>

      <CopyBlock label="Style notes" content={output.style_notes} />
    </div>
  );
}

function extractList(notes: string) {
  if (!notes) return [] as string[];
  return notes
    .split(/\n+|\.\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 3)
    .slice(0, 4);
}
