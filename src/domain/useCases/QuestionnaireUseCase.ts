import type { IQuestion, IQuestionnaire } from "../entities/entities";
import type { IQuestionnaireRepository } from "../repositories/IQuestionnaireRepository";

export class QuestionnaireUseCase {
  private repository: IQuestionnaireRepository;

  constructor(repository: IQuestionnaireRepository) {
    this.repository = repository;
  }

  async listAll(): Promise<IQuestionnaire[] | null> {
    return await this.repository.listAll();
  }

  async createOrUpdate(questionnaire: IQuestionnaire): Promise<void> {
    return await this.repository.createOrUpdate(questionnaire);
  }

  async delete(id: number): Promise<void> {
    return await this.repository.delete(id);
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
