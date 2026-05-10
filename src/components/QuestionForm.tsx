import type { IQuestion, IQuestionAttempt } from "../domain/entities/entities";
import { Answer } from "./Answer";

type QuestionFormProps = {
  question: IQuestion | null;
  attemptForQuestion?: IQuestionAttempt;
  onSelectOption: (questionId: number, optionId: number) => void;
};

export function QuestionForm({
  question,
  attemptForQuestion,
  onSelectOption,
}: QuestionFormProps) {
  if (!question) return <div>Sem questão para exibir</div>;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container p-2 mx-auto">
        <div className="flex flex-col text-center w-full mb-2">
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
          <ul
            style={{ display: "flex", gap: 16, flexWrap: "wrap", padding: 0 }}
          >
            {question.options?.map((option) => (
              <li key={option.id} style={{ listStyle: "none" }}>
                <Answer
                  questionId={question.id}
                  option={option}
                  selectedOptionId={attemptForQuestion?.selectedOptionId}
                  isAnswerRevealed={
                    attemptForQuestion?.isAnswerRevealed ?? false
                  }
                  correctOptionId={question.correctOptionId}
                  onSelect={onSelectOption}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
