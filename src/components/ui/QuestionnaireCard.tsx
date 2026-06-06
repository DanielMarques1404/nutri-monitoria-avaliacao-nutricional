import type { IQuestionnaire, IQuizAttempt } from "../../domain/entities/entities";

type QuestionnaireCardProps = {
  questionnaire: IQuestionnaire | null;
  selected?: boolean;
  onSelect?: (questionnaire: IQuestionnaire) => void;
};

const getAttemptStorageKey = (questionnaireId: number) =>
  `quiz-attempt:${questionnaireId}`;

const getQuestionnaireProgress = (questionnaire: IQuestionnaire) => {
  const totalQuestions = questionnaire.questionCount ?? questionnaire.questions.length;

  if (totalQuestions <= 0) {
    return null;
  }

  const savedAttempt = localStorage.getItem(getAttemptStorageKey(questionnaire.id));

  if (!savedAttempt) {
    return null;
  }

  try {
    const attempt = JSON.parse(savedAttempt) as IQuizAttempt;

    if (attempt.questionnaireId !== questionnaire.id) {
      return null;
    }

    const answers = Object.values(attempt.answersByQuestionId);
    const correct = answers.filter((answer) => answer.result === "correct").length;
    const wrong = answers.filter(
      (answer) =>
        answer.result === "incorrect" ||
        answer.result === "revealed_without_answer",
    ).length;
    const unanswered = Math.max(totalQuestions - correct - wrong, 0);

    if (correct === 0 && wrong === 0) {
      return null;
    }

    return {
      correctPercent: (correct / totalQuestions) * 100,
      wrongPercent: (wrong / totalQuestions) * 100,
      unansweredPercent: (unanswered / totalQuestions) * 100,
    };
  } catch {
    return null;
  }
};

export const QuestionnaireCard = ({
  questionnaire,
  selected,
  onSelect,
}: QuestionnaireCardProps) => {
  if (!questionnaire) return "";
  const progress = getQuestionnaireProgress(questionnaire);

  return (
    <div
      className={`group flex flex-col items-center justify-center px-4 py-2 w-full border-2 rounded-md mt-2 cursor-pointer hover:bg-lighter-green hover:border-light-green transition-colors ${
        selected ? "border-dark-green bg-lighter-green" : "border-lighter-green"
      }`}
      onClick={() => onSelect?.(questionnaire)}
    >
      <span className="text-sm text-dark-green transition-transform group-hover:font-semibold">
        {questionnaire?.name || "Sem questionário disponível"}
      </span>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white border border-lighter-green">
        {progress && (
          <div className="flex h-full w-full">
            <div
              className="h-full bg-medium-green"
              style={{ width: `${progress.correctPercent}%` }}
            />
            <div
              className="h-full bg-red-400"
              style={{ width: `${progress.wrongPercent}%` }}
            />
            <div
              className="h-full bg-gray-200"
              style={{ width: `${progress.unansweredPercent}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
