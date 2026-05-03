import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { IQuestion } from "../../domain/entities/entities";
import { Questionnaire } from "../../domain/Questionnaire";
import { QuestionnaireUseCase } from "../../domain/useCases/QuestionnaireUseCase";
import { QuestionnaireSupabaseRepository } from "../../infra/supabase/QuestionnaireSupabaseRepository";

type QuestionnaireContextType = {
  currentQuestion: IQuestion | null;
  currentUserAnswer: number | undefined;
  currentQuestionIndex: number;
  answer: (answer: number) => void;
  isCurrentVisibleAnswer: boolean;
  showAnswer: (value: boolean) => void;
  next: () => void;
  prior: () => void;
};

export const QuestionnaireContext = createContext<
  QuestionnaireContextType | undefined
>(undefined);

const ucQuestionnaire = new QuestionnaireUseCase(
  new QuestionnaireSupabaseRepository(),
);

export const QuestionnaireProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data: questionnaire } = useQuery({
    queryKey: ["nutri-monitoria-quiz"],
    queryFn: async () => {
      return await ucQuestionnaire
        .getCurrentQuestionnaire()
        .then((questionnaire) =>
          questionnaire ? new Questionnaire(questionnaire.questions) : null,
        );
    },
  });

  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    questionnaire?.getCurrentQuestion() || null,
  );
  const [currentUserAnswer, setCurrentUserAnswer] = useState<
    number | undefined
  >(questionnaire?.getCurrentUserAnswer());
  const [isCurrentVisibleAnswer, setCurrentVisibleAnswer] = useState<boolean>(
    questionnaire?.isCurrentVisibleAnswer() || false,
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    questionnaire?.getCurrentQuestionIndex() || -1,
  );

  const next = () => {
    if (!questionnaire) return;
    setCurrentQuestion(questionnaire.next());
    setCurrentQuestionIndex(questionnaire.getCurrentQuestionIndex());
    setCurrentUserAnswer(questionnaire.getCurrentUserAnswer());
    setCurrentVisibleAnswer(questionnaire.isCurrentVisibleAnswer());
  };

  const prior = () => {
    if (!questionnaire) return;
    setCurrentQuestion(questionnaire.prior());
    setCurrentQuestionIndex(questionnaire.getCurrentQuestionIndex());
    setCurrentUserAnswer(questionnaire.getCurrentUserAnswer());
    setCurrentVisibleAnswer(questionnaire.isCurrentVisibleAnswer());
  };

  const answer = (answer: number) => {
    if (!questionnaire) return;
    questionnaire.setCurrentUserAnswer(answer);
    setCurrentUserAnswer(answer);
    setCurrentQuestion(questionnaire.getCurrentQuestion());
    setCurrentQuestionIndex(questionnaire.getCurrentQuestionIndex());
    setCurrentVisibleAnswer(questionnaire.isCurrentVisibleAnswer());
  };

  const showAnswer = (value: boolean) => {
    if (!questionnaire) return;
    questionnaire.setCurrentVisibleAnswer(value);
    setCurrentVisibleAnswer(value);
    setCurrentUserAnswer(questionnaire.getCurrentUserAnswer());
    setCurrentQuestion(questionnaire.getCurrentQuestion());
    setCurrentQuestionIndex(questionnaire.getCurrentQuestionIndex());
  };

  const value = {
    currentQuestion,
    currentUserAnswer,
    currentQuestionIndex,
    answer,
    isCurrentVisibleAnswer,
    showAnswer,
    next,
    prior,
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context)
    throw new Error(
      "useQuestionnaire deve ser usado dentro de QuestionnaireProvider",
    );
  return context;
};
