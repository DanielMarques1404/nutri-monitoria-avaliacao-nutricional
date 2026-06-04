import type { IQuestion, IQuestionnaire } from "../entities/entities";
import type { IQuestionnaireRepository } from "../repositories/IQuestionnaireRepository";

export class QuestionnaireUseCase {
  private repository: IQuestionnaireRepository;

  constructor(repository: IQuestionnaireRepository) {
    this.repository = repository;
  }

  getQuestionnaireById = async (
    questionnaireId: number,
  ): Promise<IQuestionnaire | null> => {
    return await this.repository.listById(questionnaireId);
  };

  getActiveQuestionnaires = async (): Promise<IQuestionnaire[] | null> => {
    return await this.repository.listActives();
  };

  getQuestions = async (
    questionnaireId: number,
  ): Promise<IQuestion[] | null> => {
    const questionnaire = await this.repository.listById(questionnaireId);
    return questionnaire ? questionnaire.questions : null;
  };
}
