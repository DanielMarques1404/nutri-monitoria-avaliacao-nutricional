import { useQuestionnaireContext } from "../app/hooks/useQuestionnaireContext";
import { Answer } from "./Answer";

export const QuestionForm = () => {
  const { currentQuestion } = useQuestionnaireContext();

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container p-2 mx-auto">
        <div className="flex flex-col text-center w-full mb-2">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-dark-green">
            {currentQuestion!.caseTitle}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
            {currentQuestion!.statement}
          </p>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-medium-green font-semibold">
            {currentQuestion!.question}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <ul className="flex flex-wrap items-center justify-center w-full gap-4">
            {currentQuestion!.options.map((option) => (
              <li key={`q-${currentQuestion!.id}-${option.id}`}>
                <Answer
                  option={option}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
