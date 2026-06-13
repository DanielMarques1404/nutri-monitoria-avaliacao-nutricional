import type { IOption } from "../domain/entities/entities";
import { cn } from "../utils/cn";

type AnswerProps = {
  questionId: number;
  option: IOption;
  letter: string;
  selectedOptionId?: number;
  isAnswerRevealed: boolean;
  correctOption: number;
  onSelect: (questionId: number, optionId: number) => void;
};

export function Answer({
  questionId,
  option,
  letter,
  selectedOptionId,
  isAnswerRevealed,
  correctOption,
  onSelect,
}: AnswerProps) {
  const isSelected = selectedOptionId === option.id;
  const isCorrect = correctOption === option.id;

  return (
    <div
      onClick={() => {
        if (isAnswerRevealed) return;

        onSelect(questionId, option.id);
      }}
      className={cn(
        "flex flex-col w-52 h-52 bg-white rounded-xl border border-medium-green",
        isAnswerRevealed ? "cursor-default" : "cursor-pointer",
        !isAnswerRevealed &&
          !isSelected &&
          "hover:border-4 hover:border-dark-green",
        isAnswerRevealed && isCorrect && "card",
        isSelected && "border-4 border-orange ",
      )}
    >
      <h1 className="text-sm text-center tracking-widest title-font mb-1 font-medium bg-light-green rounded-t-lg">
        {letter}
      </h1>
      <span className="font-ubuntu text-dark-green text-sm mx-3 my-1 ">
        {option.description}
      </span>
    </div>
  );
}
