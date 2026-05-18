import type { ITag } from "../../domain/entities/entities";
import type { IQuestionTagsRepository } from "../../domain/repositories/IQuestionTagsRepository";
import { supabase } from "./config";

export class QuestionTagsSupabaseRepository implements IQuestionTagsRepository {
  async listByQuestionId(questionId: number): Promise<ITag[] | null> {
    const { data, error } = await supabase
      .from("QuestionTags")
      .select("*, Tags(*)")
      .eq("questionId", questionId);

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;
    return data.map((d) => d.Tags);
  }

  async deleteByQuestionId(questionId: number): Promise<void> {
    await supabase.from("QuestionTags").delete().eq("questionId", questionId);
  }

  async create(questionId: number, tagIds: number[]): Promise<void> {
    const { error } = await supabase
      .from("QuestionTags")
      .insert(tagIds.map((tagId) => ({ questionId, tagId })));

    if (error) {
      throw error;
    }
  }
}
