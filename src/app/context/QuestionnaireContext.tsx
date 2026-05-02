import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { IQuestion } from "../../domain/entities/entities";
import { Questionnaire } from "../../domain/Questionnaire";
import { QuestionUseCases } from "../../domain/useCases/QuestionUseCases";
import { QuestionSupabaseRepository } from "../../infra/supabase/QuestionSupabaseRepository";
import { useQuery } from "@tanstack/react-query";

type QuestionnaireContextType = {
  currentQuestion: IQuestion | null;
  currentUserAnswer: number | undefined;
  answer: (answer: number) => void;
  isCurrentVisibleAnswer: boolean;
  showAnswer: (value: boolean) => void;
  next: () => void;
  prior: () => void;
};

export const QuestionnaireContext = createContext<
  QuestionnaireContextType | undefined
>(undefined);

const ucQuestions = new QuestionUseCases(new QuestionSupabaseRepository());

export const QuestionnaireProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const { data: questionnaire } = useQuery({
    queryKey: ['nutri-monitoria-quiz'],
    queryFn: async () => {
      return await ucQuestions.listAll().then((questions) => questions && new Questionnaire(questions));
    },
  })

  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    questionnaire?.getCurrentQuestion() || null,
  );
  const [currentUserAnswer, setCurrentUserAnswer] = useState<
    number | undefined
  >(questionnaire?.getCurrentUserAnswer());
  const [isCurrentVisibleAnswer, setCurrentVisibleAnswer] = useState<boolean>(
    questionnaire?.isCurrentVisibleAnswer() || false,
  );

  const next = () => {
    if (!questionnaire) return;
    setCurrentQuestion(questionnaire.next());
    setCurrentUserAnswer(questionnaire.getCurrentUserAnswer());
    setCurrentVisibleAnswer(questionnaire.isCurrentVisibleAnswer());
  };

  const prior = () => {
    if (!questionnaire) return;
    setCurrentQuestion(questionnaire.prior());
    setCurrentUserAnswer(questionnaire.getCurrentUserAnswer());
    setCurrentVisibleAnswer(questionnaire.isCurrentVisibleAnswer());
  };

  const answer = (answer: number) => {
    if (!questionnaire) return;
    questionnaire.setCurrentUserAnswer(answer);
    setCurrentUserAnswer(answer);
    setCurrentQuestion(questionnaire.getCurrentQuestion());
    setCurrentVisibleAnswer(questionnaire.isCurrentVisibleAnswer());
  };

  const showAnswer = (value: boolean) => {
    if (!questionnaire) return;
    questionnaire.setCurrentVisibleAnswer(value);
    setCurrentVisibleAnswer(value);
    setCurrentUserAnswer(questionnaire.getCurrentUserAnswer());
    setCurrentQuestion(questionnaire.getCurrentQuestion());
  };

  const value = {
    currentQuestion,
    currentUserAnswer,
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
