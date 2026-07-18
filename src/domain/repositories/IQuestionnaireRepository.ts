import type { IQuestionnaire } from "../entities/entities";

export interface IQuestionnaireRepository {
  listAll(): Promise<IQuestionnaire[] | null>;
  listActives(): Promise<IQuestionnaire[] | null>;
  listById(id: number): Promise<IQuestionnaire | null>;
  createOrUpdate(obj: IQuestionnaire): Promise<number>;
  delete(id: number): Promise<void>;
}
