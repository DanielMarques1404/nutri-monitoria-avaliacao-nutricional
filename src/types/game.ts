type QuizCategory =
  | 'peso_pre_gestacional'
  | 'calculo_imc'
  | 'classificacao_imc'
  | 'arredondamento'
  | 'conceito';

type QuizDifficulty = 'facil' | 'media' | 'dificil';

export type QuizOption = {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
};

export type QuizQuestion = {
  id: string;
  caseTitle: string;
  statement: string;
  question: string;
  options: QuizOption[];
  correctOptionId: QuizOption['id'];
  explanation: string;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  tags?: string[];
  source?: string;
  summaryImage?: string;
  data?: {
    prePregnancyWeightKg?: number;
    currentWeightKg?: number;
    heightM?: number;
    gestationalWeeks?: number;
    expectedBmi?: number;
    expectedClassification?: 'baixo_peso' | 'eutrofia' | 'sobrepeso' | 'obesidade';
  };
};