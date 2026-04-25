import type { IOptionRepository } from "../../domain/repositories/IOptionRepository";
import type { Option } from "../../types/game";
import { supabase } from "./config";

export class OptionSupabaseRepository implements IOptionRepository {
  async create(option: Option): Promise<void> {
    const { error } = await supabase
      .from("Options")
      .insert([{ questionId: option.questionId, description: option.description }])
      .select();
    if (error) {
      throw error;
    }
  }

  async list(): Promise<Option[] | null> {
    const { data, error } = await supabase.from("Options").select("*");

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;

    const result: Option[] = data.map((option) => ({
      id: option.id,
      questionId: option.questionId,
      description: option.description,
    }));

    return result;
  }
}
