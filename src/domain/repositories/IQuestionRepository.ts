import type { IQuestion } from "../entities/entities";

export interface IQuestionRepository {
  listByQuestionnaireId(questionnaireId: number): Promise<IQuestion[] | null>;
  listByIds(ids: number[]): Promise<IQuestion[] | null>;
  createOrUpdate(question: IQuestion): Promise<number>;
  delete(id: number): Promise<void>;
}
