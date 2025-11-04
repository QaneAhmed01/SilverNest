export function countCharacters(value: string) {
  return [...(value ?? '')].length;
}

export function countWords(value: string) {
  if (!value.trim()) return 0;
  return value.trim().split(/\s+/).length;
}

export function estimateReadingTime(value: string) {
  const wordsPerMinute = 180;
  const words = countWords(value);
  const minutes = words / wordsPerMinute;
  if (minutes < 1) return 'Less than a minute';
  return `${Math.round(minutes)} min read`;
}

export function percentFilled(current: number, max: number) {
  if (max <= 0) return 0;
  return Math.min(100, Math.round((current / max) * 100));
}
