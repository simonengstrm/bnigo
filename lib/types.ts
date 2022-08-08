export interface Bingo {
  name: string;
  description: string;
  questions: string[];
}

export interface Question {
  question: string;
  isAnswered: boolean;
}

export interface User {
  username: string;
  password: string;
}