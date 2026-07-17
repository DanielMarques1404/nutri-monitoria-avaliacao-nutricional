export interface IGeneric {
  id: number;
}

export interface ITag extends IGeneric {
  name: string;
}

export interface IOption extends IGeneric {
  questionId: number;
  description: string;
}

export interface ICategory extends IGeneric {
  name: string;
}

export interface IQuestion extends IGeneric {
  title: string;
  statement: string;
  question: string;
  options?: IOption[];
  correctOption: number;
  explanation: string;
  categoryId: number;
  difficulty: string;
  tags?: ITag[];
}

export interface IUrlQuestionnaire extends IGeneric {
  questionnaireId: number;
  url: string;
}

export interface IQuestionnaire extends IGeneric {
  name: string;
  description: string;
  active: boolean;
  questions: IQuestion[];
  questionCount?: number;
  urls: IUrlQuestionnaire[];
}



export interface IQuestionAttempt {
  selectedOptionId?: number;
  isAnswerRevealed: boolean;
  result?: "correct" | "incorrect" | "revealed_without_answer";
}

export interface IQuizAttempt {
  questionnaireId: number;
  quizVersion: number;
  answersByQuestionId: Record<string, IQuestionAttempt>;
  optionOrderByQuestionId: Record<string, number[]>;
  startedAt?: string;
  completedAt?: string;
}
