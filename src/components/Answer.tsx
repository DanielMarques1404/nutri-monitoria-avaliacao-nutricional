import type { IOption } from "../domain/entities/entities";
import { cn } from "../utils/cn";

type AnswerProps = {
  questionId: number;
  option: IOption;
  selectedOptionId?: number;
  isAnswerRevealed: boolean;
  correctOptionId: number;
  onSelect: (questionId: number, optionId: number) => void;
};

export function Answer({
  questionId,
  option,
  selectedOptionId,
  isAnswerRevealed,
  correctOptionId,
  onSelect,
}: AnswerProps) {
  const isSelected = selectedOptionId === option.id;
  const isCorrect = correctOptionId === option.id;

  return (
    <div
      onClick={() => onSelect(questionId, option.id)}
      className={cn(
        "flex flex-col w-52 h-52 bg-white rounded-xl cursor-pointer border border-medium-green",
        !isSelected && "hover:border-4 hover:border-dark-green",
        isAnswerRevealed && isCorrect && "card",
        isSelected && "border-4 border-answer-user ",
      )}
    >
      <h1 className="text-sm text-center tracking-widest title-font mb-1 font-medium bg-light-green rounded-t-lg">
        {option.id}
      </h1>
      <span className="font-ubuntu text-dark-green text-sm mx-3 my-1 ">
        {option.description}
      </span>
    </div>
  );
}
