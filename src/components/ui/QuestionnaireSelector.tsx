import type { IQuestionnaire } from "../../domain/entities/entities";

type QuestionnaireSelectorProps = {
  questionnaire: IQuestionnaire | null;
  selected?: boolean;
  onSelect?: (questionnaire: IQuestionnaire) => void;
};

export const QuestionnaireSelector = ({
  questionnaire,
  selected,
  onSelect,
}: QuestionnaireSelectorProps) => {
  if (!questionnaire) return "";
  return (
    <div
      className={`group flex flex-col items-center justify-center px-4 py-1 w-full border-2 rounded-md mt-2 cursor-pointer hover:bg-lighter-green hover:border-light-green transition-colors ${
        selected ? "border-dark-green bg-lighter-green" : "border-lighter-green"
      }`}
      onClick={() => onSelect?.(questionnaire)}
    >
      <span className="text-sm text-dark-green transition-transform group-hover:font-semibold">
        {questionnaire?.name || "Sem questionário disponível"}
      </span>
    </div>
  );
};
