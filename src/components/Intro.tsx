import type { IQuestionnaire } from "../domain/entities/entities";
import { QuestionnaireCard } from "./ui/QuestionnaireCard";

type IntroProps = {
  start: () => void;
  questionnaires: IQuestionnaire[];
  selectedQuestionnaireId: number | null;
  attemptStorageVersion: number;
  onSelectQuestionnaire: (questionnaire: IQuestionnaire) => void;
  onResetQuestionnaireAttempt: (questionnaireId: number) => void;
  canStart: boolean;
};

export const Intro = ({
  start,
  questionnaires,
  selectedQuestionnaireId,
  attemptStorageVersion,
  onSelectQuestionnaire,
  onResetQuestionnaireAttempt,
  canStart,
}: IntroProps) => {
  const selectedQuestionnaire = questionnaires.find(
    (questionnaire) => questionnaire.id === selectedQuestionnaireId,
  );

  return (
    <section className="text-gray-600 body-font">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-10 lg:px-8 lg:py-8">
        <div className="flex w-full max-w-md flex-col gap-3 lg:w-5/12 lg:max-w-lg">
          <img
            className="w-full object-cover object-center rounded select-none"
            alt="capa-quiz"
            src="/assets/images/capa-quiz.jpeg"
          />

          {selectedQuestionnaire && selectedQuestionnaire.urls.length > 0 && (
            <div className="w-full rounded-md border border-lighter-green bg-white/80 p-3 text-left">
              <p className="text-sm font-semibold text-dark-green">
                Referências deste questionário
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {selectedQuestionnaire.urls.map((item) => (
                  <li key={item.id}>
                    <a
                      className="break-all text-sm text-indigo-600 underline-offset-2 hover:text-orange hover:underline"
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex w-full max-w-2xl flex-col items-center gap-3 text-center lg:w-7/12 lg:max-w-none lg:items-start lg:text-left">

          <div className="w-full">
            {questionnaires.length === 0 ? (
              <p className="text-sm text-gray-500">
                Nenhum questionário ativo disponível.
              </p>
            ) : (
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
                {questionnaires.map((questionnaire) => (
                  <QuestionnaireCard
                    key={`${questionnaire.id}:${attemptStorageVersion}`}
                    questionnaire={questionnaire}
                    selected={selectedQuestionnaireId === questionnaire.id}
                    canStart={
                      selectedQuestionnaireId === questionnaire.id && canStart
                    }
                    onSelect={onSelectQuestionnaire}
                    onStart={start}
                    onResetAttempt={onResetQuestionnaireAttempt}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
