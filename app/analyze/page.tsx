import type { Metadata } from 'next';
import { AnalyzeExperience } from '@/components/analyze/analyze-experience';

export const metadata: Metadata = {
  title: 'Analyze',
  description: 'Upload your dating profile and share preferences to receive calm, thoughtful feedback.',
};

export default function AnalyzePage() {
  return <AnalyzeExperience />;
}
