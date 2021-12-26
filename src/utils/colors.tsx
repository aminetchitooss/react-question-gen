export const COLORS = {
  primary: "#0071BA",
  secondary: "#767676"
};

export interface Quiz {
  _id: number;
  type: string;
  title: string;
  incipit: string;
  questions: Question[];
  excipit: string;
}

export interface Question {
  lib: string;
  items: Feedback[];
  feedbacks: Feedback[];
}

export interface Feedback {
  label: string;
  value: string;
}
