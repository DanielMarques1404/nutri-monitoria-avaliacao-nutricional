import { IconReportAnalytics } from "@tabler/icons-react";
import type {
  IOption,
  IQuestion,
  IQuestionAttempt,
} from "../domain/entities/entities";
import { Answer } from "./Answer";

type QuestionFormProps = {
  question: IQuestion | null;
  options: IOption[];
  attemptForQuestion?: IQuestionAttempt;
  showSummaryButton?: boolean;
  onSelectOption: (questionId: number, optionId: number) => void;
  onOpenSummary?: () => void;
};

export function QuestionForm({
  question,
  options,
  attemptForQuestion,
  showSummaryButton,
  onSelectOption,
  onOpenSummary,
}: QuestionFormProps) {
  const letter = ["A", "B", "C", "D", "E"];
  if (!question) return <div>Sem questão para exibir</div>;

  return (
    <section className="text-gray-600 body-font">
      <div className="container p-2 mx-auto">
        <div className="flex flex-col text-center w-full mb-2 gap-2">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-dark-green">
            {question.title}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
            {question.statement}
          </p>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-medium-green font-semibold">
            {question.question}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <ul className="flex flex-wrap gap-4 p-0 items-center justify-center">
            {options.map((option, idx) => (
              <li key={option.id} style={{ listStyle: "none" }}>
                <Answer
                  questionId={question.id}
                  option={option}
                  letter={letter[idx]}
                  selectedOptionId={attemptForQuestion?.selectedOptionId}
                  isAnswerRevealed={
                    attemptForQuestion?.isAnswerRevealed ?? false
                  }
                  correctOption={question.correctOption}
                  onSelect={onSelectOption}
                />
              </li>
            ))}
          </ul>
        </div>
        {showSummaryButton && (
          <div className="mt-4 flex justify-end">
            <button
              className="flex items-center justify-center gap-1 rounded-md bg-dark-green px-3 py-2 text-white hover:bg-medium-green cursor-pointer select-none"
              type="button"
              onClick={onOpenSummary}
            >
              <IconReportAnalytics size={22} />
              <span>Resumo</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
