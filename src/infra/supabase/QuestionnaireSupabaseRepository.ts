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
      .from("questionnaire_questions")
      .select("questionnaires(id, name, description), questions(id)")
      .eq("questionnaire_id", id);

    if (error) throw error;

    if (!data) return null;

    return {
      id: data[0].questionnaires.id,
      name: data[0].questionnaires.name,
      description: data[0].questionnaires.description || "",
      questions:
        (await questionsRepository.listByIds(
          data.flatMap((item) => item.questions.id),
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
