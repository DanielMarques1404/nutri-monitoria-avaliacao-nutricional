import type { IOption } from "../../domain/entities/entities";
import type { IQuestionOptionsRepository } from "../../domain/repositories/IQuestionOptionsRepository";
import { supabase } from "./config";

export class QuestionOptionsSupabaseRepository implements IQuestionOptionsRepository {
  async listByQuestionId(questionId: number): Promise<IOption[] | null> {
    const { data, error } = await supabase
      .from("question_options")
      .select("id, description, option, question_id")
      .eq("question_id", questionId)

    if (error) throw error;

    return data?.map((d) => ({ ...d, questionId: d.question_id })) || null;
  }
  
  async deleteByQuestionId(questionId: number): Promise<void> {
    const { error } = await supabase.from("question_options").delete().eq("question_id", questionId);
    if (error) throw error;
  }

  list(): Promise<IOption[] | null> {
    throw new Error("Method not implemented.");
  }
  
  async create(option: IOption, questionId: number): Promise<number> {
    const { questionId: _, ...optionData } = option;
    const { data, error } = await supabase
      .from("question_options")
      .insert({ ...optionData, id: option.id < 0 ? 0 : option.id, question_id: questionId })
      .select("id");

    if (error) {
      throw error;
    }

    return data[0].id;
  }
}
