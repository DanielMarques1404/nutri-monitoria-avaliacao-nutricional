import { createContext, useContext, useState, type ReactNode } from "react";
import { Question, Questionnaire } from "../../domain/Questionnaire";
import { data } from "../../utils/data";

type QuestionnaireContextType = {
  currentQuestion: Question | null;
  setUserAnswer: (answer: "A" | "B" | "C" | "D") => void;
  next: () => void;
  prior: () => void;
  answerUpdateTrigger: number;
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
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answerUpdateTrigger, setAnswerUpdateTrigger] = useState(0);

  const next = () => {
    setCurrentQuestion(questionnaire.next());
  };

  const prior = () => {
    setCurrentQuestion(questionnaire.prior());
  };

  const setUserAnswer = (answer: "A" | "B" | "C" | "D") => {
    if (currentQuestion) {
      currentQuestion.setAnswer(answer);
      setAnswerUpdateTrigger((prev) => prev + 1);
    }
  };

  const value = {
    currentQuestion,
    setUserAnswer,
    next,
    prior,
    answerUpdateTrigger,
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
