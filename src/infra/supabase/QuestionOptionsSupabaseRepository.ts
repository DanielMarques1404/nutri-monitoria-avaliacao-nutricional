import type { IOption } from "../../domain/entities/entities";
import type { IQuestionOptionsRepository } from "../../domain/repositories/IQuestionOptionsRepository";
import { supabase } from "./config";

export class QuestionOptionsSupabaseRepository implements IQuestionOptionsRepository {
  async deleteByQuestionId(questionId: number): Promise<void> {
    await supabase.from("QuestionOptions").delete().eq("questionId", questionId);
  }

  list(): Promise<IOption[] | null> {
    throw new Error("Method not implemented.");
  }
  
  async create(option: IOption, questionId: number): Promise<number> {
    const { data, error } = await supabase
      .from("QuestionOptions")
      .insert({ ...option, id: option.id < 0 ? 0 : option.id, questionId: questionId })
      .select("id");

    if (error) {
      throw error;
    }

    return data[0].id;
  }
}
