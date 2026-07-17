import type { IUrlQuestionnaire } from "../../domain/entities/entities";
import type { IQuestionnaireUrlsRepository } from "../../domain/repositories/IQuestionnaireUrlsRepository";
import { supabase } from "./config";

export class QuestionnaireUrlsSupabaseRepository
  implements IQuestionnaireUrlsRepository
{
  async listByQuestionnaireId(
    questionnaireId: number,
  ): Promise<IUrlQuestionnaire[] | null> {
    const { data, error } = await supabase
      .from("questionnaire_urls")
      .select("id, questionnaire_id, url")
      .eq("questionnaire_id", questionnaireId)
      .order("url", { ascending: true });

    if (error) throw error;

    return (
      data?.map((item) => ({
        id: item.id,
        questionnaireId: item.questionnaire_id,
        url: item.url,
      })) || null
    );
  }

  async createOrUpdate(url: IUrlQuestionnaire): Promise<void> {
    const dbUrl = {
      questionnaire_id: url.questionnaireId,
      url: url.url,
    };

    if (url.id === 0) {
      const { error } = await supabase.from("questionnaire_urls").insert(dbUrl);

      if (error) throw error;
      return;
    }

    const { error } = await supabase
      .from("questionnaire_urls")
      .update(dbUrl)
      .eq("id", url.id);

    if (error) throw error;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from("questionnaire_urls")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  async deleteByQuestionnaireId(questionnaireId: number): Promise<void> {
    const { error } = await supabase
      .from("questionnaire_urls")
      .delete()
      .eq("questionnaire_id", questionnaireId);

    if (error) throw error;
  }
}
