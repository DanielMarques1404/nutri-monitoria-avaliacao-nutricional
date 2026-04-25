type QuizCategory =
  | "peso_pre_gestacional"
  | "calculo_imc"
  | "classificacao_imc"
  | "arredondamento"
  | "conceito";

export type QuizOption = {
  id: number;
  value: "A" | "B" | "C" | "D";
  description: string;
};

export type QuizTag = {
  id: number;
  name: string;
}

export type QuizQuestion = {
  id: string;
  title: string;
  statement: string;
  question: string;
  options: QuizOption[];
  correctOptionId: QuizOption["value"];
  explanation: string;
  category: QuizCategory;
  difficulty: string;
  tags?: QuizTag[];
  summaryImage?: string;
};
