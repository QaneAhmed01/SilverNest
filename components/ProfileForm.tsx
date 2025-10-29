'use client';

import { useMemo, useState } from 'react';
import type { FormData } from '@/lib/types';

interface ProfileFormProps {
  onGenerate: (data: FormData) => Promise<void> | void;
  isLoading: boolean;
}

const MAX_TEXT_LENGTH = 600;

const defaultState: FormData = {
  ageBracket: '45-54',
  gender: 'Female',
  platform: 'Hinge',
  goals: '',
  interests: '',
  stylePreference: 'Warm and encouraging',
  lengthPreference: 'Medium (150-200 words)',
};

const ageOptions = ['40-44', '45-54', '55-64', '65+'];
const genderOptions = ['Female', 'Male', 'Other / Prefer to self-describe'];
const platformOptions = ['Hinge', 'Bumble', 'Match', 'Tinder'];
const styleOptions = [
  'Warm and encouraging',
  'Elegant and refined',
  'Playful and witty',
  'Direct and confident',
];
const lengthOptions = [
  'Short (under 120 words)',
  'Medium (150-200 words)',
  'Expanded (250+ words)',
];

export function ProfileForm({ onGenerate, isLoading }: ProfileFormProps) {
  const [formState, setFormState] = useState<FormData>(defaultState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const characterCounts = useMemo(
    () => ({
      goals: formState.goals.length,
      interests: formState.interests.length,
    }),
    [formState]
  );

  const isValid =
    formState.ageBracket.trim().length > 0 &&
    formState.platform.trim().length > 0 &&
    formState.goals.trim().length > 30 &&
    formState.interests.trim().length > 30;

  const handleChange = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const markTouched = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched((prev) => ({ ...prev, goals: true, interests: true }));

    if (!isValid) {
      return;
    }

    await onGenerate({
      ...formState,
    });
  };

  const renderCounter = (count: number) => (
    <span className="text-xs text-stone-500">
      {count}/{MAX_TEXT_LENGTH}
    </span>
  );

  const validationNote = (
    <p className="text-sm text-rose-500">
      Tell us a bit more so the AI can personalize your profile.
    </p>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-stone-200 p-6 md:p-8 space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">
            Age bracket
          </label>
          <select
            value={formState.ageBracket}
            onChange={(event) => handleChange('ageBracket', event.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-stone-800 focus:border-rose-400"
          >
            {ageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">
            Gender
          </label>
          <select
            value={formState.gender}
            onChange={(event) => handleChange('gender', event.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-stone-800 focus:border-rose-400"
          >
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">Platform</label>
          <select
            value={formState.platform}
            onChange={(event) => handleChange('platform', event.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-stone-800 focus:border-rose-400"
          >
            {platformOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">
            How would you like it to sound?
          </label>
          <select
            value={formState.stylePreference}
            onChange={(event) => handleChange('stylePreference', event.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-stone-800 focus:border-rose-400"
          >
            {styleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-stone-700">
          Preferred length
        </label>
        <select
          value={formState.lengthPreference}
          onChange={(event) => handleChange('lengthPreference', event.target.value)}
          className="w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-stone-800 focus:border-rose-400"
        >
          {lengthOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-stone-700">
          Tell us your goals
        </label>
        <textarea
          value={formState.goals}
          onChange={(event) => handleChange('goals', event.target.value.slice(0, MAX_TEXT_LENGTH))}
          onBlur={() => markTouched('goals')}
          rows={4}
          placeholder="What are you hoping to find, and what matters most to you in this stage of life?"
          className="w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-stone-800 placeholder:text-stone-400 focus:border-rose-400"
        />
        <div className="flex items-center justify-between text-xs text-stone-500">
          {touched.goals && formState.goals.trim().length <= 30 ? validationNote : <span />}
          {renderCounter(characterCounts.goals)}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-stone-700">
          Share a few interests or stories
        </label>
        <textarea
          value={formState.interests}
          onChange={(event) =>
            handleChange('interests', event.target.value.slice(0, MAX_TEXT_LENGTH))
          }
          onBlur={() => markTouched('interests')}
          rows={4}
          placeholder="Highlights from your life, passions, routines, or what makes a great weekend."
          className="w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-stone-800 placeholder:text-stone-400 focus:border-rose-400"
        />
        <div className="flex items-center justify-between text-xs text-stone-500">
          {touched.interests && formState.interests.trim().length <= 30 ? validationNote : <span />}
          {renderCounter(characterCounts.interests)}
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-stone-500">
          SilverNest crafts phrasing tuned for mature daters while protecting your privacy.
        </p>
        <button
          type="submit"
          className="btn-primary inline-flex items-center justify-center gap-2"
          disabled={isLoading || !isValid}
        >
          {isLoading ? 'Generating…' : 'Generate Profile'}
        </button>
      </div>
    </form>
  );
}
