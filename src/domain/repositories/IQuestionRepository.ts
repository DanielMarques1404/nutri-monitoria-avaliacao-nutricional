import type { IQuestion } from "../entities/entities";

export interface IQuestionRepository {
  list(): Promise<IQuestion[] | null>;
  createOrUpdate(question: IQuestion): Promise<void>;
  delete(id: number): Promise<void>;
}
