import type { IQuestionTagsRepository } from "../../domain/repositories/IQuestionTagsRepository";
import { supabase } from "./config";

export class QuestionTagsSupabaseRepository implements IQuestionTagsRepository {
  async deleteByQuestionId(questionId: number): Promise<void> {
    await supabase
      .from("QuestionTags")
      .delete()
      .eq("questionId", questionId);    

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