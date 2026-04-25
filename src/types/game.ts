export type Category = {
  id: number;
  name: string;
  active: boolean;
};

export type Option = {
  id: number;
  questionId: string;
  description: string;
};

export type Tag = {
  id: number;
  name: string;
};

export type Question = {
  id: string;
  title: string;
  statement: string;
  question: string;
  options: Option[];
  correctOptionId: number;
  explanation: string;
  category: Category;
  difficulty: string;
  tags?: Tag[];
  summaryImage?: string;
};
