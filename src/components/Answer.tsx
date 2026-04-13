import { useEffect, useState } from "react";
import { useQuestionnaireContext } from "../app/hooks/useQuestionnaireContext";
import type { QuizOption } from "../types/game";
import { cn } from "../utils/cn";

type AnswerProps = {
  option: QuizOption;
};

export const Answer = ({ option }: AnswerProps) => {
  const { currentQuestion, setUserAnswer, answerUpdateTrigger } =
    useQuestionnaireContext();
  const [isSelected, setIsSelected] = useState(
    currentQuestion?.getUserAnswer() === option.id,
  );

  useEffect(() => {
    setIsSelected(currentQuestion?.getUserAnswer() === option.id);
  }, [currentQuestion, option.id, answerUpdateTrigger]);

  return (
    <div
      className="w-64 h-52 p-2 cursor-pointer"
      onClick={() => setUserAnswer(option.id)}
    >
      <div
        className={cn(
          "h-full rounded-lg border-2 border-light-green flex flex-col relative overflow-hidden",
          isSelected && "border-4 border-answer-user",
        )}
      >
        <h1 className="text-sm text-center tracking-widest title-font mb-1 font-medium bg-light-green">
          {option.id}
        </h1>
        <span className="font-ubuntu text-dark-green text-sm mx-3 my-1 ">{option.text}</span>
      </div>
    </div>
  );
};
