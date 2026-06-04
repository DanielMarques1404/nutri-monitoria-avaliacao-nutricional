import { QuestionnaireUseCase } from "../domain/useCases/QuestionnaireUseCase";
import { RepositoryFactory } from "../infra/factory/RepositoryFactory";
import { CURRENT_TECH_REPOSITORY } from "../utils/data";

const questionnarieUC = new QuestionnaireUseCase(RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createQuestionnaireRepo());

export const Header = () => {

  const getQuestionnaireName = async () => {
    const questionnaire = await questionnarieUC.getCurrentQuestionnaire();
    return questionnaire ? questionnaire.name : "Quiz";
  }

  return (
    <header className="text-gray-600 body-font border-b border-dark-green">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          className="flex title-font font-medium items-center mb-4 md:mb-0"
          href="https://unifametro.edu.br/"
          target="blank"
        >
          <img
            id="image-17-106"
            alt=""
            src="https://unifametro.edu.br/wp-content/uploads/2023/06/logo-unifametro.png"
          />
        </a>
        <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {/* <h1>{getQuestionnaireName()}</h1> */}
          
        </div>
      </div>
    </header>
  );
};
