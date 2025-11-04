import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateWords(value: string, limit = 32) {
  const words = value.split(/\s+/);
  if (words.length <= limit) return value;
  return `${words.slice(0, limit).join(' ')}…`;
}

export function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes)) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let count = 0;
  let size = bytes;
  while (size >= 1024 && count < units.length - 1) {
    size /= 1024;
    count += 1;
  }
  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[count]}`;
}

export function safeParseJSON<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Failed to parse JSON', error);
    return fallback;
  }
}
