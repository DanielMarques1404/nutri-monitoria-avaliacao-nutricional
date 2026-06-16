import type { IQuestionnaire } from "../domain/entities/entities";
import { Button } from "./ui/Button";
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
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-8 lg:px-12 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded select-none"
            alt="capa-quiz"
            src="/assets/images/capa-quiz.jpeg"
          />
        </div>

        <div className="lg:grow md:w-1/2 lg:pl-20 md:pl-14 flex flex-col md:items-start md:text-left items-center text-center gap-2">

          <div className="w-full my-4">
            {questionnaires.length === 0 ? (
              <p className="text-sm text-gray-500">
                Nenhum questionário ativo disponível.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2 items-center justify-center w-full">
                {questionnaires.map((questionnaire) => (
                  <QuestionnaireCard
                    key={`${questionnaire.id}:${attemptStorageVersion}`}
                    questionnaire={questionnaire}
                    selected={selectedQuestionnaireId === questionnaire.id}
                    onSelect={onSelectQuestionnaire}
                    onResetAttempt={onResetQuestionnaireAttempt}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center m-auto md:mr-0">
            <Button
              classname="inline-flex text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
              label="Iniciar"
              onClick={start}
              disabled={!canStart}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
