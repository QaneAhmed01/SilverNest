import { cn } from '@/lib/utils';

interface ProfileMockProps {
  platform: string;
  photoDataUrl?: string;
  bio: string;
  promptAnswers: string[];
  firstMessages: string[];
  name?: string;
  city?: string;
  age?: string;
}

const platformStyles: Record<string, { accent: string; background: string; name: string }> = {
  tinder: { accent: '#FF6B6B', background: '#FFF', name: 'Tinder' },
  hinge: { accent: '#6B5B95', background: '#F9F7F4', name: 'Hinge' },
  bumble: { accent: '#FFB400', background: '#FFF2D9', name: 'Bumble' },
  match: { accent: '#2C7BE5', background: '#F4F6FB', name: 'Match' },
};

function normalizePlatform(platform: string) {
  const key = platform.toLowerCase();
  if (key.includes('tinder')) return 'tinder';
  if (key.includes('hinge')) return 'hinge';
  if (key.includes('match')) return 'match';
  if (key.includes('bumble')) return 'bumble';
  return 'tinder';
}

export function ProfileMock({
  platform,
  photoDataUrl,
  bio,
  promptAnswers,
  firstMessages,
  name = 'Alex',
  city = 'SilverNest City',
  age = '52',
}: ProfileMockProps) {
  const key = normalizePlatform(platform);
  const style = platformStyles[key];

  const content = (() => {
    switch (key) {
      case 'hinge':
        return (
          <HingeProfile
            accent={style.accent}
            photo={photoDataUrl}
            bio={bio}
            prompts={promptAnswers}
            messages={firstMessages}
            name={name}
            city={city}
            age={age}
          />
        );
      case 'bumble':
        return (
          <BumbleProfile
            accent={style.accent}
            photo={photoDataUrl}
            bio={bio}
            prompts={promptAnswers}
            messages={firstMessages}
            name={name}
            city={city}
            age={age}
          />
        );
      case 'match':
        return (
          <MatchProfile
            accent={style.accent}
            photo={photoDataUrl}
            bio={bio}
            prompts={promptAnswers}
            messages={firstMessages}
            name={name}
            city={city}
            age={age}
          />
        );
      case 'tinder':
      default:
        return (
          <TinderProfile
            accent={style.accent}
            photo={photoDataUrl}
            bio={bio}
            prompts={promptAnswers}
            messages={firstMessages}
            name={name}
            city={city}
            age={age}
          />
        );
    }
  })();

  return (
    <section className="rounded-[2rem] border border-border bg-surface/95 p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Preview</p>
          <h2 className="font-serif text-2xl text-ink">{style.name} style</h2>
        </div>
      </div>
      {content}
    </section>
  );
}
const placeholderChips = ['Weekend hikes', 'Art nights', 'Slow mornings'];

function PhotoFrame({ photo, aspect = 'portrait', placeholder }: { photo?: string; aspect?: 'portrait' | 'square'; placeholder: string }) {
  return (
    <div
      className={cn('overflow-hidden rounded-3xl bg-gray-200', aspect === 'portrait' ? 'h-80' : 'h-32')}
      aria-label="profile photo"
    >
      {photo ? (
        <img src={photo} alt="Profile" className="h-full w-full object-contain bg-black/5" />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-subtle">{placeholder}</div>
      )}
    </div>
  );
}

function TinderProfile({ accent, photo, bio, prompts, messages, name, city, age }: { accent: string; photo?: string; bio: string; prompts: string[]; messages: string[]; name: string; city: string; age: string }) {
  const lookingFor = prompts[0] || 'Thoughtful connection';
  const hobbies = prompts.slice(1).concat(placeholderChips).slice(0, 3);
  return (
    <div className="overflow-hidden rounded-[2.1rem] border border-black/10 shadow-[0_18px_50px_-25px_rgba(0,0,0,0.5)]">
      <div className="relative">
        <PhotoFrame photo={photo} placeholder="Add a hero photo" />
        <div className="rounded-t-3xl bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-ink">{name}</p>
              <p className="text-sm text-subtle">{age} · Lives in {city} • 8 miles away</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-[#FFF7DF] px-4 py-2 text-sm font-medium text-[#A36D00]">
            Looking for: {lookingFor}
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-ink">About me</p>
            <p className="text-sm leading-relaxed text-subtle">{bio}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-ink">Interests</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {hobbies.map((chip) => (
                <span key={chip} className="rounded-full border border-black/10 px-3 py-1 text-xs text-ink/80">
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-2xl">
            <button className="rounded-full border border-black/10 bg-white p-3" aria-label="Pass">
              ❌
            </button>
            <button className="rounded-full border border-black/10 bg-white p-3" aria-label="Maybe">
              ⭐
            </button>
            <button className="rounded-full border border-black/10 bg-white p-3" aria-label="Like">
              💚
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HingeProfile({ accent, photo, bio, prompts, messages, name, city, age }: { accent: string; photo?: string; bio: string; prompts: string[]; messages: string[]; name: string; city: string; age: string }) {
  const sections = [
    { prompt: 'The best way to ask me out is by', answer: prompts[0] || bio },
    { prompt: 'My love language is', answer: prompts[1] || messages[0] || 'Quality time & long walks' },
    { prompt: 'Me in the wild', answer: prompts[2] || 'Exploring new neighborhoods with a camera' },
  ];
  return (
    <div className="rounded-[2rem] border border-[#D9D1C7] bg-[#FBF9F6] p-5 shadow-[0_15px_45px_-30px_rgba(0,0,0,0.4)]">
      <div className="grid gap-4 md:grid-cols-3">
        <PhotoFrame photo={photo} placeholder="Upload a story photo" />
        {sections.map((section) => (
          <div key={section.prompt} className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7C6A5A]">{section.prompt}</p>
            <p className="mt-3 text-sm text-ink/80">{section.answer}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="rounded-3xl border border-[#D9D1C7] bg-white p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-ink">{name}</p>
              <p className="text-sm text-subtle">{age} · Advisor · 5&#39;8&quot; · lives in {city}</p>
            </div>
            <div className="rounded-full border border-[#D9D1C7] px-3 py-1 text-xs uppercase tracking-wide text-[#7C6A5A]">
              Liberal • ENFP
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">{bio}</p>
        </div>
      </div>
    </div>
  );
}

function BumbleProfile({ accent, photo, bio, prompts, messages, name, city, age }: { accent: string; photo?: string; bio: string; prompts: string[]; messages: string[]; name: string; city: string; age: string }) {
  const badges = ['Active', 'Dog lover', 'Morning person', 'Values depth'];
  return (
    <div className="rounded-[2rem] border border-[#F4D38B] bg-[#FFF7E3] p-5 shadow-[0_18px_45px_-30px_rgba(221,166,38,0.6)]">
      <div className="space-y-4 rounded-3xl bg-white p-4">
        <div className="flex items-center gap-3">
          <PhotoFrame photo={photo} aspect="square" placeholder="Photo" />
          <div>
            <p className="text-lg font-semibold text-ink">{name}</p>
            <p className="text-sm text-subtle">{age} · Advisor · {city}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-ink/80">{bio}</p>
        <div className="mt-4 grid gap-2 text-xs text-subtle md:grid-cols-2">
          <div>🧭 Looking for: {prompts[0] || 'Meaningful partnership'}</div>
          <div>📏 Height: 5&#39;8&quot;</div>
          <div>🙏 Values: Empathy, humor</div>
          <div>📍 Within 25 miles</div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span key={badge} className="rounded-full bg-[#FFE7AE] px-3 py-1 text-xs font-medium text-[#7B5B00]">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MatchProfile({ accent, photo, bio, prompts, messages, name, city, age }: { accent: string; photo?: string; bio: string; prompts: string[]; messages: string[]; name: string; city: string; age: string }) {
  return (
    <div className="rounded-[1.75rem] border border-[#D1DCF5] bg-white shadow-[0_18px_40px_-32px_rgba(0,45,114,0.45)]">
      <div className="flex flex-col gap-6 border-b border-[#D1DCF5] bg-[#F9FBFF] p-6 md:flex-row md:items-center">
        <PhotoFrame photo={photo} aspect="square" placeholder="Add profile photo" />
        <div>
          <p className="text-2xl font-semibold text-ink">{name}</p>
          <p className="text-sm text-subtle">{age} · Lives in {city} · seeking meaningful connection</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink/70">
            <span className="rounded-full border border-[#D1DCF5] px-3 py-1">Never married</span>
            <span className="rounded-full border border-[#D1DCF5] px-3 py-1">Degree: Masters</span>
            <span className="rounded-full border border-[#D1DCF5] px-3 py-1">Spiritual</span>
          </div>
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div>
          <p className="text-sm font-semibold text-ink">Summary</p>
          <p className="text-sm text-ink/80">{bio}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">About me</p>
          <p className="text-sm text-ink/80 whitespace-pre-line">{prompts.join('\n') || messages.join('\n')}</p>
        </div>
      </div>
    </div>
  );
}
