import { createContext, useContext, useState, type ReactNode } from "react";
import { Questionnaire } from "../../domain/Questionnaire";
import { type QuizQuestion } from "../../types/game";
import { data } from "../../utils/data";

type QuestionnaireContextType = {
  currentQuestion: QuizQuestion | null;
  currentUserAnswer: "A" | "B" | "C" | "D" | undefined;
  answer: (answer: "A" | "B" | "C" | "D") => void;
  isCurrentVisibleAnswer: boolean;
  showAnswer: (value: boolean) => void;
  next: () => void;
  prior: () => void;
};

export const QuestionnaireContext = createContext<
  QuestionnaireContextType | undefined
>(undefined);

export const QuestionnaireProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [questionnaire, _] = useState<Questionnaire>(new Questionnaire(data));
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
    questionnaire.getCurrentQuestion(),
  );
  const [currentUserAnswer, setCurrentUserAnswer] = useState<
    "A" | "B" | "C" | "D" | undefined
  >(questionnaire.getCurrentUserAnswer());
  const [isCurrentVisibleAnswer, setCurrentVisibleAnswer] = useState<boolean>(
    questionnaire.isCurrentVisibleAnswer(),
  );

  const next = () => {
    setCurrentQuestion(questionnaire.next());
    setCurrentUserAnswer(questionnaire.getCurrentUserAnswer());
    setCurrentVisibleAnswer(questionnaire.isCurrentVisibleAnswer());
  };

  const prior = () => {
    setCurrentQuestion(questionnaire.prior());
    setCurrentUserAnswer(questionnaire.getCurrentUserAnswer());
    setCurrentVisibleAnswer(questionnaire.isCurrentVisibleAnswer());
  };

  const answer = (answer: "A" | "B" | "C" | "D") => {
    questionnaire.setCurrentUserAnswer(answer);
    setCurrentUserAnswer(answer);
    setCurrentQuestion(questionnaire.getCurrentQuestion());
    setCurrentVisibleAnswer(questionnaire.isCurrentVisibleAnswer());
  };

  const showAnswer = (value: boolean) => {
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
