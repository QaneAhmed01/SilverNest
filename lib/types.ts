export interface FormData {
  ageBracket: string;
  gender: string;
  platform: string;
  goals: string;
  interests: string;
  stylePreference: string;
  lengthPreference: string;
}

export interface OutputData {
  bio: string;
  prompt_answers: string[];
  first_messages: string[];
  style_notes: string;
}
