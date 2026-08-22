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
  const showUserAnswerBadge = isSelected;
  const showCorrectAnswerBadge = isAnswerRevealed && isCorrect;

  return (
    <div
      onClick={() => {
        if (isAnswerRevealed) return;

        onSelect(questionId, option.id);
      }}
      className={cn(
        "flex flex-col w-52 h-52 overflow-hidden bg-white rounded-xl border border-medium-green",
        isAnswerRevealed ? "cursor-default" : "cursor-pointer",
        !isAnswerRevealed &&
          !isSelected &&
          "hover:border-4 hover:border-dark-green",
      )}
    >
      <h1 className="text-sm text-center tracking-widest title-font mb-1 font-medium bg-light-green rounded-t-lg">
        {letter}
      </h1>
      <span className="flex-1 font-ubuntu text-dark-green text-sm mx-3 my-1 overflow-auto">
        {option.description}
      </span>
      {(showUserAnswerBadge || showCorrectAnswerBadge) && (
        <div className="mt-auto flex flex-col text-center text-[0.68rem] font-bold uppercase tracking-wide text-white">
          {showUserAnswerBadge && (
            <span className="bg-orange px-2 py-1">Sua resposta</span>
          )}
          {showCorrectAnswerBadge && (
            <span className="bg-light-green px-2 py-1">Resposta correta</span>
          )}
        </div>
      )}
    </div>
  );
}
