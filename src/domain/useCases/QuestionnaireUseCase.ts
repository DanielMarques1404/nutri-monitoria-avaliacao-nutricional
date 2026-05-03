import { CURRENT_QUESTIONNAIRE } from "../../utils/data";
import type { IQuestion, IQuestionnaire } from "../entities/entities";
import type { IQuestionnaireRepository } from "../repositories/IQuestionnaireRepository";

export class QuestionnaireUseCase {
  private repository: IQuestionnaireRepository;

  constructor(repository: IQuestionnaireRepository) {
    this.repository = repository;
  }

  listById = async (id: number): Promise<IQuestionnaire | null> => {
    return await this.repository.listById(id);
  };

  getCurrentQuestionnaire = async (): Promise<IQuestionnaire | null> => {
    return await this.listById(CURRENT_QUESTIONNAIRE);
  };

  getQuestions = async (
    questionnaireId: number,
  ): Promise<IQuestion[] | null> => {
    const questionnaire = await this.repository.listById(questionnaireId);
    return questionnaire ? questionnaire.questions : null;
  };
}
