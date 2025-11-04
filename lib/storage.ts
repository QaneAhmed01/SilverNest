import type { ResultRecord } from './types';

const STORAGE_KEY = 'mature-dater-ai:last-result';

export function saveResult(record: ResultRecord) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

export function loadResult(): ResultRecord | null {
  if (typeof window === 'undefined') return null;
  const value = sessionStorage.getItem(STORAGE_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value) as ResultRecord;
  } catch (error) {
    console.error('Failed to load stored result', error);
    return null;
  }
}

export function clearResult() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEY);
}
