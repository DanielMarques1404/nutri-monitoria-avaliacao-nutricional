import type {
  IQuestion,
  IQuestionnaire,
  IUrlQuestionnaire,
} from "../entities/entities";
import type { IQuestionnaireQuestionsRepository } from "../repositories/IQuestionnaireQuestionsRepository";
import type { IQuestionnaireRepository } from "../repositories/IQuestionnaireRepository";
import type { IQuestionnaireUrlsRepository } from "../repositories/IQuestionnaireUrlsRepository";

export class QuestionnaireUseCase {
  private repository: IQuestionnaireRepository;
  private urlsRepository: IQuestionnaireUrlsRepository;
  private questionnaireQuestionsRepository: IQuestionnaireQuestionsRepository;

  constructor(
    repository: IQuestionnaireRepository,
    urlsRepository: IQuestionnaireUrlsRepository,
    questionnaireQuestionsRepository: IQuestionnaireQuestionsRepository,
  ) {
    this.repository = repository;
    this.urlsRepository = urlsRepository;
    this.questionnaireQuestionsRepository = questionnaireQuestionsRepository;
  }

  private normalizeUrls(questionnaire: IQuestionnaire): IUrlQuestionnaire[] {
    const urlsByValue = new Map<string, IUrlQuestionnaire>();

    (questionnaire.urls ?? [])
      .map((item) => ({ ...item, url: item.url.trim() }))
      .filter((item) => item.url.length > 0)
      .forEach((item) => urlsByValue.set(item.url, item));

    return Array.from(urlsByValue.values());
  }

  async listAll(): Promise<IQuestionnaire[] | null> {
    return await this.repository.listAll();
  }

  async createOrUpdate(questionnaire: IQuestionnaire): Promise<void> {
    const questionnaireId = await this.repository.createOrUpdate(questionnaire);
    await this.urlsRepository.replaceByQuestionnaireId(
      questionnaireId,
      this.normalizeUrls(questionnaire),
    );
  }

  async delete(id: number): Promise<void> {
    await this.urlsRepository.deleteByQuestionnaireId(id);
    await this.questionnaireQuestionsRepository.deleteByQuestionnaireId(id);
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
