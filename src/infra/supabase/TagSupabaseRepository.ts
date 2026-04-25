import type { ITagRepository } from "../../domain/repositories/ITagRepository";
import type { Tag } from "../../types/game";
import { supabase } from "./config";

export class TagSupabaseRepository implements ITagRepository {
  async delete(id: number): Promise<void> {
    const { error } = await supabase.from("Tags").delete().eq("id", id);

    if (error) {
      throw error;
    }
  }

  async createOrUpdate(tag: Tag): Promise<void> {
    if (tag.id === 0) {
      const { error } = await supabase
        .from("Tags")
        .insert([{ name: tag.name }])
        .select();

      if (error) {
        throw error;
      }

    } else {
      const { error } = await supabase
        .from("Tags")
        .update({ name: tag.name })
        .eq("id", tag.id)
        .select();

      if (error) {
        throw error;
      }
    }
  }

  async list(): Promise<Tag[] | null> {
    const { data, error } = await supabase.from("Tags").select("*");

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;

    const result: Tag[] = data.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));

    return result;
  }
}
