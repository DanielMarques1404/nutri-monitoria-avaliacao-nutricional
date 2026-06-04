export interface IGeneric {
  id: number;
}

export interface ITag extends IGeneric {
  name: string;
}

export interface IOption extends IGeneric {
  questionId: number;
  description: string;
  option: string;
}

export interface ICategory extends IGeneric {
  name: string;
}

export interface IQuestion extends IGeneric {
  title: string;
  statement: string;
  question: string;
  options?: IOption[];
  correctOption: string;
  explanation: string;
  categoryId: number;
  difficulty: string;
  tags?: ITag[];
  urlLearnMore?: string;
}

export interface IQuestionnaire extends IGeneric {
  name: string;
  description: string;
  questions: IQuestion[];
}

export interface IQuestionAttempt {
  selectedOptionId?: number;
  isAnswerRevealed: boolean;
}

export interface IQuizAttempt {
  questionnaireId: number;
  quizVersion: number;
  answersByQuestionId: Record<string, IQuestionAttempt>;
  startedAt?: string;
  completedAt?: string;
}
