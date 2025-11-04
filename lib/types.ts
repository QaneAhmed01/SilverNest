export interface PhotoItem {
  id: string;
  name: string;
  url: string;
  size: number;
  dataUrl?: string;
}

export interface AnalyzeFormData {
  profileText: string;
  notes: string;
  ageBracket: string;
  gender: string;
  platform: string;
  priorities: string[];
  stylePreference: string;
  lengthPreference: string;
  photoDataUrl?: string;
}

export interface OutputData {
  bio: string;
  prompt_answers: string[];
  first_messages: string[];
  style_notes: string;
}

export interface ResultRecord {
  id: string;
  generatedAt: string;
  input: AnalyzeFormData;
  output: OutputData;
}
