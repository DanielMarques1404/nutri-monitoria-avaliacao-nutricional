import type { IQuestionnaire, IQuizAttempt } from "../domain/entities/entities";
import { Button } from "./ui/Button";

type PerformanceSummaryProps = {
  attempt: IQuizAttempt;
  questionnaire: IQuestionnaire;
  onClose: () => void;
};

const resultLabelByKind = {
  correct: "Correta",
  incorrect: "Incorreta",
  revealed_without_answer: "Sem resposta",
} as const;

const resultClassByKind = {
  correct: "bg-light-green text-white",
  incorrect: "bg-orange text-white",
  revealed_without_answer: "bg-gray-200 text-gray-700",
} as const;

export const PerformanceSummary = ({
  attempt,
  questionnaire,
  onClose,
}: PerformanceSummaryProps) => {
  const totalQuestions = questionnaire.questions.length;
  const answers = questionnaire.questions.map((question) => ({
    question,
    attemptForQuestion: attempt.answersByQuestionId[question.id],
  }));
  const correctCount = answers.filter(
    ({ attemptForQuestion }) => attemptForQuestion?.result === "correct",
  ).length;
  const incorrectCount = answers.filter(
    ({ attemptForQuestion }) => attemptForQuestion?.result === "incorrect",
  ).length;
  const unansweredCount = answers.filter(
    ({ attemptForQuestion }) =>
      attemptForQuestion?.result === "revealed_without_answer",
  ).length;
  const correctPercent =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <section className="flex max-h-[80vh] flex-col gap-4 overflow-hidden">
      <div className="text-center">
        <h2>Resumo do desempenho</h2>
        <p className="text-sm text-gray-500">{questionnaire.name}</p>
      </div>

      <div className="rounded-xl border border-lighter-green bg-lighter-green/30 p-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-dark-green">
          Aproveitamento
        </p>
        <p className="text-5xl font-bold text-dark-green">{correctPercent}%</p>
        <p className="text-sm text-gray-600">
          {correctCount} de {totalQuestions} questões corretas
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-md bg-light-green p-1 text-white">
          <p className="text-2xl font-bold">{correctCount}</p>
          <p className="text-[0.62rem] uppercase tracking-wide sm:text-xs">
            Corretas
          </p>
        </div>
        <div className="rounded-md bg-orange p-1 text-white">
          <p className="text-2xl font-bold">{incorrectCount}</p>
          <p className="text-[0.62rem] uppercase tracking-wide sm:text-xs">
            Incorretas
          </p>
        </div>
        <div className="rounded-md bg-gray-200 p-1 text-gray-700">
          <p className="text-2xl font-bold">{unansweredCount}</p>
          <p className="text-[0.62rem] uppercase tracking-wide sm:text-xs">
            Sem resposta
          </p>
        </div>
      </div>

      <div className="min-h-0 overflow-auto rounded-md border border-lighter-green">
        <ul className="divide-y divide-lighter-green">
          {answers.map(({ question, attemptForQuestion }, index) => {
            const result =
              attemptForQuestion?.result ?? "revealed_without_answer";

            return (
              <li
                className="flex items-center justify-between gap-3 p-3 text-sm"
                key={question.id}
              >
                <span className="text-left text-dark-green">
                  {index + 1}. {question.title}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-xs font-bold ${resultClassByKind[result]}`}
                >
                  {resultLabelByKind[result]}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        classname="self-center rounded-md px-4 py-2 text-white"
        label="Fechar"
        onClick={onClose}
      />
    </section>
  );
};
