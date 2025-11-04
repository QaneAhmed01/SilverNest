import type { Metadata } from 'next';
import { ResultView } from '@/components/result/result-view';

export const metadata: Metadata = {
  title: 'Result',
  description: 'Review highlights, opportunities, and a suggested rewrite crafted for your dating profile.',
};

export default function ResultPage() {
  return <ResultView />;
}
