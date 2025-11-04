'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { StepIndicator } from '@/components/analyze/step-indicator';
import { PhotoDropzone } from '@/components/analyze/photo-dropzone';
import { TextAreaCard } from '@/components/analyze/text-area-card';
import { PreferenceChips } from '@/components/analyze/preference-chips';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countCharacters } from '@/lib/format';
import { saveResult } from '@/lib/storage';
import type { AnalyzeFormData, OutputData, PhotoItem, ResultRecord } from '@/lib/types';

const MAX_PROFILE_CHARS = 1200;
const priorities = ['Meaningful connection', 'Sense of humor', 'Shared values', 'Life balance', 'Adventure', 'Family oriented'];
const genderOptions = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
const platformOptions = ['Hinge', 'Bumble', 'Match', 'Tinder'];
const styleOptions = ['Warm and encouraging', 'Elegant and refined', 'Playful and witty', 'Direct and confident'];
const lengthOptions = ['Short (under 120 words)', 'Medium (150-200 words)', 'Expanded (250+ words)'];
const ageOptions = ['40-44', '45-54', '55-64', '65+'];

const defaultForm: AnalyzeFormData = {
  profileText: '',
  notes: '',
  ageBracket: '45-54',
  gender: 'Female',
  platform: 'Hinge',
  priorities: ['Meaningful connection'],
  stylePreference: 'Warm and encouraging',
  lengthPreference: 'Medium (150-200 words)',
  photoDataUrl: undefined,
};

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export function AnalyzeExperience() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<AnalyzeFormData>(defaultForm);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const photosRef = useRef<PhotoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, []);

  const totalSteps = 3;
  const profileFilled = countCharacters(form.profileText) >= 40;
  const canProceed = step === 2 ? profileFilled : true;

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Unable to read file'));
        }
      };
      reader.onerror = () => reject(new Error('Unable to read file'));
      reader.readAsDataURL(file);
    });

  const addPhotos = useCallback(
    async (files: FileList) => {
      const fileArray = Array.from(files).slice(0, 6 - photos.length);
      if (fileArray.length === 0) return;

      const generated = await Promise.all(
        fileArray.map(async (file) => ({
          id: createId(),
          name: file.name,
          size: file.size,
          url: URL.createObjectURL(file),
          dataUrl: await fileToDataUrl(file),
        }))
      );

      setPhotos((prev) => [...prev, ...generated]);
    },
    [photos.length]
  );

  const removePhoto = useCallback((id: string) => {
    setPhotos((prev) => {
      const next = prev.filter((photo) => photo.id !== id);
      const removed = prev.find((photo) => photo.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return next;
    });
  }, []);

  const togglePriority = (option: string) => {
    setForm((prev) => {
      const exists = prev.priorities.includes(option);
      const priorities = exists
        ? prev.priorities.filter((item) => item !== option)
        : [...prev.priorities, option];
      return { ...prev, priorities };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({ error: 'Request failed.' }));
        throw new Error(payload.error || 'We could not generate feedback. Please try again.');
      }

      const data = (await response.json()) as OutputData;
      const record: ResultRecord = {
        id: createId(),
        generatedAt: new Date().toISOString(),
        input: form,
        output: data,
      };

      saveResult(record);
      router.push('/result');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Try again soon.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const goNext = () => {
    if (step === 2 && !profileFilled) {
      setError('Share a bit more of your current profile so we can offer thoughtful feedback.');
      return;
    }
    setError(null);
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const goBack = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const photoCount = photos.length;

  useEffect(() => {
    const primary = photos[0]?.dataUrl;
    setForm((prev) => ({ ...prev, photoDataUrl: primary }));
  }, [photos]);

  return (
    <div className="space-y-10 px-4 pb-16 pt-10 md:px-6">
      <StepIndicator step={step} totalSteps={totalSteps} />
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
        <section className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <PhotoDropzone photos={photos} onAdd={addPhotos} onRemove={removePhoto} />
              <div className="rounded-[1.75rem] border border-border/70 bg-background/60 p-5 text-sm text-subtle">
                Add recent photos if you plan to refresh them too. We keep everything on your device — nothing uploads.
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <TextAreaCard
                id="profileText"
                label="Paste your current profile or bio"
                value={form.profileText}
                onChange={(value) => setForm((prev) => ({ ...prev, profileText: value }))}
                max={MAX_PROFILE_CHARS}
                placeholder="Share a few paragraphs or bullet points that sound like you."
                description="We’ll highlight what&apos;s already strong and suggest adjustments."
              />
              <TextAreaCard
                id="notes"
                label="Any extra context or stories?"
                value={form.notes}
                onChange={(value) => setForm((prev) => ({ ...prev, notes: value }))}
                max={600}
                placeholder="Mention life chapters, must-haves, or anecdotes you&apos;d like the AI to keep in mind."
                description="Optional. Helps the AI honor your tone and boundaries."
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 shadow-card">
                <Label htmlFor="ageBracket" className="text-base font-semibold text-ink">
                  Age bracket
                </Label>
                <p className="mt-1 text-sm text-subtle">We tailor the pacing and references to your stage of life.</p>
                <div className="mt-3">
                  <Select
                    value={form.ageBracket}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, ageBracket: value }))}
                  >
                    <SelectTrigger id="ageBracket">
                      <SelectValue placeholder="Select an age bracket" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 shadow-card">
                <Label htmlFor="gender" className="text-base font-semibold text-ink">
                  How should we refer to you?
                </Label>
                <p className="mt-1 text-sm text-subtle">This helps us write respectfully and accurately.</p>
                <div className="mt-3">
                  <Select
                    value={form.gender}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 shadow-card">
                <Label htmlFor="platform" className="text-base font-semibold text-ink">
                  Primary platform
                </Label>
                <p className="mt-1 text-sm text-subtle">We adjust length and tone based on where you’ll share it.</p>
                <div className="mt-3">
                  <Select
                    value={form.platform}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, platform: value }))}
                  >
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Choose a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platformOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 shadow-card">
                <Label className="text-base font-semibold text-ink">Tone preference</Label>
                <p className="mt-1 text-sm text-subtle">Tell us how the rewrite should feel.</p>
                <div className="mt-3">
                  <Select
                    value={form.stylePreference}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, stylePreference: value }))}
                  >
                    <SelectTrigger id="stylePreference">
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {styleOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 shadow-card">
                <Label className="text-base font-semibold text-ink">Preferred length</Label>
                <p className="mt-1 text-sm text-subtle">We’ll shape the final draft to fit your comfort zone.</p>
                <div className="mt-3">
                  <Select
                    value={form.lengthPreference}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, lengthPreference: value }))}
                  >
                    <SelectTrigger id="lengthPreference">
                      <SelectValue placeholder="Choose a length" />
                    </SelectTrigger>
                    <SelectContent>
                      {lengthOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <PreferenceChips options={priorities} value={form.priorities} onToggle={togglePriority} />
            </div>
          )}
        </section>

        <aside className="h-fit space-y-4 rounded-2xl border border-border/60 bg-surface/90 p-5 shadow-card md:sticky md:top-24">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-brand">Tips</p>
            <h2 className="font-serif text-xl text-ink">Thoughtful prompts make thoughtful matches.</h2>
            <p className="text-sm text-subtle">
              Aim for 3–4 sentences when you share your profile. Mention routines, values, or stories that feel like you — the AI will do the polishing.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background/80 p-3 text-xs text-subtle">
            <p>Photos stay on your device unless you copy the results. Delete them any time.</p>
            <p className="mt-2">We never store inputs. Learn more on our privacy page.</p>
          </div>
          <div className="space-y-2 text-sm text-subtle">
            <p>
              <strong className="font-semibold text-ink">Photos added:</strong> {photoCount}
            </p>
            <p>
              <strong className="font-semibold text-ink">Words shared:</strong> {countCharacters(form.profileText)} characters
            </p>
          </div>
        </aside>
      </div>

      <div className="flex flex-col gap-4 border-t border-border/70 pt-6 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-subtle" aria-live="polite">
          {error ? <span className="text-error">{error}</span> : 'We’ll keep your words private and secure.'}
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          {step > 1 && (
            <Button type="button" variant="secondary" onClick={goBack} disabled={isLoading}>
              Back
            </Button>
          )}
          {step < totalSteps && (
            <Button type="button" onClick={goNext} disabled={!canProceed}>
              Continue
            </Button>
          )}
          {step === totalSteps && (
            <Button type="button" onClick={handleSubmit} isLoading={isLoading} disabled={isLoading}>
              {isLoading ? 'Thinking…' : 'Generate feedback'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
