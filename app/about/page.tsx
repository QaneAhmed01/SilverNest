import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn how SilverNest protects your privacy and approaches profile guidance with empathy.',
};

const commitments = [
  {
    title: 'Privacy-first by design',
    description:
      'Inputs stay in your browser session. When you clear the page, they disappear. We never sell or train models on your data.',
  },
  {
    title: 'Guided by relationship experts',
    description:
      'Our prompts are backed by AI tuned for mature daters, focusing on clarity, kindness, and real connection — no human coaching needed.',
  },
  {
    title: 'Accessible for every dater',
    description:
      'WCAG-compliant experiences, generous typography, and keyboard-friendly controls ensure a calm and inclusive flow.',
  },
];

const faqs = [
  {
    question: 'Do you store my photos or profile?',
    answer:
      'No. Photos never leave your device. Text is sent securely to OpenAI only to produce the feedback you request, then cleared when you refresh or delete.',
  },
  {
    question: 'Who writes the guidance?',
    answer:
      'We combine expert prompts with the OpenAI API. Human writers review the tone regularly to keep it warm, respectful, and age-inclusive.',
  },
  {
    question: 'Can I use this for clients or friends?',
    answer:
      'Absolutely. Share the link or walk through the steps together. Please keep personal information safe and get consent before uploading photos.',
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16 px-4 pb-16 pt-12 md:px-6">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-brand">About SilverNest</p>
        <h1 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Warm technology, human values.</h1>
        <p className="mt-4 text-lg text-subtle md:text-xl">
          We built SilverNest so adults 40+ can feel seen and supported while navigating modern dating. Every interaction is grounded in empathy, privacy, and respect for life experience.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {commitments.map((item) => (
          <article key={item.title} className="rounded-[1.75rem] border border-border/80 bg-surface/95 p-6 text-left shadow-card">
            <h2 className="font-serif text-2xl text-ink">{item.title}</h2>
            <p className="mt-3 text-base text-subtle">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-4xl space-y-6">
        <h2 className="font-serif text-3xl text-ink">Frequently asked questions</h2>
        <dl className="space-y-4">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-[1.75rem] border border-border/70 bg-surface/95 p-6 shadow-sm">
              <dt className="font-serif text-xl text-ink">{item.question}</dt>
              <dd className="mt-2 text-base text-subtle">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
