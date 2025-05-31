export interface User {
  email: string;
  remainingTime: number;
  emailVerified: boolean;
}

export interface GrammarAnalysis {
  corrections: string[];
  recommendations?: {
    rule_name: string;
    exercise_link: string;
  }[];
}

export interface TranscriptionResult {
  text: string;
  grammar: GrammarAnalysis;
}

export interface ApiError {
  message: string;
  status: number;
}