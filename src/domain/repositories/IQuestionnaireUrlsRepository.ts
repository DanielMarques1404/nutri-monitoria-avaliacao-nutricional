import type { IUrlQuestionnaire } from "../entities/entities";

export interface IQuestionnaireUrlsRepository {
  listByQuestionnaireId(
    questionnaireId: number,
  ): Promise<IUrlQuestionnaire[] | null>;
  createOrUpdate(url: IUrlQuestionnaire): Promise<void>;
  replaceByQuestionnaireId(
    questionnaireId: number,
    urls: IUrlQuestionnaire[],
  ): Promise<void>;
  delete(id: number): Promise<void>;
  deleteByQuestionnaireId(questionnaireId: number): Promise<void>;
}
