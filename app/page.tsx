'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { ProfileForm } from '@/components/ProfileForm';
import { OutputCard } from '@/components/OutputCard';
import type { FormData, OutputData } from '@/lib/types';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outputData, setOutputData] = useState<OutputData | null>(null);

  const handleGenerate = useCallback(async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(payload.error || 'We could not craft your profile. Please try again.');
      }

      const payload = (await response.json()) as OutputData;
      setOutputData(payload);
    } catch (err) {
      setOutputData(null);
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <main className="print-area">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-br from-rose-100/70 via-stone-50 to-amber-100/40" />
        <div className="absolute inset-x-0 top-24 -z-10 mx-auto h-64 max-w-5xl rounded-full bg-white/40 blur-3xl" />
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-4 pb-20 pt-16 md:px-10 md:pt-20">
          <header className="flex flex-col items-center text-center">
            <div className="no-print inline-flex items-center gap-3 rounded-full border border-rose-200/70 bg-white/80 px-5 py-2 text-xs uppercase tracking-[0.3em] text-rose-400 shadow-soft">
              <Image src="/logo.svg" alt="SilverNest" width={32} height={32} />
              SilverNest
            </div>
            <div className="mt-10 w-full rounded-3xl border border-stone-200 bg-white/80 p-10 shadow-soft backdrop-blur">
              <div className="space-y-6">
                <h1 className="mx-auto max-w-3xl font-serif text-4xl leading-tight text-stone-800 md:text-5xl">
                  Write a dating profile that feels like home — composed, sincere, and ready for what&apos;s next.
                </h1>
                <p className="mx-auto max-w-3xl text-lg text-stone-600 md:text-xl">
                  SilverNest helps mature daters share their story with grace. With a few thoughtful
                  prompts, receive a poised profile, answers, and opening lines crafted for modern
                  apps without sacrificing your voice.
                </p>
              </div>
              <dl className="mt-10 grid gap-6 text-left text-sm text-stone-600 md:grid-cols-3">
                <div className="rounded-2xl bg-stone-50/80 px-5 py-4">
                  <dt className="font-medium text-stone-700">Gentle guidance</dt>
                  <dd className="mt-2 leading-relaxed">
                    Questions tuned for the 40+ crowd—no jargon, no pressure, just prompts that
                    highlight what matters.
                  </dd>
                </div>
                <div className="rounded-2xl bg-stone-50/80 px-5 py-4">
                  <dt className="font-medium text-stone-700">Tailored tone</dt>
                  <dd className="mt-2 leading-relaxed">
                    Choose a voice that suits you—warm, elegant, playful, or direct—and SilverNest
                    adapts each line.
                  </dd>
                </div>
                <div className="rounded-2xl bg-stone-50/80 px-5 py-4">
                  <dt className="font-medium text-stone-700">Ready to share</dt>
                  <dd className="mt-2 leading-relaxed">
                    Copy-ready bios, prompts, and first messages to bring into Hinge, Bumble, Match,
                    or Tinder within minutes.
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <ProfileForm onGenerate={handleGenerate} isLoading={isLoading} />
              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm text-rose-600">
                  {error}
                </div>
              )}
            </div>
            <aside className="no-print space-y-6 rounded-3xl border border-stone-200 bg-gradient-to-b from-white/90 via-stone-50/90 to-white/90 p-8 shadow-soft">
              <div>
                <h2 className="font-serif text-2xl text-stone-800">A calm space to reflect</h2>
                <p className="mt-3 text-base leading-relaxed text-stone-600">
                  The best matches start with clarity. SilverNest keeps the process unhurried so you
                  can focus on sharing the chapters that matter—career triumphs, second acts, family
                  traditions, and little joys alike.
                </p>
              </div>
              <ul className="space-y-3 text-sm text-stone-600">
                <li className="rounded-2xl bg-stone-50/70 px-4 py-3">
                  Thought starters inspired by relationship coaches and profile writers for midlife
                  daters.
                </li>
                <li className="rounded-2xl bg-stone-50/70 px-4 py-3">
                  Respectful language—no slang, no clichés, just polished conversation-starters.
                </li>
                <li className="rounded-2xl bg-stone-50/70 px-4 py-3">
                  Private by design. Your words stay in your browser unless you choose to copy them.
                </li>
              </ul>
            </aside>
          </section>

          {outputData && (
            <section className="space-y-6 rounded-3xl border border-stone-200 bg-white/90 p-8 shadow-soft" aria-live="polite">
              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-2xl text-stone-800">Your SilverNest profile kit</h2>
                <p className="text-stone-600">
                  Copy these directly into {outputData?.prompt_answers ? 'your prompts and messages' : 'your dating apps'}.
                </p>
              </div>
              <div className="space-y-6">
                <OutputCard title="Profile Bio" content={outputData.bio} />
                <OutputCard
                  title="Prompt Answers"
                  content={outputData.prompt_answers}
                  accent="secondary"
                />
                <OutputCard title="Thoughtful First Messages" content={outputData.first_messages} />
                <OutputCard title="Style Notes" content={outputData.style_notes} accent="secondary" />
              </div>
            </section>
          )}

          <section className="no-print grid gap-8 rounded-3xl border border-stone-200 bg-gradient-to-br from-white/85 via-stone-50/90 to-white/80 p-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-stone-800">Why mature daters trust SilverNest</h3>
              <p className="text-stone-600 leading-relaxed">
                Built for life experiences you can&apos;t sum up in a few swipes. Our writers and coaches
                informed every prompt—so the words you receive sound like a thoughtful conversation,
                not a script.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-100 bg-white/80 px-5 py-4 text-left">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-400">Tone</p>
                  <p className="mt-2 text-base text-stone-700">Elegant, composed, and age-savvy.</p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-white/80 px-5 py-4 text-left">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400">Support</p>
                  <p className="mt-2 text-base text-stone-700">
                    Polished prompts plus opening messages you can send the same day.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4 rounded-3xl border border-stone-200 bg-white/80 p-8 shadow-soft">
              <p className="rounded-2xl bg-stone-50/80 p-4 text-stone-600">
                “SilverNest helped me speak about my life with confidence. Matches now mention the exact
                stories I hoped they would.”
              </p>
              <p className="text-sm text-stone-500">— Marisa, 56, recently engaged</p>
              <ul className="space-y-3 text-sm text-stone-600">
                <li className="rounded-2xl border border-stone-200/70 px-4 py-3">
                  Tailored tones for Hinge, Bumble, Match, and Tinder.
                </li>
                <li className="rounded-2xl border border-stone-200/70 px-4 py-3">
                  Respectful phrasing without clichés or over-sharing.
                </li>
                <li className="rounded-2xl border border-stone-200/70 px-4 py-3">
                  Guidance on what to send after you match.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
