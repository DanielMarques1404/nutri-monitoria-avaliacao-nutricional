import { useEffect, useState } from "react";
import { useQuestionnaireContext } from "../app/hooks/useQuestionnaireContext";
import { cn } from "../utils/cn";
import type { IOption } from "../domain/entities/entities";

type AnswerProps = {
  option: IOption;
};

export const Answer = ({ option }: AnswerProps) => {
  const { currentQuestion, answer, currentUserAnswer, isCurrentVisibleAnswer } =
    useQuestionnaireContext();

  const [isSelected, setIsSelected] = useState(
    currentUserAnswer === option.id,
  );

  useEffect(() => {
    setIsSelected(currentUserAnswer === option.id);
  }, [currentUserAnswer, option.id]);

  return (
    <div
      className={cn(
        "flex flex-col w-52 h-52 bg-white rounded-xl cursor-pointer border border-medium-green",
        !isSelected && "hover:border-4 hover:border-dark-green",
        isCurrentVisibleAnswer &&
          currentQuestion!.correctOptionId === option.id &&
          "card",
        isSelected && "border-4 border-answer-user ",
      )}
      onClick={() => answer(option.id)}
    >
      <h1 className="text-sm text-center tracking-widest title-font mb-1 font-medium bg-light-green rounded-t-lg">
        {option.id}
      </h1>
      <span className="font-ubuntu text-dark-green text-sm mx-3 my-1 ">
        {option.description}
      </span>
    </div>
  );
};
