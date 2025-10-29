import type { FormData } from './types';

const systemPrompt = `You are an expert writer helping mature adults (40+) craft warm, confident dating profiles. Avoid youthful slang, pickup language, or innuendo. Focus on clarity, kindness, humor, and emotional maturity. Adapt tone to platform: shorter for Tinder/Bumble; more reflective for Match/Hinge.`;

function summarizePreferences(data: FormData) {
  const segments = [
    `Age bracket: ${data.ageBracket}`,
    data.gender ? `Gender: ${data.gender}` : undefined,
    `Dating platform: ${data.platform}`,
    `Goals: ${data.goals}`,
    `Interests: ${data.interests}`,
    `Preferred tone/style: ${data.stylePreference}`,
    `Preferred length: ${data.lengthPreference}`,
  ].filter(Boolean);

  return segments.join('\n');
}

export function buildMessages(data: FormData) {
  const summary = summarizePreferences(data);

  const userPrompt = `You will receive information about a mature dater. Craft authentic, encouraging language that respects their life experience.

User details:
${summary}

Return JSON only, matching this schema:
{
  "bio": "A concise but rich dating profile bio",
  "prompt_answers": ["Answer 1", "Answer 2", "Answer 3"],
  "first_messages": ["Message 1", "Message 2", "Message 3"],
  "style_notes": "One paragraph on how to use this profile with confidence"
}

Each string must be well-formed, with no newlines inside JSON strings. Do not include markdown, backticks, or commentary.`;

  return [
    { role: 'system' as const, content: systemPrompt },
    { role: 'user' as const, content: userPrompt },
  ];
}
