import type { ITag } from "../../domain/entities/entities";
import type { IQuestionTagsRepository } from "../../domain/repositories/IQuestionTagsRepository";
import { supabase } from "./config";

export class QuestionTagsSupabaseRepository implements IQuestionTagsRepository {
  async listByQuestionId(questionId: number): Promise<ITag[] | null> {
    const { data, error } = await supabase
      .from("question_tags")
      .select("*, tags(*)")
      .eq("question_id", questionId);

    if (error) throw error;

    if (!data) return null;
    return data.map((d) => d.tags);
  }

  async deleteByQuestionId(questionId: number): Promise<void> {
    const { error } = await supabase.from("question_tags").delete().eq("question_id", questionId);
    if (error) throw error;
  }

  async create(questionId: number, tagIds: number[]): Promise<void> {
    const { error } = await supabase
      .from("question_tags")
      .insert(tagIds.map((tagId) => ({ question_id: questionId, tag_id: tagId })));

    if (error) {
      throw error;
    }
  }
}
