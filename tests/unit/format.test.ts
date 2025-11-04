import { describe, expect, it } from 'vitest';
import { countCharacters, countWords, estimateReadingTime, percentFilled } from '@/lib/format';

describe('format helpers', () => {
  it('counts characters including unicode', () => {
    expect(countCharacters('hello')).toBe(5);
    expect(countCharacters('👋🏼hello')).toBe(7);
  });

  it('counts words accurately', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('Hello there friend')).toBe(3);
    expect(countWords('  spaced   out   words ')).toBe(3);
  });

  it('estimates reading time', () => {
    expect(estimateReadingTime('word '.repeat(50))).toBe('Less than a minute');
    expect(estimateReadingTime('word '.repeat(400))).toBe('2 min read');
  });

  it('calculates percent filled', () => {
    expect(percentFilled(50, 100)).toBe(50);
    expect(percentFilled(120, 100)).toBe(100);
    expect(percentFilled(10, 0)).toBe(0);
  });
});
