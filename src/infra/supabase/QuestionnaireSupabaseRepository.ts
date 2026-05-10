import type { IQuestionnaire } from "../../domain/entities/entities";
import type { IQuestionnaireRepository } from "../../domain/repositories/IQuestionnaireRepository";
import { supabase } from "./config";
import { QuestionSupabaseRepository } from "./QuestionSupabaseRepository";

const questionsRepository = new QuestionSupabaseRepository();

export class QuestionnaireSupabaseRepository implements IQuestionnaireRepository {
  listAll(): Promise<IQuestionnaire[] | null> {
    throw new Error("Method not implemented.");
  }

  async listById(id: number): Promise<IQuestionnaire | null> {
    const { data, error } = await supabase
      .from("QuestionnaireQuestions")
      .select("*, Questionnaires(*), Questions(*)")
      .eq("questionnaireId", id);

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;

    return {
      id: data[0].Questionnaires.id,
      name: data[0].Questionnaires.name,
      description: data[0].Questionnaires.description || "",
      questions:
        (await questionsRepository.listByIds(
          data.flatMap((item) => item.Questions.id),
        )) || [],
    };
  }

  createOrUpdate(obj: IQuestionnaire): Promise<void> {
    throw new Error(`"Method not implemented." ${obj}`);
  }
  delete(id: number): Promise<void> {
    throw new Error(`"Method not implemented." ${id}`);
  }
}
